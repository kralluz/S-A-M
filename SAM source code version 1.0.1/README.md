# S.A.M. (Sistema de Agendamento Médico)

S.A.M. é um bot desenvolvido para facilitar o agendamento de consultas e exames médicos via WhatsApp. Com uma interface amigável e interativa, S.A.M. visa simplificar o processo de marcação de horários para pacientes de todas as idades.

## Funcionalidades

- **Agendamento de Exames**: Permite o agendamento de exames específicos como Tomografia das Coronárias e Ultrassom.
- **Consulta de Preços**: Informa os preços dos exames disponíveis.
- **Dúvidas Frequentes**: Responde a perguntas comuns sobre o funcionamento do sistema e horários de atendimento.
- **Compatibilidade com Planos de Saúde**: Verifica se o paciente possui um plano de saúde aceito pelo hospital (CASSI, Bradesco, Unimed, IPASGO).

## Como Usar

### Instruções para Pacientes

1. **Início**: Envie uma mensagem para o número do WhatsApp do hospital com a palavra "agendar".
2. **Nome do Paciente**: Forneça o nome completo do paciente.
3. **Tipo de Exame**: Escolha o tipo de exame a ser realizado:
   - 1. Tomografia das Coronárias
   - 2. Ultrassom
4. **Data do Exame**: Digite a data desejada no formato dia/mês/ano (ex: 15/08/2023).
5. **Plano de Saúde**: Informe se possui algum plano de saúde aceito pelo hospital:
   - 1. CASSI
   - 2. Bradesco
   - 3. Unimed
   - 4. IPASGO
   - 5. Nenhum plano de saúde
6. **Horário do Exame**: Escolha um horário disponível conforme indicado pelo sistema.
7. **Confirmação**: Confirme as informações para finalizar o agendamento.

### Instruções para Desenvolvedores

#### Clonando o Repositório

```bash
git clone https://github.com/<seu-usuario>/S.A.M..git
cd S.A.M.
npm install
node main.js


