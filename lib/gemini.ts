import { GoogleGenAI, Type, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// This defines the structure of a single product object we expect from the AI
const productSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING, description: 'Nome criativo e curto para o produto.' },
        price: { type: Type.NUMBER, description: 'Preço do produto em BRL (ex: 49.90).' },
        description: { type: Type.STRING, description: 'Descrição concisa e atrativa com no máximo 100 caracteres.' },
        category: { type: Type.STRING, description: 'Categoria principal do produto (ex: Roupas, Acessórios).' },
        stock: { type: Type.INTEGER, description: 'Quantidade em estoque, um número inteiro entre 10 e 50.' },
    },
    required: ["name", "price", "description", "category", "stock"]
};

const generateProductImage = async (productName: string, productDescription: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: `Uma foto de estúdio profissional e de alta qualidade do produto: "${productName}", que é "${productDescription}". O fundo deve ser limpo e minimalista, em cor sólida.` }],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }
        throw new Error("Nenhuma imagem foi gerada.");

    } catch (error) {
        console.error(`Erro ao gerar imagem para "${productName}":`, error);
        // Retorna um fallback ou lança o erro
        throw new Error(`Falha ao gerar imagem para o produto: ${productName}.`);
    }
};

export const generateProductsWithImages = async (theme: string) => {
    try {
        // 1. Gerar dados de texto para os produtos
        const textResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Gere uma lista de 4 produtos de exemplo para uma loja de e-commerce com o tema: "${theme}".`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        products: {
                            type: Type.ARRAY,
                            description: 'Uma lista de 4 produtos.',
                            items: productSchema
                        }
                    },
                    required: ["products"]
                }
            }
        });

        const jsonResponse = JSON.parse(textResponse.text);
        
        if (!jsonResponse.products || !Array.isArray(jsonResponse.products)) {
            throw new Error("Resposta da IA em formato inesperado.");
        }
        
        const products = jsonResponse.products;

        // 2. Gerar uma imagem para cada produto em paralelo
        const imagePromises = products.map((p: any) => generateProductImage(p.name, p.description));
        const images = await Promise.all(imagePromises);

        return { products, images };

    } catch (error) {
        console.error("Erro ao gerar produtos com a API Gemini:", error);
        throw new Error("Não foi possível gerar os produtos. Tente novamente.");
    }
};