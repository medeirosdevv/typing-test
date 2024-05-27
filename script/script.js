const words = [
  "there", "might", "take", "child", "at", "order", "must", "thing", "face", "she",
  "same", "also", "who", "group", "know", "say", "become", "thing", "up", "should",
  "mean", "word", "interest", "no", "become", "still", "stand", "first", "even", "general", "system"
];

let shuffledWords;
let currentWordIndex = 0;
let correctWordCount = 0;
let incorrectWordCount = 0;
let characterCount = 0;
let incorrectCharacterCount = 0;
let timer;
let timeLeft = 30;
let testStarted = false;

const wordDisplay = document.getElementById('word-display');
const inputArea = document.getElementById('input-area');
const timerDisplay = document.getElementById('timer');
const resultDisplay = document.getElementById('result');

function shuffleWords(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function displayNextWord() {
  wordDisplay.innerHTML = formatWord(shuffledWords[currentWordIndex], '');
  inputArea.value = '';
  inputArea.focus();
}

function formatWord(word, typedText) {
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

function startTimer() {
  timer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = `Time left: ${timeLeft}s`;

      if (timeLeft <= 0) {
          clearInterval(timer);
          endGame();
      }
  }, 1000);
}

function endGame() {
  inputArea.disabled = true;
  calculateAndDisplayResults();
}

function calculateAndDisplayResults() {
  const totalCharactersTyped = characterCount + incorrectCharacterCount;
  const wpm = (correctWordCount / (30 / 60)); 
  const accuracy = (characterCount / totalCharactersTyped) * 100;

  document.querySelector('.container').classList.add('hidden');

  resultDisplay.innerHTML = `
      <div>
          <div class="stat">${Math.round(wpm)}</div>
          <div>WPM</div>
      </div>
      <div>
          <div class="stat">${Math.round(accuracy)}%</div>
          <div>Accuracy</div>
      </div>
      <div>
          <div>${correctWordCount + incorrectWordCount}</div>
          <div>Wrong words</div>
      </div>
      <div>
          <div>${correctWordCount}</div>
          <div>Correct words</div>
      </div>
      <div>
          <div>${characterCount}</div>
          <div>Characters</div>
      </div>
      <button id="restart-button">Restart</button>
  `;

  document.getElementById('restart-button').addEventListener('click', restartGame);
}

function restartGame() {
  currentWordIndex = 0;
  correctWordCount = 0;
  incorrectWordCount = 0;
  characterCount = 0;
  incorrectCharacterCount = 0;
  timeLeft = 30;
  testStarted = false;

  inputArea.disabled = false;
  inputArea.value = '';
  inputArea.focus();

  document.querySelector('.container').classList.remove('hidden');
  resultDisplay.innerHTML = '';

  shuffledWords = shuffleWords([...words]);
  displayNextWord();
}

inputArea.addEventListener('input', () => {
  if (!testStarted) {
      testStarted = true;
      startTimer();
  }

  const typedText = inputArea.value;
  const currentWord = shuffledWords[currentWordIndex];

  wordDisplay.innerHTML = formatWord(currentWord, typedText);

  if (typedText.trim() === currentWord) {
      correctWordCount++;
      characterCount += typedText.length;
      currentWordIndex = (currentWordIndex + 1) % shuffledWords.length;
      displayNextWord();
  } else if (typedText.endsWith(' ')) {
      incorrectWordCount++;
      inputArea.value = ''; // Clear the input area after incorrect word
  }
});

window.onload = () => {
  shuffledWords = shuffleWords([...words]); // Shuffle the words array on load
  displayNextWord();
};
