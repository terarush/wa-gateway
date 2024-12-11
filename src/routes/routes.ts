import express from 'express';
import { SendMedia, SendMessage } from '../controller/message-controller';
import { TokenCheck } from '../middleware/token';
import { validateSchema } from '../middleware/validation.middleware';
import { sendMessageSchema, sendMediaSchema } from '../schema/message.schema';

const router = express.Router();

router.post("/send-message",TokenCheck, validateSchema(sendMessageSchema), SendMessage);
router.post("/send-media",TokenCheck, validateSchema(sendMediaSchema), SendMedia);

export default router;
