import { questions } from './questions.js';

// --- ESTADO DO USUÁRIO ---
let xp = parseInt(localStorage.getItem('userXP')) || 0;
let streak = parseInt(localStorage.getItem('userStreak')) || 0;
let answeredIds = JSON.parse(localStorage.getItem('answeredIds')) || [];
let history = []; // Histórico para botão voltar
let timerInterval;

// --- CONFIGURAÇÃO PARETO (PESOS) ---
const paretoWeights = {
    "Vendas e Negociação": 10,
    "Informática": 10,
    "Conhecimentos Bancários": 5,
    "Atualidades do Mercado Financeiro": 3,
    "Matemática Financeira": 2
};

// --- INICIALIZAÇÃO ---
function init() {
    updateStats();
    loadRandomQuestion();
    setupTimer();
    renderProgressPanel();

    // Evento Botão Voltar
    document.getElementById('prev-btn').onclick = () => {
        if (history.length > 0) {
            // Remove a atual (que acabou de ser gerada)
            const current = history.pop(); 
            // Pega a anterior, se existir
            if (history.length > 0) {
                const previous = history[history.length - 1];
                renderQuestion(previous, false); // false para não duplicar no histórico
            } else {
                alert("Início do histórico alcançado.");
                history.push(current); // Devolve a atual se não tiver pra onde voltar
            }
        }
    };
}

// --- LÓGICA DE PERGUNTAS (PARETO) ---
function loadRandomQuestion() {
    const available = questions.filter(q => !answeredIds.includes(q.id));
    
    if (available.length === 0) {
        document.getElementById('question-text').innerText = "MISSÃO CUMPRIDA! VOCÊ ZEROU O EDITAL!";
        document.getElementById('options-container').innerHTML = "";
        return;
    }

    // Algoritmo de Sorteio Ponderado (Pareto)
    let weightedPool = [];
    available.forEach(q => {
        const weight = paretoWeights[q.subject] || 1;
        for (let i = 0; i < weight; i++) {
            weightedPool.push(q);
        }
    });

    const q = weightedPool[Math.floor(Math.random() * weightedPool.length)];
    renderQuestion(q, true);
}

function renderQuestion(q, addToHistory) {
    if (addToHistory) history.push(q);

    const ui = {
        text: document.getElementById('question-text'),
        tag: document.getElementById('subject-tag'),
        opts: document.getElementById('options-container'),
        feedback: document.getElementById('feedback-area')
    };

    ui.text.innerText = q.text;
    ui.tag.innerText = q.subject;
    ui.feedback.classList.add('hidden');
    ui.opts.innerHTML = '';

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index, q, btn);
        ui.opts.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, q, btnElement) {
    const isCorrect = selectedIndex === q.correct;
    const feedbackMsg = document.getElementById('feedback-message');
    const feedbackStatus = document.getElementById('feedback-status');
    const soundCorrect = document.getElementById('sound-correct');
    const soundWrong = document.getElementById('sound-wrong');

    // Desativa cliques
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);

    if (isCorrect) {
        btnElement.classList.add('correct');
        feedbackStatus.innerText = "LEVEL UP!";
        feedbackStatus.style.color = "var(--correct)";
        soundCorrect.currentTime = 0;
        soundCorrect.play().catch(e => console.log(e));
        
        xp += 50;
        streak += 1; // Incrementa ofensiva simples
        
        // Salva ID para não repetir
        if(!answeredIds.includes(q.id)) {
            answeredIds.push(q.id);
            localStorage.setItem('answeredIds', JSON.stringify(answeredIds));
        }
    } else {
        btnElement.classList.add('wrong');
        // Mostra a correta
        allBtns[q.correct].classList.add('correct');
        feedbackStatus.innerText = "GAME OVER";
        feedbackStatus.style.color = "var(--wrong)";
        soundWrong.currentTime = 0;
        soundWrong.play().catch(e => console.log(e));
        streak = 0; // Reseta ofensiva
    }

    feedbackMsg.innerText = q.explanation;
    document.getElementById('feedback-area').classList.remove('hidden');
    
    updateStats();
}

// --- ESTATÍSTICAS E UI ---
function updateStats() {
    document.getElementById('xp-counter').innerText = xp;
    document.getElementById('streak-counter').innerText = streak;
    localStorage.setItem('userXP', xp);
    localStorage.setItem('userStreak', streak);
    
    // Atualiza barra de XP global (ex: nível a cada 1000xp)
    const progress = (xp % 1000) / 10; 
    document.getElementById('progress-bar').style.width = `${progress}%`;
    
    renderProgressPanel();
}

function renderProgressPanel() {
    const list = document.getElementById('subject-progress-list');
    list.innerHTML = '';
    
    // Pega todas as matérias únicas
    const subjects = [...new Set(questions.map(q => q.subject))];

    subjects.forEach(sub => {
        const total = questions.filter(q => q.subject === sub).length;
        const done = questions.filter(q => q.subject === sub && answeredIds.includes(q.id)).length;
        const pct = total > 0 ? (done / total) * 100 : 0;
        
        // Verifica se é prioridade alta
        const isPriority = (paretoWeights[sub] || 0) >= 10; 

        list.innerHTML += `
            <div class="subject-progress-item" data-priority="${isPriority ? 'high' : 'normal'}">
                <div style="display:flex; justify-content:space-between">
                    <span>${sub}</span>
                    <span>${Math.round(pct)}%</span>
                </div>
                <div class="mini-bar-bg">
                    <div class="mini-bar-fill" style="width:${pct}%"></div>
                </div>
            </div>
        `;
    });
}

// --- CRONÔMETRO POMODORO ---
function setupTimer() {
    const btn = document.getElementById('start-timer');
    const display = document.getElementById('timer-display');
    let timeLeft = 25 * 60;
    let isRunning = false;

    btn.onclick = () => {
        if (isRunning) return;
        isRunning = true;
        timerInterval = setInterval(() => {
            let m = Math.floor(timeLeft / 60);
            let s = timeLeft % 60;
            display.innerText = `${m}:${s < 10 ? '0' : ''}${s}`;
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert("Tempo esgotado! Descanse 5 min.");
                xp += 100;
                updateStats();
                isRunning = false;
            }
            timeLeft--;
        }, 1000);
    };
}

// --- API GEMINI (REDAÇÃO) ---
async function avaliarRedacao() {
    const texto = document.getElementById('redacao-input').value;
    const analysisDiv = document.getElementById('ai-analysis');
    const feedbackDiv = document.getElementById('redacao-feedback');
    const btn = document.getElementById('avaliar-btn');

    // !!! IMPORTANTE: COLOQUE SUA CHAVE AQUI !!!
    const API_KEY = "AIzaSyAn6iFEqw9Ka39SeEwUVKvI23TEs7WuCe0"; 

    if (texto.length < 50) {
        alert("Texto muito curto para avaliação.");
        return;
    }

    if (API_KEY === "SUA_CHAVE_API_AQUI") {
        alert("Você precisa inserir sua chave API no arquivo script.js!");
        return;
    }

    btn.innerText = "PROCESSANDO...";
    btn.disabled = true;

    const prompt = `Atue como corretor da banca Cesgranrio (Banco do Brasil). Avalie: "${texto}". Dê nota 0-100 e 3 dicas curtas.`;

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
        xp += 150;
        updateStats();

    } catch (error) {
        console.error(error);
        analysisDiv.innerText = "Erro ao conectar com a IA. Verifique a chave API ou sua internet.";
        feedbackDiv.classList.remove('hidden');
    } finally {
        btn.innerText = "ENVIAR PARA AVALIAÇÃO (IA)";
        btn.disabled = false;
    }
}

// Funções Globais para o HTML acessar
window.nextQuestion = () => loadRandomQuestion();
window.resetProgress = () => {
    if(confirm("Tem certeza que quer zerar todo seu progresso?")) {
        localStorage.clear();
        location.reload();
    }
};
window.avaliarRedacao = avaliarRedacao;

// Inicia
init();
