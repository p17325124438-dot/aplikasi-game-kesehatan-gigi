/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MascotTooth } from './components/MascotTooth';
import { BrushingSimulator } from './components/BrushingSimulator';
import { GermBusterGame } from './components/GermBusterGame';
import { FoodSortGame } from './components/FoodSortGame';
import { BrushingGuide } from './components/BrushingGuide';
import { DentalQuiz } from './components/DentalQuiz';
import { CertificateModal } from './components/CertificateModal';
import { PromptGuideModal } from './components/PromptGuideModal';
import { sound } from './utils/soundEffects';
import {
  Sparkles,
  Volume2,
  VolumeX,
  Award,
  BookOpen,
  Apple,
  Zap,
  HelpCircle,
  FileCode2,
  Heart,
  Smile,
  ShieldCheck,
} from 'lucide-react';

type TabType = 'simulator' | 'germs' | 'foods' | 'guide' | 'quiz' | 'certificate';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('simulator');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [mascotBubble, setMascotBubble] = useState<string>('Halo! Ayo sikat gigimu 2 menit!');

  const toggleSound = () => {
    const next = !soundEnabled;
    sound.enabled = next;
    setSoundEnabled(next);
    if (next) sound.playDing();
  };

  const handleMascotClick = () => {
    sound.playSparkle();
    const sayings = [
      'Gigi bersih bikin senyummu paling manis! ✨',
      'Ingat sikat gigi pagi setelah sarapan & malam sebelum tidur ya! ☀️🌙',
      'Kumur cukup 1 kali agar fluoride menempel melindungi gigimu! 💧',
      'Kuman lari terbirit-birit kalau kamu rajin sikat gigi! 🏃💨',
      'Fluoride seukuran biji jagung sudah cukup untuk kita! 🌽',
      'Periksa ke dokter gigi tiap 6 bulan sekali itu seru lho! 👨‍⚕️',
    ];
    const picked = sayings[Math.floor(Math.random() * sayings.length)];
    setMascotBubble(picked);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-200 to-indigo-100 text-slate-800 font-sans pb-16">
      {/* Top Banner & Header */}
      <header className="bg-white/85 backdrop-blur-md border-b-4 border-sky-300 shadow-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('simulator')}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 p-1 flex items-center justify-center shadow-md">
              <span className="text-2xl animate-bounce">🦷</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl sm:text-2xl font-black text-indigo-950 tracking-tight">
                  GIGI CERIA
                </h1>
                <span className="px-2 py-0.5 bg-amber-400 text-slate-900 rounded-full text-[10px] font-black uppercase shadow-xs">
                  Petualangan Pahlawan Gigi
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 hidden sm:block">
                Edukasi Kesehatan Gigi & Mulut Ramah Anak • Standar Kemenkes RI
              </p>
            </div>
          </div>

          {/* Action Header Buttons */}
          <div className="flex items-center gap-2">
            {/* Prompt AI Studio Guide Button */}
            <button
              onClick={() => {
                sound.playPop();
                setIsPromptModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-95 cursor-pointer border border-amber-300"
            >
              <FileCode2 className="w-4 h-4 text-amber-950" />
              <span className="hidden md:inline">Panduan & </span>Salin Prompt AI Studio
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center shadow-sm cursor-pointer transition-all active:scale-95"
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-indigo-600" />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-400" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Welcome Bar */}
      <div className="max-w-6xl mx-auto px-4 pt-6 pb-2">
        <div className="bg-gradient-to-r from-indigo-600 via-sky-500 to-teal-400 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-white/40">
          {/* Background decorative circles */}
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-white/15 blur-xl pointer-events-none" />

          {/* Left Hero Text */}
          <div className="space-y-2 text-center md:text-left z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-black uppercase tracking-wider text-amber-200 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              Yuk Rawat Gigi Agar Putih Berkilau & Kuat!
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Belajar Sikat Gigi yang Benar Lewat Game Seru! 🚀
            </h2>
            <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
              Mainkan simulator sikat gigi 2 menit, basmi monster kuman, pelajari 7 langkah Kemenkes, dan cetak sertifikat pahlawan gigi cilikmu!
            </p>
          </div>

          {/* Right Mascot with interactive speech bubble */}
          <div className="flex flex-col items-center z-10 shrink-0">
            {/* Speech bubble */}
            <div
              onClick={handleMascotClick}
              className="bg-white text-slate-800 text-xs font-black px-4 py-2 rounded-2xl shadow-lg border-2 border-indigo-200 mb-2 relative max-w-xs text-center cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            >
              <span>{mascotBubble}</span>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white" />
            </div>

            {/* Mascot Character */}
            <MascotTooth
              mood="superhero"
              size="sm"
              interactive={true}
              onClick={handleMascotClick}
              className="filter drop-shadow-2xl"
            />
            <span className="text-[11px] font-bold text-sky-100 mt-1">
              👆 Ketuk Si Ceria untuk nasihat gigi!
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-md border-2 border-sky-100 flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'simulator', label: '🪥 Sikat Gigi Interaktif', sub: 'Timer 2 Menit' },
            { id: 'germs', label: '👾 Basmi Kuman', sub: 'Game Arkade' },
            { id: 'foods', label: '🍎 Sahabat vs Musuh Gigi', sub: 'Pilah Makanan' },
            { id: 'guide', label: '📚 7 Langkah Sikat Gigi', sub: 'Standar Kemenkes' },
            { id: 'quiz', label: '🧠 Kuis Pahlawan', sub: '5 Pertanyaan' },
            { id: 'certificate', label: '📜 Sertifikat & Kalender', sub: 'Hadiah & Tracker' },
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playPop();
                  setActiveTab(tab.id as TabType);
                }}
                className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-xl transition-all duration-200 text-center cursor-pointer border-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white border-sky-400 shadow-md scale-102 font-black'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/80 font-bold'
                }`}
              >
                <div className="text-xs sm:text-sm truncate">{tab.label}</div>
                <div
                  className={`text-[10px] font-medium truncate ${
                    isActive ? 'text-sky-100' : 'text-slate-600'
                  }`}
                >
                  {tab.sub}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab View Stage */}
      <main className="max-w-6xl mx-auto px-4 mt-2">
        {activeTab === 'simulator' && <BrushingSimulator />}
        {activeTab === 'germs' && <GermBusterGame />}
        {activeTab === 'foods' && <FoodSortGame />}
        {activeTab === 'guide' && <BrushingGuide />}
        {activeTab === 'quiz' && <DentalQuiz />}
        {activeTab === 'certificate' && <CertificateModal />}
      </main>

      {/* Prompt Guide Modal */}
      <PromptGuideModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
      />

      {/* Educational Footer */}
      <footer className="max-w-6xl mx-auto px-4 mt-12 text-center text-xs text-slate-600 space-y-2">
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-700 font-bold">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Standar Promkes Kemenkes RI
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-rose-500" /> Sikat Gigi 2x Sehari (Pagi & Malam)
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Smile className="w-4 h-4 text-amber-500" /> Senyum Sehat Anak Indonesia
          </span>
        </div>
        <p className="text-[11px] text-slate-600">
          Aplikasi media edukasi kesehatan gigi interaktif anak-anak • Disusun berdasarkan prinsip promosi kesehatan gigi dan mulut untuk TK, SD, dan Posyandu/Puskesmas.
        </p>
      </footer>
    </div>
  );
}
