import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export interface StrategicEvent {
  id: number;
  type: 'Financial' | 'Environmental' | 'Political' | 'Security';
  priority: 'Critical' | 'Natural Disaster' | 'Resolved' | 'High' | 'Medium' | 'Low';
  title: string;
  time: string;
  description: string;
  prompt: string;
  affected: string;
  risk: 'Extreme' | 'High' | 'Medium' | 'Low';
  actions: string[];
  resolved?: boolean;
  timestamp: number;
}

export const generateScenarioEvents = async (scenario: string, country: any): Promise<StrategicEvent[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 3 realistic and immersive geopolitical events for a simulation.
      Scenario: ${scenario}
      Selected Nation: ${country?.name || 'Global Observer'}
      Region: ${country?.region || 'Global'}
      
      The events should be highly specific to the timeline and the nation's current status.
      Include a mix of Financial, Environmental, Political, and Security events.
      One event should be 'Critical'.
      
      Return the data as a JSON array of objects.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER },
              type: { type: Type.STRING, enum: ['Financial', 'Environmental', 'Political', 'Security'] },
              priority: { type: Type.STRING, enum: ['Critical', 'Natural Disaster', 'Resolved', 'High', 'Medium', 'Low'] },
              title: { type: Type.STRING },
              time: { type: Type.STRING, description: "e.g., '2m ago', '1h ago'" },
              description: { type: Type.STRING },
              prompt: { type: Type.STRING, description: "A detailed visual prompt for an AI image generator representing this event" },
              affected: { type: Type.STRING, description: "Nations or regions affected" },
              risk: { type: Type.STRING, enum: ['Extreme', 'High', 'Medium', 'Low'] },
              actions: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "2-3 strategic actions the player can take"
              },
              timestamp: { type: Type.INTEGER, description: "Unix timestamp in milliseconds" }
            },
            required: ['id', 'type', 'priority', 'title', 'time', 'description', 'prompt', 'affected', 'risk', 'actions', 'timestamp']
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating scenario events (using fallback):", error);
    
    // Fallback events if quota is hit
    return [
      {
        id: 101,
        type: 'Financial',
        priority: 'Critical',
        title: 'Global Market Volatility',
        time: 'Just now',
        description: 'Automated trading systems detect unusual patterns in major currency pairs. Strategic reserves are being monitored.',
        prompt: 'Futuristic digital stock market ticker, red and blue glowing lines, data visualization',
        affected: 'Global Markets',
        risk: 'High',
        actions: ['Stabilize Reserves', 'Issue Market Warning'],
        timestamp: Date.now()
      },
      {
        id: 102,
        type: 'Security',
        priority: 'High',
        title: 'Network Perimeter Alert',
        time: '5m ago',
        description: 'Unidentified signal pings detected on the outer data perimeter. Security protocols are at Level 2.',
        prompt: 'Cybersecurity shield, glowing blue hex grid, digital lock icon',
        affected: 'Sovereign Data Grid',
        risk: 'Medium',
        actions: ['Enhance Encryption', 'Trace Signal Origin'],
        timestamp: Date.now() - 300000
      },
      {
        id: 103,
        type: 'Political',
        priority: 'Medium',
        title: 'Diplomatic Communiqué',
        time: '15m ago',
        description: 'A formal request for strategic consultation has been received regarding regional trade routes.',
        prompt: 'Futuristic diplomatic meeting room, holographic globe, professional setting',
        affected: 'Regional Trade Partners',
        risk: 'Low',
        actions: ['Accept Consultation', 'Defer Response'],
        timestamp: Date.now() - 900000
      }
    ];
  }
};
