// Lógica principal do jogo
import { fetchWordsFromAPI } from './utils.js';
import { shuffleArray } from './utils.js';

export class GameLogic {
  constructor(gameState, ui) {
    this.gameState = gameState;
    this.ui = ui;
    this.timer = null;
  }

  async iniciarClassic() {
    // Resetar variáveis e interface
    this.gameState.reset();
    this.ui.enableInput();
    this.ui.clearResult();
    this.ui.setClassicMessage('Type any key to start');
    this.ui.updateTimer(this.gameState.timeLeft);
    
    // Buscar palavras e iniciar
    const apiWords = await fetchWordsFromAPI(30, this.gameState.difficultyLevel);
    this.gameState.setWords(apiWords);
    this.ui.displayNextWord(this.gameState.shuffledWords[this.gameState.currentWordIndex]);
  }

  startTimer() {
    this.gameState.timeLeft--;
    this.ui.updateTimer(this.gameState.timeLeft);
    
    this.timer = setInterval(() => {
      this.gameState.timeLeft--;
      this.ui.updateTimer(this.gameState.timeLeft);
      
      if (this.gameState.timeLeft <= 0) {
        clearInterval(this.timer);
        this.endGame();
      }
    }, 1000);
  }

  endGame() {
    this.ui.disableInput();
    this.calculateAndDisplayResults();
  }

  calculateAndDisplayResults() {
    this.ui.showResults(this.gameState);
    
    // Adicionar eventos dos botões do dashboard
    this.setupDashboardEvents();
  }

  setupDashboardEvents() {
    // Botão de restart
    const restartBtn = document.querySelector('.restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        this.restartGame();
      });
    }

    // Botão de menu
    const menuBtn = document.querySelector('.control-btn[title="Menu"]');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        this.ui.mostrarMenu();
      });
    }

    // Botão de próximo
    const nextBtn = document.querySelector('.control-btn[title="Next"]');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.restartGame();
      });
    }

    // Botão de anterior
    const prevBtn = document.querySelector('.control-btn[title="Previous"]');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.ui.mostrarMenu();
      });
    }

    // Botão de dicas
    const tipsBtn = document.querySelector('.control-btn[title="Tips"]');
    if (tipsBtn) {
      tipsBtn.addEventListener('click', () => {
        this.showTips();
      });
    }

    // Botão de screenshot
    const screenshotBtn = document.querySelector('.control-btn[title="Screenshot"]');
    if (screenshotBtn) {
      screenshotBtn.addEventListener('click', () => {
        this.takeScreenshot();
      });
    }
  }

  showTips() {
    alert('💡 Typing Tips:\n\n• Keep your fingers on the home row (ASDF JKL;)\n• Look ahead at the next word\n• Practice regularly for better speed\n• Focus on accuracy first, then speed\n• Use all your fingers, not just index fingers');
  }

  takeScreenshot() {
    // Simular screenshot (em um ambiente real, você poderia usar html2canvas)
    alert('📸 Screenshot functionality would be implemented here!\n\nIn a real implementation, this would capture the dashboard and allow you to save or share it.');
  }

  restartGame() {
    this.ui.mostrarClassic();
    this.iniciarClassic();
  }

  handleInput(typedText) {
    if (!this.gameState.testStarted) {
      this.gameState.testStarted = true;
      this.startTimer();
    }

    const currentWord = this.gameState.shuffledWords[this.gameState.currentWordIndex];
    this.ui.wordDisplay.innerHTML = this.ui.formatWord(currentWord, typedText);
    
    if (typedText.trim() === currentWord) {
      this.gameState.correctWordCount++;
      this.gameState.characterCount += typedText.length;
      this.gameState.currentWordIndex = (this.gameState.currentWordIndex + 1) % this.gameState.shuffledWords.length;
      this.ui.displayNextWord(this.gameState.shuffledWords[this.gameState.currentWordIndex]);
    } else if (typedText.endsWith(' ')) {
      this.gameState.incorrectWordCount++;
      this.ui.inputArea.value = '';
    }
  }

  handleCharacterError() {
    this.gameState.decreaseTime();
    this.gameState.incorrectCharacterCount++;
  }
}
