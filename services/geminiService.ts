
import { GoogleGenAI, Type } from "@google/genai";

// Ensure API_KEY is available in the environment.
// In a real app, this would be handled by the build/deployment environment.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY not found. Gemini features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        serviceType: {
            type: Type.STRING,
            description: "Categorize o serviço em uma das seguintes opções: Instalação, Manutenção, Reparo, Upgrade, Consultoria, Outro. Seja conciso."
        },
        notes: {
            type: Type.STRING,
            description: "Resuma o problema ou a solicitação do cliente em um parágrafo curto para o campo de observações técnicas. Capture os pontos chave."
        }
    },
    required: ["serviceType", "notes"]
};


export const parseServiceRequest = async (description: string): Promise<{ serviceType: string; notes: string } | null> => {
    if (!API_KEY) {
        alert("Gemini API key is not configured. This feature is disabled.");
        return null;
    }

    try {
        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analise a seguinte solicitação de serviço e extraia as informações estruturadas conforme o schema. Solicitação: "${description}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const text = result.text.trim();
        // The response text is a JSON string, so we parse it.
        const parsedJson = JSON.parse(text);
        return parsedJson;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        alert("Falha ao processar a solicitação com a IA. Por favor, preencha os campos manualmente.");
        return null;
    }
};
