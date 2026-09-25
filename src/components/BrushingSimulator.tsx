import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';
import { Play, Pause, RotateCcw, Sparkles, CheckCircle2, Award, Heart, Volume2, VolumeX, ShieldCheck } from 'lucide-react';

interface DirtySpot {
  id: number;
  x: number;
  y: number;
  type: 'plaque' | 'food' | 'sugar';
  cleaned: boolean;
  opacity: number;
}

const INITIAL_SPOTS: DirtySpot[] = [
  // Front teeth spots
  { id: 1, x: 28, y: 35, type: 'food', cleaned: false, opacity: 0.9 },
  { id: 2, x: 42, y: 38, type: 'plaque', cleaned: false, opacity: 0.85 },
  { id: 3, x: 58, y: 38, type: 'sugar', cleaned: false, opacity: 0.95 },
  { id: 4, x: 72, y: 34, type: 'food', cleaned: false, opacity: 0.9 },
  // Lower teeth spots
  { id: 5, x: 32, y: 65, type: 'plaque', cleaned: false, opacity: 0.85 },
  { id: 6, x: 48, y: 68, type: 'sugar', cleaned: false, opacity: 0.9 },
  { id: 7, x: 65, y: 66, type: 'food', cleaned: false, opacity: 0.85 },
  // Back molar corners
  { id: 8, x: 18, y: 48, type: 'plaque', cleaned: false, opacity: 0.9 },
  { id: 9, x: 82, y: 48, type: 'sugar', cleaned: false, opacity: 0.9 },
  { id: 10, x: 50, y: 52, type: 'plaque', cleaned: false, opacity: 0.8 },
];

export const BrushingSimulator: React.FC = () => {
  const [spots, setSpots] = useState<DirtySpot[]>(INITIAL_SPOTS);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes (120 seconds standard WHO/Kemenkes)
  const [totalBrushedSeconds, setTotalBrushedSeconds] = useState(0);
  const [currentQuadrant, setCurrentQuadrant] = useState(1);
  const [selectedToothpaste, setSelectedToothpaste] = useState<'strawberry' | 'orange' | 'apple' | 'mint'>('strawberry');
  const [brushingEffectPos, setBrushingEffectPos] = useState<{ x: number; y: number } | null>(null);
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const [showFinishedModal, setShowFinishedModal] = useState(false);
  const mouthRef = useRef<HTMLDivElement>(null);

  // Quadrant Guide info
  const quadrants = [
    {
      id: 1,
      title: 'Kuadran 1: Gigi Depan Luar',
      desc: 'Sikat lembut memutar dari gusi ke arah gigi (Merah ke Putih)!',
      targetSec: '0 - 30 Detik',
    },
    {
      id: 2,
      title: 'Kuadran 2: Gigi Kanan Atas & Bawah',
      desc: 'Sikat bagian luar dan permukaan kunyah dengan gerakan maju-mundur!',
      targetSec: '30 - 60 Detik',
    },
    {
      id: 3,
      title: 'Kuadran 3: Gigi Kiri Atas & Bawah',
      desc: 'Bersihkan sela-sela gigi geraham dari sisa makanan yang menempel!',
      targetSec: '60 - 90 Detik',
    },
    {
      id: 4,
      title: 'Kuadran 4: Gigi Dalam & Sikat Lidah',
      desc: 'Cungkil perlahan bagian belakang gigi lalu usap lembut permukaan lidah!',
      targetSec: '90 - 120 Detik',
    },
  ];

  // Calculate clean percentage
  const cleanedCount = spots.filter(s => s.cleaned).length;
  const cleanlinessPercent = Math.round((cleanedCount / spots.length) * 100);

  // 2-minute timer effect
  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          const next = prev - 1;
          const elapsed = 120 - next;
          setTotalBrushedSeconds(elapsed);

          // update quadrant based on time
          if (elapsed <= 30) setCurrentQuadrant(1);
          else if (elapsed <= 60) setCurrentQuadrant(2);
          else if (elapsed <= 90) setCurrentQuadrant(3);
          else setCurrentQuadrant(4);

          // Soft sound on certain ticks
          if (next % 5 === 0 && next > 0) {
            sound.playTick();
          }

          if (next === 0) {
            sound.playSuccess();
            confetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.6 },
            });
            setShowFinishedModal(true);
            setTimerRunning(false);
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  // Clean spots when hovering / dragging over them
  const handleInteraction = (clientX: number, clientY: number) => {
    if (!mouthRef.current) return;
    const rect = mouthRef.current.getBoundingClientRect();
    const xPct = ((clientX - rect.left) / rect.width) * 100;
    const yPct = ((clientY - rect.top) / rect.height) * 100;

    setBrushingEffectPos({ x: xPct, y: yPct });

    // Spawn bubbles
    if (Math.random() > 0.4) {
      sound.playBrush();
      const newBubble = {
        id: Date.now() + Math.random(),
        x: xPct + (Math.random() * 8 - 4),
        y: yPct + (Math.random() * 8 - 4),
        size: Math.random() * 16 + 12,
      };
      setBubbles(prev => [...prev.slice(-15), newBubble]);
    }

    // Check hit spots
    setSpots(prev => {
      let anyCleanedNow = false;
      const updated = prev.map(spot => {
        if (spot.cleaned) return spot;
        const dist = Math.hypot(spot.x - xPct, spot.y - yPct);
        if (dist < 12) {
          const newOpacity = Math.max(0, spot.opacity - 0.25);
          if (newOpacity <= 0.1) {
            anyCleanedNow = true;
            return { ...spot, opacity: 0, cleaned: true };
          }
          return { ...spot, opacity: newOpacity };
        }
        return spot;
      });

      if (anyCleanedNow) {
        sound.playPop();
        // Check if all spots are cleaned
        const allDone = updated.every(s => s.cleaned);
        if (allDone && !showFinishedModal) {
          sound.playSparkle();
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.5 },
          });
        }
      }
      return updated;
    });
  };

  const handleReset = () => {
    setSpots(INITIAL_SPOTS);
    setTimeLeft(120);
    setTimerRunning(false);
    setTotalBrushedSeconds(0);
    setCurrentQuadrant(1);
    setBubbles([]);
    setShowFinishedModal(false);
    sound.playPop();
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const toothpasteColors = {
    strawberry: { name: 'Stroberi Manis', bg: 'bg-rose-500', text: 'text-rose-600', border: 'border-rose-300' },
    orange: { name: 'Jeruk Ceria', bg: 'bg-amber-500', text: 'text-amber-600', border: 'border-amber-300' },
    apple: { name: 'Apel Segar', bg: 'bg-emerald-500', text: 'text-emerald-600', border: 'border-emerald-300' },
    mint: { name: 'Mint Lembut', bg: 'bg-sky-500', text: 'text-sky-600', border: 'border-sky-300' },
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border-4 border-sky-100 flex flex-col gap-6">
      {/* Header with Title & Level Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-100 text-sky-700 rounded-full font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-sky-500" />
            Simulator Sikat Gigi & Timer 2 Menit
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">
            Gosok Gigi Si Ceria Sampai Berkilau! ✨
          </h2>
          <p className="text-sm text-slate-600">
            Arahkan sikat ke noda kotoran dan plak sampai giginya bersih 100%. Ikuti panduan 4 kuadran Kemenkes!
          </p>
        </div>

        {/* Cleanliness Meter */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl px-4 py-2.5 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-sm shadow">
            {cleanlinessPercent}%
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-800 uppercase">Tingkat Kebersihan</div>
            <div className="text-sm font-extrabold text-emerald-600">
              {cleanlinessPercent === 100 ? 'Gigi Berkilau Sehat! 🌟' : `${cleanedCount} dari ${spots.length} Noda Bersih`}
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: 4-Quadrant Visual Instructions */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="bg-sky-50 rounded-2xl p-4 border-2 border-sky-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-black text-sky-900 text-sm">Pemandu Kuadran (WHO/Kemenkes)</span>
              <span className="text-xs font-bold px-2 py-0.5 bg-sky-200 text-sky-800 rounded-md">
                Zona {currentQuadrant}/4
              </span>
            </div>
            <div className="space-y-2">
              {quadrants.map(q => {
                const isActive = currentQuadrant === q.id;
                return (
                  <div
                    key={q.id}
                    onClick={() => {
                      setCurrentQuadrant(q.id);
                      sound.playPop();
                    }}
                    className={`cursor-pointer p-3 rounded-xl transition-all duration-200 border-2 ${
                      isActive
                        ? 'bg-white border-sky-500 shadow-md scale-102 ring-2 ring-sky-300/40'
                        : 'bg-white/60 border-transparent hover:bg-white/90 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-black ${isActive ? 'text-sky-600' : 'text-slate-700'}`}>
                        {q.title}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                        {q.targetSec}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{q.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Toothpaste Selection (Pea-sized Fluoride concept) */}
          <div className="bg-amber-50 rounded-2xl p-3.5 border-2 border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-black text-amber-900">
                Pilih Pasta Gigi Berfluoride (Sebesar Biji Jagung/Kacang Polong):
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(toothpasteColors) as Array<keyof typeof toothpasteColors>).map(flavor => {
                const item = toothpasteColors[flavor];
                const isSelected = selectedToothpaste === flavor;
                return (
                  <button
                    key={flavor}
                    onClick={() => {
                      setSelectedToothpaste(flavor);
                      sound.playPop();
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl text-left border-2 transition-all ${
                      isSelected
                        ? `bg-white ${item.border} shadow-sm ring-2 ring-amber-300`
                        : 'bg-white/60 border-transparent hover:bg-white text-slate-700'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full ${item.bg}`} />
                    <span className="text-xs font-bold text-slate-800">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Center: The Interactive Mouth Canvas */}
        <div className="lg:col-span-8 flex flex-col items-center">
          {/* Big Open Mouth Graphic Area */}
          <div
            ref={mouthRef}
            onMouseMove={e => handleInteraction(e.clientX, e.clientY)}
            onTouchMove={e => {
              if (e.touches[0]) {
                handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
              }
            }}
            className="relative w-full max-w-xl h-80 sm:h-96 bg-gradient-to-b from-rose-100 via-rose-200 to-rose-300 rounded-3xl border-4 border-rose-300 shadow-inner overflow-hidden select-none cursor-crosshair flex items-center justify-center p-4"
          >
            {/* Mouth SVG Structure */}
            <svg viewBox="0 0 500 350" className="w-full h-full">
              {/* Dark inner oral cavity */}
              <ellipse cx="250" cy="175" rx="210" ry="140" fill="#991B1B" />
              {/* Tongue in the middle */}
              <path
                d="M170 230 C170 170 330 170 330 230 C330 280 170 280 170 230 Z"
                fill="#F43F5E"
                stroke="#BE123C"
                strokeWidth="4"
              />
              <path d="M250 190 Q250 240 250 250" stroke="#BE123C" strokeWidth="3" strokeLinecap="round" />

              {/* Upper Gums */}
              <path
                d="M50 110 Q250 40 450 110 Q250 85 50 110 Z"
                fill="#FB7185"
                stroke="#E11D48"
                strokeWidth="4"
              />

              {/* Lower Gums */}
              <path
                d="M50 240 Q250 310 450 240 Q250 265 50 240 Z"
                fill="#FB7185"
                stroke="#E11D48"
                strokeWidth="4"
              />

              {/* Upper Teeth Row */}
              <g fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3">
                {/* Upper Left Molars */}
                <rect x="75" y="100" width="34" height="42" rx="10" />
                <rect x="115" y="90" width="32" height="44" rx="10" />
                <rect x="153" y="82" width="30" height="46" rx="9" />
                {/* Upper Incisors (Front Center) */}
                <rect x="190" y="78" width="33" height="50" rx="8" />
                <rect x="229" y="76" width="38" height="54" rx="8" />
                <rect x="273" y="78" width="33" height="50" rx="8" />
                {/* Upper Right Molars */}
                <rect x="312" y="82" width="30" height="46" rx="9" />
                <rect x="348" y="90" width="32" height="44" rx="10" />
                <rect x="386" y="100" width="34" height="42" rx="10" />
              </g>

              {/* Lower Teeth Row */}
              <g fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3">
                {/* Lower Left Molars */}
                <rect x="80" y="210" width="34" height="40" rx="9" />
                <rect x="120" y="218" width="32" height="42" rx="9" />
                <rect x="158" y="224" width="28" height="44" rx="8" />
                {/* Lower Incisors (Front Center) */}
                <rect x="192" y="226" width="30" height="48" rx="8" />
                <rect x="228" y="228" width="38" height="50" rx="8" />
                <rect x="272" y="226" width="30" height="48" rx="8" />
                {/* Lower Right Molars */}
                <rect x="308" y="224" width="28" height="44" rx="8" />
                <rect x="342" y="218" width="32" height="42" rx="9" />
                <rect x="380" y="210" width="34" height="40" rx="9" />
              </g>

              {/* Sparkle highlights on clean teeth */}
              {cleanlinessPercent >= 80 && (
                <g fill="#FDE047" className="animate-pulse">
                  <polygon points="250,70 254,80 264,80 256,86 259,96 250,90 241,96 244,86 236,80 246,80" />
                  <polygon points="130,95 133,103 141,103 135,108 137,116 130,111 123,116 125,108 119,103 127,103" />
                  <polygon points="365,95 368,103 376,103 370,108 372,116 365,111 358,116 360,108 354,103 362,103" />
                </g>
              )}
            </svg>

            {/* Dirty spots rendered on top of teeth */}
            {spots.map(spot => {
              if (spot.cleaned && spot.opacity <= 0) return null;
              return (
                <div
                  key={spot.id}
                  style={{
                    left: `${spot.x}%`,
                    top: `${spot.y}%`,
                    opacity: spot.opacity,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className={`absolute pointer-events-none rounded-full transition-opacity duration-150 flex items-center justify-center ${
                    spot.type === 'plaque'
                      ? 'w-7 h-7 bg-amber-400 border-2 border-amber-600 shadow-sm'
                      : spot.type === 'sugar'
                      ? 'w-6 h-6 bg-pink-500 border-2 border-pink-700 shadow-sm'
                      : 'w-7 h-7 bg-amber-800/80 border-2 border-amber-950 shadow-sm'
                  }`}
                >
                  <span className="text-[10px] font-black text-white select-none">
                    {spot.type === 'plaque' ? '🦠' : spot.type === 'sugar' ? '🍬' : '🍫'}
                  </span>
                </div>
              );
            })}

            {/* Floating Soap Bubbles */}
            {bubbles.map(bubble => (
              <div
                key={bubble.id}
                style={{
                  left: `${bubble.x}%`,
                  top: `${bubble.y}%`,
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute pointer-events-none rounded-full bg-white/80 border border-sky-300 shadow-sm animate-ping backdrop-blur-sm"
              />
            ))}

            {/* Toothbrush Follower Indicator */}
            {brushingEffectPos && (
              <div
                style={{
                  left: `${brushingEffectPos.x}%`,
                  top: `${brushingEffectPos.y}%`,
                  transform: 'translate(-30%, -30%) rotate(-15deg)',
                }}
                className="absolute pointer-events-none transition-all duration-75 drop-shadow-2xl z-30"
              >
                {/* Cute Toothbrush Graphic */}
                <div className="relative">
                  {/* Brush Bristles */}
                  <div className="w-8 h-4 bg-sky-200 border-2 border-sky-400 rounded-t-lg flex items-center justify-center shadow-inner">
                    {/* Toothpaste dab */}
                    <div className={`w-5 h-2.5 rounded-full ${toothpasteColors[selectedToothpaste].bg} shadow`} />
                  </div>
                  {/* Brush Neck & Handle */}
                  <div className="w-4 h-16 bg-gradient-to-b from-sky-400 to-indigo-500 rounded-b-xl mx-auto border-2 border-sky-600" />
                </div>
              </div>
            )}

            {/* Helper Overlay text for kids */}
            <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none">
              <span className="bg-white/90 text-slate-700 text-xs font-black px-4 py-1.5 rounded-full shadow-md backdrop-blur-sm border border-slate-200 inline-block animate-bounce">
                👆 Usap sikat gigi di layar untuk membersihkan noda!
              </span>
            </div>
          </div>

          {/* Controls Bar: Timer & Actions */}
          <div className="w-full mt-4 flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
            {/* Timer Display */}
            <div className="flex items-center gap-3">
              <div className="text-3xl font-black text-indigo-700 font-mono tracking-wider bg-white px-4 py-1.5 rounded-xl border-2 border-indigo-200 shadow-inner">
                {formattedTime}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase">Waktu Sikat Gigi</div>
                <div className="text-xs font-bold text-indigo-600">Standar 2 Menit Kemenkes</div>
              </div>
            </div>

            {/* Play/Pause & Reset Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setTimerRunning(!timerRunning);
                  sound.playPop();
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm text-white shadow-md transition-all active:scale-95 ${
                  timerRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-500 hover:bg-emerald-600'
                }`}
              >
                {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                {timerRunning ? 'Jeda Timer' : 'Mulai Timer 2 Menit'}
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-sm bg-white border-2 border-slate-300 text-slate-700 hover:bg-slate-100 active:scale-95 transition-all shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                Ulangi
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Finished Celebration Modal */}
      {showFinishedModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border-4 border-amber-300 shadow-2xl text-center flex flex-col items-center gap-4 animate-scale-up">
            <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center border-4 border-amber-300 shadow-inner">
              <Award className="w-12 h-12" />
            </div>

            <h3 className="text-2xl font-black text-slate-800">Luar Biasa, Pahlawan Gigi! 🌟</h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              Kamu telah berhasil menyikat gigi selama 2 menit penuh dan membersihkan kuman dengan benar!
              Gigimu sekarang kuat, putih berkilau, dan nafasmu segar!
            </p>

            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 w-full text-left">
              <div className="flex items-center gap-2 font-black text-emerald-800 text-sm mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Pesan Dokter Gigi Cilik:
              </div>
              <ul className="text-xs text-emerald-700 space-y-1 list-disc list-inside">
                <li>Kumur cukup 1 kali dengan air bersih.</li>
                <li>Sikat gigi 2 kali sehari: Pagi setelah sarapan & Malam sebelum tidur.</li>
                <li>Simpan sikat gigi di tempat kering dengan kepala sikat menghadap ke atas.</li>
              </ul>
            </div>

            <button
              onClick={() => {
                setShowFinishedModal(false);
                sound.playPop();
              }}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-base rounded-2xl shadow-lg hover:from-emerald-600 hover:to-teal-600 transition-all active:scale-95"
            >
              Aku Hebat! Lanjutkan Petualangan 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
