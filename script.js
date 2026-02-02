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
    "Atualidades do Mercado Financeiro": 5,
    "Português": 10,
    "Inglês": 5,
    "Matemática": 5
};

// --- FUNÇÃO DO SOM DE ERRO (BUZZER) ---
function playDisturbingErrorSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sawtooth'; 
        oscillator.frequency.setValueAtTime(120, audioCtx.currentTime); 
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime); 
        oscillator.start();
        
        setTimeout(() => {
            oscillator.stop();
            audioCtx.close();
        }, 350);
    } catch (e) { console.log("Áudio bloqueado."); }
}

function init() {
    updateStats();
    
    // Verifica trava de sessão
    if (currentQuestionId) {
        // Tenta achar nas locais
        let savedQ = questions.find(q => q.id == currentQuestionId);
        
        // Se não achar nas locais, tenta recuperar do cache da IA (SessionStorage)
        if (!savedQ) {
            const cachedIA = sessionStorage.getItem('lastIAQuestion');
            if (cachedIA) {
                const parsedIA = JSON.parse(cachedIA);
                if (parsedIA.id == currentQuestionId) savedQ = parsedIA;
            }
        }

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
            
            // Procura na base local
            let prevQ = questions.find(q => q.id == prevId);
            
            // Se não achar, procura no cache de IA
            if (!prevQ) {
                const cachedIA = sessionStorage.getItem('lastIAQuestion');
                if (cachedIA) {
                    const parsed = JSON.parse(cachedIA);
                    if (parsed.id == prevId) prevQ = parsed;
                }
            }

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

// --- FUNÇÃO PADRÃO: CARREGA QUESTÃO LOCAL ---
function loadRandomQuestion() {
    let available = questions.filter(q => !answeredIds.includes(q.id));
    
    if (available.length === 0) {
        alert("PARABÉNS! VOCÊ FECHOU O EDITAL LOCAL! 🏆\n\nReiniciando as barras para revisão...");
        answeredIds = [];
        localStorage.setItem('answeredIds', JSON.stringify(answeredIds));
        xp += 1000;
        updateStats(); 
        available = questions;
    }

    let weightedPool = [];
    available.forEach(q => {
        const weight = paretoWeights[q.subject] || 1;
        for (let i = 0; i < weight; i++) weightedPool.push(q);
    });

    const q = weightedPool[Math.floor(Math.random() * weightedPool.length)];
    salvarEstadoQuestao(q);
    renderQuestion(q);
}

function salvarEstadoQuestao(q) {
    localStorage.setItem('currentQuestionId', q.id);
    if (historyIds[historyIds.length - 1] !== q.id) {
        historyIds.push(q.id);
        sessionStorage.setItem('historyIds', JSON.stringify(historyIds));
    }
}

function renderQuestion(q) {
    const container = document.getElementById('options-container');
    document.getElementById('question-text').innerText = q.text;
    
    const tag = document.getElementById('subject-tag');
    tag.innerText = q.subject;
    
    // Se for IA, muda a cor da tag para diferenciar
    if (q.id > 90000) {
        tag.style.background = "linear-gradient(90deg, #667eea, #764ba2)";
        tag.innerText = "🤖 IA: " + q.subject;
    } else {
        tag.style.background = "rgba(0, 243, 255, 0.1)"; // Cor original
    }

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

// --- A NOVA FUNÇÃO: GERADOR DE IA ---
window.gerarQuestaoIA = async () => {
    const btn = document.getElementById('btn-gerar-ia');
    const loadingText = document.getElementById('ai-loading-text');
    const questionText = document.getElementById('question-text');
    const container = document.getElementById('options-container');

    // Estado de Carregamento
    btn.disabled = true;
    btn.style.opacity = "0.7";
    btn.innerHTML = '<span class="material-icons spin">sync</span> CONECTANDO SATÉLITE...';
    questionText.innerText = "A Inteligência Artificial está analisando o Edital da Cesgranrio para criar um desafio inédito...";
    container.innerHTML = '';

    const assuntos = [
        "Vendas e Negociação (Ética, Gatilhos Mentais, CDC)", 
        "Informática (Segurança da Informação, Excel, Redes)", 
        "Conhecimentos Bancários (Pix, Open Finance, SFN)",
        "Matemática Financeira (Sistema Price, Juros Compostos)",
        "Atualidades do Mercado (ESG, Criptomoedas, Lei do Superendividamento)",
        "Português (Crase, Concordância, Regência)",
        "Inglês Técnico Bancário"
    ];
    const assunto = assuntos[Math.floor(Math.random() * assuntos.length)];
    const idAleatorio = Math.floor(Math.random() * 10000) + 90000; // IDs altos para identificar que é IA

    const prompt = `Crie uma questão de múltipla escolha INÉDITA, DIFÍCIL e com pegadinhas, estilo banca Cesgranrio, sobre: ${assunto}.
    IMPORTANTE: Retorne APENAS um objeto JSON válido (sem markdown) neste formato exato:
    {
        "id": ${idAleatorio},
        "subject": "${assunto}",
        "text": "Enunciado da questão...",
        "options": ["Alternativa A", "Alternativa B", "Alternativa C", "Alternativa D", "Alternativa E"],
        "correct": 2, 
        "explanation": "Explicação curta e didática."
    }
    Nota: 'correct' é o índice (0 a 4).`;

    const API_KEY = "AIzaSyAn6iFEqw9Ka39SeEwUVKvI23TEs7WuCe0"; // Sua chave

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        let rawText = data.candidates[0].content.parts[0].text;
        
        // Limpeza de Markdown (caso a IA mande ```json ... ```)
        rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        
        const novaQuestao = JSON.parse(rawText);
        
        // Salva no Cache de Sessão para o F5 não perder a questão da IA
        sessionStorage.setItem('lastIAQuestion', JSON.stringify(novaQuestao));
        
        salvarEstadoQuestao(novaQuestao);
        renderQuestion(novaQuestao);

    } catch (error) {
        console.error(error);
        questionText.innerText = "Falha na comunicação com a IA. Verifique sua internet.";
        setTimeout(() => loadRandomQuestion(), 2000); // Volta para questão normal em caso de erro
    } finally {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.innerHTML = '<span class="material-icons">auto_awesome</span> GERAR OUTRA QUESTÃO';
        loadingText.innerText = "Questão gerada com sucesso via Gemini AI.";
    }
};

function checkAnswer(idx, q, btn) {
    const isCorrect = idx === q.correct;
    const sound = document.getElementById(isCorrect ? 'sound-correct' : 'sound-wrong');
    const feedbackArea = document.getElementById('feedback-area');
    const feedbackStatus = document.getElementById('feedback-status');
    
    if(isCorrect) {
        sound.currentTime = 0;
        sound.play().catch(()=>{});
    }

    if (isCorrect) {
        btn.classList.add('correct');
        feedbackStatus.innerHTML = '<span class="material-icons" style="vertical-align: middle;">check_circle</span> RESPOSTA';
        feedbackStatus.style.color = "var(--correct)";
        
        document.getElementById('feedback-message').innerText = q.explanation;
        feedbackArea.classList.remove('hidden');
        
        xp += 50;
        streak += 1;
        answeredIds.push(q.id);
        
        // Se acertou uma da IA, salva como respondida para não repetir (mesmo sendo raro)
        localStorage.setItem('answeredIds', JSON.stringify(answeredIds));
        localStorage.removeItem('currentQuestionId'); 
    } else {
        playDisturbingErrorSound();
        btn.classList.add('wrong');
        streak = 0;
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
    
    // Filtra apenas assuntos das questões locais para não poluir a barra com assuntos aleatórios da IA
    const subjects = Object.keys(paretoWeights); 

    subjects.forEach(sub => {
        // Conta quantas questões locais existem desse assunto
        const total = questions.filter(q => q.subject.includes(sub.split(" ")[0])).length || 10; 
        const done = questions.filter(q => q.subject.includes(sub.split(" ")[0]) && answeredIds.includes(q.id)).length;
        
        // Evita divisão por zero
        const pct = Math.round((done / (total || 1)) * 100) || 0;
        
        list.innerHTML += `
            <div class="subject-progress-item">
                <div style="display:flex; justify-content:space-between">
                    <span style="color:var(--primary); font-weight:bold; text-shadow:0 0 8px var(--primary); font-size: 0.8rem;">${sub}</span>
                    <span style="color:var(--primary); font-weight:bold; font-size: 0.8rem;">${pct}%</span>
                </div>
                <div class="mini-bar-bg"><div class="mini-bar-fill" style="width:${pct}%; background:var(--primary); box-shadow:0 0 10px var(--primary);"></div></div>
            </div>`;
    });
}

window.sortearTema = () => {
    const temas = ["O impacto do envelhecimento na economia.", "Educação financeira como ferramenta social.", "Privacidade de dados e IA.", "Sustentabilidade e bancos."];
    document.getElementById('tema-redacao').innerText = "TEMA: " + temas[Math.floor(Math.random() * temas.length)];
};

window.nextQuestion = () => loadRandomQuestion();

window.resetProgress = () => {
    if (confirm("Resetar tudo (XP e Progresso)?")) {
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
