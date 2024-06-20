import sendButton from "./sendButton.util";

const appointmentConfirmation = () => {
    sendButton("Confirmar Agendamento?", [
        { id: "cancel", title: "Cancelar  ⛔" },
        { id: "confirm", title: "Confirmar ✅" }
      ]);
};

export default appointmentConfirmation;
