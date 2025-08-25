// Funções utilitárias
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Função para filtrar palavras muito difíceis ou impróprias
function filterWords(words) {
  return words.filter(word => {
    // Remove palavras muito longas (mais de 12 caracteres)
    if (word.length > 12) return false;
    
    // Remove palavras com caracteres especiais ou números
    if (!/^[a-zA-Z]+$/.test(word)) return false;
    
    // Remove palavras muito raras ou complexas
    const commonWords = ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had'];
    if (commonWords.includes(word.toLowerCase())) return true;
    
    // Mantém palavras de comprimento razoável
    return word.length >= 2 && word.length <= 12;
  });
}

export async function fetchWordsFromAPI(qtd = 30, difficultyLevel = 'facil') {
  // Usa listas locais conforme dificuldade
  let baseList = [];
  
  if (difficultyLevel === 'facil') baseList = window.easyWords;
  if (difficultyLevel === 'medio') baseList = window.mediumWords;
  if (difficultyLevel === 'dificil') baseList = window.hardWords;
  
  // Se a lista local for suficiente, retorna embaralhada
  if (baseList.length >= qtd) {
    return shuffleArray([...baseList]).slice(0, qtd);
  }
  
  // Tenta buscar da API WordsAPI (mais confiável para palavras em inglês)
  try {
    // Primeira tentativa: API gratuita de palavras comuns
    const response = await fetch(`https://random-word-api.herokuapp.com/word?number=${qtd * 2}&lang=en`);
    if (response.ok) {
      const data = await response.json();
      const filteredWords = filterWords(data);
      
      // Se temos palavras suficientes após filtrar
      if (filteredWords.length >= qtd) {
        return shuffleArray(filteredWords).slice(0, qtd);
      }
    }
  } catch (e) {
    console.log('Primeira API falhou, tentando alternativa...');
  }
  
  // Segunda tentativa: API alternativa
  try {
    const response = await fetch(`https://api.datamuse.com/words?sp=*&max=${qtd * 2}&md=p`);
    if (response.ok) {
      const data = await response.json();
      const words = data.map(item => item.word).filter(word => word.length >= 2 && word.length <= 12);
      const filteredWords = filterWords(words);
      
      if (filteredWords.length >= qtd) {
        return shuffleArray(filteredWords).slice(0, qtd);
      }
    }
  } catch (e) {
    console.log('Segunda API falhou, usando palavras locais...');
  }
  
  // Se todas as APIs falharem, usa as listas locais
  console.log('Usando palavras locais como fallback');
  return shuffleArray([...baseList]).slice(0, qtd);
}
