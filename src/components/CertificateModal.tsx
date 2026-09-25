import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';
import { Award, Printer, Download, Sparkles, Check, Star, Calendar, User, ShieldCheck } from 'lucide-react';

interface DayTrack {
  day: string;
  morning: boolean;
  night: boolean;
}

const DEFAULT_DAYS: DayTrack[] = [
  { day: 'Senin', morning: false, night: false },
  { day: 'Selasa', morning: false, night: false },
  { day: 'Rabu', morning: false, night: false },
  { day: 'Kamis', morning: false, night: false },
  { day: 'Jumat', morning: false, night: false },
  { day: 'Sabtu', morning: false, night: false },
  { day: 'Minggu', morning: false, night: false },
];

export const CertificateModal: React.FC = () => {
  const [childName, setChildName] = useState('Pahlawan Gigi Cilik');
  const [heroTitle, setHeroTitle] = useState('Pahlawan Senyum Berkilau');
  const [trackingDays, setTrackingDays] = useState<DayTrack[]>(() => {
    try {
      const saved = localStorage.getItem('gigi_ceria_tracker');
      return saved ? JSON.parse(saved) : DEFAULT_DAYS;
    } catch {
      return DEFAULT_DAYS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('gigi_ceria_tracker', JSON.stringify(trackingDays));
    } catch {}
  }, [trackingDays]);

  const toggleCheck = (dayIndex: number, time: 'morning' | 'night') => {
    sound.playPop();
    setTrackingDays(prev =>
      prev.map((item, idx) => {
        if (idx === dayIndex) {
          const updated = { ...item, [time]: !item[time] };
          return updated;
        }
        return item;
      })
    );
  };

  const handlePrint = () => {
    sound.playSuccess();
    confetti({
      particleCount: 80,
      spread: 60,
    });
    window.print();
  };

  const totalChecks = trackingDays.reduce(
    (acc, d) => acc + (d.morning ? 1 : 0) + (d.night ? 1 : 0),
    0
  );

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border-4 border-amber-100 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-bold text-xs uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-500" />
            Penghargaan & Buku Harian Sikat Gigi
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mt-1">
            Sertifikat & Kalender Pahlawan Gigi 📜✨
          </h2>
          <p className="text-sm text-slate-600">
            Ketik nama anak, cetak sertifikat penghargaan resmi, dan ceklis rutinitas sikat gigi pagi & malam!
          </p>
        </div>

        {/* Action Button: Print */}
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-black text-sm rounded-2xl shadow-lg transition-all active:scale-95 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          Cetak Sertifikat
        </button>
      </div>

      {/* Name Input Bar */}
      <div className="bg-amber-50 rounded-2xl p-4 border-2 border-amber-200 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm shrink-0">
          <User className="w-4 h-4 text-amber-600" />
          Nama Pahlawan:
        </div>
        <input
          type="text"
          value={childName}
          onChange={e => setChildName(e.target.value)}
          placeholder="Ketik nama anak di sini..."
          className="flex-1 bg-white border-2 border-amber-300 rounded-xl px-4 py-2 font-bold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <select
          value={heroTitle}
          onChange={e => setHeroTitle(e.target.value)}
          className="bg-white border-2 border-amber-300 rounded-xl px-3 py-2 font-bold text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <option value="Pahlawan Senyum Berkilau">Gelar: Pahlawan Senyum Berkilau</option>
          <option value="Penakluk Kuman Gigi Cilik">Gelar: Penakluk Kuman Gigi Cilik</option>
          <option value="Sahabat Dokter Gigi Pintar">Gelar: Sahabat Dokter Gigi Pintar</option>
          <option value="Juara Sikat Gigi 2 Menit">Gelar: Juara Sikat Gigi 2 Menit</option>
        </select>
      </div>

      {/* Official Certificate Visual Component (Printable) */}
      <div
        id="printable-certificate"
        className="relative bg-gradient-to-b from-amber-50 via-white to-amber-50 rounded-3xl p-8 sm:p-12 border-8 border-double border-amber-400 shadow-2xl text-center flex flex-col items-center gap-4 overflow-hidden"
      >
        {/* Decorative corner ribbons */}
        <div className="absolute top-3 left-3 w-12 h-12 border-t-4 border-l-4 border-amber-500 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-3 right-3 w-12 h-12 border-t-4 border-r-4 border-amber-500 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-12 h-12 border-b-4 border-l-4 border-amber-500 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-12 h-12 border-b-4 border-r-4 border-amber-500 rounded-br-xl pointer-events-none" />

        {/* Emblem */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 p-1.5 shadow-xl flex items-center justify-center border-4 border-white">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl shadow-inner">
            🦷
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs uppercase font-black tracking-widest text-amber-600">
            Sertifikat Penghargaan Resmi
          </div>
          <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            PAHLAWAN KESEHATAN GIGI CILIK
          </h3>
          <p className="text-xs text-slate-500">
            Diberikan dengan bangga atas keberanian, ketekunan, dan komitmen menjaga kesehatan gigi & mulut
          </p>
        </div>

        <div className="my-2 py-2 px-8 border-b-2 border-amber-400">
          <span className="text-2xl sm:text-3xl font-black text-indigo-700 tracking-wide">
            {childName || 'Pahlawan Gigi Cilik'}
          </span>
        </div>

        <div className="inline-block px-4 py-1.5 bg-amber-100 border border-amber-300 rounded-full text-xs font-black text-amber-800 shadow-sm">
          🏆 Gelar Kehormatan: {heroTitle}
        </div>

        <p className="text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed mt-2">
          Telah berhasil mempelajari dan mempraktikkan cara menyikat gigi 2 menit dengan benar,
          memilah makanan sehat sahabat gigi, serta mengalahkan monster kuman demi senyum yang sehat, kuat, dan berkilau!
        </p>

        {/* Seal and Signatures */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4 items-center justify-between pt-6 border-t-2 border-dashed border-amber-200 mt-4 text-xs text-slate-500">
          <div className="text-center">
            <div className="font-serif italic text-base text-indigo-800">drg. Si Ceria</div>
            <div className="border-t border-slate-300 pt-1 mt-1 font-bold text-slate-600">
              Dokter Gigi Sahabat Anak
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full border-2 border-amber-500 bg-amber-100 flex items-center justify-center font-black text-[10px] text-amber-800 shadow-sm rotate-6">
              STEMPEL RESMI
            </div>
          </div>

          <div className="text-center col-span-2 sm:col-span-1">
            <div className="font-serif italic text-base text-indigo-800">Promkes Gigi</div>
            <div className="border-t border-slate-300 pt-1 mt-1 font-bold text-slate-600">
              Pelindung Senyum Indonesia
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Brushing Tracker Section */}
      <div className="bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50 rounded-3xl p-6 border-3 border-indigo-200 flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <h4 className="text-lg font-black text-slate-800">
              Kalender Checklist Sikat Gigi 7 Hari
            </h4>
          </div>
          <div className="text-xs font-bold text-indigo-700 bg-white px-3 py-1 rounded-full shadow-sm">
            ⭐ {totalChecks} dari 14 Checklist Selesai ({Math.round((totalChecks / 14) * 100)}%)
          </div>
        </div>

        <p className="text-xs text-slate-600">
          Ketuk lingkaran setiap kali kamu selesai menyikat gigi di pagi hari setelah sarapan dan malam hari sebelum tidur!
        </p>

        {/* Tracker Table / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {trackingDays.map((item, idx) => (
            <div
              key={item.day}
              className="bg-white rounded-2xl p-3 border-2 border-indigo-100 shadow-sm flex flex-col items-center gap-2 text-center"
            >
              <span className="font-black text-xs text-indigo-900">{item.day}</span>

              {/* Morning Button */}
              <button
                onClick={() => toggleCheck(idx, 'morning')}
                className={`w-full py-2 px-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  item.morning
                    ? 'bg-amber-400 text-white shadow-sm ring-1 ring-amber-500'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              >
                <span>☀️ Pagi</span>
                {item.morning && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </button>

              {/* Night Button */}
              <button
                onClick={() => toggleCheck(idx, 'night')}
                className={`w-full py-2 px-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  item.night
                    ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-700'
                    : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100'
                }`}
              >
                <span>🌙 Malam</span>
                {item.night && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
