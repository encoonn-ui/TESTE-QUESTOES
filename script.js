// Configuração de Pesos Pareto (Baseado no número de questões da prova real)
const paretoWeights = {
    "Vendas e Negociação": 15,
    "Informática": 15,
    "Conhecimentos Bancários": 10,
    "Matemática Financeira": 5,
    "Atualidades do Mercado Financeiro": 5,
    "Língua Portuguesa": 10
};

function loadRandomQuestion() {
    const available = questions.filter(q => !answeredIds.includes(q.id));
    
    if (available.length === 0) {
        document.getElementById('question-text').innerText = "Missão Cumprida! Você dominou o Edital.";
        return;
    }

    // ALGORITMO DE PARETO: 
    // Em vez de sorteio simples, damos "bilhetes extras" para matérias de maior peso
    let weightedPool = [];
    available.forEach(q => {
        const weight = paretoWeights[q.subject] || 1;
        for (let i = 0; i < weight; i++) {
            weightedPool.push(q);
        }
    });

    const q = weightedPool[Math.floor(Math.random() * weightedPool.length)];
    renderQuestion(q);
}
