"use client";

import dynamic from 'next/dynamic';
import React from 'react';

const CaaApp = dynamic(() => import('@/components/caa/CaaApp'), { ssr: false });

export default function CaaPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Prancha CAA — Comunicação Aumentativa e Alternativa</h1>
        <p className="text-slate-600 mb-6">Monte frases tocando nos pictogramas. Compatível com leitura por voz (pt-BR).</p>
        <CaaApp />
      </div>
    </div>
  );
}
