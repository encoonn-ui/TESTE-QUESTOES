import { questions } from './questions.js';

let xp = parseInt(localStorage.getItem('userXP')) || 0;
let streak = parseInt(localStorage.getItem('userStreak')) || 0;
let answeredIds = JSON.parse(localStorage.getItem('answeredIds')) || [];
let historyIds = JSON.parse(sessionStorage.getItem('historyIds')) || [];

function init() {
    updateStats();
    loadRandomQuestion();
    window.sortearTema();
}

window.loadRandomQuestion = () => {
    let available = questions.filter(q => !answeredIds.includes(q.id));
    if (available.length === 0) {
        answeredIds = [];
        localStorage.setItem('answeredIds', JSON.stringify([]));
        available = questions;
    }
    const q = available[Math.floor(Math.random() * available.length)];
    renderQuestion(q);
};

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
        btn.onclick = () => checkAnswer(i, q);
        container.appendChild(btn);
    });
}

function checkAnswer(idx, q) {
    const isCorrect = idx === q.correct;
    if (isCorrect) {
        document.getElementById('feedback-status').innerText = "ACERTOU!";
        document.getElementById('feedback-message').innerText = q.explanation;
        document.getElementById('feedback-area').classList.remove('hidden');
        xp += 50; streak++;
        answeredIds.push(q.id);
        document.getElementById('sound-correct').play();
    } else {
        document.getElementById('sound-wrong').play();
        streak = 0;
        alert("ERROU! Tente a próxima.");
        window.loadRandomQuestion();
    }
    updateStats();
}

function updateStats() {
    document.getElementById('xp-counter').innerText = xp;
    document.getElementById('streak-counter').innerText = streak;
    localStorage.setItem('userXP', xp);
    localStorage.setItem('userStreak', streak);
    localStorage.setItem('answeredIds', JSON.stringify(answeredIds));
    document.getElementById('progress-bar-top').style.width = (xp % 1000) / 10 + "%";
}

window.nextQuestion = () => window.loadRandomQuestion();

window.sortearTema = () => {
    const temas = ["Ética Bancária", "IA no Atendimento", "ESG e Bancos"];
    document.getElementById('tema-redacao').innerText = "TEMA: " + temas[Math.floor(Math.random() * temas.length)];
};

window.resetProgress = () => { localStorage.clear(); location.reload(); };

window.gerarQuestaoIA = async () => {
    const btn = document.getElementById('btn-gerar-ia');
    btn.innerText = "IA GERANDO...";
    const API_KEY = "AIzaSyAn6iFEqw9Ka39SeEwUVKvI23TEs7WuCe0";
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            body: JSON.stringify({ contents: [{ parts: [{ text: "Crie uma questão JSON p/ Banco do Brasil: {id:999, subject:'IA', text:'...', options:['A','B','C','D','E'], correct:0, explanation:'...'}" }] }] })
        });
        const data = await res.json();
        let txt = data.candidates[0].content.parts[0].text.replace(/```json|```/g, "").trim();
        renderQuestion(JSON.parse(txt));
    } catch (e) { alert("Erro IA"); window.loadRandomQuestion(); }
    btn.innerHTML = '<span class="material-icons">auto_awesome</span> GERAR QUESTÃO INÉDITA (IA)';
};

init();
