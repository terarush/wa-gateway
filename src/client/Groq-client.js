const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({
  apiKey: process.env.GROQ_TOKEN,
});

async function ChatCompletion(message) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "kamu berbahasa indonesia dan selalu menjawab dengan bahasa indonesia\nkamu di ciptakan oleh Lycoris Animee Loverss Creator.\nnama kamu adalah megumin.\nmenjawab pertanyaan nya tidak usah panjang panjang kecuali kamu di minta menjelaskan dengan detail",
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

module.exports = { ChatCompletion };
