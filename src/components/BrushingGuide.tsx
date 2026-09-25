import React, { useState } from 'react';
import { sound } from '../utils/soundEffects';
import { BookOpen, Sun, Moon, ArrowRight, ArrowLeft, Check, Sparkles, AlertCircle } from 'lucide-react';

interface Step {
  step: number;
  title: string;
  tagline: string;
  desc: string;
  icon: string;
  proTip: string;
  bgGradient: string;
}

const BRUSHING_STEPS: Step[] = [
  {
    step: 1,
    title: 'Siapkan Pasta Gigi Seukuran Biji Jagung',
    tagline: 'Gunakan pasta gigi berfluoride secukupnya',
    desc: 'Untuk anak-anak, cukup oleskan pasta gigi berfluoride sebesar biji jagung (pea-sized). Jangan terlalu banyak agar busanya pas dan nyaman saat menyikat!',
    icon: '🪥',
    proTip: 'Fluoride adalah mineral pelindung yang membuat perisai anti kuman pada gigi.',
    bgGradient: 'from-sky-50 to-blue-50 border-sky-300',
  },
  {
    step: 2,
    title: 'Sikat Gigi Depan Memutar Lembut',
    tagline: 'Dari Merah ke Putih (Gusi ke Gigi)',
    desc: 'Tutup gigi sedikit, lalu sikat bagian depan dengan gerakan memutar melingkar seperti roda kecil. Arahkan dari batas gusi (merah) menuju gigi (putih).',
    icon: '🦷',
    proTip: 'Jangan menyikat terlalu keras agar gusi tidak terluka atau berdarah!',
    bgGradient: 'from-amber-50 to-yellow-50 border-amber-300',
  },
  {
    step: 3,
    title: 'Sikat Sisi Luar Gigi Samping & Geraham',
    tagline: 'Gerakan memutar di sisi kanan dan kiri',
    desc: 'Lanjutkan sikat ke bagian samping kanan dan kiri gigi atas serta bawah. Gerakkan sikat dengan lembut membuat lingkaran-lingkaran kecil.',
    icon: '🔄',
    proTip: 'Gigi geraham bentuknya berlekuk-lekuk, pastikan bulu sikat menjangkaunya.',
    bgGradient: 'from-purple-50 to-indigo-50 border-purple-300',
  },
  {
    step: 4,
    title: 'Sikat Permukaan Kunyah Gigi',
    tagline: 'Gerakan Maju-Mundur di atas gigi geraham',
    desc: 'Buka mulut lebar-lebar! Letakkan sikat gigi di atas permukaan gigi yang dipakai mengunyah makanan. Gerakkan sikat maju dan mundur secara teratur.',
    icon: '↔️',
    proTip: 'Sisa makanan sering bersarang di cekungan gigi kunyah ini.',
    bgGradient: 'from-emerald-50 to-teal-50 border-emerald-300',
  },
  {
    step: 5,
    title: 'Sikat Permukaan Dalam Gigi',
    tagline: 'Gerakan mencungkil dari gusi ke gigi',
    desc: 'Untuk membersihkan bagian dalam gigi yang menghadap ke lidah atau langit-langit mulut, posisikan sikat agak tegak lalu cungkil perlahan ke arah luar.',
    icon: '⤴️',
    proTip: 'Plak sering bersembunyi di bagian dalam gigi bawah.',
    bgGradient: 'from-rose-50 to-pink-50 border-rose-300',
  },
  {
    step: 6,
    title: 'Sikat Permukaan Lidah dengan Lembut',
    tagline: 'Bikin nafas wangi dan segar seharian',
    desc: 'Julurkan lidah sedikit, lalu usap lembut permukaan lidah dari belakang ke arah depan dengan pembersih lidah atau bulu sikat yang halus.',
    icon: '👅',
    proTip: 'Bakteri penyebab bau mulut suka menempel di bintik-bintik lidah.',
    bgGradient: 'from-cyan-50 to-sky-50 border-cyan-300',
  },
  {
    step: 7,
    title: 'Kumur Cukup 1 Kali Saja!',
    tagline: 'Rahasia dokter gigi agar gigi selalu kuat',
    desc: 'Keluarkan busa pasta gigi, lalu kumur dengan air bersih CUKUP SATU KALI saja! Jangan dibilas berulang-ulang agar lapisan fluoride tetap menempel di gigimu.',
    icon: '💧',
    proTip: 'Kumur sekali menjaga fluoride melindungi gigi saat kamu beraktivitas atau tidur!',
    bgGradient: 'from-teal-50 to-emerald-50 border-teal-300',
  },
];

export const BrushingGuide: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const step = BRUSHING_STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < BRUSHING_STEPS.length - 1) {
      sound.playPop();
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      sound.playPop();
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border-4 border-indigo-100 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-bold text-xs uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            Standar Promkes Kemenkes RI
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">
            7 Langkah Menyikat Gigi yang Benar 📚
          </h2>
          <p className="text-sm text-slate-600">
            Pelajari urutan menyikat gigi yang tepat agar seluruh permukaan gigi dan lidah bersih sempurna!
          </p>
        </div>

        {/* Step indicator buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {BRUSHING_STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => {
                sound.playPop();
                setCurrentStepIndex(idx);
              }}
              className={`w-8 h-8 rounded-full font-black text-xs transition-all flex items-center justify-center ${
                currentStepIndex === idx
                  ? 'bg-indigo-600 text-white scale-110 shadow-md ring-2 ring-indigo-300'
                  : idx < currentStepIndex
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {idx < currentStepIndex ? <Check className="w-3.5 h-3.5" /> : s.step}
            </button>
          ))}
        </div>
      </div>

      {/* Main Step Presentation Card */}
      <div className={`p-6 sm:p-8 rounded-3xl border-4 bg-gradient-to-br ${step.bgGradient} transition-all`}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-white shadow-xl flex items-center justify-center text-6xl sm:text-7xl shrink-0 border-2 border-white/80 animate-bounce">
            {step.icon}
          </div>

          <div className="flex-1 flex flex-col gap-2 text-center md:text-left">
            <div className="inline-block self-center md:self-start px-3 py-1 bg-white/80 rounded-full text-xs font-black text-indigo-800 shadow-sm">
              Langkah ke-{step.step} dari 7
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800">{step.title}</h3>
            <p className="text-sm font-bold text-indigo-700">{step.tagline}</p>
            <p className="text-sm text-slate-700 leading-relaxed mt-1">{step.desc}</p>

            {/* Pro Tip Box */}
            <div className="mt-3 p-3 bg-white/90 rounded-2xl border border-indigo-200 flex items-start gap-2 text-left shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700">
                <span className="font-black text-slate-900">Tips Dokter Gigi: </span>
                {step.proTip}
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-indigo-200/60">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs transition-all ${
              currentStepIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-500'
                : 'bg-white text-indigo-700 hover:bg-indigo-50 shadow-sm active:scale-95'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Langkah Sebelumnya
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex === BRUSHING_STEPS.length - 1}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs transition-all ${
              currentStepIndex === BRUSHING_STEPS.length - 1
                ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-500'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md active:scale-95'
            }`}
          >
            Langkah Selanjutnya
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2x Sehari: Pagi & Malam Special Card */}
      <div className="bg-gradient-to-r from-amber-50 via-sky-50 to-indigo-50 p-6 rounded-3xl border-3 border-amber-200">
        <h4 className="text-lg font-black text-slate-800 flex items-center gap-2 mb-3">
          ⏰ Kapan Waktu Terbaik Sikat Gigi Setiap Hari?
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Pagi */}
          <div className="bg-white p-4 rounded-2xl border-2 border-amber-300 shadow-sm flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <div className="font-black text-sm text-slate-800">1. Pagi Hari Setelah Sarapan</div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Bukan saat baru bangun tidur, melainkan setelah sarapan pagi agar sisa sarapan tidak dibawa beraktivitas seharian!
              </p>
            </div>
          </div>

          {/* Malam */}
          <div className="bg-white p-4 rounded-2xl border-2 border-indigo-300 shadow-sm flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <Moon className="w-6 h-6" />
            </div>
            <div>
              <div className="font-black text-sm text-slate-800">2. Malam Hari Sebelum Tidur</div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                <span className="font-bold text-rose-600">Paling penting!</span> Saat tidur, air liur pembersih berkurang drastis sehingga kuman akan berpesta merusak gigi jika tidak disikat.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
