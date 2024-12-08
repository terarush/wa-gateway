const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const router = require("./routes/routes");
const whatsappClient = require("./client/whatsapp-client");
const qrcode = require("qrcode-terminal");
const { toDataURL } = require("qrcode");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(router);

let QRCodeURL = null;

whatsappClient.on("qr", (qr) => {
  toDataURL(qr).then((url) => {
    QRCodeURL = url;
  });
  qrcode.generate(qr, { small: true });
});
whatsappClient.on("ready", () => {
  QRCodeURL = null
  console.log("Client is ready!")
});
whatsappClient.initialize();

app.get("/", (req, res) => {
  res.render("index", {
    title: "WhatsApp Gateway",
    message: "Welcome to WhatsApp Gateway!",
  });
});

app.get("/scan", async (req, res) => {
  if (QRCodeURL) {
    res.render("scan", {
      qrimage: QRCodeURL,
    });
  } else {
    setTimeout(() => {
      res.render("scan", {
        qrimage: QRCodeURL,
      });
    }, 5000);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

