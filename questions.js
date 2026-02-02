export const questions = [
    // --- CONHECIMENTOS BANCÁRIOS & ATUALIDADES (Foco: Tópicos Menos Óbvios) ---
    {
        id: 1,
        subject: "Atualidades do Mercado Financeiro",
        text: "O edital menciona explicitamente o termo 'Shadow Banking'. O que esse conceito representa no sistema financeiro?",
        options: [
            "Um sistema de empréstimo exclusivo para negativados feito por bancos públicos.",
            "A prática ilegal de agiotagem realizada por pessoas físicas.",
            "A atuação de instituições não bancárias que concedem crédito e intermediação financeira fora da regulação bancária tradicional.",
            "O sistema de segurança obscuro utilizado para criptografar o PIX.",
            "Uma modalidade de investimento em ações de empresas falidas."
        ],
        correct: 2,
        explanation: "Shadow Banking refere-se a entidades que realizam intermediação de crédito (como fundos de hedge ou securitizadoras) sem serem bancos comerciais tradicionais, atuando à margem da regulação bancária padrão."
    },
    {
        id: 2,
        subject: "Conhecimentos Bancários",
        text: "Sobre a Prevenção à Lavagem de Dinheiro (Lei nº 9.613/98), qual é a penalidade administrativa prevista para a instituição que deixa de comunicar operações suspeitas ao COAF?",
        options: [
            "Prisão preventiva do gerente da agência.",
            "Multa pecuniária variável, podendo chegar a R$ 20 milhões.",
            "Apenas uma advertência verbal.",
            "Fechamento automático da agência bancária.",
            "Suspensão do PIX para todos os clientes daquela agência."
        ],
        correct: 1,
        explanation: "As penalidades administrativas incluem advertência, inabilitação temporária e multa pecuniária, que não pode exceder R$ 20 milhões."
    },

    // --- INFORMÁTICA (Foco: Segurança e LGPD) ---
    {
        id: 3,
        subject: "Informática",
        text: "No contexto da LGPD (Lei Geral de Proteção de Dados), mencionada no edital, qual é a figura responsável por tomar as decisões sobre como os dados pessoais serão tratados?",
        options: [
            "O Operador",
            "O Encarregado (DPO)",
            "O Controlador",
            "A ANPD",
            "O Titular"
        ],
        correct: 2,
        explanation: "O Controlador é a pessoa (física ou jurídica) a quem competem as decisões referentes ao tratamento de dados. O Operador apenas realiza o tratamento em nome do Controlador."
    },
    {
        id: 4,
        subject: "Informática",
        text: "O edital cita 'Armazenamento em nuvem'. Qual característica define o modelo de nuvem 'Híbrida'?",
        options: [
            "O uso exclusivo de servidores locais sem conexão à internet.",
            "Uma combinação de infraestrutura local (nuvem privada) com serviços de nuvem pública, permitindo trânsito de dados entre elas.",
            "O uso de nuvem apenas para backup, nunca para processamento.",
            "Um sistema que funciona apenas em dias de chuva.",
            "O compartilhamento de servidores com empresas concorrentes obrigatoriamente."
        ],
        correct: 1,
        explanation: "Nuvem Híbrida é a composição de duas ou mais infraestruturas (privada e pública) que permanecem entidades únicas, mas são unidas por tecnologia padronizada."
    },

    // --- VENDAS E NEGOCIAÇÃO (Foco: Métricas e Conceitos Técnicos) ---
    {
        id: 5,
        subject: "Vendas e Negociação",
        text: "Dentro de Marketing de Relacionamento e CRM, o conceito de 'Churn Rate' refere-se a:",
        options: [
            "O custo para adquirir um novo cliente.",
            "O lucro médio gerado por cliente ao longo da vida.",
            "A taxa de cancelamento ou evasão de clientes em um determinado período.",
            "A taxa de conversão de visitantes em compradores.",
            "O índice de satisfação dos funcionários do banco."
        ],
        correct: 2,
        explanation: "Churn Rate é a métrica que indica a rotatividade ou perda de clientes. Essencial para estratégias de fidelização citadas no edital."
    },
    {
        id: 6,
        subject: "Vendas e Negociação",
        text: "O edital cobra 'Ética e Conduta Profissional'. O que caracteriza uma venda 'casada', prática vedada pelo Código de Defesa do Consumidor?",
        options: [
            "Vender um seguro de vida para um cliente que pediu um seguro de vida.",
            "Oferecer um desconto se o cliente levar dois produtos iguais.",
            "Condicionar o fornecimento de produto ou serviço ao fornecimento de outro produto ou serviço, sem justa causa.",
            "Vender produtos bancários para casais recém-casados.",
            "Oferecer café e água durante o atendimento."
        ],
        correct: 2,
        explanation: "Venda casada (condicionar um produto a outro, ex: 'só libero o empréstimo se fizer o seguro') é prática abusiva e proibida."
    },

    // --- MATEMÁTICA FINANCEIRA (Foco: SAC vs Price e Descontos) ---
    {
        id: 7,
        subject: "Matemática Financeira",
        text: "O edital exige conhecimento sobre Sistemas de Amortização (SAC e Price). Qual a principal característica do SAC (Sistema de Amortização Constante)?",
        options: [
            "As prestações são todas iguais (constantes) do início ao fim.",
            "Os juros aumentam a cada parcela.",
            "A amortização (o quanto se abate da dívida) é constante, o que faz com que as prestações sejam decrescentes.",
            "O saldo devedor nunca diminui.",
            "É o sistema menos utilizado em financiamentos imobiliários no Brasil."
        ],
        correct: 2,
        explanation: "No SAC, a parcela de amortização é fixa. Como os juros incidem sobre o saldo devedor (que diminui), o valor total da prestação cai ao longo do tempo."
    },
    {
        id: 8,
        subject: "Matemática Financeira",
        text: "Sobre 'Desconto Racional' e 'Desconto Comercial' (citados no edital), qual a diferença fundamental?",
        options: [
            "Não há diferença, são sinônimos.",
            "O Comercial é calculado sobre o valor nominal (futuro) do título, enquanto o Racional é calculado sobre o valor atual (presente).",
            "O Racional é usado apenas em lojas, e o Comercial em bancos.",
            "O Comercial é sempre menor que o Racional.",
            "O Racional usa juros compostos e o Comercial juros simples obrigatoriamente."
        ],
        correct: 1,
        explanation: "Essa é uma 'pegadinha' clássica. O Desconto Comercial (bancário) incide sobre o valor da face (futuro). O Racional (por dentro) incide sobre o valor real/atual."
    }
];
