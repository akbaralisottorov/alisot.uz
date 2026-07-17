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

export async function getChatResponse(messages: any[], systemPrompt: string) {
  if (!apiKey) {
    console.warn("OPENAI_API_KEY is not set. Returning static fallback response.");
    return "Assalomu alaykum! Since the OpenAI API key is not currently configured, I am running in local offline assistant mode. Akbarali Sottorov is a Senior Staff Full-Stack Engineer, Choice Architect, and Branding Strategist. You can browse his engineering case studies (like Tax Helper or Teran Fikr) or check out his articles in the Writing section!";
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      ...messages
    ],
    temperature: 0.7,
  });

  return response.choices[0].message.content;
}
