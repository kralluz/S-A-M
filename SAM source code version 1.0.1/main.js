function isValidName(name) {
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/;
    return nameRegex.test(name);
}

function isValidDate(dateString) {
    const [day, month] = dateString.split('/').map(Number);
    const year = new Date().getFullYear();
    const date = new Date(year, month - 1, day);

    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
        return false;
    }

    const today = new Date();
    if (date < today) {
        return false;
    }

    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        return false;
    }

    return true;
}

const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const fs = require("fs");

const client = new Client({
    authStrategy: new LocalAuth(),
    webVersion: "2.2409.2",
    webVersionCache: {
        type: "remote",
        remotePath:
            "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2409.2.html",
    },
});

let currentStep = {};
let patientData = {};
let timeoutHandles = {};  // Armazena os timeouts de cada paciente

const morningSlots = ["08:00", "08:10", "08:20", "08:30", "08:40", "09:00", "09:10", "09:20", "09:30", "09:40", "10:00", "10:10", "10:20", "10:30", "10:40"];
const afternoonSlots = ["13:00", "13:15", "13:30", "13:45", "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", "16:00", "16:15", "16:30", "16:45"];
const coronaryCTSlots = ["08:00", "08:10", "14:00", "14:10"];
const availableExams = [
    { id: 1, name: "Tomografia das Coronárias" },
    { id: 2, name: "Ultrassom" }
];
const otherExams = [
    "Raio-X",
    "Hemograma",
    "Eletrocardiograma"
];
const acceptedPlans = ["CASSI", "Bradesco", "Unimed", "IPASGO"];

client.on("ready", async () => {
    console.log("Cliente está pronto!");
});

client.on("qr", (qr) => {
    console.log("Gerando QR Code para acesso!");
    qrcode.generate(qr, { small: true });
    fs.writeFileSync('qrcode.png', qr, 'base64'); // Salva o QR code em um arquivo
});

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg);
});

function resetTimeout(from, footer) {
    if (timeoutHandles[from]) {
        clearTimeout(timeoutHandles[from]);
    }
    timeoutHandles[from] = setTimeout(() => {
        client.sendMessage(from, "A sessão foi encerrada devido à inatividade. Caso queira tentar novamente, digite '1' para agendar." + footer);
        delete currentStep[from];
        delete patientData[from];
        delete timeoutHandles[from];
        console.log(`Sessão encerrada por inatividade para ${from}`);
    }, 90 * 1000); // 90 segundos
}

client.on("message", async (message) => {
    try {
        const content = message.body.toLowerCase();
        const from = message.from;
        const footer = "\n\n> As mensagens enviadas pelo atendimento não representam a versão final do sistema.";
        console.log(`Recebendo mensagem de ${from}: ${content}`);

        // Reseta o timeout toda vez que uma nova mensagem é recebida
        resetTimeout(from, footer);

        if (!currentStep[from]) {
            currentStep[from] = 'welcome';
            client.sendMessage(from, '👋 *Bem-vindo ao nosso sistema de agendamento!* Para começar, digite:\n1. Agendar\n2. Dúvidas Frequentes\n3. Consultar Preços' + footer);
            console.log(`Enviando mensagem de boas-vindas para ${from}`);
            return;
        }

        switch (currentStep[from]) {
            case 'welcome':
                if (content === '1') {
                    currentStep[from] = 'name';
                    client.sendMessage(from, "Por favor, digite o *nome do paciente* 📝" + footer);
                } else if (content === '2') {
                    client.sendMessage(from, `📋 *Dúvidas Frequentes*\n\n*Horário de Atendimento:* 🕗\nSegunda a Sexta: 07:00 às 18:00\n\n*Preços:* 💰\nConsulta: R$ 100,00\nExames: A partir de R$ 50,00\n\n*Outros Exames Disponíveis:* ${otherExams.join(", ")} (não necessitam de agendamento)\n\nPara voltar ao início, digite '1' para agendar.` + footer);
                    console.log(`Dúvidas frequentes enviadas para ${from}`);
                } else if (content === '3') {
                    client.sendMessage(from, `💲 *Consultar Preços*\n\n*Exames de Imagem:*\n- Raio-X: R$ 50,00\n- Ultrassom: R$ 80,00\n- Tomografia: R$ 200,00\n- Ressonância Magnética: R$ 300,00\n\n*Outros Exames Disponíveis:* ${otherExams.join(", ")} (não necessitam de agendamento)\n\nPara voltar ao início, digite '1' para agendar.` + footer);
                    console.log(`Consulta de preços enviada para ${from}`);
                } else {
                    client.sendMessage(from, "Opção inválida. Caso queira tentar novamente, digite '1' para agendar, '2' para dúvidas frequentes ou '3' para consultar preços." + footer);
                    console.log(`Opção inválida recebida de ${from}`);
                }
                break;
            
            case 'name':
                if (!isValidName(content)) {
                    client.sendMessage(from, "Nome inválido. Por favor, digite um nome que contenha apenas letras e espaços." + footer);
                    console.log(`Nome inválido recebido de ${from}: ${content}`);
                    break;
                }
                patientData[from] = { name: content };
                currentStep[from] = 'exam';
                const examsList = availableExams.map((exam, index) => `${index + 1}. ${exam.name}`).join('\n');
                client.sendMessage(from, `Ótimo, agora por favor, escolha o *tipo de exame* que deseja realizar:\n${examsList}\n\nPara outros exames como ${otherExams.join(", ")} não é necessário agendamento.` + footer);
                console.log(`Nome do paciente recebido de ${from}: ${content}`);
                break;

            case 'exam':
                const selectedExamIndex = parseInt(content) - 1;
                if (selectedExamIndex >= 0 && selectedExamIndex < availableExams.length) {
                    patientData[from] = { ...patientData[from], exam: availableExams[selectedExamIndex].name };

                    if (patientData[from].exam === "Ultrassom") {
                        currentStep[from] = 'ultrasound_type';
                        client.sendMessage(from, "Por favor, informe se é um *Ultrassom de Abdômen*.\n1. Sim\n2. Não" + footer);
                    } else {
                        currentStep[from] = 'date';
                        client.sendMessage(from, "Por favor, digite a data do exame no formato dia/mês (ex: 15/08). 📅" + footer);
                    }
                    console.log(`Tipo de exame selecionado por ${from}: ${patientData[from].exam}`);
                } else {
                    client.sendMessage(from, "Opção de exame inválida. Por favor, responda com o número do exame desejado." + footer);
                    console.log(`Opção de exame inválida recebida de ${from}: ${content}`);
                }
                break;

            case 'ultrasound_type':
                if (content === '1') {
                    client.sendMessage(from, "⚠️ Atenção: Para realizar o Ultrassom do Abdômen, o paciente deve estar em jejum." + footer);
                    patientData[from] = { ...patientData[from], ultrasoundType: 'Abdômen' };
                    currentStep[from] = 'date';
                    client.sendMessage(from, "Por favor, digite a data do exame no formato dia/mês (ex: 15/08). 📅" + footer);
                    console.log(`Ultrassom de Abdômen selecionado por ${from}`);
                } else if (content === '2') {
                    patientData[from] = { ...patientData[from], ultrasoundType: 'Outro' };
                    currentStep[from] = 'date';
                    client.sendMessage(from, "Por favor, digite a data do exame no formato dia/mês (ex: 15/08). 📅" + footer);
                    console.log(`Outro tipo de Ultrassom selecionado por ${from}`);
                } else {
                    client.sendMessage(from, "Opção inválida. Por favor, responda com '1' para Sim ou '2' para Não." + footer);
                    console.log(`Opção inválida de tipo de ultrassom recebida de ${from}: ${content}`);
                }
                break;

            case 'date':
                if (!isValidDate(content)) {
                    client.sendMessage(from, "Data inválida. Por favor, digite uma data válida no formato dia/mês (ex: 15/08) que não seja uma data passada, sábado ou domingo." + footer);
                    console.log(`Data inválida recebida de ${from}: ${content}`);
                    break;
                }
                patientData[from].date = content;
                currentStep[from] = 'plan';
                
                // Ajuste aqui para remover a opção Bradesco se o exame for Tomografia das Coronárias
                const availablePlans = patientData[from].exam === "Tomografia das Coronárias" ? acceptedPlans.filter(plan => plan !== "Bradesco") : acceptedPlans;
                const plansList = availablePlans.map((plan, index) => `${index + 1}. ${plan}`).join('\n');
                
                client.sendMessage(from, `Por favor, informe se possui algum *plano de saúde*. Digite:\n${plansList}\n${availablePlans.length + 1}. Nenhum plano de saúde` + footer);
                console.log(`Data do exame recebida de ${from}: ${content}`);
                break;

            case 'plan':
                const planOptions = {
                    '1': 'CASSI',
                    '2': 'Bradesco',
                    '3': 'Unimed',
                    '4': 'IPASGO',
                    '5': 'Nenhum plano de saúde'
                };

                if (planOptions[content]) {
                    patientData[from].plan = planOptions[content];
                    currentStep[from] = 'time';

                    if (patientData[from].exam === 'Tomografia das Coronárias') {
                        const coronaryCTList = coronaryCTSlots.map((slot, index) => `${index + 1}. ${slot}`).join('\n');
                        client.sendMessage(from, `Escolha um horário disponível:\n\n${coronaryCTList}\n\nResponda com o número do horário desejado.` + footer);
                        console.log(`Lista de horários para Tomografia das Coronárias enviada para ${from}`);
                    } else if (patientData[from].exam === 'Ultrassom' && patientData[from].ultrasoundType === 'Abdômen') {
                        currentStep[from] = 'time';
                        const morningList = morningSlots.map((slot, index) => `${index + 1}. ${slot}`).join('\n');
                        client.sendMessage(from, `Escolha um horário disponível para o Ultrassom de Abdômen:\n\n${morningList}\n\nResponda com o número do horário desejado.` + footer);
                        console.log(`Lista de horários da manhã para Ultrassom de Abdômen enviada para ${from}`);
                    } else {
                        currentStep[from] = 'period';
                        client.sendMessage(from, "Por favor, escolha um período:\n1. 🌅 *Manhã*\n2. 🌇 *Tarde*" + footer);
                    }

                    console.log(`Plano de saúde informado por ${from}: ${patientData[from].plan}`);
                } else {
                    client.sendMessage(from, "Opção inválida. Por favor, responda com o número correspondente ao seu plano de saúde:\n1. CASSI\n2. Bradesco\n3. Unimed\n4. IPASGO\n5. Nenhum plano de saúde" + footer);
                    console.log(`Opção de plano de saúde inválida recebida de ${from}: ${content}`);
                }
                break;

            case 'period':
                if (content === '1') {
                    patientData[from].period = 'morning';
                    currentStep[from] = 'time';
                    const morningList = morningSlots.map((slot, index) => `${index + 1}. ${slot}`).join('\n');
                    client.sendMessage(from, `Escolha um horário disponível:\n\n${morningList}\n\nResponda com o número do horário desejado.` + footer);
                    console.log(`Lista de horários da manhã enviada para ${from}`);
                } else if (content === '2') {
                    patientData[from].period = 'afternoon';
                    currentStep[from] = 'time';
                    const afternoonList = afternoonSlots.map((slot, index) => `${index + 1}. ${slot}`).join('\n');
                    client.sendMessage(from, `Escolha um horário disponível:\n\n${afternoonList}\n\nResponda com o número do horário desejado.` + footer);
                    console.log(`Lista de horários da tarde enviada para ${from}`);
                } else {
                    client.sendMessage(from, "Período inválido. Por favor, responda com '1' para 🌅 *Manhã* ou '2' para 🌇 *Tarde*." + footer);
                    console.log(`Resposta de período inválida de ${from}: ${content}`);
                }
                break;

            case 'time':
                const selectedTimeIndex = parseInt(content) - 1;

                if (patientData[from].exam === 'Tomografia das Coronárias') {
                    if (selectedTimeIndex >= 0 && selectedTimeIndex < coronaryCTSlots.length) {
                        patientData[from].time = coronaryCTSlots[selectedTimeIndex];
                    } else {
                        client.sendMessage(from, "Horário inválido. Por favor, responda com o número do horário desejado." + footer);
                        console.log(`Horário inválido recebido de ${from}: ${content}`);
                        break;
                    }
                } else if (patientData[from].exam === 'Ultrassom' && patientData[from].ultrasoundType === 'Abdômen') {
                    if (selectedTimeIndex >= 0 && selectedTimeIndex < morningSlots.length) {
                        patientData[from].time = morningSlots[selectedTimeIndex];
                    } else {
                        client.sendMessage(from, "Horário inválido. Por favor, responda com o número do horário desejado." + footer);
                        console.log(`Horário inválido recebido de ${from}: ${content}`);
                        break;
                    }
                } else {
                    if (patientData[from].period === 'morning' && selectedTimeIndex >= 0 && selectedTimeIndex < morningSlots.length) {
                        patientData[from].time = morningSlots[selectedTimeIndex];
                    } else if (patientData[from].period === 'afternoon' && selectedTimeIndex >= 0 && selectedTimeIndex < afternoonSlots.length) {
                        patientData[from].time = afternoonSlots[selectedTimeIndex];
                    } else {
                        client.sendMessage(from, "Horário inválido. Por favor, responda com o número do horário desejado." + footer);
                        console.log(`Horário inválido recebido de ${from}: ${content}`);
                        break;
                    }
                }

                currentStep[from] = 'confirmation';

                const confirmationMessage = `Confirme as informações:\n\n*Nome:* ${patientData[from].name}\n*Exame:* ${patientData[from].exam}\n*Data:* ${patientData[from].date}\n*Horário:* ${patientData[from].time}\n*Plano de Saúde:* ${patientData[from].plan}\n\nDigite *'confirmar'* para confirmar ou *'cancelar'* para cancelar.` + footer;

                client.sendMessage(from, confirmationMessage);
                console.log(`Informações de agendamento enviadas para confirmação de ${from}`);
                break;

            case 'confirmation':
                if (content === 'confirmar') {
                    const eventTitle = encodeURIComponent(`Agendamento de ${patientData[from].exam}`);
                    const eventDetails = encodeURIComponent(`Paciente: ${patientData[from].name}`);
                    const eventLocation = encodeURIComponent("Clínica de Saúde");
                    const [day, month] = patientData[from].date.split('/');
                    const year = new Date().getFullYear();
                    const eventDate = new Date(year, month - 1, day);
                    const startTime = patientData[from].time.replace(':', '');
                    const endTime = (parseInt(patientData[from].time.replace(':', '')) + 100).toString().padStart(4, '0');
                    const startDateTime = `${year}${month}${day}T${startTime}00Z`;
                    const endDateTime = `${year}${month}${day}T${endTime}00Z`;
                    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&details=${eventDetails}&location=${eventLocation}&dates=${startDateTime}/${endDateTime}`;
                    
                    client.sendMessage(from, "✅ *Agendamento confirmado!* Obrigado." + footer);
                    client.sendMessage(from, `Deseja adicionar o compromisso à sua agenda do Google? Clique no link abaixo:\n${googleCalendarUrl}`);
                    
                    console.log(`Agendamento confirmado por ${from}`);
                    delete currentStep[from];
                    delete patientData[from];
                    clearTimeout(timeoutHandles[from]);
                    delete timeoutHandles[from];
                } else if (content === 'cancelar') {
                    client.sendMessage(from, "Agendamento cancelado. Caso queira tentar novamente, digite '1' para agendar." + footer);
                    console.log(`Agendamento cancelado por ${from}`);
                    delete currentStep[from];
                    delete patientData[from];
                    clearTimeout(timeoutHandles[from]);
                    delete timeoutHandles[from];
                } else {
                    client.sendMessage(from, "Resposta inválida. Digite *'confirmar'* para confirmar ou *'cancelar'* para cancelar." + footer);
                    console.log(`Resposta inválida de ${from}: ${content}`);
                }
                break;

            default:
                client.sendMessage(from, "Erro no processo de agendamento. Por favor, tente novamente." + footer);
                console.error(`Erro no estado ${currentStep[from]} de ${from}`);
                delete currentStep[from];
                delete patientData[from];
                clearTimeout(timeoutHandles[from]);
                delete timeoutHandles[from];
                break;
        }
    } catch (error) {
        console.error(`Erro ao processar mensagem de ${message.from}: ${error.message}`);
    }
});

client.initialize();
