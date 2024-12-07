const pkg = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { ChatCompletion } = require("./Groq-client");
const { LocalAuth, Client } = pkg;
require("dotenv").config()

const APP_NAME = process.env.NAME

const whatsappClient = new Client({
  authStrategy: new LocalAuth(),
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
    const replyMessage = msg.body.substring(4);
    try {
      msg.reply("loading..");
      const response = await ChatCompletion(replyMessage);
      msg.reply(response.choices[0]?.message?.content || "Error");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.error("Error:", error.response.data.error.message);
      } else {
        console.error("Unexpected error:", error);
      }
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

//whatsappClient.on("group_join", async (notification) => {
//  try {
//    const chat = await notification.getChat();
//
//    if (notification.type === "invite") {
//      for (const userId of notification.recipientIds) {
//        const contact = await whatsappClient.getContactById(userId);
//
//        if (contact) {
//          const imagePath = '/path/to/your/image.jpg'; // Provide the path to the image you want to send
//          const message = `Hello @${contact.number}! Welcome to the group!`;
//
//          await chat.sendMessage(message, {
//            mentions: [contact],
//          });
//
//          // Sending an image after the message
//          await chat.sendMessage(imagePath, {
//            caption: 'Here is a welcome image!', // Optional caption
//          });
//        }
//      }
//    }
//  } catch (error) {
//    console.error("Error handling group join:", error);
//  }
//});
//

module.exports = whatsappClient;
