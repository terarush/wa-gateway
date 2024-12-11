import gTTS from "gtts";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

export function textToVoice(text: string, lang: string = "id"): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileName = `${uuidv4()}.mp3`;
    const outputDir = path.join(__dirname, '../output');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, fileName);

    const gtts = new gTTS(text, lang);

    gtts.save(outputPath, function (err: Error | null) {
      if (err) {
        reject(err);
        return;
      }
      resolve(outputPath);
    });
  });
}

