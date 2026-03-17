import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("auth.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    is_verified INTEGER DEFAULT 0,
    is_admin INTEGER DEFAULT 0,
    is_premium INTEGER DEFAULT 0,
    verification_token TEXT,
    reset_token TEXT,
    reset_token_expiry INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS purchases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    item_id TEXT NOT NULL,
    item_type TEXT NOT NULL, -- 'scenario' or 'premium'
    amount TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || "world-agent-secret-key-2026";

app.use(express.json());
app.use(cookieParser());

// Auth Middleware
const authenticate = (req: any, res: any, next: any) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// --- API Routes ---

// Sign Up
app.post("/api/auth/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Password validation
  if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    return res.status(400).json({ error: "Password must be at least 8 characters and contain at least one letter and one number" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.random().toString(36).substring(2, 15);

    // Make the first user an admin for demo purposes
    const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get() as any;
    const isAdmin = userCount.count === 0 ? 1 : 0;

    const stmt = db.prepare("INSERT INTO users (username, email, password, verification_token, is_admin) VALUES (?, ?, ?, ?, ?)");
    const info = stmt.run(username, email, hashedPassword, verificationToken, isAdmin);

    // In a real app, send email here. For demo, we return the token.
    console.log(`Verification link for ${email}: http://localhost:3000/verify?token=${verificationToken}`);

    res.status(201).json({ 
      message: "User created. Please verify your email.",
      debug_token: verificationToken // Only for demo purposes
    });
  } catch (err: any) {
    if (err.message.includes("UNIQUE constraint failed")) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user: any = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Incorrect email or password" });
  }

  if (!user.is_verified) {
    return res.status(403).json({ error: "Account not verified", email: user.email });
  }

  const token = jwt.sign({ 
    id: user.id, 
    email: user.email, 
    username: user.username,
    isAdmin: user.is_admin === 1,
    isPremium: user.is_premium === 1
  }, JWT_SECRET, { expiresIn: "7d" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({ 
    user: { 
      id: user.id, 
      email: user.email, 
      username: user.username,
      isAdmin: user.is_admin === 1,
      isPremium: user.is_premium === 1
    } 
  });
});

// Verify Email
app.get("/api/auth/verify", (req, res) => {
  const { token } = req.query;

  const user: any = db.prepare("SELECT * FROM users WHERE verification_token = ?").get(token);

  if (!user) {
    return res.status(400).json({ error: "Invalid or expired verification token" });
  }

  db.prepare("UPDATE users SET is_verified = 1, verification_token = NULL WHERE id = ?").run(user.id);

  res.json({ message: "Email verified successfully" });
});

// Forgot Password
app.post("/api/auth/forgot-password", (req, res) => {
  const { email } = req.body;
  const user: any = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

  if (user) {
    const resetToken = Math.random().toString(36).substring(2, 15);
    const expiry = Date.now() + 3600000; // 1 hour

    db.prepare("UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?").run(resetToken, expiry, user.id);
    
    console.log(`Reset link for ${email}: http://localhost:3000/reset-password?token=${resetToken}`);
  }

  // Always return success to prevent email enumeration
  res.json({ message: "If an account exists with that email, a reset link has been sent." });
});

// Reset Password
app.post("/api/auth/reset-password", async (req, res) => {
  const { token, password } = req.body;

  const user: any = db.prepare("SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > ?").get(token, Date.now());

  if (!user) {
    return res.status(400).json({ error: "Invalid or expired reset token" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  db.prepare("UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?").run(hashedPassword, user.id);

  res.json({ message: "Password updated successfully" });
});

// Logout
app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

// Get Current User
app.get("/api/auth/me", authenticate, (req: any, res) => {
  // Refresh user data from DB to get latest premium/admin status
  const user: any = db.prepare("SELECT id, username, email, is_admin, is_premium FROM users WHERE id = ?").get(req.user.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json({ 
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.is_admin === 1,
      isPremium: user.is_premium === 1
    }
  });
});

// --- Payment & Purchases ---

app.post("/api/payments/purchase", authenticate, (req: any, res) => {
  const { itemId, itemType, amount } = req.body;

  if (!itemId || !itemType || !amount) {
    return res.status(400).json({ error: "Missing purchase details" });
  }

  try {
    const stmt = db.prepare("INSERT INTO purchases (user_id, item_id, item_type, amount) VALUES (?, ?, ?, ?)");
    stmt.run(req.user.id, itemId, itemType, amount);

    if (itemType === 'premium') {
      db.prepare("UPDATE users SET is_premium = 1 WHERE id = ?").run(req.user.id);
    }

    res.json({ message: "Purchase successful" });
  } catch (err) {
    res.status(500).json({ error: "Purchase failed" });
  }
});

app.get("/api/users/purchases", authenticate, (req: any, res) => {
  const purchases = db.prepare("SELECT item_id FROM purchases WHERE user_id = ? AND item_type = 'scenario'").all(req.user.id);
  res.json({ purchasedScenarios: purchases.map((p: any) => p.item_id) });
});

// --- Admin Routes ---

const adminOnly = (req: any, res: any, next: any) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: "Forbidden: Admin access only" });
  }
  next();
};

app.get("/api/admin/stats", authenticate, adminOnly, (req, res) => {
  const totalUsers = db.prepare("SELECT COUNT(*) as count FROM users").get() as any;
  const totalPremium = db.prepare("SELECT COUNT(*) as count FROM users WHERE is_premium = 1").get() as any;
  const totalRevenue = db.prepare("SELECT SUM(CAST(REPLACE(amount, '$', '') AS DECIMAL)) as total FROM purchases").get() as any;
  const recentPurchases = db.prepare(`
    SELECT p.*, u.username 
    FROM purchases p 
    JOIN users u ON p.user_id = u.id 
    ORDER BY p.created_at DESC 
    LIMIT 10
  `).all();

  res.json({
    stats: {
      totalUsers: totalUsers.count,
      totalPremium: totalPremium.count,
      totalRevenue: totalRevenue.total || 0
    },
    recentPurchases
  });
});

app.get("/api/admin/users", authenticate, adminOnly, (req, res) => {
  const users = db.prepare("SELECT id, username, email, is_verified, is_admin, is_premium, created_at FROM users").all();
  res.json({ users });
});

app.post("/api/admin/users/:id/toggle-admin", authenticate, adminOnly, (req, res) => {
  const { id } = req.params;
  const user: any = db.prepare("SELECT is_admin FROM users WHERE id = ?").get(id);
  if (!user) return res.status(404).json({ error: "User not found" });

  const newStatus = user.is_admin === 1 ? 0 : 1;
  db.prepare("UPDATE users SET is_admin = ? WHERE id = ?").run(newStatus, id);
  res.json({ message: "Admin status updated" });
});

// --- Vite Integration ---

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
