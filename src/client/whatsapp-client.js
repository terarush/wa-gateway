const pkg = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { ChatCompletion } = require("./Groq-client");
const textToVoice = require("../utils/textToVoice");
const { LocalAuth, Client, MessageMedia } = pkg;
require("dotenv").config();
const fs = require("fs");
const {exec} = require("child_process")

const whatsappClient = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: null,
  },
  takeoverOnConflict: true,
});

//whatsappClient.on("message", async (msg) => {
//  try {
//    if (msg.from != "status@broadcast") {
//      const contact = await msg.getContact();
//      console.log(contact, msg.body);
//    }
//  } catch (error) {
//    console.log(error);
//  }
//});

// MESSAGE CLIENT
whatsappClient.on("message", async (msg) => {
  // CHAT AI LLAMA3.2
  if (msg.body.startsWith("!ai")) {
    const replyMessage = msg.body.substring(4).trim();
    try {
      const response = await ChatCompletion(replyMessage);

      const content =
        response.choices[0]?.message?.content || "Sorry, no response.";
      msg.reply(content);
    } catch (error) {
      console.error("Error in ChatCompletion:", error);
      msg.reply("An error occurred while processing your request.");
    }
  }
  // TEXT TO VOICE
  if (msg.body.startsWith("!text-voice")) {
    const text = msg.body.substring(12).trim();
    if (!text) {
      return msg.reply("Please provide the text to convert to voice.");
    }

    try {
      const filePath = await textToVoice(text);
      if (fs.existsSync(filePath)) {
        const media = MessageMedia.fromFilePath(filePath);
        await msg.reply(media);
        fs.unlinkSync(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      msg.reply("An error occurred while converting text to voice.");
    }
  }
});

// JOIN NOTIFICATION FROM INVITE
whatsappClient.on("group_join", async (notification) => {
  try {
    const chat = await notification.getChat();

    if (notification.type === "invite") {
      for (const userId of notification.recipientIds) {
        const contact = await whatsappClient.getContactById(userId);

        if (contact) {
          const message = `Hello @${contact.number}! Welcome to the ${APP_NAME}`;
          await chat.sendMessage(message, {
            mentions: [contact],
          });
        }
      }
    }
  } catch (error) {
    console.error("Error handling group join:", error);
  }
});

module.exports = whatsappClient;
