import dotenv from "dotenv";
import api from "../../api";
dotenv.config();

const sendMessage = (message: string) => {
  const body = {
    messaging_product: "whatsapp",
    to: `${process.env.NUMB_TEST}`,
    type: "text",
    text: {
      body: `${message}`,
    },
  };
  api(body)
};

export default sendMessage;
