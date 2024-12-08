const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const router = require('./routes/routes');
const whatsappClient = require('./client/whatsapp-client');
const qrcode = require("qrcode-terminal")

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(router);

app.get('/', (req, res) => {
    res.render('index', { title: 'WhatsApp Gateway', message: 'Welcome to WhatsApp Gateway!' });
});

const PORT = process.env.PORT || 3000;
whatsappClient.on('qr', (qr) => qrcode.generate(qr, { small: true }));
whatsappClient.on('ready', () => console.log('Client is ready!'));
whatsappClient.initialize()
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

