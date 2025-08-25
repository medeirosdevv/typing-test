// Gerenciamento da interface do usuário
export class UI {
  constructor() {
    this.wordDisplay = document.getElementById('word-display');
    this.inputArea = document.getElementById('input-area');
    this.timerDisplay = document.getElementById('timer');
    this.resultDisplay = document.getElementById('result');
    this.menu = document.getElementById('menu');
    this.classicContainer = document.getElementById('classic-container');
    this.rainingContainer = document.getElementById('raining-container');
  }

  mostrarMenu() {
    this.menu.classList.remove('hidden');
    this.classicContainer.classList.add('hidden');
    this.rainingContainer.classList.add('hidden');
    this.resultDisplay.innerHTML = '';
  }

  mostrarClassic() {
    this.menu.classList.add('hidden');
    this.classicContainer.classList.remove('hidden');
    this.rainingContainer.classList.add('hidden');
  }

  mostrarRaining() {
    this.menu.classList.add('hidden');
    this.classicContainer.classList.add('hidden');
    this.rainingContainer.classList.remove('hidden');
  }

  displayNextWord(word) {
    this.wordDisplay.innerHTML = this.formatWord(word, '');
    this.inputArea.value = '';
    this.inputArea.focus();
  }

  formatWord(word, typedText) {
    let formattedWord = '';
    for (let i = 0; i < word.length; i++) {
      if (i < typedText.length && word[i] !== typedText[i]) {
        formattedWord += `<span class="incorrect">${word[i]}</span>`;
      } else {
        formattedWord += word[i];
      }
    }
    return formattedWord;
  }

  updateTimer(timeLeft) {
    this.timerDisplay.textContent = `Time left: ${timeLeft}s`;
  }

  setClassicMessage(message) {
    document.querySelector('#classic-container h2').textContent = message;
  }

  showResults(gameState) {
    const totalCharactersTyped = gameState.characterCount + gameState.incorrectCharacterCount;
    const wpm = (gameState.correctWordCount / (30 / 60));
    const rawWpm = ((gameState.characterCount + gameState.incorrectCharacterCount) / 5) / (30 / 60);
    const accuracy = (gameState.characterCount - gameState.incorrectCharacterCount) / gameState.characterCount * 100;
    
    document.querySelector('.container').classList.add('hidden');
    this.resultDisplay.innerHTML = this.createDashboardHTML(gameState, wpm, rawWpm, accuracy);
    
    // Renderizar o gráfico após criar o HTML
    this.renderPerformanceGraph(gameState);
  }

  createDashboardHTML(gameState, wpm, rawWpm, accuracy) {
    return `
      <div class="dashboard">
        <div class="dashboard-header">
          <div class="summary-metrics">
            <div class="metric">
              <div class="metric-label">wpm</div>
              <div class="metric-value">${Math.round(wpm)}</div>
            </div>
            <div class="metric">
              <div class="metric-label">acc</div>
              <div class="metric-value">${Math.round(accuracy) ? Math.round(accuracy) : 0}%</div>
            </div>
          </div>
        </div>

        <div class="performance-graph">
          <div class="graph-container">
            <div class="graph-grid"></div>
            <svg class="graph-lines" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path class="graph-line wpm" d="" />
              <path class="graph-line raw" d="" />
            </svg>
            <div class="graph-dots"></div>
            <div class="graph-axes">
              <div class="axis-label y-left" style="top: 50%; left: -30px;">Words per Minute</div>
              <div class="axis-label y-right" style="top: 50%; right: -30px;">Errors</div>
              <div class="axis-label x" style="bottom: -25px; left: 50%;">Time (seconds)</div>
            </div>
          </div>
        </div>

        <div class="dashboard-footer">
          <div class="footer-section">
            <h3>Test Configuration</h3>
            <div class="stat-item">
              <span class="stat-label">test type</span>
              <span class="stat-value">time 30</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">language</span>
              <span class="stat-value">english</span>
            </div>
          </div>

          <div class="footer-section">
            <h3>Detailed Statistics</h3>
            <div class="stat-item">
              <span class="stat-label">raw</span>
              <span class="stat-value">${Math.round(rawWpm)}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">characters</span>
              <span class="stat-value">${gameState.characterCount}/${gameState.incorrectCharacterCount}/0/0</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">consistency</span>
              <span class="stat-value">${Math.round(accuracy)}%</span>
            </div>
          </div>

          <div class="footer-section">
            <h3>Session Info</h3>
            <div class="stat-item">
              <span class="stat-label">time</span>
              <span class="stat-value">30s</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">afk time</span>
              <span class="stat-value">${gameState.timeLost}s</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">session</span>
              <span class="stat-value">00:00:30</span>
            </div>
          </div>
        </div>

        <div class="dashboard-controls">
          <button class="control-btn" title="Next">→</button>
          <button class="control-btn restart-btn" title="Restart Test">🔄</button>
          <button class="control-btn" title="Tips">⚠️</button>
          <button class="control-btn" title="Menu">☰</button>
          <button class="control-btn" title="Previous">⟲</button>
          <button class="control-btn" title="Screenshot">📷</button>
        </div>
      </div>
    `;
  }

  renderPerformanceGraph(gameState) {
    // Simular dados de performance para o gráfico
    const timePoints = Array.from({length: 30}, (_, i) => i + 1);
    const wpmData = this.generateWPMData(gameState, timePoints);
    const rawData = this.generateRawData(gameState, timePoints);
    const errorData = this.generateErrorData(gameState, timePoints);

    this.drawGraphLines(wpmData, rawData);
    this.drawGraphDots(wpmData, rawData);
    this.drawErrorMarks(errorData);
  }

  generateWPMData(gameState, timePoints) {
    // Simular dados de WPM baseados no desempenho real
    const baseWPM = (gameState.correctWordCount / (30 / 60));
    return timePoints.map((time, index) => {
      const progress = time / 30;
      const variation = Math.sin(progress * Math.PI * 2) * 0.2;
      return {
        x: (time / 30) * 100,
        y: 100 - ((baseWPM * (1 + variation)) / 120) * 100
      };
    });
  }

  generateRawData(gameState, timePoints) {
    // Simular dados de Raw WPM
    const baseRaw = ((gameState.characterCount + gameState.incorrectCharacterCount) / 5) / (30 / 60);
    return timePoints.map((time, index) => {
      const progress = time / 30;
      const variation = Math.cos(progress * Math.PI * 1.5) * 0.15;
      return {
        x: (time / 30) * 100,
        y: 100 - ((baseRaw * (1 + variation)) / 120) * 100
      };
    });
  }

  generateErrorData(gameState, timePoints) {
    // Simular dados de erros baseados no desempenho real
    const totalErrors = gameState.incorrectCharacterCount;
    const errorPoints = [];
    
    for (let i = 0; i < Math.min(totalErrors, 15); i++) {
      const randomTime = Math.random() * 30;
      const randomErrors = Math.floor(Math.random() * 6) + 1;
      errorPoints.push({
        x: (randomTime / 30) * 100,
        y: 100 - (randomErrors / 6) * 100
      });
    }
    
    return errorPoints;
  }

  drawGraphLines(wpmData, rawData) {
    const wpmPath = document.querySelector('.graph-line.wpm');
    const rawPath = document.querySelector('.graph-line.raw');

    if (wpmPath && rawPath) {
      const wpmPathData = wpmData.map((point, index) => 
        `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
      ).join(' ');
      
      const rawPathData = rawData.map((point, index) => 
        `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
      ).join(' ');

      wpmPath.setAttribute('d', wpmPathData);
      rawPath.setAttribute('d', rawPathData);
    }
  }

  drawGraphDots(wpmData, rawData) {
    const dotsContainer = document.querySelector('.graph-dots');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';

    // Adicionar pontos WPM
    wpmData.forEach((point, index) => {
      if (index % 3 === 0) { // Mostrar apenas alguns pontos para não sobrecarregar
        const dot = document.createElement('div');
        dot.className = 'graph-dot wpm';
        dot.style.left = `${point.x}%`;
        dot.style.top = `${point.y}%`;
        dotsContainer.appendChild(dot);
      }
    });

    // Adicionar pontos Raw
    rawData.forEach((point, index) => {
      if (index % 3 === 0) {
        const dot = document.createElement('div');
        dot.className = 'graph-dot raw';
        dot.style.left = `${point.x}%`;
        dot.style.top = `${point.y}%`;
        dotsContainer.appendChild(dot);
      }
    });
  }

  drawErrorMarks(errorData) {
    const dotsContainer = document.querySelector('.graph-dots');
    if (!dotsContainer) return;

    errorData.forEach(point => {
      const errorMark = document.createElement('div');
      errorMark.className = 'error-mark';
      errorMark.textContent = '×';
      errorMark.style.left = `${point.x}%`;
      errorMark.style.top = `${point.y}%`;
      dotsContainer.appendChild(errorMark);
    });
  }

  enableInput() {
    this.inputArea.disabled = false;
  }

  disableInput() {
    this.inputArea.disabled = true;
  }

  clearResult() {
    this.resultDisplay.innerHTML = '';
  }
}
