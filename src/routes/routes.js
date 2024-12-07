const express = require('express');
const { SendMessage, SendMedia } = require('../controller/message-controller');

const router = express.Router();

router.post('/send-message', SendMessage);
router.post('/send-media', SendMedia)

module.exports = router;

