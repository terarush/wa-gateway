import pkg from "whatsapp-web.js";
import { ChatCompletion } from "./Groq-client";
import { textToVoice } from "../utils/textToVoice";
import fs from "fs";
import ENV from "../env";

const { LocalAuth, Client, MessageMedia } = pkg;

const whatsappClient = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    // Uncomment this code if using termux:
    // executablePath: '/data/data/com.termux/files/usr/bin/chromium-browser',
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: null,
  },
  takeoverOnConflict: true,
});

whatsappClient.on("message", async (msg) => {
  if (msg.body.startsWith("megumin")) {
    handleGreeting(msg);
  } else if (msg.body.startsWith("!ai-voice")) {
    handleAIVoice(msg);
  } else if (msg.body.startsWith("!text-voice")) {
    handleTextToVoice(msg);
  } else if (msg.body.startsWith("!ai")) {
    handleAIResponse(msg);
  }
});

whatsappClient.on("group_join", async (notification) => {
  handleGroupJoin(notification);
});

const cooldownDataPath: string = "./cooldownData.json";
let cooldowns: Record<string, number> = {};

if (fs.existsSync(cooldownDataPath)) {
  cooldowns = JSON.parse(fs.readFileSync(cooldownDataPath, "utf8"));
}

const saveCooldownData = (): void => {
  fs.writeFileSync(cooldownDataPath, JSON.stringify(cooldowns, null, 2));
};

whatsappClient.on("message", async (msg) => {
  handleCooldown(msg);
});

const handleGreeting = async (msg: any) => {
  try {
    const senderNumber = msg.from;
    const contact = await whatsappClient.getContactById(senderNumber);
    const contactName = contact.pushname || "Unknown";

    const currentHour = new Date().getHours();
    let greeting: string;

    if (currentHour < 12) {
      greeting = "Selamat Pagi";
    } else if (currentHour < 18) {
      greeting = "Selamat Siang";
    } else {
      greeting = "Selamat Malam";
    }

    const message = `${greeting} ${contactName}! Saya Megumin APIs GATEWAY, layanan API terpercaya Anda untuk berbagai integrasi.\n\nSaya dapat membantu Anda dengan berbagai tugas seperti sintesis suara, respons AI, dan banyak lagi. Jangan ragu untuk bertanya apa saja!`;

    const mediaUrl = "https://gcdnb.pbrd.co/images/db2lmmDZUTUK.jpg";
    const mediaFile = await MessageMedia.fromUrl(mediaUrl);

    await whatsappClient.sendMessage(senderNumber, mediaFile, { caption: message });
  } catch (error) {
    console.error("Error:", error);
    msg.reply("Maaf, terjadi kesalahan saat mengirim pesan.");
  }
};

const handleAIVoice = async (msg: any) => {
  const text = msg.body.substring(10).trim();
  try {
    const response = await ChatCompletion(text);
    const content = response.choices[0]?.message?.content || "Maaf, tidak ada respons.";
    const filePath = await textToVoice(content);
    if (fs.existsSync(filePath)) {
      const media = MessageMedia.fromFilePath(filePath);
      await msg.reply(media);
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    msg.reply("Terjadi kesalahan saat mengonversi teks ke suara.");
  }
};

const handleTextToVoice = async (msg: any) => {
  const text = msg.body.substring(12).trim();
  if (!text) {
    return msg.reply("Harap masukkan teks yang ingin dikonversi ke suara.");
  }

  try {
    const filePath = await textToVoice(text);
    if (fs.existsSync(filePath)) {
      const media = MessageMedia.fromFilePath(filePath);
      await msg.reply(media);
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    msg.reply("Terjadi kesalahan saat mengonversi teks ke suara.");
  }
};

const handleAIResponse = async (msg: any) => {
  if (msg.body.startsWith("!ai-voice") || msg.body.startsWith("!text-voice")) {
    return;
  }

  const replyMessage = msg.body.substring(4).trim();
  try {
    const response = await ChatCompletion(replyMessage);
    const content = response.choices[0]?.message?.content || "Maaf, tidak ada respons.";
    msg.reply(content);
  } catch (error) {
    console.error("Error in ChatCompletion:", error);
    msg.reply("Terjadi kesalahan saat memproses permintaan Anda.");
  }
};

const handleGroupJoin = async (notification: any) => {
  try {
    const chat = await notification.getChat();

    if (notification.type === "invite") {
      for (const userId of notification.recipientIds) {
        const contact = await whatsappClient.getContactById(userId);
        if (contact) {
          const message = `Halo @${contact.number}! Selamat datang di ${ENV.NAME}`;
          await chat.sendMessage(message, { mentions: [contact.number] });
        }
      }
    }
  } catch (error) {
    console.error("Error handling group join:", error);
  }
};

const handleCooldown = async (msg: any) => {
  const senderNumber = msg.from;
  const now = Date.now();

  if (cooldowns[senderNumber] && now - cooldowns[senderNumber] < 24 * 60 * 60 * 1000) {
    return;
  }

  try {
    cooldowns[senderNumber] = now;
    saveCooldownData();

    const contact = await whatsappClient.getContactById(senderNumber);
    const contactName = contact.pushname || "Teman";

    const message = `Halo, ${contactName}! Saya Megumin. Senang bertemu dengan Anda!`;
    await msg.reply(message);
  } catch (error) {
    console.error("Error handling message:", error);
    msg.reply("Maaf, terjadi kesalahan saat memproses pesan Anda.");
  }
};

export default whatsappClient;
