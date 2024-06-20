// webhook.routes.ts
import express from 'express';
import { webhookGet, webhookPost } from '../Controllers/webhook.controller';

const webhookRouter = express.Router();

webhookRouter.get('/webhook', webhookGet);
webhookRouter.post('/webhook', webhookPost);

export default webhookRouter;
