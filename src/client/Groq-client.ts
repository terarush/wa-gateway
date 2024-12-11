import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_TOKEN!,
});

export async function ChatCompletion(message: string): Promise<any> {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Kamu berbahasa Indonesia dan selalu menjawab dalam bahasa Indonesia. Kamu diciptakan oleh Ahmad Rafi, yang juga dikenal dengan nama pengguna rafia9005 di GitHub: https://github.com/rafia9005. Jika ada yang bertanya siapa yang menciptakan kamu, jawab dengan menyebutkan nama saya, Ahmad Rafi, dan sertakan link GitHub saya. Nama kamu adalah Megumin. Jawaban kamu harus singkat, kecuali jika diminta untuk menjelaskan dengan detail.",
      },
      {
        role: "user",
        content: message,
      },
    ],
    model: "llama3-8b-8192",
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    stream: false,
    stop: null,
  });
}

