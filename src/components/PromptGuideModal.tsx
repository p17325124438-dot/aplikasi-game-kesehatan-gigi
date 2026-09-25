import React, { useState } from 'react';
import { sound } from '../utils/soundEffects';
import { Copy, Check, Sparkles, BookOpen, Layers, Target, Palette, CheckCircle2, ChevronRight } from 'lucide-react';

export const PROMPTS_DATA = [
  {
    id: 'gold-standard',
    title: 'Prompt 1: Standar Emas (Aplikasi Komprehensif Anak)',
    badge: 'Paling Lengkap & Direkomendasikan',
    description: 'Prompt lengkap untuk membangun aplikasi web edukasi kesehatan gigi anak dengan berbagai modul game, timer 2 menit Kemenkes, dan sertifikat.',
    content: `Buatkan aplikasi web interaktif edukasi kesehatan gigi dan mulut untuk anak-anak usia 4-10 tahun bernama "Gigi Ceria: Petualangan Pahlawan Gigi".

1. TARGET & IDENTITAS:
- Target pengguna: Anak-anak TK dan SD, didampingi orang tua atau guru/tenaga promkes kesehatan gigi.
- Nada komunikasi: Menyenangkan, ramah, penuh semangat, bahasa Indonesia yang mudah dipahami, tanpa istilah medis yang rumit.
- Maskot utama: Karakter gigi kartun ceria ("Gigi Ceria") dengan berbagai ekspresi (tersenyum berkilau, kotor meminta disikat, memakai jubah pahlawan).

2. DESAIN VISUAL & WARNA:
- Palet warna cerah, kontras, dan menyenangkan anak-anak:
  * Biru Langit Ceria (Sky Blue #0284C7) untuk nuansa air bersih & kesegaran.
  * Kuning Emas/Bintang (#F59E0B) untuk koin, bintang, dan sertifikat pahlawan.
  * Merah Muda/Coral (#FB7185) untuk gusi sehat dan lidah.
  * Hijau Mint/Emerald (#10B981) untuk makanan sehat dan pasta gigi fluoride.
- Tombol bergaya rounded (rounded-2xl/3xl), efek drop-shadow lembut, animasi bouncing/micro-interactions yang responsif.
- Suara efek Web Audio API ceria (pop gelembung, denting bintang, lagu kemenangan).

3. FITUR & GAME INTERAKTIF:
A. Simulator Sikat Gigi 2 Menit (Standar Kemenkes RI/WHO):
   - Grafis rongga mulut terbuka dengan gigi yang memiliki noda makanan & plak kotor.
   - Anak menggerakkan sikat gigi di layar untuk membersihkan noda hingga 100%.
   - Ada pilihan rasa pasta gigi fluoride dengan takaran sebutir biji jagung (pea-sized).
   - Panduan 4 kuadran: Gigi depan memutar (merah ke putih), gigi geraham kunyah maju-mundur, gigi bagian dalam mencungkil, dan usapan lembut lidah.
   - Timer 2 menit dengan musik & selebrasi konfeti saat selesai.

B. Game Arkade "Basmi Monster Kuman Gigi":
   - Monster kuman lucu (Plaqy si plak, Cario si Streptococcus mutans, Sugary si kuman gula).
   - Anak mengetuk busa sabun untuk mengalahkan kuman sebelum mengurangi kekuatan email gigi.
   - Power-up: "Perisai Fluoride" dan "Air Putih Pembersih".

C. Game Pemilahan "Sahabat vs Musuh Gigi":
   - Memilah makanan sehat (Apel, Wortel, Susu Kalsium, Keju, Air) vs makanan perusak gigi (Permen lengket, Soda, Donat gula).
   - Setiap pilihan memberikan penjelasan singkat manfaat/bahayanya bagi gigi.

D. Panduan 7 Langkah Menyikat Gigi Kemenkes:
   - Infografis interaktif langkah 1 sampai 7 dengan gambar kartun ceria.
   - Edukasi waktu sikat gigi: 2x sehari (Pagi setelah sarapan & Malam sebelum tidur).

E. Sertifikat & Buku Harian Sikat Gigi:
   - Form memasukkan nama anak untuk mencetak Sertifikat Pahlawan Gigi resmi.
   - Kalender checklist 7 hari sikat gigi Pagi & Malam yang interaktif.`,
  },
  {
    id: 'game-centric',
    title: 'Prompt 2: Fokus Gamifikasi & Petualangan Sikat Gigi',
    badge: 'Fokus Game & Gameplay Cepat',
    description: 'Prompt ringkas terfokus pada gameplay arcade, audio effects, dan visual timer untuk membiasakan anak menyikat gigi tanpa bosan.',
    content: `Buatkan game edukasi sikat gigi anak interaktif berbasis web dengan React dan Tailwind CSS:

1. Konsep Utama: Petualangan Pahlawan Gigi mengalahkan Raja Kuman Gigi Berlubang.
2. Mekanisme Permainan:
   - Timer Sikat Gigi Real-Time 120 Detik (2 Menit) dengan visual kuadran gigi yang berganti setiap 30 detik.
   - Anak melakukan tap/swipe pada area gigi kotor untuk menghasilkan busa gelembung sabun dan suara pop yang memuaskan.
   - Indikator "Kekuatan Enamel" yang bertambah saat disikat dengan benar.
3. Desain & Audio:
   - Gaya visual kartun berwarna cerah (warna pastel tajam: biru muda, kuning lemon, pink permen, hijau daun).
   - Maskot gigi 2D ekspresif yang menari dan tersenyum saat gigi bersih.
   - Efek suara audio synth untuk setiap gesekan sikat, gelembung meletus, dan fanfare kemenangan.
4. Nilai Edukasi:
   - Menjelaskan aturan "Kumur cukup 1 kali agar fluoride tetap melindungi gigi".
   - Menyediakan sertifikat kelulusan pahlawan gigi dengan stempel bintang.`,
  },
  {
    id: 'promkes-poltekkes',
    title: 'Prompt 3: Media Promosi Kesehatan Gigi (Promkes Poltekkes)',
    badge: 'Standar Akademik & Penyuluhan',
    description: 'Prompt yang dirancang khusus untuk mahasiswa Keperawatan Gigi / Kedokteran Gigi untuk penyuluhan di sekolah (UKGS).',
    content: `Buatkan aplikasi web media promosi kesehatan gigi anak (Usaha Kesehatan Gigi Sekolah / UKGS) berbasis bukti klinis Kemenkes RI:

1. Tujuan Media: Media interaktif penyuluhan bagi mahasiswa/tenaga kesehatan gigi ke murid sekolah dasar.
2. Fitur Pokok:
   - Modul Demonstrasi Teknik Menyikat Gigi yang Baik dan Benar (Metode Roll / Fones untuk anak).
   - Media interaktif perbandingan gigi sehat berkilau vs gigi berlubang (karies dini / ECC).
   - Simulasi bahaya makanan manis kariogenik dan pentingnya makanan berserat pembersih alami.
   - Kuis interaktif 5 soal bergambar untuk evaluasi pemahaman (pre-test & post-test sederhana).
   - Tracker kebiasaan menyikat gigi 2 kali sehari (pagi setelah sarapan, malam sebelum tidur).
3. Pendekatan Desain:
   - Warna-warna ceria ramah anak (Ceria, atraktif, tidak menakutkan seperti klinik dewasa).
   - Interaksi sentuh ramah tablet/layar proyektor sekolah.
   - Sertifikat apresiasi anak dapat dicetak langsung sebagai reward UKGS.`,
  },
];

export const PromptGuideModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [selectedPromptId, setSelectedPromptId] = useState('gold-standard');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentPrompt = PROMPTS_DATA.find(p => p.id === selectedPromptId) || PROMPTS_DATA[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentPrompt.content);
    sound.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full border-4 border-amber-300 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden my-auto animate-scale-up">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 border-b-2 border-amber-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white text-amber-600 flex items-center justify-center text-2xl shadow-md">
              💡
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Formula & Prompt AI Studio Siap Pakai
              </h3>
              <p className="text-xs text-amber-900 font-bold">
                Tersusun terstruktur, jelas, akurat secara medis, dan dirancang khusus untuk visual cerah anak
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-700 font-black flex items-center justify-center shadow-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6">
          {/* Prompt Selection Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {PROMPTS_DATA.map(p => {
              const isSelected = p.id === selectedPromptId;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    sound.playPop();
                    setSelectedPromptId(p.id);
                  }}
                  className={`p-3 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-300'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="text-[10px] font-black uppercase text-amber-700 bg-amber-200/80 px-2 py-0.5 rounded-md inline-block mb-1">
                    {p.badge}
                  </div>
                  <div className="font-extrabold text-xs text-slate-900 leading-snug">{p.title}</div>
                </button>
              );
            })}
          </div>

          {/* Prompt Content Card */}
          <div className="relative bg-slate-900 text-slate-100 rounded-2xl p-5 font-mono text-xs leading-relaxed border-2 border-slate-700 shadow-inner">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-amber-400 font-bold text-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Prompt Teks Siap Salin ke Google AI Studio
              </span>

              <button
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-sans font-black text-xs transition-all cursor-pointer ${
                  copied
                    ? 'bg-emerald-500 text-white'
                    : 'bg-amber-400 hover:bg-amber-500 text-slate-950 active:scale-95'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Tersalin ke Clipboard! ✨' : 'Salin Prompt Ini'}
              </button>
            </div>

            <pre className="whitespace-pre-wrap font-mono text-xs text-slate-200 select-all overflow-x-auto max-h-72">
              {currentPrompt.content}
            </pre>
          </div>

          {/* Formula Anatomy Guide Box */}
          <div className="bg-gradient-to-r from-sky-50 via-indigo-50 to-purple-50 p-5 rounded-2xl border-2 border-indigo-200">
            <h4 className="text-sm font-black text-indigo-950 mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-600" />
              Formula 5 Pilar Prompt Terbaik untuk AI Studio (Edukasi Kesehatan Gigi):
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="bg-white p-3 rounded-xl border border-indigo-100 shadow-sm">
                <span className="font-black text-indigo-700">1. Role & Konteks Edukasi:</span>
                <p className="mt-0.5 text-slate-600">
                  Tentukan jelas audiens (anak 4-10 tahun) & standar medis (Kemenkes/WHO: sikat 2 menit, 2x sehari, pasta gigi fluoride sebutir biji jagung).
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-indigo-100 shadow-sm">
                <span className="font-black text-indigo-700">2. Palet Warna & Visual Ceria:</span>
                <p className="mt-0.5 text-slate-600">
                  Minta eksplisit palet warna cerah (Sky Blue, Sunny Yellow, Bubblegum Pink, Fresh Mint) dan elemen kartun yang tidak menakutkan.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-indigo-100 shadow-sm">
                <span className="font-black text-indigo-700">3. Interaktivitas & Game Loop:</span>
                <p className="mt-0.5 text-slate-600">
                  Sebutkan mekanik yang memuaskan: gesek sikat, letupkan kuman, pilah makanan sehat, timer 2 menit dengan musik & konfeti.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-indigo-100 shadow-sm">
                <span className="font-black text-indigo-700">4. Reward & Pembiasaan:</span>
                <p className="mt-0.5 text-slate-600">
                  Tambahkan Sertifikat Pahlawan Gigi yang bisa diisi nama anak dan tracker sikat harian (habit builder).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-semibold">
            Dirancang untuk mahasiswa Poltekkes Bandung, praktisi promkes, dan orang tua!
          </span>

          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="px-5 py-2 bg-slate-800 text-white rounded-xl font-bold text-xs hover:bg-slate-900 transition-all cursor-pointer"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
