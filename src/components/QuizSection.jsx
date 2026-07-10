import React, { useState } from 'react';
import { HelpCircle, Award, Check, X, RefreshCw, Trophy, BookOpen, Star } from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    question: '1. Siapakah Wakil Presiden pertama Indonesia yang juga dinobatkan sebagai Bapak Koperasi Indonesia?',
    options: [
      'Ir. Soekarno',
      'Drs. Mohammad Hatta (Bung Hatta)',
      'Ki Hajar Dewantara',
      'Sutan Sjahrir'
    ],
    correct: 1,
    explanation: 'Drs. Mohammad Hatta (Bung Hatta) sangat memperjuangkan ekonomi rakyat kecil melalui wadah koperasi dan resmi dinobatkan sebagai Bapak Koperasi Indonesia pada Kongres Koperasi II di Bandung tahun 1953.'
  },
  {
    question: '2. Dalam koperasi, kekuasaan tertinggi yang menetapkan anggaran dasar, memilih pengurus, dan membagi SHU dipegang oleh...',
    options: [
      'Ketua Koperasi / Pengurus Utama',
      'Rapat Anggota Tahunan (RAT)',
      'Badan Pengawas Keuangan Negara',
      'Kepala Dinas Koperasi Daerah'
    ],
    correct: 1,
    explanation: 'Rapat Anggota (RAT) adalah pemegang kekuasaan tertinggi di koperasi karena asas kedaulatan anggota secara demokratis.'
  },
  {
    question: '3. Di bawah ini, manakah yang merupakan kepanjangan serta hakikat pembagian SHU yang benar?',
    options: [
      'Selisih Hasil Utang, dibagi rata ke seluruh pengurus saja',
      'Sisa Hasil Usaha, dibagi adil berdasarkan partisipasi jasa usaha masing-masing anggota',
      'Simpanan Hari Usia, dibagikan saat anggota pensiun',
      'Saham Hasil Utama, dibagikan sesuai persentase kepemilikan modal terbanyak'
    ],
    correct: 1,
    explanation: 'SHU adalah Sisa Hasil Usaha. Pembagiannya adil sesuai dengan keaktifan anggota bertransaksi (jasa usaha) dan simpanan mereka (jasa modal), bukan hanya porsi modal terbanyak.'
  },
  {
    question: '4. Apa prinsip utama hak suara dalam rapat pengambilan keputusan koperasi?',
    options: [
      'Satu anggota memiliki satu hak suara (one member, one vote)',
      'Hak suara ditentukan oleh jumlah tabungan anggota',
      'Hanya pendiri pertama yang boleh menyumbang suara',
      'Hak suara ditentukan oleh tingkat pendidikan anggota'
    ],
    correct: 0,
    explanation: 'Prinsip pengelolaan demokratis menegaskan bahwa setiap anggota memiliki tepat 1 hak suara yang setara tanpa dipengaruhi jumlah simpanan modal mereka.'
  },
  {
    question: '5. Mengapa koperasi dianggap paling cocok dengan budaya masyarakat Indonesia?',
    options: [
      'Karena mengizinkan pinjaman tanpa modal sama sekali',
      'Karena berasaskan gotong royong dan kekeluargaan yang sesuai jati diri bangsa',
      'Karena tidak dikenakan pajak usaha oleh pemerintah',
      'Karena hanya beroperasi di wilayah perdesaan'
    ],
    correct: 1,
    explanation: 'Koperasi sangat cocok dengan kepribadian bangsa Indonesia yang mengutamakan musyawarah, kekeluargaan, dan gotong royong dalam menyelesaikan masalah bersama.'
  }
];

export default function QuizSection({ unlockedBadges = [], setActiveTab }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (idx) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
  };

  const handleNext = () => {
    // Check answer
    const currentQ = QUIZ_QUESTIONS[currentIdx];
    if (selectedOpt === currentQ.correct) {
      setScore(prev => prev + 1);
    }

    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  const getRank = () => {
    if (score === 5) {
      return {
        title: 'KopMaster Agung (Emas) 🥇👑',
        desc: 'Sempurna! Kamu memahami filosofi, prinsip, dan mekanisme koperasi dengan sangat baik. Layak memimpin koperasi nasional!',
        color: 'var(--color-yellow)'
      };
    } else if (score >= 3) {
      return {
        title: 'Saka Guru Muda (Perak) 🥈⭐',
        desc: 'Hebat! Kamu memiliki fondasi yang kuat tentang perkoperasian Indonesia. Sedikit latihan lagi untuk meraih predikat KopMaster!',
        color: 'var(--color-violet-light)'
      };
    } else {
      return {
        title: 'Anggota Koperasi Magang 🎓',
        desc: 'Peluang belajar masih luas! Yuk coba baca modul materi koperasi di tab materi sekali lagi untuk hasil yang lebih maksimal.',
        color: 'var(--text-secondary)'
      };
    }
  };

  return (
    <div className="quiz-section-container container" id="quiz-page-root">
      {/* Header */}
      <div className="quiz-header text-center">
        <h2 className="section-title">Kuis & Lencana KopCerdas</h2>
        <p className="section-subtitle">
          Uji pemahaman mendalammu mengenai Koperasi. Selesaikan kuis kelulusan di bawah untuk mendapatkan pangkat kehormatanmu!
        </p>
      </div>

      <div className="quiz-page-layout">
        
        {/* Left Side: Active Quiz Box */}
        <div className="quiz-card-box glass">
          {!showResult ? (
            /* Active Question Panel */
            <div className="active-quiz-panel" id="quiz-question-box">
              <div className="quiz-progress-bar">
                <span>Pertanyaan {currentIdx + 1} dari {QUIZ_QUESTIONS.length}</span>
                <div className="progress-bar-container mini">
                  <div 
                    className="progress-bar" 
                    style={{ 
                      width: `${((currentIdx) / QUIZ_QUESTIONS.length) * 100}%`,
                      backgroundColor: 'var(--color-violet)'
                    }}
                  ></div>
                </div>
              </div>

              <h3 className="quiz-question-text">{QUIZ_QUESTIONS[currentIdx].question}</h3>

              <div className="quiz-options-list">
                {QUIZ_QUESTIONS[currentIdx].options.map((opt, oIdx) => {
                  let optClass = 'quiz-option';
                  if (selectedOpt === oIdx) optClass += ' selected';
                  
                  return (
                    <button
                      key={oIdx}
                      id={`comprehensive-quiz-opt-${oIdx}`}
                      className={optClass}
                      onClick={() => handleOptionSelect(oIdx)}
                      disabled={isAnswered}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + oIdx)}</span>
                      <span className="option-text">{opt}</span>
                    </button>
                  );
                })}
              </div>

              <div className="quiz-submit-row text-right">
                <button
                  id="quiz-next-question-btn"
                  className="btn btn-primary"
                  onClick={handleNext}
                  disabled={selectedOpt === null}
                >
                  <span>{currentIdx === QUIZ_QUESTIONS.length - 1 ? 'Selesai Kuis' : 'Lanjut'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Results Panel */
            <div className="quiz-result-panel text-center animate-scale-in" id="quiz-final-results">
              <Trophy className="result-trophy text-yellow-light animate-bounce" size={72} />
              <h3 className="gradient-text">Kuis Selesai!</h3>
              <p className="result-score">Skor Kamu: <strong>{score} / {QUIZ_QUESTIONS.length}</strong></p>
              
              <div className="results-rank-card glass" style={{ borderColor: getRank().color }}>
                <span className="badge badge-violet">Pangkat Evaluasi</span>
                <h4 style={{ color: getRank().color, marginTop: '0.5rem', marginBottom: '0.5rem', fontWeight: 800 }}>{getRank().title}</h4>
                <p>{getRank().desc}</p>
              </div>

              <div className="completed-actions">
                <button 
                  id="restart-quiz-btn"
                  className="btn btn-mint btn-lg"
                  onClick={handleReset}
                >
                  <RefreshCw size={16} />
                  <span>Ulangi Kuis</span>
                </button>

                {score < 5 && (
                  <button 
                    id="back-to-materials-btn"
                    className="btn btn-secondary btn-lg"
                    onClick={() => setActiveTab('learn')}
                  >
                    <BookOpen size={16} />
                    <span>Pelajari Materi Lagi</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Badges Locker Room */}
        <div className="badges-locker-panel glass" id="badges-locker">
          <div className="locker-header">
            <Award size={22} className="text-yellow-light" />
            <h3>Ruang Lencana Kamu</h3>
          </div>
          <p className="locker-desc">Lencana yang berhasil kamu kumpulkan selama belajar dan mencoba simulasi sandbox KopCerdas:</p>

          <div className="locker-badges-grid">
            {/* Definisi */}
            <div className={`locker-badge-card glass ${unlockedBadges.includes('Definisi Hero 🛡️') ? 'unlocked' : 'locked'}`} id="badge-card-definisi">
              <span className="badge-emoji">{unlockedBadges.includes('Definisi Hero 🛡️') ? '🛡️' : '🔒'}</span>
              <div className="badge-meta">
                <h4>Definisi Hero</h4>
                <p>{unlockedBadges.includes('Definisi Hero 🛡️') ? 'Lencana Emas: Paham asas & nilai koperasi' : 'Kuis modul 1 di tab Materi'}</p>
              </div>
            </div>

            {/* Prinsip */}
            <div className={`locker-badge-card glass ${unlockedBadges.includes('Prinsip Master ⚙️') ? 'unlocked' : 'locked'}`} id="badge-card-prinsip">
              <span className="badge-emoji">{unlockedBadges.includes('Prinsip Master ⚙️') ? '⚙️' : '🔒'}</span>
              <div className="badge-meta">
                <h4>Prinsip Master</h4>
                <p>{unlockedBadges.includes('Prinsip Master ⚙️') ? 'Lencana Emas: Paham aturan demokratis' : 'Kuis modul 2 di tab Materi'}</p>
              </div>
            </div>

            {/* Spesialis */}
            <div className={`locker-badge-card glass ${unlockedBadges.includes('Kop-Spesialis 🎒') ? 'unlocked' : 'locked'}`} id="badge-card-spesialis">
              <span className="badge-emoji">{unlockedBadges.includes('Kop-Spesialis 🎒') ? '🎒' : '🔒'}</span>
              <div className="badge-meta">
                <h4>Kop-Spesialis</h4>
                <p>{unlockedBadges.includes('Kop-Spesialis 🎒') ? 'Lencana Emas: Paham jenis-jenis koperasi' : 'Kuis modul 3 di tab Materi'}</p>
              </div>
            </div>

            {/* SHU Tycoon */}
            <div className={`locker-badge-card glass ${unlockedBadges.includes('SHU Tycoon 💰') ? 'unlocked' : 'locked'}`} id="badge-card-shu">
              <span className="badge-emoji">{unlockedBadges.includes('SHU Tycoon 💰') ? '💰' : '🔒'}</span>
              <div className="badge-meta">
                <h4>SHU Tycoon</h4>
                <p>{unlockedBadges.includes('SHU Tycoon 💰') ? 'Lencana Emas: Paham alokasi pembagian SHU' : 'Kuis modul 4 di tab Materi'}</p>
              </div>
            </div>

            {/* Sandbox */}
            <div className={`locker-badge-card glass ${unlockedBadges.includes('Manajer Sandbox 🎮') ? 'unlocked' : 'locked'}`} id="badge-card-sandbox">
              <span className="badge-emoji">{unlockedBadges.includes('Manajer Sandbox 🎮') ? '🎮' : '🔒'}</span>
              <div className="badge-meta">
                <h4>Manajer Sandbox</h4>
                <p>{unlockedBadges.includes('Manajer Sandbox 🎮') ? 'Lencana Emas: Selesaikan simulasi RAT pertama' : 'Selesaikan simulator di tab Sandbox'}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
