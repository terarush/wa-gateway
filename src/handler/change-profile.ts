import fs from "fs";
import path from "path";
import pkg from "whatsapp-web.js";
import whatsappClient from "../client/whatsapp-client";

const { MessageMedia } = pkg;

const assetsPath = path.resolve(__dirname, "../assets");

let currentImageIndex = 0;

const getAllImages = (): string[] | null => {
  try {
    const files = fs.readdirSync(assetsPath);

    const imageFiles = files
      .filter((file) => /\.(jpg|png|jpeg)$/i.test(file))
      .sort();

    if (imageFiles.length === 0) {
      console.error("Tidak ada file gambar di folder assets!");
      return null;
    }

    return imageFiles.map((file) => path.join(assetsPath, file));
  } catch (error) {
    console.error("Gagal membaca folder assets:", error);
    return null;
  }
};

export const changeProfilePicture = async (): Promise<void> => {
  const imageFiles = getAllImages();

  if (!imageFiles || imageFiles.length === 0) {
    console.error("Tidak ada gambar yang valid.");
    return;
  }

  const imagePath = imageFiles[currentImageIndex];

  try {
    const media = MessageMedia.fromFilePath(imagePath);

    await whatsappClient.setProfilePicture(media);
    currentImageIndex = (currentImageIndex + 1) % imageFiles.length;
  } catch (error) {
    console.error("Gagal mengubah foto profil:", error);
  }
};
