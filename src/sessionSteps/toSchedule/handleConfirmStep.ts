import sendButton from "../../utils/send's/sendButton.util";
import sendMessage from "../../utils/send's/sendMessage.util";

export default function handleConfirmStep(session: { step: string; data: { name: any; exam: any; date: any; }; }, content: string, from: string | number, chatSessions: { [x: string]: any; }) {
    if (content === "Confirmar ✅") {
        session.step = "completed";
        const finalConfirmationMsg = `Você confirmou o seguinte agendamento:\nNome: ${session.data.name}\nExame: ${session.data.exam}\nData: ${session.data.date}\nPor favor, confirme essas informações estão corretas (Sim/Não):`;
        const buttons = [
            { id: "cancel", title: "cancelar ⛔" },
            { id: "confirm", title: "Confirmar ✅" },
          ];
          sendButton(finalConfirmationMsg, buttons);
    } else {
        sendMessage("Agendamento cancelado.");
        delete chatSessions[from];
    }
}
