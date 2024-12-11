import { Request, Response } from "express";
import whatsappClient from "../client/whatsapp-client";
import { MessageMedia } from "whatsapp-web.js";
import { processPhoneNumber } from "../utils/procces-number";

export async function SendMessage(req: Request, res: Response): Promise<void> {
  const { phoneNumber, message } = req.body;

  try {
    const formattedPhoneNumber = processPhoneNumber(phoneNumber);
    await whatsappClient.sendMessage(formattedPhoneNumber, message);
    res.status(200).send({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).send({ error: "Failed to send message" });
  }
}

export async function SendMedia(req: Request, res: Response): Promise<void> {
  const { phoneNumber, media, message } = req.body;

  try {
    const formattedPhoneNumber = processPhoneNumber(phoneNumber);
    const mediaFile = await MessageMedia.fromUrl(media);
    await whatsappClient.sendMessage(formattedPhoneNumber, mediaFile, {
      caption: message || "",
    });
    res.status(200).send({ message: "Media sent successfully" });
  } catch (err) {
    console.error("Error sending media:", err);
    res.status(500).send({ error: "Failed to send media" });
  }
}

