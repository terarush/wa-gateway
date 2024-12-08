const express = require('express');
const { SendMessage, SendMedia } = require('../controller/message-controller');
const TokenCheck = require('../middleware/token');

const router = express.Router();

router.post('/send-message',TokenCheck, SendMessage);
router.post('/send-media',TokenCheck, SendMedia)

module.exports = router;

