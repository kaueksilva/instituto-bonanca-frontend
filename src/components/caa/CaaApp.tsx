"use client";

import React, { useEffect, useState } from 'react';
import { CATEGORIES } from './data';
import { fetchPictogram } from '../../services/arasaac';

type Word = { id: string; emoji: string; texto: string; sugestoes?: string[]; image?: string | null };
type Category = (typeof CATEGORIES)[number];
type CategoryWord = Category['palavras'][number];

const STORAGE_KEY = 'caa_saved_pranchas_v1';

const QUICK_PHRASES: string[] = [
  'eu quero ir ao banheiro',
  'eu quero água',
  'estou com fome',
  'estou com sono',
  'preciso de ajuda',
  'posso sair agora',
];

export default function CaaApp() {
  const [categories] = useState(CATEGORIES);
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);
  const [phrase, setPhrase] = useState<Word[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        // future: hydrate saved pranchas
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const findEmojiFor = (texto: string) => {
    for (const c of categories) {
      const found = c.palavras.find((p: CategoryWord) => p.texto.toLowerCase() === texto.toLowerCase());
      if (found) return found.emoji || '🔸';
    }
    return '💬';
  };

  const addWord = (w: Word) => {
    setPhrase((p) => {
      const next = [...p, w];
      updateSuggestions(next);
      // try to fetch image for the new word
      (async () => {
        const url = await fetchPictogram(w.texto);
        if (url) {
          setPhrase((prev) => prev.map((it) => (it.id === w.id ? { ...it, image: url } : it)));
        }
      })();
      return next;
    });
  };

  const setPhraseFromText = (text: string) => {
    const parts = text
      .split(' ')
      .map((s) => s.trim())
      .filter(Boolean);
    const words: Word[] = parts.map((p, i) => ({ id: `q_${i}_${p}`, emoji: findEmojiFor(p), texto: p }));
    setPhrase(words);
    updateSuggestions(words);
    // fetch images for all words
    (async () => {
      for (const w of words) {
        const url = await fetchPictogram(w.texto);
        if (url) {
          setPhrase((prev) => prev.map((it) => (it.id === w.id ? { ...it, image: url } : it)));
        }
      }
    })();
  };

  const removeWordAt = (index: number) => {
    setPhrase((p) => {
      const next = p.filter((_, i) => i !== index);
      updateSuggestions(next);
      return next;
    });
  };

  const clearLast = () => {
    setPhrase((p) => {
      const next = p.slice(0, -1);
      updateSuggestions(next);
      return next;
    });
  };

  const clearAll = () => {
    setPhrase([]);
    setSuggestions([]);
  };

  const updateSuggestions = (currentPhrase: Word[]) => {
    const last = currentPhrase[currentPhrase.length - 1];
    if (!last) {
      setSuggestions([]);
      return;
    }
    if (last.sugestoes && last.sugestoes.length > 0) {
      setSuggestions(last.sugestoes);
    } else {
      setSuggestions(['agora', 'por favor', 'aqui']);
    }
  };

  const speakAll = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const text = phrase.map((w) => w.texto).join(' ');
    if (!text) return;

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'pt-BR';
    utter.rate = 0.85;
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  const applySuggestion = (s: string) => {
    const word: Word = { id: `sugg_${s}`, emoji: '💬', texto: s };
    addWord(word);
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <header className="mb-4">
        <h2 className="text-lg font-semibold">Prancha CAA</h2>
        <p className="text-sm text-slate-500">Toque nos pictogramas ou use frases rápidas para compor a mensagem.</p>
      </header>

      {/* Quick phrases */}
      <div className="mb-4">
        <div className="text-xs text-slate-500 mb-2">Frases rápidas</div>
        <div className="flex flex-wrap gap-2">
          {QUICK_PHRASES.map((q) => (
            <button
              key={q}
              onClick={() => setPhraseFromText(q)}
              className="px-3 py-2 bg-slate-100 rounded-lg text-sm hover:bg-slate-200 focus:outline-2 focus:outline-offset-2 focus:outline-primary"
              aria-label={`Preencher frase: ${q}`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Phrase bar */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 flex flex-wrap gap-2" aria-live="polite">
            {phrase.length === 0 ? (
              <div className="text-slate-500">(toque nos pictogramas abaixo para montar a frase)</div>
            ) : (
              phrase.map((w, i) => (
                <button
                  key={`${w.id}-${i}`}
                  onClick={() => removeWordAt(i)}
                  aria-label={`Remover ${w.texto}`}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded shadow-sm text-sm"
                >
                  <span className="text-xl">{w.emoji}</span>
                  <span className="capitalize">{w.texto}</span>
                </button>
              ))
            )}
          </div>

          <div className="ml-2 flex items-center gap-2">
            <button
              onClick={clearLast}
              className="px-3 py-2 bg-yellow-100 text-yellow-800 rounded"
              aria-label="Apagar última palavra"
            >
              Apagar última
            </button>
            <button
              onClick={clearAll}
              className="px-3 py-2 bg-red-100 text-red-800 rounded"
              aria-label="Limpar frase"
            >
              Limpar
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={speakAll}
            disabled={isSpeaking}
            className={`px-4 py-2 rounded bg-primary text-white disabled:opacity-60 flex items-center gap-2`}
            aria-label="Falar tudo"
          >
            {isSpeaking ? (
              <span className="animate-pulse">Falando...</span>
            ) : (
              <span>Falar tudo</span>
            )}
          </button>

          <div className="text-sm text-slate-500">Dica: toque em uma palavra na barra para removê-la.</div>
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="mb-4">
          <div className="text-xs text-slate-500 mb-2">Sugestões</div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => applySuggestion(s)}
                className="px-3 py-2 bg-slate-100 rounded"
                aria-label={`Adicionar sugestão ${s}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Categories tabs */}
      <div className="mb-3">
        <div className="flex gap-2 overflow-auto pb-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3 py-2 rounded ${activeCategory === c.id ? 'bg-primary text-white' : 'bg-slate-100'}`}
              aria-pressed={activeCategory === c.id}
              aria-label={`Categoria ${c.nome}`}
            >
              <span className="mr-2">{c.icone}</span>
              <span className="text-sm">{c.nome}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of pictograms */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {categories
          .find((c) => c.id === activeCategory)!
          .palavras.map((w: Word) => (
            <button
              key={w.id}
              onClick={() => addWord(w)}
              className="flex flex-col items-center justify-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              style={{ minHeight: 96, minWidth: 80 }}
              aria-label={`Adicionar ${w.texto}`}
            >
              <div className="text-3xl">{w.emoji}</div>
              <div className="text-sm text-slate-700">{w.texto}</div>
            </button>
          ))}
      </div>
    </div>
  );
}
