// Configurações e dados do jogo
export const CONFIG = {
  DEFAULT_TIME: 30,
  DEFAULT_WORD_COUNT: 30
};

// Listas de palavras em inglês por dificuldade
export const easyWords = [
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had',
  'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his',
  'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy',
  'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use', 'dad', 'mom'
];

export const mediumWords = [
  'about', 'after', 'again', 'always', 'around', 'because', 'before', 'between',
  'different', 'during', 'family', 'father', 'friend', 'great', 'happy', 'house',
  'important', 'interest', 'knowledge', 'language', 'letter', 'little', 'mother',
  'nothing', 'number', 'people', 'picture', 'question', 'really', 'school',
  'should', 'something', 'sometimes', 'through', 'together', 'understand', 'water'
];

export const hardWords = [
  'beautiful', 'beginning', 'business', 'certainly', 'community', 'different',
  'education', 'everything', 'experience', 'government', 'information', 'interesting',
  'knowledge', 'language', 'necessary', 'important', 'something', 'sometimes',
  'throughout', 'understand', 'wonderful', 'excellent', 'fantastic', 'incredible',
  'magnificent', 'outstanding', 'remarkable', 'spectacular', 'terrific', 'wonderful'
];

// Palavras de backup em inglês (caso a API falhe)
export const localWords = [
  "there", "might", "take", "child", "order", "must", "thing", "face", "same",
  "also", "group", "know", "say", "become", "should", "mean", "word", "interest",
  "become", "still", "stand", "first", "even", "general", "system", "world",
  "place", "work", "life", "part", "hand", "year", "time", "good", "make"
];
