<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>CONCURSO BB GAMER</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="level-bar-container"><div id="progress-bar-top" class="level-bar-fill"></div></div>
    <div class="app-container">
        <header class="stats-header">
            <div class="stat-box"><span class="material-icons icon-xp">bolt</span><span id="xp-counter">0</span> <span class="label">XP</span></div>
            <div class="stat-box fire"><span class="material-icons icon-fire">local_fire_department</span><span id="streak-counter">0</span></div>
            <button class="btn-reset" onclick="resetProgress()"><span class="material-icons">restart_alt</span></button>
        </header>
        <main class="question-card">
            <div class="card-header"><span id="subject-tag" class="subject-tag">Carregando...</span><button id="prev-btn" class="back-btn"><span class="material-icons">arrow_back</span></button></div>
            <div class="card-body"><p id="question-text">Preparando arsenal de questões...</p></div>
            <div id="options-container" class="options-grid"></div>
            <div class="ai-section">
                <button id="btn-gerar-ia" onclick="gerarQuestaoIA()" class="btn-ai">
                    <span class="material-icons">auto_awesome</span> GERAR QUESTÃO INÉDITA (IA)
                </button>
            </div>
        </main>
        <section class="redacao-section">
            <h3 id="tema-redacao">TEMA: Carregando...</h3>
            <textarea id="redacao-input" placeholder="Escreva seu treino aqui..."></textarea>
            <button id="avaliar-btn" onclick="avaliarRedacao()">CORRIGIR COM IA</button>
            <div id="redacao-feedback" class="feedback-box hidden"><h4>Análise:</h4><p id="ai-analysis"></p></div>
        </section>
        <section class="progress-section">
            <h3>DOMÍNIO DO EDITAL</h3>
            <div id="subject-progress-list"></div>
        </section>
    </div>
    <div id="feedback-area" class="overlay hidden">
        <div class="overlay-content">
            <div id="feedback-status" class="feedback-title">RESPOSTA</div>
            <p id="feedback-message" class="feedback-text"></p>
            <button class="btn-next-level" onclick="nextQuestion()">PRÓXIMA FASE <span class="material-icons">play_arrow</span></button>
        </div>
    </div>
    <audio id="sound-correct" src="https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"></audio>
    <audio id="sound-wrong" src="https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg"></audio>
    <script type="module" src="script.js"></script>
</body>
</html>
