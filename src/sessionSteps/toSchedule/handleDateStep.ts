import sendButton from "../../utils/send's/sendButton.util";

export default function handleDateStep(
  session: { data: { date: any; name: any; exam: any }; step: string },
  content: any
) {
  console.log("Conteúdo recebido em handleDateStep:", content);  // Log existente

  session.data.date = content;
  session.step = "completed";
  console.log("Estado da sessão atualizado para 'confirm' em handleDateStep");  // Log adicionado
  const buttons = [
    { id: "cancel", title: "cancelar ⛔" },
    { id: "confirm", title: "Confirmar ✅" },
  ];
  const confirmationMsg =
   `Confirma o agendamento para ${session.data.name} no dia ${session.data.date} para o exame ${session.data.exam}?`;

  sendButton(confirmationMsg, buttons);
}
