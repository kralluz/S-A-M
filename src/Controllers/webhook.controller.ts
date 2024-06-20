import { Request, Response } from 'express';
import classifyMessage from '../utils/classifyMessages.util';
import { chatSessions } from '../app';
import handleStep from '../session/handleStep';

export const webhookGet = (req: any, res: any) => {
    console.log("Webhook GET");
    
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token) {
        if (mode === "subscribe" && token === process.env.WEBHOOK_TOKEN) {
            console.log("Webhook Verified!");
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(400);
    }
};

export const webhookPost = (req: Request, res: Response) => {
    const entries = req.body.entry;
    
    if (!entries) {
        return res.status(400).send("No entries found");
    }

    entries.forEach((entry: any) => {
        const changes = entry.changes;
        if (!changes) {
            return;
        }

        changes.forEach((change: any) => {
            const { classification, response } = classifyMessage(change); 
            // Destruturando para pegar ambos valores
            if (classification === "Resposta de Botão" || classification === "Mensagem Recebida" || classification === "Resposta de Lista") {
                const message = change.value.messages[0];
                const from = message.from;
                let content;

                if (message.type === "interactive") {
                    if (message.interactive.button_reply) {
                        content = message.interactive.button_reply.title;
                    } else if (message.interactive.list_reply) {
                        content = message.interactive.list_reply.title;
                    } else {
                        console.error("Mensagem interativa sem botão ou lista de resposta:", message);
                        return;
                    }
                } else {
                    content = message.text.body;
                }

                console.log("Mensagem recebida de:", from);
                console.log("Conteúdo da mensagem:", content);
                console.log("Classificação da mensagem:", classification);
                const isNewMessage = !chatSessions[from];

                handleStep(from, content, isNewMessage);
            }
        });
    });

    res.sendStatus(200);
};
