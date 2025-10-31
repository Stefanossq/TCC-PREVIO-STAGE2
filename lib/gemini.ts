import { GoogleGenAI, Type, Modality } from "@google/genai";
import { AIProduct } from "./templates";

/**
 * Initializes the GoogleGenAI client, ensuring the API key is set.
 * @returns An instance of the GoogleGenAI client.
 */
const getGenAI = () => {
  if (!process.env.API_KEY) {
    throw new Error("A variável de ambiente API_KEY não está definida. Obtenha uma em https://aistudio.google.com/app/apikey e configure-a no arquivo .env.local");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

/**
 * Generates product data based on a theme using the Gemini API.
 * @param theme The theme for the store.
 * @returns A promise that resolves to an array of AI-generated products.
 */
async function generateProductData(theme: string): Promise<AIProduct[]> {
    const ai = getGenAI();
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Gere uma lista de 4 produtos para uma loja com o tema "${theme}". Os produtos devem ser criativos e adequados ao tema.`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING, description: "Nome do produto." },
                        price: { type: Type.NUMBER, description: "Preço do produto em BRL." },
                        description: { type: Type.STRING, description: "Breve descrição do produto." },
                        category: { type: Type.STRING, description: "Categoria do produto." },
                        stock: { type: Type.INTEGER, description: "Quantidade em estoque." },
                    },
                    required: ["name", "price", "description", "category", "stock"],
                },
            },
        },
    });

    try {
        const jsonText = response.text.trim();
        const products = JSON.parse(jsonText);
        return products.slice(0, 4);
    } catch (e) {
        console.error("Erro ao analisar JSON da Gemini API:", e);
        throw new Error("Não foi possível gerar os dados dos produtos. A resposta da IA não era um JSON válido.");
    }
}

/**
 * Generates a base64-encoded image string for a given product name using Gemini.
 * @param prompt The prompt for image generation.
 * @returns A promise that resolves to the base64 string or null if generation fails.
 */
async function generateImage(prompt: string): Promise<string | null> {
    try {
        const ai = getGenAI();
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: prompt }] },
            config: { responseModalities: [Modality.IMAGE] },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }
        return null;
    } catch (error) {
        console.error(`Erro ao gerar imagem com o prompt "${prompt}":`, error);
        return null;
    }
}

/**
 * Generates a list of products and their corresponding images using the Gemini API.
 * @param theme The theme for the store.
 * @returns A promise resolving to products and their base64 image strings.
 */
export const generateProductsWithImages = async (theme: string) => {
    try {
        const products = await generateProductData(theme);
        if (products.length === 0) throw new Error("A IA não retornou produtos.");
        
        const imagePromises = products.map(p => generateImage(`Uma foto de estúdio profissional e de alta qualidade do produto: "${p.name}". O fundo deve ser limpo e minimalista, em cor sólida.`));
        const images = await Promise.all(imagePromises);

        return { products, images };
    } catch (error) {
        console.error("Erro ao gerar produtos com imagens via Gemini:", error);
        throw error instanceof Error ? error : new Error("Não foi possível gerar os produtos com IA. Tente novamente.");
    }
};

const FIPE_API_BASE_V2 = 'https://fipe.parallelum.com.br/api/v2';

/**
 * Helper function to make requests to the FIPE API v2.
 * @param endpoint The API endpoint to request.
 * @returns A promise that resolves to the JSON response.
 */
async function fipeRequest(endpoint: string) {
    try {
        const response = await fetch(`${FIPE_API_BASE_V2}${endpoint}`);
        if (!response.ok) {
            throw new Error(`FIPE API error: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching from FIPE API endpoint ${endpoint}:`, error);
        throw error;
    }
}

/**
 * Fetches car data from the FIPE API (v2).
 * @returns A promise that resolves to an array of car products.
 */
const fetchCarData = async (): Promise<AIProduct[]> => {
    const targetBrandNames = ["Volkswagen", "Fiat", "Chevrolet", "Ford"];
    const allBrands = await fipeRequest('/cars/brands');

    const targetBrands = targetBrandNames
        .map(name => allBrands.find((brand: { name: string; code: string }) => 
            brand.name.toLowerCase().includes(name.toLowerCase())))
        .filter(b => b); // Filter out any not found

    if (targetBrands.length === 0) {
        throw new Error("Não foi possível encontrar as marcas alvo na API FIPE.");
    }

    const carPromises = targetBrands.map(async (brand) => {
        try {
            const models = await fipeRequest(`/cars/brands/${brand.code}/models`);
            if (!models || models.length === 0) return null;
            const randomModel = models[Math.floor(Math.random() * models.length)];

            const years = await fipeRequest(`/cars/brands/${brand.code}/models/${randomModel.code}/years`);
            if (!years || years.length === 0) return null;
            const randomYear = years[Math.floor(Math.random() * years.length)];

            const details = await fipeRequest(`/cars/brands/${brand.code}/models/${randomModel.code}/years/${randomYear.code}`);
            
            // Parse price string like "R$ 54.321,00" to a number
            const price = parseFloat(details.price.replace(/[^0-9,]/g, "").replace(',', '.'));

            return {
                name: details.model,
                price: isNaN(price) ? 50000 : price,
                description: `Código FIPE: ${details.codeFipe}. Ano ${details.modelYear}, combustível: ${details.fuel}.`,
                category: details.brand,
                stock: Math.floor(Math.random() * 5) + 1,
            };
        } catch (e) {
            console.error(`Falha ao buscar dados de veículos para a marca ${brand.name}:`, e);
            return null;
        }
    });

    const results = await Promise.all(carPromises);
    const validCars = results.filter((car): car is AIProduct => car !== null);

    if (validCars.length === 0) {
        throw new Error("Não foi possível buscar os dados dos veículos da FIPE API.");
    }

    return validCars;
};


/**
 * Fetches car data and generates corresponding images using Gemini.
 * @returns A promise resolving to car products and their base64 image strings.
 */
export const generateCarProductsWithImages = async () => {
    try {
        const products = await fetchCarData();
        if (products.length === 0) throw new Error("A API FIPE não retornou veículos.");
        
        const imagePromises = products.map(p => generateImage(`Foto de um ${p.name}, cor prata, em um estúdio com fundo branco.`));
        const images = await Promise.all(imagePromises);

        return { products, images };
    } catch (error) {
        console.error("Erro ao gerar produtos de carros:", error);
        throw error instanceof Error ? error : new Error("Não foi possível gerar os produtos de carros. Tente novamente.");
    }
};