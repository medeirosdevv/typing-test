# Typing Test

Este é um teste de digitação inspirado no monkeytype.com, mas com algumas modificações e uma arquitetura modular otimizada. **Agora com palavras em inglês, APIs inteligentes e um dashboard profissional!**

## 🚀 Características

- **Modo Classic**: Teste de digitação tradicional com timer de 30 segundos
- **Múltiplas Dificuldades**: Easy, Medium e Hard
- **Interface Moderna**: Design responsivo e intuitivo
- **Sistema de Pontuação**: WPM, precisão e estatísticas detalhadas
- **Arquitetura Modular**: Código organizado em módulos ES6 para melhor manutenibilidade
- **Palavras em Inglês**: Todas as palavras são em inglês para melhor experiência
- **APIs Inteligentes**: Sistema de fallback com múltiplas APIs para palavras apropriadas
- **Dashboard Profissional**: Tela de resultados com gráfico de performance e estatísticas avançadas

## 🏗️ Estrutura do Projeto

```
typing-test/
├── index.html              # Página principal
├── style/
│   └── style.css          # Estilos CSS com dashboard profissional
├── script/
│   ├── script.js          # Script principal (módulo de inicialização)
│   └── modules/           # Módulos ES6 organizados
│       ├── config.js      # Configurações e palavras em inglês
│       ├── utils.js       # Funções utilitárias e APIs inteligentes
│       ├── gameState.js   # Gerenciamento de estado
│       ├── ui.js          # Interface do usuário com dashboard
│       ├── gameLogic.js   # Lógica do jogo
│       ├── settings.js    # Gerenciamento de configurações
│       └── index.js       # Arquivo de índice
└── README.md              # Este arquivo
```

## 🎮 Como Jogar

1. **Escolha o Modo**: Selecione "Classic" no menu principal
2. **Configure a Dificuldade**: Clique na engrenagem para ajustar o nível
3. **Digite as Palavras**: Comece a digitar qualquer tecla para iniciar o timer
4. **Complete o Teste**: Digite as palavras corretamente antes do tempo acabar
5. **Veja os Resultados**: Analise suas estatísticas no dashboard profissional

## 📊 Dashboard Profissional

Após completar o teste, você verá um dashboard completo com:

### 📈 **Gráfico de Performance**
- Linha amarela: WPM ao longo do tempo
- Linha cinza: Raw WPM (incluindo erros)
- Marcadores vermelhos: Ocorrências de erros
- Grade de fundo para melhor visualização

### 🎯 **Métricas Principais**
- **WPM**: Palavras por minuto (correto)
- **ACC**: Precisão de digitação
- **Raw**: WPM bruto (incluindo erros corrigidos)

### 📋 **Estatísticas Detalhadas**
- **Test Configuration**: Tipo de teste e idioma
- **Detailed Statistics**: Raw WPM, caracteres, consistência
- **Session Info**: Tempo total, tempo AFK, duração da sessão

### 🎮 **Controles Interativos**
- **→**: Próximo teste
- **🔄**: Reiniciar teste
- **⚠️**: Dicas de digitação
- **☰**: Voltar ao menu
- **⟲**: Teste anterior
- **📷**: Screenshot dos resultados

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com gradientes, animações e dashboard responsivo
- **JavaScript ES6+**: Módulos, classes e funcionalidades modernas
- **SVG**: Gráficos vetoriais para o dashboard de performance
- **APIs Inteligentes**: 
  - Random Word API (palavras em inglês)
  - Datamuse API (fallback)
  - Sistema de filtros para palavras apropriadas

## 🌍 Palavras em Inglês

O jogo agora usa exclusivamente palavras em inglês, organizadas por dificuldade:

- **Easy**: Palavras comuns de 2-4 caracteres (the, and, for, are, etc.)
- **Medium**: Palavras de 5-8 caracteres (about, family, school, etc.)
- **Hard**: Palavras de 9-12 caracteres (beautiful, education, wonderful, etc.)

### Sistema de Filtros
- Remove palavras muito longas (>12 caracteres)
- Filtra caracteres especiais e números
- Prioriza palavras comuns e apropriadas para teste de digitação
- Sistema de fallback robusto com palavras locais

## 📱 Compatibilidade

- Navegadores modernos com suporte a ES6 Modules
- Requer servidor web (não funciona com `file://`)
- Interface responsiva para diferentes tamanhos de tela
- Dashboard otimizado para desktop e mobile

## 🔧 Desenvolvimento

### Pré-requisitos
- Servidor web local (Live Server, Python, Node.js, etc.)
- Navegador com suporte a ES6 Modules

### Executar Localmente
1. Clone o repositório
2. Inicie um servidor web na pasta raiz
3. Abra `index.html` no navegador

### Estrutura Modular
O código foi organizado em módulos ES6 para:
- **Melhor Organização**: Cada módulo tem uma responsabilidade específica
- **Manutenibilidade**: Código mais fácil de manter e debugar
- **Reutilização**: Módulos podem ser reutilizados em outros projetos
- **Performance**: Carregamento otimizado e tree-shaking
- **APIs Inteligentes**: Sistema robusto de busca de palavras
- **Dashboard Profissional**: Interface moderna e atrativa

## 📊 Estatísticas do Jogo

- **WPM**: Palavras por minuto (correto)
- **ACC**: Precisão de digitação
- **Raw WPM**: WPM bruto incluindo erros corrigidos
- **Characters**: Caracteres corretos/incorretos/extra/perdidos
- **Consistency**: Consistência de digitação
- **AFK Time**: Tempo perdido por inatividade

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Adicionar novos modos de jogo
- Melhorar a interface
- Sugerir novas APIs de palavras
- Melhorar o dashboard de resultados

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.
