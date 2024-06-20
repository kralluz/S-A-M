// handleInsuranceStep.ts

import sendButton from "../../utils/send's/sendButton.util";


export const handleInsuranceStep = async (session: any, content: { from: any; }) => {
    session.data.handleInsurance = content;
    session.step = "exam";
    sendButton("Por favor, escolha o tipo de exame:", [
      { id: "ultrassom", title: "Ultrassom" },
      { id: "ecocardiograma", title: "Ecocardiograma" },
      { id: "coronaria", title: "Tomografia Coronária" },
    ]);
};

export default handleInsuranceStep;