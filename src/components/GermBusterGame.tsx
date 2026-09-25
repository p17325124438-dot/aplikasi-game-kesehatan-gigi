import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';
import { Shield, Zap, Sparkles, Heart, RefreshCw, Trophy, AlertTriangle } from 'lucide-react';

interface Germ {
  id: number;
  x: number; // percentage
  y: number; // percentage
  type: 'plaqy' | 'cario' | 'sugary';
  points: number;
  speed: number;
  alive: boolean;
}

export const GermBusterGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [enamelHealth, setEnamelHealth] = useState(100);
  const [germs, setGerms] = useState<Germ[]>([]);
  const [combo, setCombo] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [powerShield, setPowerShield] = useState(false);

  // Start a new game
  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setEnamelHealth(100);
    setCombo(0);
    setGameOver(false);
    setPowerShield(false);
    setGerms([]);
    sound.playSuccess();
  };

  // Spawn germs periodically during active game
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const spawnInterval = setInterval(() => {
      setGerms(prev => {
        if (prev.filter(g => g.alive).length >= 6) return prev;

        const types: Array<'plaqy' | 'cario' | 'sugary'> = ['plaqy', 'cario', 'sugary'];
        const chosenType = types[Math.floor(Math.random() * types.length)];

        const newGerm: Germ = {
          id: Date.now() + Math.random(),
          x: Math.floor(Math.random() * 75) + 12,
          y: Math.floor(Math.random() * 65) + 18,
          type: chosenType,
          points: chosenType === 'cario' ? 25 : chosenType === 'sugary' ? 15 : 10,
          speed: chosenType === 'cario' ? 1.5 : 1,
          alive: true,
        };

        return [...prev, newGerm];
      });
    }, 900);

    // Damage loop: if germs linger too long on teeth, enamel takes slight damage
    const damageInterval = setInterval(() => {
      setGerms(current => {
        const aliveCount = current.filter(g => g.alive).length;
        if (aliveCount > 0 && !powerShield) {
          setEnamelHealth(hp => {
            const newHp = Math.max(0, hp - aliveCount * 1.5);
            if (newHp === 0) {
              setGameOver(true);
              setIsPlaying(false);
              sound.playError();
            }
            return newHp;
          });
        }
        return current;
      });
    }, 1200);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(damageInterval);
    };
  }, [isPlaying, gameOver, powerShield]);

  // Click/Zap a germ
  const hitGerm = (germId: number) => {
    sound.playPop();
    setGerms(prev =>
      prev.map(g => {
        if (g.id === germId && g.alive) {
          const addedPts = g.points + combo * 5;
          setScore(s => {
            const nextScore = s + addedPts;
            if (nextScore > highScore) setHighScore(nextScore);
            return nextScore;
          });
          setCombo(c => c + 1);
          return { ...g, alive: false };
        }
        return g;
      })
    );

    // Clean up dead germs after short burst
    setTimeout(() => {
      setGerms(prev => prev.filter(g => g.id !== germId));
    }, 300);
  };

  // Fluoride Shield Powerup
  const activateFluorideShield = () => {
    if (powerShield) return;
    sound.playSparkle();
    setPowerShield(true);
    setEnamelHealth(hp => Math.min(100, hp + 20));
    // zap all current germs
    setGerms(prev => {
      prev.forEach(g => {
        if (g.alive) setScore(s => s + g.points);
      });
      return prev.map(g => ({ ...g, alive: false }));
    });
    setTimeout(() => {
      setPowerShield(false);
    }, 6000);
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border-4 border-purple-100 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-bold text-xs uppercase tracking-wider">
            <Zap className="w-4 h-4 text-purple-500" />
            Game Arkade Pahlawan Gigi
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">
            Basmi Monster Kuman Gigi! 👾
          </h2>
          <p className="text-sm text-slate-600">
            Ketuk kuman yang muncul di atas gigi sebelum mereka merusak enamel gigi! Jaga kesehatan gigi hingga 100%.
          </p>
        </div>

        {/* Stats: Score & Health */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl px-4 py-2 text-center">
            <div className="text-[11px] font-bold text-purple-700 uppercase">Skor Pahlawan</div>
            <div className="text-2xl font-black text-purple-900">{score}</div>
          </div>

          <div className="bg-gradient-to-r from-rose-50 to-orange-50 border-2 border-rose-200 rounded-2xl px-4 py-2 text-center">
            <div className="text-[11px] font-bold text-rose-700 uppercase flex items-center justify-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              Kekuatan Email
            </div>
            <div className="text-2xl font-black text-rose-800">{Math.round(enamelHealth)}%</div>
          </div>
        </div>
      </div>

      {/* Arena */}
      <div className="relative w-full h-80 sm:h-96 bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-50 rounded-3xl border-4 border-purple-200 overflow-hidden shadow-inner flex items-center justify-center select-none">
        {/* Background Gigantic Tooth Illustration */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <svg viewBox="0 0 200 240" className="w-72 h-72">
            <path
              d="M60 25 C30 28 20 65 24 105 C28 140 38 175 48 215 C54 228 72 225 78 205 C85 180 92 165 100 165 C108 165 115 180 122 205 C128 225 146 228 152 215 C162 175 172 140 176 105 C180 65 170 28 140 25 C122 23 110 33 100 33 C90 33 78 23 60 25 Z"
              fill="#FFFFFF"
              stroke="#60A5FA"
              strokeWidth="8"
            />
          </svg>
        </div>

        {/* Fluoride Shield Effect Aura */}
        {powerShield && (
          <div className="absolute inset-0 bg-cyan-400/20 border-8 border-cyan-400 animate-pulse pointer-events-none z-10 flex items-center justify-center">
            <span className="bg-cyan-500 text-white font-black text-xs sm:text-sm px-4 py-1.5 rounded-full shadow-lg">
              🛡️ PERISAI FLUORIDE AKTIF! EMAIL GIGI TERLINDUNGI!
            </span>
          </div>
        )}

        {/* Germs on the board */}
        {isPlaying &&
          germs.map(germ => {
            if (!germ.alive) {
              return (
                <div
                  key={germ.id}
                  style={{ left: `${germ.x}%`, top: `${germ.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 animate-ping font-black text-sky-500 text-sm"
                >
                  ✨ BUSAA! +{germ.points}
                </div>
              );
            }

            return (
              <button
                key={germ.id}
                onClick={() => hitGerm(germ.id)}
                style={{ left: `${germ.x}%`, top: `${germ.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-transform active:scale-75 hover:scale-110 cursor-pointer focus:outline-none drop-shadow-lg"
              >
                {germ.type === 'cario' && (
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-purple-600 border-3 border-purple-900 flex items-center justify-center text-2xl animate-bounce shadow-md">
                      😈
                    </div>
                    <span className="text-[10px] font-black bg-purple-900 text-white px-1.5 py-0.5 rounded-full mt-0.5">
                      Cario (S. mutans)
                    </span>
                  </div>
                )}
                {germ.type === 'plaqy' && (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500 border-3 border-amber-800 flex items-center justify-center text-xl animate-pulse shadow-md">
                      🦠
                    </div>
                    <span className="text-[10px] font-black bg-amber-800 text-white px-1.5 py-0.5 rounded-full mt-0.5">
                      Plaqy (Plak)
                    </span>
                  </div>
                )}
                {germ.type === 'sugary' && (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-pink-500 border-3 border-pink-800 flex items-center justify-center text-xl animate-spin-slow shadow-md">
                      🍭
                    </div>
                    <span className="text-[10px] font-black bg-pink-800 text-white px-1.5 py-0.5 rounded-full mt-0.5">
                      Sugary (Gula)
                    </span>
                  </div>
                )}
              </button>
            );
          })}

        {/* Start Game Overlay */}
        {!isPlaying && !gameOver && (
          <div className="text-center p-6 bg-white/95 rounded-3xl border-4 border-purple-300 shadow-2xl max-w-sm mx-4 z-30 flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-3xl shadow-inner">
              🪥
            </div>
            <h3 className="text-xl font-black text-slate-800">Siap Jadi Pahlawan Gigi?</h3>
            <p className="text-xs text-slate-600">
              Kuman-kuman asam ingin membuat lubang pada gigi! Ketuk kuman secepat mungkin untuk menyemprotkan busa pembersih!
            </p>
            <button
              onClick={startGame}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-sm rounded-xl shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all active:scale-95"
            >
              Mulai Basmi Kuman! 🚀
            </button>
          </div>
        )}

        {/* Game Over Screen */}
        {gameOver && (
          <div className="text-center p-6 bg-white/95 rounded-3xl border-4 border-rose-300 shadow-2xl max-w-sm mx-4 z-30 flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-3xl">
              🦷
            </div>
            <h3 className="text-xl font-black text-slate-800">Email Gigi Perlu Disikat!</h3>
            <p className="text-xs text-slate-600">
              Kuman sempat berkembang biak. Ingat pesan dokter gigi: sikat gigi 2 kali sehari agar kuman tidak sempat membuat lubang!
            </p>
            <div className="bg-slate-100 w-full py-2 rounded-xl text-center">
              <span className="text-xs font-bold text-slate-600">Skor Akhir: </span>
              <span className="text-lg font-black text-purple-700">{score}</span>
            </div>
            <button
              onClick={startGame}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-sm rounded-xl shadow-lg hover:from-emerald-600 hover:to-teal-600 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Main Lagi & Basmi Kuman!
            </button>
          </div>
        )}
      </div>

      {/* Bottom Bar: Powerup & Edu Note */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-purple-50 p-4 rounded-2xl border-2 border-purple-200">
        <div className="flex items-center gap-3">
          <button
            onClick={activateFluorideShield}
            disabled={!isPlaying || powerShield}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs transition-all shadow-sm ${
              isPlaying && !powerShield
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Shield className="w-4 h-4" />
            Aktifkan Perisai Fluoride
          </button>
          <span className="text-xs text-slate-600 font-semibold hidden sm:inline">
            💡 Fluoride memperkuat lapisan email gigi agar kebal terhadap serangan asam kuman!
          </span>
        </div>

        {combo > 2 && (
          <span className="text-xs font-black text-amber-600 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 animate-pulse">
            🔥 COMBO x{combo}! Sikat Kilat!
          </span>
        )}
      </div>
    </div>
  );
};
