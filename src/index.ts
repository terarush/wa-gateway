import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes/routes";
import whatsappClient from "./client/whatsapp-client";
import qrcode from "qrcode-terminal";
import { toDataURL } from "qrcode";
import { errorMiddleware } from "./middleware/error.middleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(errorMiddleware)
app.use(router);

let QRCodeURL: string | null = null;

whatsappClient.on("qr", (qr: string) => {
  toDataURL(qr).then((url: string) => {
    QRCodeURL = url;
  });
  qrcode.generate(qr, { small: true });
});

whatsappClient.on("ready", () => {
  QRCodeURL = null;
  console.log("Client is ready!");
});

whatsappClient.initialize();

app.get("/", (req: Request, res: Response) => {
  res.render("index", {
    title: "WhatsApp Gateway",
    message: "Welcome to WhatsApp Gateway!",
  });
});

app.get("/scan", async (req: Request, res: Response) => {
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

