import { questions } from './questions.js';

// Estado do App
let currentQuestion = null;
let xp = parseInt(localStorage.getItem('userXP')) || 0;
let streak = parseInt(localStorage.getItem('userStreak')) || 0;
let answeredQuestions = JSON.parse(localStorage.getItem('answeredIds')) || [];

// Elementos DOM
const ui = {
    xp: document.getElementById('xp-counter'),
    streak: document.getElementById('streak-counter'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    subject: document.getElementById('subject-tag'),
    feedback: document.getElementById('feedback-area'),
    feedbackMsg: document.getElementById('feedback-message'),
    soundCorrect: document.getElementById('sound-correct'),
    soundWrong: document.getElementById('sound-wrong')
};

// Inicialização
function init() {
    updateStats();
    loadRandomQuestion();
}

function updateStats() {
    ui.xp.innerText = xp;
    ui.streak.innerText = streak;
    // Cálculo simples de progresso visual baseado em XP (ex: a cada 1000xp reseta barra)
    const progressPct = (xp % 1000) / 10;
    document.getElementById('progress-bar').style.width = `${progressPct}%`;
}

function loadRandomQuestion() {
    // Filtra questões que AINDA NÃO foram respondidas
    const availableQuestions = questions.filter(q => !answeredQuestions.includes(q.id));

    if (availableQuestions.length === 0) {
        ui.questionText.innerText = "Parabéns! Você zerou todas as questões cadastradas!";
        ui.optionsContainer.innerHTML = '<button onclick="resetProgress()" class="option-btn">Reiniciar Estudos</button>';
        ui.subject.innerText = "Concluído";
        return;
    }

    // Sorteia uma questão
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[randomIndex];

    // Renderiza
    renderQuestion(currentQuestion);
}

function renderQuestion(q) {
    ui.subject.innerText = q.subject;
    ui.questionText.innerText = q.text;
    ui.feedback.classList.add('hidden');
    ui.optionsContainer.innerHTML = '';

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index, btn);
        ui.optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, btnElement) {
    // Trava cliques múltiplos
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(btn => btn.disabled = true);

    const isCorrect = selectedIndex === currentQuestion.correct;

    if (isCorrect) {
        // Lógica de Acerto
        btnElement.classList.add('correct');
        playSound('correct');
        xp += 50; // +50 XP por acerto
        ui.feedbackMsg.innerText = "Excelente! " + currentQuestion.explanation;
        
        // Salva que essa questão foi respondida para não repetir
        answeredQuestions.push(currentQuestion.id);
        localStorage.setItem('answeredIds', JSON.stringify(answeredQuestions));
    } else {
        // Lógica de Erro
        btnElement.classList.add('wrong');
        // Mostra qual era a certa
        allBtns[currentQuestion.correct].classList.add('correct');
        playSound('wrong');
        ui.feedbackMsg.innerText = "Ops! A resposta correta era outra. " + currentQuestion.explanation;
    }

    localStorage.setItem('userXP', xp);
    updateStats();
    ui.feedback.classList.remove('hidden');
}

function playSound(type) {
    // Descomente e adicione URLs de som reais no HTML para funcionar
    /*
    if(type === 'correct') ui.soundCorrect.play();
    else ui.soundWrong.play();
    */
}

// Expõe a função próxima questão para o HTML
window.nextQuestion = () => {
    loadRandomQuestion();
};

window.resetProgress = () => {
    localStorage.clear();
    location.reload();
};

init();
