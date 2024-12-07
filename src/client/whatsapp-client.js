import pkg from "whatsapp-web.js";
const {LocalAuth, Client} = pkg;
import qrcode from "qrcode-terminal";

const whatsappClient = new Client({
  authStrategy: new LocalAuth(),
});

whatsappClient.on("qr", (qr) => qrcode.generate(qr, { small: true }));
whatsappClient.on("ready", () => console.log("Client is ready!"));

whatsappClient.on("message", async (msg) => {
  try {
    if (msg.from != "status@broadcast") {
      const contact = await msg.getContact();
      console.log(contact, msg.body);
    } else {
    }
  } catch (error) {
    console.log(error);
  }
});

whatsappClient.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});

whatsappClient.initialize();
