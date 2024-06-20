import axios from 'axios';

const whatsappApiUrl = 'https://graph.facebook.com/v11.0/62985401969/messages';
const whatsappToken = 'EAAOGeUZAUHUMBOw2TLOjWHu8yI5a78q6o0Js6661HmsxjZBuKorFKjQeZBUNZBdDWBF31ZAxwe3DmXiKVwmrDYLaBWzqb5c9zot8MMIyAjZBZAEymnoBHzGjLOoHpFICWUGZCnSU1l0cfAcez9IFWw3mltYWFbnoc62Mw7HgxEzHZBmoDcIeWf0qIhw8YO9QNZBvCnvIlnlkZAVVgyExUPZBK9QZD';  // Substitua pelo seu token de API

export const handleIncomingMessage = async (message) => {
    const senderNumber = message.entry[0].changes[0].value.messages[0].from;
    const responseMessage = 'Olá! Esta é uma resposta automática. Como posso ajudar?';
  
    await sendMessage(senderNumber, responseMessage);
  };
  
  const sendMessage = async (to, message) => {
    try { 
      await axios.post(whatsappApiUrl, {
        messaging_product: 'whatsapp',
        to: to,
        type: 'text',
        text: { body: message },
      }, {
        headers: {
          'Authorization': `Bearer ${whatsappToken}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error.response.data);
    }
  };