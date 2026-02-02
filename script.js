import { questions } from './questions.js';

// --- ESTADO E PERSISTÊNCIA ---
let xp = parseInt(localStorage.getItem('userXP')) || 0;
let streak = parseInt(localStorage.getItem('userStreak')) || 0;
let answeredIds = JSON.parse(localStorage.getItem('answeredIds')) || [];
let historyIds = JSON.parse(sessionStorage.getItem('historyIds')) || []; 
let currentQuestionId = localStorage.getItem('currentQuestionId'); 

const paretoWeights = { 
    "Vendas e Negociação": 15, 
    "Informática": 15, 
    "Conhecimentos Bancários": 10,
    "Matemática Financeira": 5,
    "Atualidades do Mercado Financeiro": 5
};

// --- FUNÇÃO DO SOM DE ERRO "DESAGRADÁVEL" ---
function playDisturbingErrorSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        // Onda 'sawtooth' (serra) é mais agressiva ao ouvido
        oscillator.type = 'sawtooth'; 
        oscillator.frequency.setValueAtTime(120, audioCtx.currentTime); // Frequência baixa e pesada
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime); // Volume controlado mas perceptível
        oscillator.start();
        
        // Duração curta para impacto imediato
        setTimeout(() => {
            oscillator.stop();
            audioCtx.close();
        }, 350);
    } catch (e) {
        console.log("AudioContext não suportado ou bloqueado.");
    }
}

function init() {
    updateStats();
    
    if (currentQuestionId) {
        const savedQ = questions.find(q => q.id == currentQuestionId);
        if (savedQ && !answeredIds.includes(savedQ.id)) {
            renderQuestion(savedQ);
        } else {
            loadRandomQuestion();
        }
    } else {
        loadRandomQuestion();
    }
    
    sortearTema();
    setupNavigation();
}

function setupNavigation() {
    document.getElementById('prev-btn').onclick = () => {
        if (historyIds.length > 1) {
            historyIds.pop(); 
            const prevId = historyIds[historyIds.length - 1]; 
            const prevQ = questions.find(q => q.id == prevId);
            if (prevQ) {
                localStorage.setItem('currentQuestionId', prevQ.id);
                sessionStorage.setItem('historyIds', JSON.stringify(historyIds));
                renderQuestion(prevQ);
            }
        } else {
            alert("Início do histórico alcançado!");
        }
    };
}

function loadRandomQuestion() {
    const available = questions.filter(q => !answeredIds.includes(q.id));
    
    if (available.length === 0) {
        document.getElementById('question-text').innerText = "VOCÊ DOMINOU O EDITAL! RESETE PARA RECOMEÇAR.";
        return;
    }

    let weightedPool = [];
    available.forEach(q => {
        const weight = paretoWeights[q.subject] || 1;
        for (let i = 0; i < weight; i++) weightedPool.push(q);
    });

    const q = weightedPool[Math.floor(Math.random() * weightedPool.length)];
    localStorage.setItem('currentQuestionId', q.id);
    
    if (historyIds[historyIds.length - 1] !== q.id) {
        historyIds.push(q.id);
        sessionStorage.setItem('historyIds', JSON.stringify(historyIds));
    }

    renderQuestion(q);
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

// --- LÓGICA DE CORREÇÃO COM SOM DESAGRADÁVEL NO ERRO ---
function checkAnswer(idx, q, btn) {
    const isCorrect = idx === q.correct;
    const feedbackArea = document.getElementById('feedback-area');
    const feedbackStatus = document.getElementById('feedback-status');
    
    if (isCorrect) {
        // SOM DE ACERTO AGRADÁVEL
        const sound = document.getElementById('sound-correct');
        sound.currentTime = 0;
        sound.play().catch(() => {});

        btn.classList.add('correct');
        feedbackStatus.innerHTML = '<span class="material-icons" style="vertical-align: middle;">check_circle</span> RESPOSTA';
        feedbackStatus.style.color = "var(--correct)";
        
        document.getElementById('feedback-message').innerText = q.explanation;
        feedbackArea.classList.remove('hidden');
        
        xp += 50;
        streak += 1;
        answeredIds.push(q.id);
        localStorage.removeItem('currentQuestionId'); 
    } else {
        // SOM DE ERRO DESAGRADÁVEL (Buzz Eletrônico)
        playDisturbingErrorSound();

        btn.classList.add('wrong');
        streak = 0;
        // Trepidação visual leve para reforçar o erro
        btn.style.transform = "translateX(5px)";
        setTimeout(() => btn.style.transform = "translateX(0)", 100);
    }

    updateStats();
}

function updateStats() {
    localStorage.setItem('userXP', xp);
    localStorage.setItem('userStreak', streak);
    localStorage.setItem('answeredIds', JSON.stringify(answeredIds));

    document.getElementById('xp-counter').innerText = xp;
    document.getElementById('streak-counter').innerText = streak;

    const progressBarTop = document.getElementById('progress-bar-top');
    if (progressBarTop) {
        const progress = (xp % 1000) / 10;
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
        const total = questions.filter(q => q.subject === sub).length;
        const done = questions.filter(q => q.subject === sub && answeredIds.includes(q.id)).length;
        const pct = Math.round((done / total) * 100) || 0;
        list.innerHTML += `
            <div class="subject-progress-item">
                <div style="display:flex; justify-content:space-between">
                    <span style="color:var(--primary); font-weight:bold; text-shadow:0 0 8px var(--primary);">${sub}</span>
                    <span style="color:var(--primary); font-weight:bold;">${pct}%</span>
                </div>
                <div class="mini-bar-bg"><div class="mini-bar-fill" style="width:${pct}%; background:var(--primary); box-shadow:0 0 10px var(--primary);"></div></div>
            </div>`;
    });
}

window.sortearTema = () => {
    const temas = ["O impacto do envelhecimento na economia.", "Educação financeira como ferramenta social.", "Privacidade de dados e IA."];
    document.getElementById('tema-redacao').innerText = "TEMA: " + temas[Math.floor(Math.random() * temas.length)];
};

window.nextQuestion = () => loadRandomQuestion();

window.resetProgress = () => {
    if (confirm("Resetar tudo?")) {
        localStorage.clear();
        sessionStorage.clear();
        location.reload();
    }
};

window.avaliarRedacao = async () => {
    const texto = document.getElementById('redacao-input').value;
    const API_KEY = "AIzaSyAn6iFEqw9Ka39SeEwUVKvI23TEs7WuCe0"; 
    if (texto.length < 100) return alert("Mínimo 100 caracteres!");
    const btn = document.getElementById('avaliar-btn');
    btn.innerText = "IA ANALISANDO...";
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: `Aja como banca Cesgranrio e avalie: ${texto}` }] }] })
        });
        const data = await response.json();
        document.getElementById('ai-analysis').innerText = data.candidates[0].content.parts[0].text;
        document.getElementById('redacao-feedback').classList.remove('hidden');
        xp += 200;
        updateStats();
    } catch (e) { alert("Erro na IA."); }
    btn.innerText = "CORRIGIR COM IA";
};

init();
