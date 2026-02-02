export const questions = [
    // ==========================================================
    // 1. LÍNGUA PORTUGUESA (Gramática e Interpretação)
    // ==========================================================
    {
        id: 1001,
        subject: "Português",
        text: "(Crase) Assinale a opção em que o acento grave é OBRIGATÓRIO:",
        options: ["Fui a Roma antiga.", "Fui a Curitiba.", "Fui a casa de meus pais.", "Fui a uma festa.", "Entreguei a ela."],
        correct: 0,
        explanation: "Regra do Topônimo Especificado: 'Fui à Roma ANTIGA'. Se o lugar vem qualificado (Antiga), crase obrigatória."
    },
    {
        id: 1002,
        subject: "Português",
        text: "(Concordância) Qual frase respeita a norma-culta?",
        options: ["Fazem dias que não chove.", "Houveram problemas.", "Deve haver soluções.", "Aluga-se casas.", "Seguem anexo as fotos."],
        correct: 2,
        explanation: "Correto: 'Deve haver' (Haver = existir é impessoal). Erros: 'Faz dias' (tempo), 'Houve problemas', 'Alugam-se casas'."
    },
    {
        id: 1003,
        subject: "Português",
        text: "(Colocação Pronominal) Assinale a próclise correta:",
        options: ["Me disseram a verdade.", "Não engane-me.", "Não me engane.", "Aquilo feriu-me.", "Espero que ajudem-nos."],
        correct: 2,
        explanation: "Palavras negativas (Não, nunca, jamais) ATRAEM o pronome para antes do verbo (Próclise obrigatória)."
    },

    // ==========================================================
    // 2. LÍNGUA INGLESA (Vocabulário Bancário)
    // ==========================================================
    {
        id: 2001,
        subject: "Inglês",
        text: "(Vocabulário) No contexto bancário, o termo 'Spread' refere-se a:",
        options: ["A taxa de lucro do banco (diferença entre o que paga e o que cobra).", "Uma planilha eletrônica.", "Um tipo de investimento de risco.", "A blindagem de patrimônio.", "O cancelamento de uma conta."],
        correct: 0,
        explanation: "Spread bancário é a diferença entre a taxa de juros que o banco paga ao investidor e a taxa que cobra no empréstimo."
    },
    {
        id: 2002,
        subject: "Inglês",
        text: "(Interpretação) 'The Board of Directors decided to hedge the company's assets.' O termo 'Hedge' significa:",
        options: ["Vender tudo.", "Proteger/Cobrir riscos.", "Demitir funcionários.", "Expandir filiais.", "Sonegar impostos."],
        correct: 1,
        explanation: "Hedge é uma operação de proteção financeira contra riscos de oscilação de preços (ex: proteção contra alta do dólar)."
    },

    // ==========================================================
    // 3. MATEMÁTICA BÁSICA E FINANCEIRA
    // ==========================================================
    {
        id: 3001,
        subject: "Matemática Financeira",
        text: "(Sistema Price) No financiamento pela Tabela Price, a característica principal é:",
        options: ["Prestações decrescentes.", "Amortização constante.", "Prestações (PMT) constantes e iguais.", "Juros simples.", "Pagamento único final."],
        correct: 2,
        explanation: "PRICE = Parcelas Iguais. A amortização aumenta levemente, os juros caem, mas o valor pago é fixo."
    },
    {
        id: 3002,
        subject: "Matemática Financeira",
        text: "(Taxas) Uma taxa nominal de 12% ao ano com capitalização MENSAL resulta em uma taxa efetiva:",
        options: ["Igual a 12%.", "Menor que 12%.", "Maior que 12%.", "Igual a 1% a.m.", "Nula."],
        correct: 2,
        explanation: "Juros compostos mensalmente geram 'juros sobre juros', fazendo a taxa efetiva anual ser maior que a soma simples (nominal)."
    },
    {
        id: 3003,
        subject: "Matemática",
        text: "(Probabilidade) Em uma urna há 3 bolas vermelhas e 7 azuis. Retirando-se uma bola ao acaso, qual a chance de ser vermelha?",
        options: ["10%", "30%", "50%", "70%", "33%"],
        correct: 1,
        explanation: "Casos Favoráveis (3) / Total (10) = 3/10 = 0,3 ou 30%."
    },
    {
        id: 3004,
        subject: "Matemática",
        text: "(Análise Combinatória) De quantas formas diferentes 4 pessoas podem se sentar em um banco de 4 lugares?",
        options: ["4", "12", "16", "24", "10"],
        correct: 3,
        explanation: "Permutação de 4 (P4) = 4! = 4 x 3 x 2 x 1 = 24 formas."
    },

    // ==========================================================
    // 4. CONHECIMENTOS BANCÁRIOS (O Coração do Edital)
    // ==========================================================
    {
        id: 4001,
        subject: "Conhecimentos Bancários",
        text: "(SFN) Quem é o órgão NORMATIVO máximo do Sistema Financeiro Nacional?",
        options: ["Banco Central (Bacen)", "Banco do Brasil", "Conselho Monetário Nacional (CMN)", "CVM", "Febraban"],
        correct: 2,
        explanation: "O CMN MANDA (Normatiza/Define metas). O Bacen EXECUTA e FISCALIZA."
    },
    {
        id: 4002,
        subject: "Conhecimentos Bancários",
        text: "(Mercado de Capitais) As ações são títulos de renda variável que representam:",
        options: ["Um empréstimo ao governo.", "Uma fração do capital social de uma empresa.", "Uma dívida da empresa.", "Um seguro de vida.", "Uma moeda digital."],
        correct: 1,
        explanation: "Ação é a menor parcela do capital de uma empresa S.A. Quem compra vira sócio (acionista)."
    },
    {
        id: 4003,
        subject: "Conhecimentos Bancários",
        text: "(Produtos) Qual a principal diferença entre PGBL e VGBL na Previdência Privada?",
        options: ["O risco.", "A rentabilidade.", "O tratamento fiscal (Imposto de Renda).", "A liquidez.", "O banco emissor."],
        correct: 2,
        explanation: "PGBL permite deduzir até 12% no IR (ideal p/ declaração completa). VGBL não deduz, mas o IR incide só sobre o lucro (ideal p/ simplificada)."
    },
    {
        id: 4004,
        subject: "Conhecimentos Bancários",
        text: "(Lavagem de Dinheiro) A pena para quem pratica lavagem de dinheiro pode ser reduzida em até 2/3 se o criminoso colaborar (Delação Premiada). Essa afirmação é:",
        options: ["Verdadeira.", "Falsa, a pena nunca muda.", "Falsa, a redução é de apenas 10%.", "Verdadeira, mas apenas para o líder.", "Falsa, o crime é inafiançável."],
        correct: 0,
        explanation: "A Lei 9.613/98 prevê a redução de pena de 1 a 2/3 para quem colaborar voluntariamente com a investigação."
    },

    // ==========================================================
    // 5. ATUALIDADES DO MERCADO (ESG, Open Finance, Inovação)
    // ==========================================================
    {
        id: 5001,
        subject: "Atualidades do Mercado Financeiro",
        text: "(ESG) O conceito de 'Green Bonds' (Títulos Verdes) refere-se a:",
        options: ["Dólares falsos.", "Títulos de dívida para financiar projetos com benefício ambiental.", "Ações de empresas de petróleo.", "Criptomoedas sustentáveis.", "Impostos ecológicos."],
        correct: 1,
        explanation: "Green Bonds são títulos de renda fixa captados especificamente para financiar projetos sustentáveis (energia eólica, reflorestamento, etc)."
    },
    {
        id: 5002,
        subject: "Atualidades do Mercado Financeiro",
        text: "(Open Finance) No Open Finance, quem é o dono dos dados bancários?",
        options: ["O Banco Central.", "O Banco onde a conta reside.", "O Cliente.", "O Governo.", "As Fintechs."],
        correct: 2,
        explanation: "O Cliente é o titular. Ele deve consentir expressamente para que seus dados sejam compartilhados."
    },
    {
        id: 5003,
        subject: "Atualidades do Mercado Financeiro",
        text: "(Shadow Banking) O termo 'Shadow Banking' refere-se a:",
        options: ["Bancos digitais legais.", "Sistema bancário sombra (entidades que fazem intermediação financeira fora da regulação tradicional).", "Agências bancárias noturnas.", "Caixas eletrônicos em locais escuros.", "Dark Web."],
        correct: 1,
        explanation: "Shadow Banking são instituições que atuam como bancos (emprestam dinheiro), mas sem a regulação e segurança do Banco Central."
    },

    // ==========================================================
    // 6. INFORMÁTICA (Segurança e Produtividade)
    // ==========================================================
    {
        id: 6001,
        subject: "Informática",
        text: "(Segurança) Qual a diferença entre Vírus e Worm?",
        options: ["Vírus precisa de hospedeiro; Worm se propaga sozinho pela rede.", "Worm é inofensivo.", "Vírus só ataca celular.", "São a mesma coisa.", "Worm precisa de clique."],
        correct: 0,
        explanation: "Vírus infecta arquivos. Worm (Verme) explora falhas da rede e se replica automaticamente."
    },
    {
        id: 6002,
        subject: "Informática",
        text: "(Redes) Rede interna de uma empresa, com tecnologia web, acessível apenas a funcionários:",
        options: ["Internet", "Extranet", "Intranet", "Ethernet", "Wi-Fi"],
        correct: 2,
        explanation: "Intranet = Interna. Extranet = Externa (parceiros). Internet = Pública."
    },
    {
        id: 6003,
        subject: "Informática",
        text: "(Golpes) O ataque onde o criminoso liga fingindo ser do banco para obter a senha é:",
        options: ["DDoS", "Engenharia Social (Vishing)", "Ransomware", "Trojan", "Keylogger"],
        correct: 1,
        explanation: "Engenharia Social. Quando feita por voz (telefone), chama-se Vishing (Voice Phishing)."
    },

    // ==========================================================
    // 7. VENDAS E NEGOCIAÇÃO (Ética e Legislação Específica)
    // ==========================================================
    {
        id: 7001,
        subject: "Vendas e Negociação",
        text: "(Vendas) Vender um cartão de crédito obrigando o cliente a levar um seguro junto é:",
        options: ["Cross-selling", "Up-selling", "Venda Casada (Proibida)", "Marketing Direto", "Fidelização"],
        correct: 2,
        explanation: "Venda Casada é crime contra a ordem econômica e prática abusiva pelo CDC."
    },
    {
        id: 7002,
        subject: "Vendas e Negociação",
        text: "(LGPD) Qual a base legal para usar dados de clientes para marketing?",
        options: ["Interesse público.", "Consentimento.", "Obrigação legal.", "Tutela da vida.", "Proteção de crédito."],
        correct: 1,
        explanation: "Para marketing, é necessário o CONSENTIMENTO explícito e inequívoco do titular."
    },
    {
        id: 7003,
        subject: "Vendas e Negociação",
        text: "(Lei do Superendividamento) A Lei 14.181/21 proíbe as instituições financeiras de:",
        options: ["Cobrar juros.", "Negativar o nome.", "Fazer assédio ou pressão para seduzir o consumidor (especialmente idosos).", "Ofertar crédito.", "Penhorar bens."],
        correct: 2,
        explanation: "A lei proíbe o assédio ou pressão ao consumidor, especialmente idosos, analfabetos ou vulneráveis, na oferta de crédito."
    },
    {
        id: 7004,
        subject: "Vendas e Negociação",
        text: "(Estatuto PcD) No atendimento a pessoas com deficiência, a prioridade é:",
        options: ["Opcional.", "Apenas para idosos.", "Obrigatória e imediata.", "Apenas se houver reclamação.", "Depende do gerente."],
        correct: 2,
        explanation: "O atendimento prioritário para PcD é obrigatório, imediato e diferenciado (Lei 13.146/2015)."
    }
];
