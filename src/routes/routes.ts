import express from 'express';
import { SendMedia, SendMessage } from '../controller/message-controller';
import { TokenCheck } from '../middleware/token';

const router = express.Router();

router.post('/send-message', TokenCheck, SendMessage);
router.post('/send-media', TokenCheck, SendMedia);

export default router;
