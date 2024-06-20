import sendMessage from "../../utils/send's/sendMessage.util";

export default function handleWelcomeStep(session: { step: string; }, content: any) {
    switch (content) {
        case "Agendar um exame":
            session.step = "name";
            sendMessage("Por favor, digite o nome do paciente:");
            break;
        case "Dúvidas Frequentes":
            sendMessage("Aqui estão algumas dúvidas frequentes:");
            break;
        case "Consultar Preços":
            sendMessage("Aqui estão os nossos preços:");
            break;
        default:
            sendMessage("Desculpe, não entendi. Por favor, escolha uma das opções disponíveis.");
    }
}
