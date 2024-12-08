const pkg = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { ChatCompletion } = require("./Groq-client");
const { LocalAuth, Client } = pkg;
require("dotenv").config();

const whatsappClient = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ],
    defaultViewport: null
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

whatsappClient.on("message", async (msg) => {
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
});

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
