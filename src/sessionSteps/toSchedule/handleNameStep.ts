import sendButton from "../../utils/send's/sendButton.util";

export default function handleNameStep(
  session: { data: { name: any }; step: string },
  content: any
) {
  const nameRegex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/;
  if (nameRegex.test(content)) {
    session.data.name = content;
    session.step = "insurance";
    const insuranceOptions: any =  [
      { id: '1', title: 'IPASGO' },
      { id: '2', title: 'Unimed' },
      { id: '3', title: 'CASSI' },
  ];

sendButton('Qual é o seu plano de saúde?', insuranceOptions);

  } else {
    sendButton("Nome inválido. Por favor, digite um nome válido (apenas letras e espaços):", []);
  }
}
