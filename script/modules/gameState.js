// Gerenciamento de estado do jogo
export class GameState {
  constructor() {
    this.words = [];
    this.shuffledWords = [];
    this.currentWordIndex = 0;
    this.correctWordCount = 0;
    this.incorrectWordCount = 0;
    this.characterCount = 0;
    this.incorrectCharacterCount = 0;
    this.timer = null;
    this.timeLeft = 30;
    this.testStarted = false;
    this.timeLost = 0;
    this.difficultyLevel = 'facil';
  }

  reset() {
    this.currentWordIndex = 0;
    this.correctWordCount = 0;
    this.incorrectWordCount = 0;
    this.characterCount = 0;
    this.incorrectCharacterCount = 0;
    this.timeLeft = 30;
    this.testStarted = false;
    this.timeLost = 0;
  }

  setWords(words) {
    this.words = words;
    this.shuffledWords = [...words];
  }

  setDifficulty(level) {
    this.difficultyLevel = level;
  }

  decreaseTime() {
    if (this.timeLeft > 0 && this.timeLeft < 30) {
      let timeScope = 30 - this.timeLeft;
      let timeRemaining = 30 - timeScope;
      if (timeRemaining == 2) {
        this.timeLeft = 0;
        this.timeLost += 2;
      }
      if (timeRemaining > 2) {
        this.timeLost += 2;
        this.timeLeft--;
      }
    }
  }
}
