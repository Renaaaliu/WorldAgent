import { GoogleGenAI } from "@google/genai";

export interface CountryData {
  name: string;
  assets: {
    military: any[];
    industrial: any[];
  };
  stats: {
    gdp: string;
    energy: string;
    materials: string;
    stability: string;
  };
  intel: {
    threats: any[];
    assets: any[];
  };
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export const getAuthenticCountryData = async (countryName: string): Promise<CountryData> => {
  // For major countries, we can have some baseline data or use Gemini to generate it
  const prompt = `Generate authentic-looking strategic data for the country "${countryName}" in a global simulation game. 
  Include military assets (naval, ground, air), industrial facilities (tech, energy, trade, security), 
  economic stats (GDP, energy output, materials, stability), and intelligence data (threat levels, active agents).
  
  Return the data in the following JSON format:
  {
    "name": "${countryName}",
    "assets": {
      "military": [
        { "name": "string", "type": "Naval|Ground|Air", "status": "Deployed|Standby|Patrolling", "location": "string", "power": number }
      ],
      "industrial": [
        { "name": "string", "category": "Tech|Energy|Trade|Security", "efficiency": number }
      ]
    },
    "stats": {
      "gdp": "string (e.g. $25.4T)",
      "energy": "string (e.g. 84%)",
      "materials": "string (e.g. 62%)",
      "stability": "string (e.g. 91%)"
    },
    "intel": {
      "threats": [
        { "type": "Cyber|Espionage|Stability", "level": number }
      ],
      "assets": [
        { "name": "string", "location": "string", "status": "Active|Idle|Compromised" }
      ]
    }
  }`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const data = JSON.parse(response.text);
    return data as CountryData;
  } catch (error) {
    console.error("Error fetching authentic country data:", error);
    // Fallback data
    return {
      name: countryName,
      assets: { military: [], industrial: [] },
      stats: { gdp: "N/A", energy: "N/A", materials: "N/A", stability: "N/A" },
      intel: { threats: [], assets: [] }
    };
  }
};
