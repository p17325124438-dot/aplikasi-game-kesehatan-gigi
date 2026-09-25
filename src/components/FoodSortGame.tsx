import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';
import { Apple, Heart, AlertOctagon, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';

interface FoodItem {
  id: number;
  name: string;
  emoji: string;
  category: 'friend' | 'foe';
  reason: string;
  benefits: string;
}

const ALL_FOODS: FoodItem[] = [
  {
    id: 1,
    name: 'Apel Segar Renyah',
    emoji: '🍎',
    category: 'friend',
    reason: 'Sahabat Gigi!',
    benefits: 'Mengunyah apel berserat merangsang produksi air liur yang membersihkan sisa makanan secara alami!',
  },
  {
    id: 2,
    name: 'Susu Putih Ber-Kalsium',
    emoji: '🥛',
    category: 'friend',
    reason: 'Sahabat Gigi!',
    benefits: 'Kaya kalsium & fosfat untuk membangun dan memperkuat lapisan email gigi agar tidak mudah berlubang.',
  },
  {
    id: 3,
    name: 'Permen Manis Lengket',
    emoji: '🍬',
    category: 'foe',
    reason: 'Waspada Perusak Gigi!',
    benefits: 'Gula lengket menempel lama di sela gigi, mengundang kuman memproduksi asam yang mengikis gigi.',
  },
  {
    id: 4,
    name: 'Air Mineral Putih',
    emoji: '💧',
    category: 'friend',
    reason: 'Sahabat Gigi Terbaik!',
    benefits: 'Membilas mulut setelah makan dan menjaga kelembapan mulut tanpa kandungan gula atau asam!',
  },
  {
    id: 5,
    name: 'Minuman Soda Bersoda',
    emoji: '🥤',
    category: 'foe',
    reason: 'Perusak Gigi Berat!',
    benefits: 'Mengandung kadar gula sangat tinggi dan gas berasam tinggi yang langsung mengikis enamel gigi.',
  },
  {
    id: 6,
    name: 'Keju Lezat',
    emoji: '🧀',
    category: 'friend',
    reason: 'Sahabat Gigi!',
    benefits: 'Membantu menetralkan kadar asam di mulut setelah makan dan kaya kalsium!',
  },
  {
    id: 7,
    name: 'Donat Tabur Gula',
    emoji: '🍩',
    category: 'foe',
    reason: 'Waspada Gigi Berlubang!',
    benefits: 'Karbohidrat sederhana & gula halus mudah berubah menjadi asam perusak gigi jika tidak segera disikat.',
  },
  {
    id: 8,
    name: 'Wortel Renyah',
    emoji: '🥕',
    category: 'friend',
    reason: 'Sahabat Gigi!',
    benefits: 'Bekerja seperti sikat gigi alami saat dikunyah, memijat gusi dan membersihkan plak.',
  },
  {
    id: 9,
    name: 'Cokelat Manis Pekat',
    emoji: '🍫',
    category: 'foe',
    reason: 'Waspada Gigi Berlubang!',
    benefits: 'Gula cokelat lengket mudah menyelip di lekukan gigi geraham anak.',
  },
  {
    id: 10,
    name: 'Brokoli Hijau',
    emoji: '🥦',
    category: 'friend',
    reason: 'Sahabat Gigi!',
    benefits: 'Mengandung vitamin C, kalsium, dan zat besi yang menyehatkan gusi dan gigi.',
  },
];

export const FoodSortGame: React.FC = () => {
  const [remainingFoods, setRemainingFoods] = useState<FoodItem[]>(ALL_FOODS);
  const [sortedCorrectly, setSortedCorrectly] = useState<FoodItem[]>([]);
  const [currentFeedback, setCurrentFeedback] = useState<{
    success: boolean;
    text: string;
    food: FoodItem;
  } | null>(null);

  const currentFood = remainingFoods[0];

  const handleClassify = (choice: 'friend' | 'foe') => {
    if (!currentFood) return;

    if (currentFood.category === choice) {
      sound.playSparkle();
      setCurrentFeedback({
        success: true,
        text: `Tepat Sekali! ${currentFood.name} adalah ${currentFood.reason}`,
        food: currentFood,
      });
      setSortedCorrectly(prev => [...prev, currentFood]);
      setRemainingFoods(prev => prev.slice(1));

      if (remainingFoods.length === 1) {
        // finished all!
        sound.playSuccess();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
    } else {
      sound.playError();
      setCurrentFeedback({
        success: false,
        text: `Kurang Tepat! ${currentFood.name} sebenarnya adalah ${
          currentFood.category === 'friend' ? 'Sahabat Gigi Sehat' : 'Makanan yang harus dibatasi (Musuh Gigi)'
        }!`,
        food: currentFood,
      });
    }
  };

  const handleReset = () => {
    sound.playPop();
    setRemainingFoods(ALL_FOODS);
    setSortedCorrectly([]);
    setCurrentFeedback(null);
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border-4 border-emerald-100 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-bold text-xs uppercase tracking-wider">
            <Apple className="w-4 h-4 text-emerald-500" />
            Edukasi Gizi & Kesehatan Gigi
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">
            Sahabat vs Musuh Gigi! 🍎🚫
          </h2>
          <p className="text-sm text-slate-600">
            Pilah makanan mana yang membuat gigi kuat dan berkilau, serta makanan manis yang memicu gigi berlubang!
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-200 px-4 py-2 rounded-2xl">
          <span className="text-xs font-bold text-slate-500">Kemajuan:</span>
          <span className="text-sm font-black text-emerald-600">
            {sortedCorrectly.length} / {ALL_FOODS.length} Selesai
          </span>
        </div>
      </div>

      {/* Main Sort Area */}
      {currentFood ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Choice: Sahabat Gigi */}
          <div className="md:col-span-4 order-2 md:order-1">
            <button
              onClick={() => handleClassify('friend')}
              className="w-full group p-6 rounded-3xl bg-gradient-to-b from-emerald-50 to-teal-100 border-4 border-emerald-400 hover:border-emerald-500 hover:shadow-xl transition-all duration-200 active:scale-95 flex flex-col items-center gap-3 text-center cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform">
                🌟
              </div>
              <span className="text-lg font-black text-emerald-900">SAHABAT GIGI SEHAT</span>
              <p className="text-xs text-emerald-700 font-semibold leading-relaxed">
                Kaya kalsium, serat, dan air pembersih yang membuat email gigi semakin kuat!
              </p>
              <span className="mt-1 px-4 py-1.5 bg-emerald-600 text-white rounded-full font-black text-xs shadow-sm">
                Pilih Ini! ✅
              </span>
            </button>
          </div>

          {/* Center: Current Food Card Being Judged */}
          <div className="md:col-span-4 order-1 md:order-2 flex flex-col items-center">
            <div className="w-full max-w-xs bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-2xl flex flex-col items-center text-center animate-scale-up">
              <span className="text-xs font-black uppercase text-amber-600 bg-amber-100 px-3 py-1 rounded-full mb-3">
                Makanan #{ALL_FOODS.length - remainingFoods.length + 1}
              </span>
              <div className="text-7xl mb-3 animate-bounce">{currentFood.emoji}</div>
              <h3 className="text-xl font-black text-slate-800 mb-1">{currentFood.name}</h3>
              <p className="text-xs text-slate-500">Manakah piring yang tepat untuk makanan ini?</p>
            </div>
          </div>

          {/* Right Choice: Musuh Gigi */}
          <div className="md:col-span-4 order-3">
            <button
              onClick={() => handleClassify('foe')}
              className="w-full group p-6 rounded-3xl bg-gradient-to-b from-rose-50 to-pink-100 border-4 border-rose-400 hover:border-rose-500 hover:shadow-xl transition-all duration-200 active:scale-95 flex flex-col items-center gap-3 text-center cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-rose-500 text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform">
                ⚠️
              </div>
              <span className="text-lg font-black text-rose-900">WASPADAI / MUSUH GIGI</span>
              <p className="text-xs text-rose-700 font-semibold leading-relaxed">
                Manis lengket & asam yang jika sering dikonsumsi bisa memicu gigi berlubang!
              </p>
              <span className="mt-1 px-4 py-1.5 bg-rose-600 text-white rounded-full font-black text-xs shadow-sm">
                Pilih Ini! 🚫
              </span>
            </button>
          </div>
        </div>
      ) : (
        /* Completed All Screen */
        <div className="bg-gradient-to-b from-emerald-50 to-teal-50 rounded-3xl p-8 border-4 border-emerald-300 text-center flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center text-4xl shadow-lg">
            🏆
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-emerald-900">
            Hebat Sekali! Kamu Ahli Nutrisi Gigi!
          </h3>
          <p className="text-sm text-emerald-700 max-w-md leading-relaxed">
            Kamu telah berhasil mengelompokkan semua 10 makanan dengan benar! Sekarang kamu tahu rahasia gigi yang selalu kuat dan sehat.
          </p>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black text-sm hover:bg-emerald-700 active:scale-95 shadow-md transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Mainkan Lagi
          </button>
        </div>
      )}

      {/* Educational Feedback Box */}
      {currentFeedback && (
        <div
          className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3 ${
            currentFeedback.success
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-rose-50 border-rose-300 text-rose-800'
          }`}
        >
          <div className="text-2xl shrink-0">{currentFeedback.success ? '🎉' : '💡'}</div>
          <div>
            <div className="font-black text-sm">{currentFeedback.text}</div>
            <p className="text-xs mt-1 leading-relaxed">{currentFeedback.food.benefits}</p>
          </div>
        </div>
      )}
    </div>
  );
};
