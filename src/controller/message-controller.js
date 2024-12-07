const whatsappClient = require("../client/whatsapp-client");
const { MessageMedia } = require('whatsapp-web.js');

async function SendMessage(req, res) {
  const { phoneNumber, message } = req.body;

  if (!phoneNumber || !message) {
    return res
      .status(400)
      .send({ error: "Phone number and message are required." });
  }

  try {
    await whatsappClient.sendMessage(phoneNumber, message);
    res.status;
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).send({ error: "Failed to send message" });
  }
}

async function SendMedia(req, res) {
  const { phoneNumber, media, message } = req.body;

  if (!phoneNumber || !media) {
    return res
      .status(400)
      .send({ error: "Phone number and media URL are required." });
  }

  try {
    const mediaFile = await MessageMedia.fromUrl(media);
    await whatsappClient.sendMessage(phoneNumber, mediaFile, {
      caption: message || "",
    });
    res.status(200).send({ message: "Media sent successfully" });
  } catch (err) {
    console.error("Error sending media:", err);
    res.status(500).send({ error: "Failed to send media" });
  }
}

module.exports = {
  SendMessage,
  SendMedia,
};
