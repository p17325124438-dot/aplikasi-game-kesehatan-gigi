import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';
import { HelpCircle, CheckCircle, XCircle, Award, RotateCcw, Sparkles } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  emoji: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Berapa kali minimal kita harus menyikat gigi setiap hari?',
    emoji: '⏰',
    options: ['1 kali saat mandi sore', '2 kali: pagi setelah sarapan & malam sebelum tidur', 'Hanya jika gigi terasa kotor'],
    correctIndex: 1,
    explanation: 'Sikat gigi 2 kali sehari adalah kunci utama: pagi setelah sarapan dan malam sebelum tidur!',
  },
  {
    id: 2,
    question: 'Berapa banyak takaran pasta gigi berfluoride untuk anak-anak?',
    emoji: '🪥',
    options: ['Sepanjang seluruh bulu sikat gigi', 'Sebesar biji jagung / kacang polong (pea-sized)', 'Tidak perlu pakai pasta gigi'],
    correctIndex: 1,
    explanation: 'Cukup sebesar biji jagung (pea-sized) agar pas dan aman untuk anak-anak.',
  },
  {
    id: 3,
    question: 'Mengapa setelah sikat gigi dianjurkan hanya berkumur 1 kali saja?',
    emoji: '💧',
    options: ['Agar hemat air', 'Agar lapisan pelindung fluoride tetap menempel melindungi gigi', 'Biar rasa pasta gigi tidak hilang'],
    correctIndex: 1,
    explanation: 'Kumur sekali saja membiarkan mineral fluoride menempel dan bekerja melindungi email gigimu!',
  },
  {
    id: 4,
    question: 'Berapa bulan sekali sebaiknya kita memeriksakan gigi ke dokter gigi?',
    emoji: '👨‍⚕️',
    options: ['Hanya saat gigi sudah sakit sekali', 'Setiap 6 bulan sekali', 'Setiap 5 tahun sekali'],
    correctIndex: 1,
    explanation: 'Periksa ke dokter gigi 6 bulan sekali agar gigi selalu terkontrol dan dicegah dari lubang sebelum terasa sakit.',
  },
  {
    id: 5,
    question: 'Kapan saat yang tepat untuk mengganti sikat gigi lama dengan yang baru?',
    emoji: '🔄',
    options: ['Setiap 3 bulan sekali atau jika bulu sikat sudah mekar', 'Jika sikat gigi sudah patah', 'Tidak perlu diganti selamanya'],
    correctIndex: 0,
    explanation: 'Bulu sikat yang sudah mekar atau lebih dari 3 bulan sudah tidak efektif membersihkan plak dan bisa menyimpan kuman.',
  },
];

export const DentalQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUESTIONS[currentIndex];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      sound.playDing();
      setScore(s => s + 1);
    } else {
      sound.playError();
    }
  };

  const handleNext = () => {
    sound.playPop();
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      sound.playSuccess();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleRestart = () => {
    sound.playPop();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border-4 border-amber-100 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-bold text-xs uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            Asah Pengetahuan Pahlawan Gigi
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">
            Kuis Petualangan Gigi Sehat! 🧠✨
          </h2>
          <p className="text-sm text-slate-600">
            Jawab 5 pertanyaan seru tentang perawatan gigi dan dapatkan lencana pahlawan gigi cilik!
          </p>
        </div>

        {/* Question Counter */}
        {!quizFinished && (
          <div className="bg-amber-50 border-2 border-amber-200 px-4 py-2 rounded-2xl text-center">
            <span className="text-xs font-bold text-amber-700 uppercase">Pertanyaan</span>
            <div className="text-xl font-black text-amber-900">
              {currentIndex + 1} / {QUESTIONS.length}
            </div>
          </div>
        )}
      </div>

      {/* Main Quiz Area */}
      {!quizFinished ? (
        <div className="flex flex-col gap-5">
          {/* Question Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 border-3 border-amber-200 flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-md flex items-center justify-center text-3xl shrink-0">
              {currentQ.emoji}
            </div>
            <div>
              <span className="text-xs font-black text-amber-600 uppercase tracking-wider">
                Pertanyaan #{currentIndex + 1}
              </span>
              <h3 className="text-xl font-black text-slate-800 mt-1 leading-snug">
                {currentQ.question}
              </h3>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = 'bg-white border-2 border-slate-200 hover:border-amber-300 text-slate-700';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-2 border-emerald-400 text-emerald-900 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-50 border-2 border-rose-400 text-rose-900 line-through';
                } else {
                  btnStyle = 'bg-slate-50 border-2 border-slate-200 opacity-60 text-slate-500';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl text-left transition-all flex items-center justify-between shadow-sm cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center font-black text-xs text-slate-600 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm font-semibold">{option}</span>
                  </div>
                  {isAnswered && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next Button */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-sky-50 border-2 border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-4 animate-scale-up">
              <div className="text-xs text-sky-900">
                <span className="font-black">Penjelasan: </span>
                {currentQ.explanation}
              </div>
              <button
                onClick={handleNext}
                className="w-full sm:w-auto px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-sm rounded-xl shadow-md transition-all active:scale-95 shrink-0"
              >
                {currentIndex < QUESTIONS.length - 1 ? 'Pertanyaan Berikutnya ➡️' : 'Lihat Hasil Kuis! 🏆'}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Screen */
        <div className="bg-gradient-to-b from-amber-50 via-yellow-50 to-orange-50 rounded-3xl p-8 border-4 border-amber-300 text-center flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-amber-400 text-white flex items-center justify-center text-5xl shadow-xl border-4 border-white animate-bounce">
            🌟
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
            {score === 5
              ? 'Skor Sempurna! Pahlawan Gigi Sejati!'
              : score >= 3
              ? 'Hebat Sekali! Kamu Sudah Pintar Merawat Gigi!'
              : 'Terus Belajar & Rajin Sikat Gigi Ya!'}
          </h3>

          <div className="text-4xl font-black text-amber-600 font-mono">
            {score} / {QUESTIONS.length}
          </div>

          <p className="text-sm text-slate-600 max-w-md leading-relaxed">
            {score === 5
              ? 'Selamat! Kamu memahami semua prinsip dasar kebersihan mulut dan gigi anak dengan sempurna.'
              : 'Tetap ingat: sikat gigi 2x sehari, pasta gigi sebutir biji jagung, dan periksa ke dokter gigi tiap 6 bulan!'}
          </p>

          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-black text-sm rounded-2xl shadow-lg transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            Coba Kuis Lagi
          </button>
        </div>
      )}
    </div>
  );
};
