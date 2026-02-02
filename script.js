import { questions } from './questions.js';

let xp = parseInt(localStorage.getItem('userXP')) || 0;
let answeredIds = JSON.parse(localStorage.getItem('answeredIds')) || [];
let history = [];

// LISTA DE TEMAS IMPREVISÍVEIS (Brasil Real, ENEM e Aleatórios)
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
    sortearTema(); // Sorteia um tema ao carregar
}

// SORTEADOR DE TEMAS
window.sortearTema = () => {
    const temaElement = document.getElementById('tema-redacao');
    const temaSorteado = temasRedacao[Math.floor(Math.random() * temasRedacao.length)];
    temaElement.innerText = "TEMA: " + temaSorteado;
};

// --- LÓGICA DE QUESTÕES (PARETO) ---
function loadRandomQuestion() {
    const available = questions.filter(q => !answeredIds.includes(q.id));
    if (available.length === 0) {
        document.getElementById('question-text').innerText = "MISSÃO CUMPRIDA!";
        return;
    }
    const q = available[Math.floor(Math.random() * available.length)];
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
        answeredIds.push(q.id);
        localStorage.setItem('answeredIds', JSON.stringify(answeredIds));
    } else {
        btn.classList.add('wrong');
        document.querySelectorAll('.option-btn')[q.correct].classList.add('correct');
    }
    document.getElementById('feedback-message').innerText = q.explanation;
    document.getElementById('feedback-area').classList.remove('hidden');
    updateStats();
}

function updateStats() {
    document.getElementById('xp-counter').innerText = xp;
    localStorage.setItem('userXP', xp);
}

// --- CORREÇÃO DE REDAÇÃO COM IA (ESTILO RIGOROSO) ---
async function avaliarRedacao() {
    const texto = document.getElementById('redacao-input').value;
    const temaAtual = document.getElementById('tema-redacao').innerText;
    const analysisDiv = document.getElementById('ai-analysis');
    const feedbackDiv = document.getElementById('redacao-feedback');
    const btn = document.getElementById('avaliar-btn');

    // COLOQUE SUA CHAVE API AQUI
    const API_KEY = "AIzaSyAn6iFEqw9Ka39SeEwUVKvI23TEs7WuCe0"; 

    if (texto.length < 100) {
        alert("Texto muito curto! Para uma redação de concurso, desenvolva ao menos 100 caracteres para teste.");
        return;
    }

    btn.innerText = "IA ANALISANDO ESTRUTURA...";
    btn.disabled = true;

    // PROMPT RIGOROSO: Foco em Estrutura e Nota Máxima
    const prompt = `Aja como um avaliador rigoroso de redações de concursos e ENEM. 
    Analise o texto abaixo considerando o ${temaAtual}.
    
    CRITÉRIOS DE AVALIAÇÃO:
    1. Norma Culta (Gramática e Ortografia).
    2. Estrutura Dissertativa-Argumentativa (Introdução, Desenvolvimento e Conclusão).
    3. Coesão (Uso de conectivos) e Coerência.
    4. Argumentação (Lógica e profundidade).

    TEXTO: "${texto}"

    FORNEÇA O RESULTADO NESTE FORMATO:
    - NOTA FINAL: (0 a 100)
    - ANÁLISE ESTRUTURAL: (Comente sobre introdução, desenvolvimento e conclusão)
    - ERROS DE PORTUGUÊS: (Liste os principais)
    - DICAS PARA NOTA MÁXIMA: (O que faltou para o 100?)`;

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
        xp += 200;
        updateStats();

    } catch (error) {
        analysisDiv.innerText = "Erro ao conectar com a IA. Verifique sua chave API.";
        feedbackDiv.classList.remove('hidden');
    } finally {
        btn.innerText = "ENVIAR PARA AVALIAÇÃO (IA)";
        btn.disabled = false;
    }
}

window.nextQuestion = () => loadRandomQuestion();
window.avaliarRedacao = avaliarRedacao;
window.resetProgress = () => { localStorage.clear(); location.reload(); };

init();
