const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const router = require('./routes/routes'); 
const whatsappClient = require('./client/whatsapp-client');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const PORT = process.env.PORT || 3000;
whatsappClient.on('qr', (qr) => qrcode.generate(qr, { small: true }));
whatsappClient.on('ready', () => console.log('Client is ready!'));
whatsappClient.initialize()
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

