# Estrutura Modular do Typing Test

Este diretório contém os módulos ES6 que compõem o jogo Typing Test, organizados de forma modular para melhor manutenibilidade e otimização. **Agora com palavras em inglês e APIs inteligentes!**

## Estrutura dos Módulos

### 1. `config.js`
- **Propósito**: Configurações e dados do jogo
- **Conteúdo**: 
  - Constantes de configuração
  - Listas de palavras em inglês por dificuldade
  - Palavras locais de backup em inglês

### 2. `utils.js`
- **Propósito**: Funções utilitárias e APIs inteligentes
- **Conteúdo**:
  - `shuffleArray()`: Embaralha arrays
  - `fetchWordsFromAPI()`: Sistema inteligente de busca de palavras
  - `filterWords()`: Filtra palavras impróprias ou muito difíceis
  - Múltiplas APIs com fallback automático

### 3. `gameState.js`
- **Propósito**: Gerenciamento do estado do jogo
- **Conteúdo**:
  - Classe `GameState` para controlar variáveis do jogo
  - Métodos para reset e controle de estado

### 4. `ui.js`
- **Propósito**: Gerenciamento da interface do usuário
- **Conteúdo**:
  - Classe `UI` para manipular elementos DOM
  - Métodos para navegação entre telas
  - Formatação de palavras e exibição de resultados

### 5. `gameLogic.js`
- **Propósito**: Lógica principal do jogo
- **Conteúdo**:
  - Classe `GameLogic` para controlar o fluxo do jogo
  - Gerenciamento de timer e eventos
  - Lógica de pontuação e validação

### 6. `settings.js`
- **Propósito**: Gerenciamento de configurações
- **Conteúdo**:
  - Classe `SettingsManager` para o modal de configurações
  - Controle de dificuldade e preferências

### 7. `index.js`
- **Propósito**: Arquivo de índice para exportações
- **Conteúdo**: Re-exportações de todos os módulos

## 🌍 Sistema de Palavras em Inglês

### Dificuldades
- **Easy**: Palavras comuns de 2-4 caracteres (the, and, for, are, etc.)
- **Medium**: Palavras de 5-8 caracteres (about, family, school, etc.)
- **Hard**: Palavras de 9-12 caracteres (beautiful, education, wonderful, etc.)

### APIs Utilizadas
1. **Random Word API**: API principal para palavras em inglês
2. **Datamuse API**: API de fallback para palavras adicionais
3. **Sistema de Filtros**: Remove palavras impróprias ou muito difíceis
4. **Fallback Local**: Listas locais caso as APIs falhem

### Filtros Inteligentes
- Remove palavras com mais de 12 caracteres
- Filtra caracteres especiais e números
- Prioriza palavras comuns e apropriadas
- Sistema de validação automática

## Benefícios da Modularização

1. **Separação de Responsabilidades**: Cada módulo tem uma função específica
2. **Manutenibilidade**: Código mais fácil de manter e debugar
3. **Reutilização**: Módulos podem ser reutilizados em outros projetos
4. **Testabilidade**: Cada módulo pode ser testado independentemente
5. **Organização**: Código mais limpo e organizado
6. **Performance**: Carregamento otimizado e tree-shaking
7. **APIs Inteligentes**: Sistema robusto de busca de palavras

## Como Usar

```javascript
// Importar módulos específicos
import { GameState } from './modules/gameState.js';
import { UI } from './modules/ui.js';

// Ou usar o arquivo de índice
import { GameState, UI, GameLogic } from './modules/index.js';
```

## Compatibilidade

- Requer navegadores com suporte a ES6 Modules
- O HTML deve incluir `type="module"` na tag script
- Funciona com servidores web modernos (não funciona com `file://`)
- Sistema de APIs com fallback automático
