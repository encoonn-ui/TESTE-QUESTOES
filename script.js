import { questions } from './questions.js';

// --- ESTADO DO USUÁRIO ---
let xp = parseInt(localStorage.getItem('userXP')) || 0;
let streak = parseInt(localStorage.getItem('userStreak')) || 0; // Adicionado Streak
let answeredIds = JSON.parse(localStorage.getItem('answeredIds')) || [];
let history = [];

// --- CONFIGURAÇÃO PARETO (PESOS DO EDITAL BB) ---
const paretoWeights = { 
    "Vendas e Negociação": 15, 
    "Informática": 15, 
    "Conhecimentos Bancários": 10,
    "Matemática Financeira": 5,
    "Atualidades do Mercado Financeiro": 5
};

// LISTA DE TEMAS IMPREVISÍVEIS
const temasRedacao = [
    "O impacto do envelhecimento da população brasileira na economia e no mercado de trabalho.",
    "Caminhos para combater a persistência da violência contra a mulher na sociedade brasileira.",
    "O papel da educação financeira como ferramenta de transformação social no Brasil.",
    "A influência das notícias falsas (fake news) no exercício da democracia contemporânea.",
    "Desafios para a valorização de comunidades e povos tradicionais no território brasileiro.",
    "A ética no uso da inteligência artificial: entre o progresso e a invasão de privacidade.",
    "O estigma associado às doenças mentais na sociedade brasileira contemporânea.",
    "Impactos da cultura do cancelamento nas relações humanas e na liberdade de expressão.",
    "O desafio de garantir o acesso à água potável frente às mudanças climáticas.",
    "A importância da preservação da memória histórica para a construção da identidade nacional."
];

function init() {
    updateStats();
    loadRandomQuestion();
    sortearTema(); 
}

// SORTEADOR DE TEMAS
window.sortearTema = () => {
    const temaElement = document.getElementById('tema-redacao');
    const temaSorteado = temasRedacao[Math.floor(Math.random() * temasRedacao.length)];
    temaElement.innerText = "TEMA: " + temaSorteado;
};

// --- LÓGICA DE QUESTÕES (COM ALGORITMO PARETO) ---
function loadRandomQuestion() {
    const available = questions.filter(q => !answeredIds.includes(q.id));
    
    if (available.length === 0) {
        document.getElementById('question-text').innerText = "MISSÃO CUMPRIDA! VOCÊ DOMINOU O EDITAL!";
        return;
    }

    // Aplica o peso de Pareto no sorteio
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

function renderQuestion(q) {
    history.push(q);
    const container = document.getElementById('options-container');
    document.getElementById('question-text').innerText = q.text;
    document.getElementById('subject-tag').innerText = q.subject;
    document.getElementById('feedback-area').classList.add('hidden');
    container.innerHTML = '';

    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(i, q, btn);
        container.appendChild(btn);
    });
}

function checkAnswer(idx, q, btn) {
    const isCorrect = idx === q.correct;
    const sound = document.getElementById(isCorrect ? 'sound-correct' : 'sound-wrong');
    sound.currentTime = 0;
    sound.play().catch(() => {});

    if (isCorrect) {
        btn.classList.add('correct');
        xp += 50;
        streak += 1;
        answeredIds.push(q.id);
        localStorage.setItem('answeredIds', JSON.stringify(answeredIds));
    } else {
        btn.classList.add('wrong');
        streak = 0; // Quebra o fogo se errar
        const allBtns = document.querySelectorAll('.option-btn');
        allBtns[q.correct].classList.add('correct');
    }
    document.getElementById('feedback-message').innerText = q.explanation;
    document.getElementById('feedback-area').classList.remove('hidden');
    updateStats();
}

// --- ATUALIZAÇÃO VISUAL (XP, BARRAS E MATÉRIAS) ---
function updateStats() {
    // Atualiza números básicos
    document.getElementById('xp-counter').innerText = xp;
    if(document.getElementById('streak-counter')) {
        document.getElementById('streak-counter').innerText = streak;
    }
    
    localStorage.setItem('userXP', xp);
    localStorage.setItem('userStreak', streak);

    // Barra de XP do Topo (Nível a cada 1000 XP)
    const progressBarTop = document.getElementById('progress-bar-top');
    if(progressBarTop) {
        const levelProgress = (xp % 1000) / 10;
        progressBarTop.style.width = `${levelProgress}%`;
    }

    renderSubjectProgress();
}

function renderSubjectProgress() {
    const list = document.getElementById('subject-progress-list');
    if(!list) return; // Segurança caso o elemento não exista no HTML
    
    list.innerHTML = '';
    const subjects = [...new Set(questions.map(q => q.subject))];

    subjects.forEach(sub => {
        const total = questions.filter(q => q.subject === sub).length;
        const done = questions.filter(q => q.subject === sub && answeredIds.includes(q.id)).length;
        const pct = Math.round((done / total) * 100) || 0;
        
        // Verifica se é matéria de alto peso (Pareto)
        const isHighPriority = (paretoWeights[sub] || 0) >= 10;

        list.innerHTML += `
            <div class="subject-progress-item" ${isHighPriority ? 'data-priority="high"' : ''}>
                <div style="display:flex; justify-content:space-between; margin-bottom: 2px;">
                    <span style="${isHighPriority ? 'color: var(--primary); font-weight: bold;' : ''}">${sub}</span>
                    <span>${pct}%</span>
                </div>
                <div class="mini-bar-bg">
                    <div class="mini-bar-fill" style="width:${pct}%; background: ${isHighPriority ? 'var(--primary)' : '#555'}"></div>
                </div>
            </div>`;
    });
}

// --- CORREÇÃO DE REDAÇÃO COM IA ---
async function avaliarRedacao() {
    const texto = document.getElementById('redacao-input').value;
    const temaAtual = document.getElementById('tema-redacao').innerText;
    const analysisDiv = document.getElementById('ai-analysis');
    const feedbackDiv = document.getElementById('redacao-feedback');
    const btn = document.getElementById('avaliar-btn');

    // SUA CHAVE API
    const API_KEY = "AIzaSyAn6iFEqw9Ka39SeEwUVKvI23TEs7WuCe0"; 

    if (texto.length < 100) {
        alert("Texto muito curto para avaliação.");
        return;
    }

    btn.innerText = "IA ANALISANDO...";
    btn.disabled = true;

    const prompt = `Aja como um avaliador rigoroso de redações de concursos (Banca Cesgranrio). 
    Analise o texto considerando o ${temaAtual}.
    Forneça: NOTA (0-100), ANÁLISE ESTRUTURAL e ERROS GRAMATAIS.
    TEXTO: "${texto}"`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        
        const data = await response.json();
        const resultado = data.candidates[0].content.parts[0].text;
        
        analysisDiv.innerText = resultado;
        feedbackDiv.classList.remove('hidden');
        xp += 200; // Bônus de redação
        updateStats();

    } catch (error) {
        analysisDiv.innerText = "Erro na conexão com a IA.";
        feedbackDiv.classList.remove('hidden');
    } finally {
        btn.innerText = "ENVIAR PARA AVALIAÇÃO (IA)";
        btn.disabled = false;
    }
}

window.nextQuestion = () => loadRandomQuestion();
window.avaliarRedacao = avaliarRedacao;
window.resetProgress = () => { if(confirm("Zerar tudo?")) { localStorage.clear(); location.reload(); } };

init();
