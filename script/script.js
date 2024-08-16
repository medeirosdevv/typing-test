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
let timeLost = 0;

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


function decrease_time(){
  if(timeLeft > 0 && timeLeft < 30)
  {
    timeScope = 30 - timeLeft;
    timeRemaining = 30 - timeScope;

    if(timeRemaining == 2){
      timeLeft = 0;
      timeLost+= 2;
    }

    if(timeRemaining > 2){
      timeLost+= 2;
      timeLeft--;
    }
  }
}

function formatWord(word, typedText) {
  let formattedWord = '';
  for (let i = 0; i < word.length; i++) {
    if (i < typedText.length && word[i] !== typedText[i]) {
      decrease_time();
      incorrectCharacterCount++;
      formattedWord += `<span class="incorrect">${word[i]}</span>`;
    } else {
      formattedWord += word[i];
    }
  }
  return formattedWord;
}

function startTimer() {
  timeLeft--;
  timerDisplay.textContent = `Time left: ${timeLeft}s`;
  
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
  const accuracy = (characterCount - incorrectCharacterCount) / characterCount * 100;


  document.querySelector('.container').classList.add('hidden');

  resultDisplay.innerHTML = `
      <div>
          <div class="stat">${Math.round(wpm)}</div>
          <div>WPM</div>
      </div>
      <div>
          <div class="stat">${Math.round(accuracy) ? Math.round(accuracy) : 0}%</div>
          <div>ACC</div>
      </div>
      <div>
          <div class="stat">${timeLost}</div>
          <div>Lost seconds</div>
      </div>
      <div>
          <div>${incorrectCharacterCount}</div>
          <div>Wrong characters</div>
      </div>
      <div>
          <div>${characterCount - incorrectCharacterCount}</div>
          <div>Correct characters</div>
      </div>
      <div>
          <div>${characterCount}</div>
          <div>Characters</div>
      </div>
      <button id="restart-button" class="btn">Restart</button>
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

  timerDisplay.textContent = `Time left: ${timeLeft}s`;
}

inputArea.addEventListener('keyup', () => {
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
    inputArea.value = '';
  }
});

window.onload = () => {
  shuffledWords = shuffleWords([...words]);
  displayNextWord();
};
