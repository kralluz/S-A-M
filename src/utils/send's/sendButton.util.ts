import dotenv from "dotenv";
import api from "../../api";
dotenv.config();

const sendButton = async (message: any, buttons: any[]) => {
  const body = {
    messaging_product: "whatsapp",
    to: `${process.env.NUMB_TEST}`,
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text: message,
      },
      footer: {
        text: `${process.env.FOOTER}`,
      },
      action: {
        buttons: buttons.map((button: { id: any; title: any }) => ({
          type: "reply",
          reply: {
            id: button.id,
            title: button.title,
          },
        })),
      },
    },
  };
  api(body);
};

export default sendButton;

/* sendButton("Confirmar Agendamento?", [
  { id: "cancel", title: "Cancelar  ⛔" },
  { id: "confirm", title: "Confirmar ✅" }
]); */
/* sendButton("Olá! Como posso ajudar você hoje?", [
  { id: "agendar_exame", title: "Agendar um exame" },
  { id: "duvidas_frequentes", title: "Dúvidas Frequentes" }
  { id: "consultar_precos", title: "Consultar Preços" }
]); */