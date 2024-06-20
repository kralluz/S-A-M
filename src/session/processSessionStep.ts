import { chatSessions } from "../app";
import handleCompletedStep from "../sessionSteps/toSchedule/handleCompletedStep";
import handleConfirmStep from "../sessionSteps/toSchedule/handleConfirmStep";
import handleDateStep from "../sessionSteps/toSchedule/handleDateStep";
import handleExamStep from "../sessionSteps/toSchedule/handleExamStep";
import handleNameStep from "../sessionSteps/toSchedule/handleNameStep";
import handleWelcomeStep from "../sessionSteps/toSchedule/handleWelcomeStep";
import handleInsuranceStep from "../sessionSteps/toSchedule/handleInsuranceStep";

import sendMessage from "../utils/send's/sendMessage.util";

export default function processSessionStep(
  from: string | number,
  content: any
) {
  const session = chatSessions[from];
  console.log("Sessão atual:", session); // Log adicionado
  console.log("Current session step:", session.step); // Log existente

  switch (session.step) {
    case "welcome":
      console.log("Handling welcome step");
      handleWelcomeStep(session, content);
      break;
    case "name":
      console.log("Handling name step");
      handleNameStep(session, content);
      break;
    case "insurance":
      handleInsuranceStep(session, content);
      break;
    case "exam":
      console.log("Passing to handleExamStep:", content);
      handleExamStep(session, content);
      break;
    case "date":
      console.log("Passing to handleDateStep:", content);
      handleDateStep(session, content);
      break;
    case "completed":
      console.log("Handling completed step");
      handleCompletedStep(session, content, from, chatSessions);
      break;
    default:
      console.log("Default case hit");
      sendMessage("Não entendi, por favor tente novamente.");
  }
}
