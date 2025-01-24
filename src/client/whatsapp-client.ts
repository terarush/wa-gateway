import pkg, { Message } from "whatsapp-web.js";
import fs from "fs";
import ENV from "../env";

const { Client, LocalAuth, MessageMedia } = pkg;

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

interface CommandHandlers {
  [key: string]: (msg: any) => Promise<void>;
}


const handleGroupJoin = async (notification: any): Promise<void> => {
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

const handleCooldown = async (msg: Message): Promise<void> => {
  const senderNumber = msg.from;
  const now = Date.now();

  if (cooldowns[senderNumber] && now - cooldowns[senderNumber] < 24 * 60 * 60 * 1000) {
    return;
  }

  try {
    cooldowns[senderNumber] = now;
    saveCooldownData();

    const contact = await whatsappClient.getContactById(senderNumber);
    const contactName = contact.pushname;

    const message = `Halo, ${contactName}! Saya Megumin. Senang bertemu dengan Anda!`;
    await msg.reply(message);
  } catch (error) {
    console.error("Error handling message:", error);
    msg.reply("Maaf, terjadi kesalahan saat memproses pesan Anda.");
  }
};

const commandHandlers: CommandHandlers = {
};

whatsappClient.on("message", async (msg) => {
  const [command] = msg.body.split(" ");
  const handler = commandHandlers[command];
  await handleCooldown(msg)
  if (handler) {
    await handler(msg);
  }
});

whatsappClient.on("group_join", async (notification) => {
  await handleGroupJoin(notification);
});

const cooldownDataPath = "./cooldownData.json";
let cooldowns: Record<string, number> = {};

if (fs.existsSync(cooldownDataPath)) {
  cooldowns = JSON.parse(fs.readFileSync(cooldownDataPath, "utf8"));
}

const saveCooldownData = (): void => {
  fs.writeFileSync(cooldownDataPath, JSON.stringify(cooldowns, null, 2));
};

export default whatsappClient;
