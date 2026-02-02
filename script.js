import { questions } from './questions.js';

// --- CARREGAMENTO DO "SAVE GAME" (LocalStorage) ---
let xp = parseInt(localStorage.getItem('userXP')) || 0;
let streak = parseInt(localStorage.getItem('userStreak')) || 0;
let answeredIds = JSON.parse(localStorage.getItem('answeredIds')) || [];
let currentQuestion = null;

// Pesos para o Algoritmo de Pareto
const paretoWeights = { 
    "Vendas e Negociação": 15, 
    "Informática": 15, 
    "Conhecimentos Bancários": 10,
    "Matemática Financeira": 5,
    "Atualidades do Mercado Financeiro": 5
};

const temasRedacao = [
    "O impacto do envelhecimento da população brasileira na economia.",
    "O papel da educação financeira como transformação social.",
    "IA e o dilema da privacidade de dados no Brasil."
];

function init() {
    updateStats(); // Renderiza o progresso salvo logo ao abrir
    loadRandomQuestion();
    sortearTema();
}

// --- ATUALIZAÇÃO VISUAL E PERSISTÊNCIA ---
function updateStats() {
    // 1. Salva no navegador para não perder ao fechar
    localStorage.setItem('userXP', xp);
    localStorage.setItem('userStreak', streak);
    localStorage.setItem('answeredIds', JSON.stringify(answeredIds));

    // 2. Atualiza os números na tela
    document.getElementById('xp-counter').innerText = xp;
    document.getElementById('streak-counter').innerText = streak;

    // 3. ATUALIZA A BARRA DE XP (Nível a cada 1000 XP)
    const progressBarTop = document.getElementById('progress-bar-top');
    if (progressBarTop) {
        const progress = (xp % 1000) / 10; // Transforma 0-1000 em 0-100%
        progressBarTop.style.width = `${progress}%`;
    }

    renderSubjectProgress();
}

function renderSubjectProgress() {
    const list = document.getElementById('subject-progress-list');
    if (!list) return;

    list.innerHTML = '';
    const subjects = [...new Set(questions.map(q => q.subject))];

    subjects.forEach(sub => {
        const totalInSubject = questions.filter(q => q.subject === sub).length;
        const doneInSubject = questions.filter(q => q.subject === sub && answeredIds.includes(q.id)).length;
        const pct = Math.round((doneInSubject / totalInSubject) * 100) || 0;

        list.innerHTML += `
            <div class="subject-progress-item" data-priority="high">
                <div style="display:flex; justify-content:space-between; margin-bottom: 2px;">
                    <span style="color: var(--primary); font-weight: bold; text-shadow: 0 0 8px var(--primary);">${sub}</span>
                    <span style="color: var(--primary); font-weight: bold;">${pct}%</span>
                </div>
                <div class="mini-bar-bg">
                    <div class="mini-bar-fill" style="width:${pct}%; background: var(--primary); box-shadow: 0 0 10px var(--primary);"></div>
                </div>
            </div>`;
    });
}

// --- LÓGICA DE QUESTÕES ---
function loadRandomQuestion() {
    const available = questions.filter(q => !answeredIds.includes(q.id));
    
    if (available.length === 0) {
        document.getElementById('question-text').innerText = "VOCÊ DOMINOU O EDITAL! RESETE PARA RECOMEÇAR.";
        document.getElementById('options-container').innerHTML = '';
        return;
    }

    // Sorteio Ponderado (Pareto)
    let weightedPool = [];
    available.forEach(q => {
        const weight = paretoWeights[q.subject] || 1;
        for (let i = 0; i < weight; i++) weightedPool.push(q);
    });

    currentQuestion = weightedPool[Math.floor(Math.random() * weightedPool.length)];
    renderQuestion(currentQuestion);
}

function renderQuestion(q) {
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
        answeredIds.push(q.id); // Adiciona ao progresso salvo
    } else {
        btn.classList.add('wrong');
        streak = 0;
        document.querySelectorAll('.option-btn')[q.correct].classList.add('correct');
    }

    document.getElementById('feedback-message').innerText = q.explanation;
    document.getElementById('feedback-area').classList.remove('hidden');
    updateStats(); // Atualiza XP e Barras na hora
}

// --- OUTRAS FUNÇÕES ---
window.sortearTema = () => {
    document.getElementById('tema-redacao').innerText = "TEMA: " + temasRedacao[Math.floor(Math.random() * temasRedacao.length)];
};

window.nextQuestion = () => loadRandomQuestion();

window.resetProgress = () => {
    if (confirm("Deseja apagar todo seu progresso e XP?")) {
        localStorage.clear();
        location.reload();
    }
};

// --- API REDAÇÃO (Mantida conforme solicitado) ---
window.avaliarRedacao = async () => {
    const texto = document.getElementById('redacao-input').value;
    const API_KEY = "AIzaSyAn6iFEqw9Ka39SeEwUVKvI23TEs7WuCe0"; 
    if (texto.length < 100) return alert("Texto muito curto!");

    document.getElementById('avaliar-btn').innerText = "IA ANALISANDO...";
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: `Avalie como banca Cesgranrio: ${texto}` }] }] })
        });
        const data = await response.json();
        document.getElementById('ai-analysis').innerText = data.candidates[0].content.parts[0].text;
        document.getElementById('redacao-feedback').classList.remove('hidden');
        xp += 200;
        updateStats();
    } catch (e) { alert("Erro na IA."); }
    document.getElementById('avaliar-btn').innerText = "CORRIGIR COM IA";
};

init();
