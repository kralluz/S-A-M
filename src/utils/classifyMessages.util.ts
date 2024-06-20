const fs = require('fs');
const path = require('path');

const classifyMessage = (change: any) => {
  const value = change.value;
  let classification = "Estrutura Desconhecida";
  let response = null;
  let content = null;

  if (value.messages && value.messages.length > 0) {
    const message = value.messages[0];
    content = JSON.stringify(message);  // Convertendo o objeto mensagem para string JSON para salvar em arquivo

    if (message.type === "text") {
      classification = "Mensagem Recebida";
    } else if (message.type === "interactive") {
      const interactiveType = message.interactive.type;
      switch (interactiveType) {
        case "button_reply":
          classification = "Resposta de Botão";
          response = message.interactive.button_reply.title;
          break;
        case "list_reply":
          classification = "Resposta de Lista";
          response = message.interactive.list_reply.title;
          break;
        default:
          classification = "Tipo Interativo Desconhecido";
          break;
      }
    } else {
      classification = "Tipo de Mensagem Desconhecido";
    }
  } else if (value.statuses && value.statuses.length > 0) {
    const status = value.statuses[0];
    content = JSON.stringify(status);  // Convertendo o objeto status para string JSON para salvar em arquivo

    switch (status.status) {
      case "delivered":
        classification = "Mensagem Entregue";
        break;
      case "read":
        classification = "Mensagem Lida";
        break;
      case "sent":
        classification = "Mensagem Enviada";
        break;
      default:
        classification = "Status Desconhecido";
        break;
    }
  }

  // Criar diretório se não existir e escrever o arquivo
  const directoryPath = path.join(__dirname, 'messages', classification);
  fs.mkdirSync(directoryPath, { recursive: true });
  fs.writeFileSync(path.join(directoryPath, `message_${Date.now()}.json`), content);

  console.log(classification);
  if (response) {
    console.log("Resposta:", response);
  }

  return {
    classification,
    response
  };;
};

export default classifyMessage;
