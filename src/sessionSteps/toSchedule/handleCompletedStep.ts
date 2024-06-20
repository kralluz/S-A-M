import sendMessage from "../../utils/send's/sendMessage.util";

export default function handleCompletedStep(session: any, content: string, from: string | number, chatSessions: { [x: string]: any; }) {
    if (content === "Confirmar ✅") {
        sendMessage("Seu agendamento foi confirmado. Obrigado!");
        delete chatSessions[from];
    } else {
        sendMessage("Por favor, reinicie o processo de agendamento, pois os dados fornecidos estão incorretos.");
        delete chatSessions[from];
    }
}
