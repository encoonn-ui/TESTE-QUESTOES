export const questions = [
    // ==========================================================
    // 1. VENDAS E NEGOCIAÇÃO (Peso 1.5 - O foco principal)
    // ==========================================================
    {
        id: 101,
        subject: "Vendas e Negociação",
        text: "(Técnica de Vendas) Um cliente contrata um Financiamento Imobiliário. O gerente aproveita e oferece um Seguro Residencial para proteger o bem. Essa oferta de produto complementar chama-se:",
        options: ["Up-selling", "Cross-selling (Venda Cruzada)", "Churn", "B2B", "Spin Selling"],
        correct: 1,
        explanation: "CROSS-SELLING (Venda Cruzada) é vender um produto que complementa a compra original. UP-SELLING seria vender uma versão mais cara do mesmo produto."
    },
    {
        id: 102,
        subject: "Vendas e Negociação",
        text: "(CDC) O gerente informa que para liberar o empréstimo, o cliente é OBRIGADO a contratar um seguro de vida. Essa prática é:",
        options: ["Permitida para clientes novos.", "Venda Casada (Prática Abusiva e Proibida).", "Estratégia comercial válida.", "Permitida se o juro for baixo.", "Obrigatória pelo Banco Central."],
        correct: 1,
        explanation: "Venda Casada (condicionar um produto a outro) é crime contra as relações de consumo e proibida pelo Código de Defesa do Consumidor."
    },
    {
        id: 103,
        subject: "Vendas e Negociação",
        text: "(Gatilhos Mentais) Ao dizer 'Temos apenas as últimas 2 cotas desse fundo com essa rentabilidade', o gerente ativa o gatilho da:",
        options: ["Prova Social", "Reciprocidade", "Escassez", "Autoridade", "Afeição"],
        correct: 2,
        explanation: "O gatilho da ESCASSEZ cria senso de urgência ao limitar a quantidade ou o tempo da oferta."
    },
    {
        id: 104,
        subject: "Vendas e Negociação",
        text: "(Lei do Superendividamento) A Lei 14.181/21 proíbe as instituições financeiras de:",
        options: ["Cobrar juros compostos.", "Negativar o nome do cliente.", "Fazer assédio ou pressão para seduzir o consumidor (especialmente idosos/vulneráveis).", "Ofertar crédito consignado.", "Penhorar bens de luxo."],
        correct: 2,
        explanation: "A lei proíbe expressamente o assédio ou pressão ao consumidor, proibindo ofertas do tipo 'sem consulta ao SPC' que ocultem os riscos."
    },

    // ==========================================================
    // 2. INFORMÁTICA (Peso 1.5 - Onde a maioria reprova)
    // ==========================================================
    {
        id: 201,
        subject: "Informática",
        text: "(Segurança) O ataque onde o criminoso liga para o cliente fingindo ser do banco para obter a senha ou token chama-se:",
        options: ["DDoS", "Engenharia Social (Vishing)", "Ransomware", "Trojan", "Keylogger"],
        correct: 1,
        explanation: "Engenharia Social é a manipulação psicológica. Quando feita por voz (telefone), o termo técnico é Vishing (Voice Phishing)."
    },
    {
        id: 202,
        subject: "Informática",
        text: "(Windows 10) Qual atalho de teclado bloqueia a estação de trabalho imediatamente (Tela de Login)?",
        options: ["Ctrl + L", "Alt + F4", "Windows + L", "Ctrl + Alt + Del", "Shift + F3"],
        correct: 2,
        explanation: "Tecla Windows + L (Lock) serve para bloquear o computador instantaneamente ao sair da mesa."
    },
    {
        id: 203,
        subject: "Informática",
        text: "(Excel) A função =SE(A1>1000; 'Alto'; 'Baixo') retorna o que se A1 for 500?",
        options: ["Alto", "Baixo", "Erro", "500", "Falso"],
        correct: 1,
        explanation: "500 não é maior que 1000. A condição é FALSA, então a função retorna o segundo valor: 'Baixo'."
    },
    {
        id: 204,
        subject: "Informática",
        text: "(Redes) Rede privada de uma empresa, com tecnologia web, acessível apenas a funcionários, chama-se:",
        options: ["Internet", "Extranet", "Intranet", "Ethernet", "Wi-Fi"],
        correct: 2,
        explanation: "INTRANET = Rede Interna. EXTRANET = Acesso externo controlado (parceiros). INTERNET = Pública."
    },

    // ==========================================================
    // 3. CONHECIMENTOS BANCÁRIOS (O Coração do Banco)
    // ==========================================================
    {
        id: 301,
        subject: "Conhecimentos Bancários",
        text: "(SFN) Quem é o órgão NORMATIVO máximo do Sistema Financeiro Nacional (quem manda/define metas)?",
        options: ["Banco Central (Bacen)", "Banco do Brasil", "Conselho Monetário Nacional (CMN)", "CVM", "Febraban"],
        correct: 2,
        explanation: "O CMN define as regras e metas (Normativo). O Bacen executa e fiscaliza (Supervisor)."
    },
    {
        id: 302,
        subject: "Conhecimentos Bancários",
        text: "(Open Finance) No Sistema Financeiro Aberto, a quem pertencem os dados bancários?",
        options: ["Ao Banco Central.", "À instituição onde a conta foi aberta.", "Ao Cliente (Titular).", "Ao Governo.", "Às Fintechs."],
        correct: 2,
        explanation: "O Cliente é o dono dos dados. Ele decide se quer compartilhar seu histórico para conseguir taxas melhores em outros bancos."
    },
    {
        id: 303,
        subject: "Conhecimentos Bancários",
        text: "(Lavagem de Dinheiro) A fase onde o dinheiro sujo volta para a economia com aparência legal (ex: compra de imóveis) é a:",
        options: ["Colocação", "Ocultação", "Integração", "Evasão", "Distribuição"],
        correct: 2,
        explanation: "INTEGRAÇÃO é a etapa final, onde o capital é incorporado formalmente ao sistema econômico."
    },

    // ==========================================================
    // 4. MATEMÁTICA FINANCEIRA (Sem medo de calcular)
    // ==========================================================
    {
        id: 401,
        subject: "Matemática Financeira",
        text: "(Sistema Price) No financiamento de veículos pela Tabela Price, a principal característica é:",
        options: ["Prestações decrescentes.", "Amortização constante.", "Prestações (PMT) constantes e iguais.", "Juros simples.", "Pagamento final único."],
        correct: 2,
        explanation: "PRICE = Parcelas Iguais. O valor que sai do bolso é fixo do início ao fim."
    },
    {
        id: 402,
        subject: "Matemática Financeira",
        text: "(SAC) Já no Sistema de Amortização Constante (SAC), usado em imóveis:",
        options: ["As prestações são fixas.", "A amortização é constante e a prestação diminui com o tempo.", "Os juros aumentam.", "O saldo devedor cresce.", "Não há juros."],
        correct: 1,
        explanation: "No SAC, você abate o mesmo valor da dívida todo mês (Amortização Constante). Como os juros caem, a prestação fica menor a cada mês."
    },
    {
        id: 403,
        subject: "Matemática Financeira",
        text: "(Juros) Uma taxa nominal de 12% ao ano com capitalização MENSAL resulta em uma taxa efetiva anual:",
        options: ["Igual a 12%.", "Menor que 12%.", "Maior que 12%.", "Igual a 1% a.m.", "Nula."],
        correct: 2,
        explanation: "Nos Juros Compostos, a capitalização mensal gera 'juros sobre juros', fazendo a taxa efetiva ser maior que a simples soma das taxas mensais."
    },

    // ==========================================================
    // 5. LÍNGUA PORTUGUESA (Gramática e Crase)
    // ==========================================================
    {
        id: 501,
        subject: "Português",
        text: "(Crase) Assinale a opção em que o uso da crase é OBRIGATÓRIO:",
        options: ["Fui a Bahia nas férias.", "Fui a Curitiba a trabalho.", "Fui a Roma antiga dos Césares.", "Fui a casa de meus pais.", "Entreguei a ela."],
        correct: 2,
        explanation: "Regra do Topônimo Especificado: 'Fui à Roma ANTIGA'. Se o lugar vem qualificado, usa-se crase. 'Fui a Roma' (sozinho) não tem."
    },
    {
        id: 502,
        subject: "Português",
        text: "(Concordância) Qual frase está correta segundo a norma-culta?",
        options: ["Fazem dois anos que estudo.", "Houveram muitos erros.", "Deve haver soluções para o caso.", "Aluga-se apartamentos.", "Meio-dia e meio."],
        correct: 2,
        explanation: "'Deve haver' (Haver = existir é impessoal, fica no singular). Erros: 'Faz dois anos', 'Houve erros', 'Alugam-se apartamentos', 'Meio-dia e meia'."
    },

    // ==========================================================
    // 6. INGLÊS E MATEMÁTICA BÁSICA (Diferencial)
    // ==========================================================
    {
        id: 601,
        subject: "Inglês",
        text: "(Vocabulário) No mercado financeiro, o termo 'Spread' refere-se a:",
        options: ["A taxa de lucro do banco (diferença entre o que paga e o que cobra).", "Uma planilha do Excel.", "Um tipo de investimento.", "O risco de calote.", "Um software de gestão."],
        correct: 0,
        explanation: "Spread bancário é a diferença entre a taxa que o banco paga ao investidor (captação) e a taxa que cobra no empréstimo."
    },
    {
        id: 602,
        subject: "Matemática",
        text: "(Probabilidade) Em uma urna há 3 bolas vermelhas e 7 azuis. Retirando-se uma ao acaso, qual a chance de ser vermelha?",
        options: ["10%", "30%", "50%", "70%", "33%"],
        correct: 1,
        explanation: "Casos Favoráveis (3) dividido pelo Total (10) = 3/10 = 0,30 ou 30%."
    },

    // ==========================================================
    // 7. ATUALIDADES DO MERCADO (ESG e Inovação)
    // ==========================================================
    {
        id: 701,
        subject: "Atualidades do Mercado Financeiro",
        text: "(ESG) O conceito de 'Green Bonds' (Títulos Verdes) refere-se a:",
        options: ["Dólares falsificados.", "Títulos de dívida emitidos para financiar projetos com benefício ambiental.", "Ações de petroleiras.", "Criptomoedas.", "Impostos ambientais."],
        correct: 1,
        explanation: "Green Bonds são títulos de renda fixa usados exclusivamente para captar recursos para projetos sustentáveis (energia limpa, reflorestamento)."
    },
    {
        id: 702,
        subject: "Atualidades do Mercado Financeiro",
        text: "(Pix) Uma das características principais do Pix que o diferencia de TED/DOC é:",
        options: ["Funciona apenas em dias úteis.", "Demora 1 hora para compensar.", "Disponibilidade 24/7 e liquidação em tempo real (segundos).", "Custo alto para Pessoa Física.", "Exige cartão de crédito."],
        correct: 2,
        explanation: "O Pix funciona 24 horas por dia, 7 dias por semana, inclusive feriados, e o dinheiro cai na hora."
    }
];
