const express = require('express');
const whatsappClient = require('../client/whatsapp-client');

const router = express.Router();

router.post('/send-message', async (req, res) => {
  const { phoneNumber, message } = req.body;

  if (!phoneNumber || !message) {
    return res.status(400).send({ error: 'Phone number and message are required.' });
  }

  await whatsappClient.sendMessage(phoneNumber, message)
    .then(() => res.send('Message sent successfully'))
    .catch(err => {
      console.error('Error sending message:', err);
      res.status(500).send({ error: 'Failed to send message' });
    });
});

module.exports = router;
