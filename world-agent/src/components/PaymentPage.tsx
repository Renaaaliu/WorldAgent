import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { StrategicHeader } from './StrategicHeader';
import { 
  CreditCard, Shield, Zap, Check, 
  ArrowLeft, Lock, Globe, Rocket,
  AlertCircle, Loader2
} from 'lucide-react';
import { cn } from '../lib/utils';

interface PaymentPageProps {
  onViewChange: (view: any) => void;
  user: any;
  onLogout: () => void;
  itemToPurchase?: {
    id: string;
    title: string;
    price: string;
    type: 'scenario' | 'premium';
  } | null;
  onPurchaseSuccess: (id: string, type: 'scenario' | 'premium') => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ 
  onViewChange, 
  user, 
  onLogout,
  itemToPurchase,
  onPurchaseSuccess
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemToPurchase) return;

    setIsProcessing(true);
    
    try {
      const res = await fetch('/api/payments/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: itemToPurchase.id,
          itemType: itemToPurchase.type,
          amount: itemToPurchase.price
        })
      });

      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          onPurchaseSuccess(itemToPurchase.id, itemToPurchase.type);
          onViewChange(itemToPurchase.type === 'premium' ? 'dashboard' : 'scenario-market');
        }, 2000);
      } else {
        alert('Payment failed. Please try again.');
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('An error occurred during payment.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!itemToPurchase) {
    return (
      <div className="min-h-screen flex flex-col bg-background-deep">
        <StrategicHeader currentView="payment" onViewChange={onViewChange} user={user} onLogout={onLogout} />
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-4">
            <AlertCircle className="w-16 h-16 text-primary mx-auto opacity-50" />
            <h2 className="text-2xl font-bold text-white">No Item Selected</h2>
            <p className="text-slate-400">Please select a scenario or upgrade package from the market.</p>
            <button 
              onClick={() => onViewChange('scenario-market')}
              className="px-6 py-2 bg-primary text-background-dark rounded-lg font-bold"
            >
              Return to Market
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-deep">
      <StrategicHeader currentView="payment" onViewChange={onViewChange} user={user} onLogout={onLogout} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <button 
          onClick={() => onViewChange('scenario-market')}
          className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Market
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Secure Checkout</h1>
              <p className="text-slate-400">Complete your transaction to unlock new strategic capabilities.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  {itemToPurchase.type === 'premium' ? <Zap className="w-6 h-6" /> : <Globe className="w-6 h-6" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg">{itemToPurchase.title}</h3>
                  <p className="text-sm text-slate-400">
                    {itemToPurchase.type === 'premium' ? 'Lifetime Premium Access' : 'Strategic Scenario Expansion'}
                  </p>
                </div>
                <div className="text-xl font-black text-primary">{itemToPurchase.price}</div>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-white">{itemToPurchase.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Tax</span>
                  <span className="text-white">$0.00</span>
                </div>
                <div className="flex justify-between text-xl font-black pt-3 border-t border-white/10">
                  <span className="text-white">Total</span>
                  <span className="text-primary">{itemToPurchase.price}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Shield className="w-4 h-4 text-emerald-500" />
                Bank-level 256-bit encryption
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Lock className="w-4 h-4 text-emerald-500" />
                Secure payment processing via World Agent Pay
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden">
            {isSuccess && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 z-10 bg-background-deep/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6"
              >
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Transaction Authorized</h3>
                <p className="text-slate-400">Your strategic assets are being deployed...</p>
              </motion.div>
            )}

            <form onSubmit={handlePayment} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cardholder Name</label>
                <input 
                  required
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="COMMANDER NAME"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Card Number</label>
                <div className="relative">
                  <input 
                    required
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="0000 0000 0000 0000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Expiry Date</label>
                  <input 
                    required
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">CVC</label>
                  <input 
                    required
                    type="text"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    placeholder="000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
                </div>
              </div>

              <button 
                disabled={isProcessing || isSuccess}
                type="submit"
                className="w-full bg-primary text-background-dark py-4 rounded-xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    AUTHORIZING...
                  </>
                ) : (
                  <>
                    <Rocket className="w-6 h-6" />
                    CONFIRM PAYMENT
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-500">
                By clicking confirm, you agree to our Terms of Strategic Engagement.
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
