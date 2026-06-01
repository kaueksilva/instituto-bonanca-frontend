export const CATEGORIES = [
  {
    id: 'sinto',
    nome: 'Eu sinto',
    icone: '😊',
    palavras: [
      { id: 'feliz', emoji: '😊', texto: 'feliz', sugestoes: ['muito', 'hoje', 'um pouco'] },
      { id: 'triste', emoji: '😢', texto: 'triste', sugestoes: ['muito', 'hoje', 'por quê'] },
      { id: 'ansioso', emoji: '😰', texto: 'ansioso', sugestoes: ['um pouco', 'muito'] },
    ],
  },
  {
    id: 'quero',
    nome: 'Eu quero',
    icone: '👉',
    palavras: [
      { id: 'comer', emoji: '🍲', texto: 'comer', sugestoes: ['agora', 'mais tarde', 'por favor'] },
      { id: 'beber', emoji: '🥤', texto: 'beber água', sugestoes: ['agora', 'por favor'] },
      { id: 'dormir', emoji: '🛌', texto: 'dormir', sugestoes: ['agora', 'depois'] },
    ],
  },
  {
    id: 'estou',
    nome: 'Eu estou',
    icone: '📍',
    palavras: [
      { id: 'em_casa', emoji: '🏠', texto: 'em casa', sugestoes: [] },
      { id: 'na_clinica', emoji: '🏥', texto: 'na clínica', sugestoes: [] },
      { id: 'com_febre', emoji: '🤒', texto: 'com febre', sugestoes: ['muito', 'um pouco'] },
    ],
  },
  {
    id: 'pessoas',
    nome: 'Pessoas',
    icone: '👥',
    palavras: [
      { id: 'eu', emoji: '🧑', texto: 'eu', sugestoes: [] },
      { id: 'mae', emoji: '👩', texto: 'mãe', sugestoes: [] },
      { id: 'pai', emoji: '👨', texto: 'pai', sugestoes: [] },
    ],
  },
  {
    id: 'respostas',
    nome: 'Respostas',
    icone: '✔️',
    palavras: [
      { id: 'sim', emoji: '✅', texto: 'sim', sugestoes: [] },
      { id: 'nao', emoji: '❌', texto: 'não', sugestoes: [] },
      { id: 'por_favor', emoji: '🙏', texto: 'por favor', sugestoes: [] },
    ],
  },
  {
    id: 'corpo',
    nome: 'Corpo',
    icone: '🦴',
    palavras: [
      { id: 'cabeca', emoji: '🧠', texto: 'cabeça', sugestoes: [] },
      { id: 'braco', emoji: '💪', texto: 'braço', sugestoes: [] },
      { id: 'dor', emoji: '⚡', texto: 'dor', sugestoes: ['muito', 'aqui', 'um pouco'] },
    ],
  },
];
