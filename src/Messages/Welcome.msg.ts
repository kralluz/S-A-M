import sendButton from "../utils/send's/sendButton.util";


const sendWelcomeMessage = () => {
  sendButton("Olá! Como posso ajudar você hoje?", [
    { id: "agendar_exame", title: "Agendar um exame" },
    { id: "duvidas_frequentes", title: "Dúvidas Frequentes" },
    { id: "consultar_precos", title: "Consultar Preços" },
  ]);
};

export default sendWelcomeMessage;
