import sendListMessage from "../../utils/send's/sendList.util";
import sendButton from "../../utils/send's/sendButton.util";
import sendMessage from "../../utils/send's/sendMessage.util";

export default function handleExamStep( 
  session: { data: { exam: string, examType: string }; step: string, chatId: string },
  content: string
) {
  const examMapping: { [key: string]: string } = {
    raio_x: "Raio-X",
    ultrassom: "Ultrassom",
    ecocardiograma: "Ecocardiograma",
    coronaria: "Tomografia Coronária",
  };

  const normalizedContent = content.toLowerCase().trim();
  console.log("Conteúdo normalizado recebido em handleExamStep:", normalizedContent);

  if (examMapping.hasOwnProperty(normalizedContent)) {
    session.data.exam = examMapping[normalizedContent];
    console.log("Exame selecionado:", session.data.exam);

    if (normalizedContent === 'ecocardiograma') {
      const buttons = [
        { id: "normal", title: "Normal" },
        { id: "stress", title: "Com Estresse" }
      ];
      sendButton("Você deseja um ecocardiograma normal ou com estresse?", buttons);
      session.step = "type_ecocardiograma";
      console.log("Botões de tipo de ecocardiograma enviados.");
    } else {
      session.step = "date";
      sendAvailableTimes(session);
      console.log("Processo de seleção de datas iniciado.");
    }
  } else {
    console.log("Erro: Conteúdo recebido não corresponde a nenhum exame mapeado.");
    sendMessage(
      "Não foi possível identificar o exame selecionado. Por favor, selecione um exame válido."
    );
  }
}

function sendAvailableTimes(session: { data: { exam: string; examType: string; }; step: string; chatId: string; }) {
  const headerText = "Aqui está uma lista de horários disponíveis";
  const bodyText = "Clique em *Ver Horários* para visualizar os horários disponíveis";
  const sections = [
    {
      title: "10/06/2024",
      rows: [
        {
          id: "opcao1",
          title: "08:00",
          description: "Horário disponível para agendamento",
        },
        {
          id: "opcao2",
          title: "09:00",
          description: "Horário disponível para agendamento",
        },
      ],
    },
    {
      title: "11/06/2024",
      rows: [
        {
          id: "opcao3",
          title: "14:00",
          description: "Horário disponível para agendamento",
        },
        {
          id: "opcao4",
          title: "15:00",
          description: "Horário disponível para agendamento",
        },
      ],
    },
  ];

  sendListMessage(headerText, bodyText, sections);
  console.log("Mensagem de lista de horários enviada.");
}


/* import sendListMessage from "../../utils/send's/sendList.util";
import sendMessage from "../../utils/send's/sendMessage.util";

export default function handleExamStep(
  session: { data: { exam: string }; step: string },
  content: string
) {
  const examMapping: { [key: string]: string } = {
    raio_x: "Raio-X",
    ultrassom: "Ultrassom",
    ecocardiograma: "Ecocardiograma Transtorácico",
    coronaria: "Tomografia Coronária",
  };

  const normalizedContent = content.toLowerCase();
  console.log("Conteúdo recebido em handleExamStep:", normalizedContent); // Log adicionado

  if (examMapping[normalizedContent]) {
    session.data.exam = examMapping[normalizedContent];
    //session.step = "date";
    console.log("Estado da sessão atualizado para 'date' em handleExamStep"); // Log adicionado
    const headerText = "Aqui está uma lista de horários disponíveis";
    const bodyText = "Clieque em *Ver Horários* para visualizar os horários disponívies";
    const sections = [
      {
        title: "10/06/2024",
        rows: [
          {
            id: "opcao1",
            title: "08:00",
            description: "Horário disponível para agendamento",
          },
          {
            id: "opcao2",
            title: "09:00",
            description: "Horário disponível para agendamento",
          },
        ],
      },
      {
        title: "11/06/2024",
        rows: [
          {
            id: "opcao3",
            title: "14:00",
            description: "Horário disponível para agendamento",
          },
          {
            id: "opcao4",
            title: "15:00",
            description: "Horário disponível para agendamento",
          },
        ],
      },
    ];

    sendListMessage(headerText, bodyText, sections);
  } else {
    sendMessage(
      "Não foi possível identificar o exame selecionado. Por favor, selecione um exame válido."
    );
  }
}
 */