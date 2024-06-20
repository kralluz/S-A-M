import sendWelcomeMessage from "../Messages/Welcome.msg";

import { chatSessions } from "../app";
import sendMessage from "../utils/send's/sendMessage.util";
import processSessionStep from "./processSessionStep";

function handleStep(from: string | number, content: string, isNewMessage = false) {
    const currentTime = new Date().getTime();
    const sessionTimeout =
      parseInt(process.env.SESSION_DURATION || "30") * 60 * 1000;
  
    // Verifica se a sessão existe e gerencia a expiração
    if (chatSessions[from]) {
      if (currentTime - chatSessions[from].lastUpdated > sessionTimeout) {
        // A sessão expirou, mas permite que a interação atual seja processada antes de encerrar
        processSessionStep(from.toString(), content); // Continua a processar a etapa atual
  
        // Após processar a etapa, verifica novamente se a sessão está expirada e encerra
        if (currentTime - chatSessions[from].lastUpdated > sessionTimeout) {
          sendMessage("Sua sessão expirou. Por favor, comece novamente.");
          delete chatSessions[from]; // Remove a sessão expirada
          return; // Encerra a função após expirar a sessão
        }
      } else {
        // Atualiza o timestamp da última interação
        chatSessions[from].lastUpdated = currentTime;
        if (!isNewMessage) {
          processSessionStep(from.toString(), content); // Continua o processo normal
        }
      }
    } else {
      // Inicializa uma nova sessão se não existir
      chatSessions[from] = {
        step: "welcome",
        data: {},
        lastUpdated: currentTime,
      };

      
      sendWelcomeMessage();
      return;
    }
  }
  
  export default handleStep;
