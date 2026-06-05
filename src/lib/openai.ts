import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

export const openai = new OpenAI({
  apiKey: apiKey || 'dummy-key',
});

export async function getEmbedding(text: string) {
  if (!apiKey) {
    console.warn("OPENAI_API_KEY is not set. Returning dummy embeddings.");
    return new Array(1536).fill(0);
  }
  
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text.replace(/\n/g, ' '),
  });
  
  return response.data[0].embedding;
}
