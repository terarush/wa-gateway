const gTTS = require("gtts");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

function textToVoice(text, lang = "id") {
  return new Promise((resolve, reject) => {
    const fileName = `${uuidv4()}.mp3`;
    const outputDir = path.join(__dirname, '../output');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, fileName);

    const gtts = new gTTS(text, lang);

    gtts.save(outputPath, function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(outputPath);
    });
  });
}

module.exports = textToVoice;

