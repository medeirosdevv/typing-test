// Script principal - Módulo de inicialização
import { GameState } from './modules/gameState.js';
import { UI } from './modules/ui.js';
import { GameLogic } from './modules/gameLogic.js';
import { SettingsManager } from './modules/settings.js';
import { easyWords, mediumWords, hardWords } from './modules/config.js';

// Variável global para compatibilidade
let difficultyLevel = 'facil';

// Inicialização quando a página carrega
window.onload = () => {
  // Expor listas de palavras em inglês globalmente para compatibilidade
  window.easyWords = easyWords;
  window.mediumWords = mediumWords;
  window.hardWords = hardWords;
  
  // Inicializar componentes
  const gameState = new GameState();
  const ui = new UI();
  const gameLogic = new GameLogic(gameState, ui);
  const settingsManager = new SettingsManager();
  
  // Configurar callbacks
  settingsManager.setDifficultyChangeCallback((level) => {
    difficultyLevel = level;
    gameState.setDifficulty(level);
    console.log(`Dificuldade alterada para: ${level}`);
  });
  
  // Configurar navegação do menu
  const btnClassic = document.getElementById('btn-classic');
  const btnRaining = document.getElementById('btn-raining');
  const btnVoltarMenu = document.getElementById('btn-voltar-menu');
  
  if (btnClassic) {
    btnClassic.onclick = () => {
      ui.mostrarClassic();
      gameLogic.iniciarClassic();
    };
  }
  
  if (btnRaining) {
    btnRaining.onclick = () => {
      ui.mostrarRaining();
    };
  }
  
  if (btnVoltarMenu) {
    btnVoltarMenu.onclick = () => {
      ui.mostrarMenu();
    };
  }
  
  // Mostrar menu inicial
  ui.mostrarMenu();
  
  // Configurar eventos de input
  ui.inputArea.addEventListener('keyup', () => {
    const typedText = ui.inputArea.value;
    gameLogic.handleInput(typedText);
  });
  
  // Configurar eventos de teclado para erros de caracteres
  ui.inputArea.addEventListener('input', () => {
    const typedText = ui.inputArea.value;
    const currentWord = gameState.shuffledWords[gameState.currentWordIndex];
    
    if (currentWord && typedText.length > 0) {
      for (let i = 0; i < Math.min(typedText.length, currentWord.length); i++) {
        if (currentWord[i] !== typedText[i]) {
          gameLogic.handleCharacterError();
          break;
        }
      }
    }
  });
  
  console.log('Typing Test inicializado com palavras em inglês!');
};
