import dotenv from "dotenv";
import api from "../../api";

dotenv.config();

const sendListMessage = async (
  headerText: string,
  bodyText: string,
  sections: { title: string; rows: { id: string; title: string; description: string }[] }[]
) => {
  const body = {
    messaging_product: "whatsapp",
    to: process.env.NUMB_TEST,
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: headerText,
      },
      body: {
        text: bodyText,
      },
      footer: {
        text: process.env.FOOTER,
      },
      action: {
        button: "Ver Horários",
        sections: sections.map((section) => ({
          title: section.title,
          rows: section.rows.map((row) => ({
            id: row.id,
            title: row.title,
            description: row.description,
          })), 
        })),
      },
    },
  };

  try {
    const response = await api(body);
    console.log('Mensagem enviada com sucesso:', response.data);
  } catch (error) {
    console.error('Erro ao enviar a mensagem:', error);
  }
};

export default sendListMessage;
