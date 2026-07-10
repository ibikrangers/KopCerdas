import React, { useState } from 'react';
import { BookOpen, Check, X, Award, HelpCircle, ArrowRight, ShieldAlert, Award as BadgeIcon } from 'lucide-react';

export default function LearnSection({ onUnlockBadge }) {
  const [activeModule, setActiveModule] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState({}); // Track which modules have been answered correctly

  const modules = [
    {
      title: '1. Definisi & Nilai Dasar',
      subtitle: 'Memahami apa itu Koperasi dan fondasi gotong royong.',
      badgeName: 'Definisi Hero 🛡️',
      color: 'var(--color-violet)',
      content: (
        <div className="learn-module-content">
          <p className="lead-text">
            Kata <strong>Koperasi</strong> berasal dari bahasa Inggris <em>cooperation</em>, yang artinya kerja sama. Di Indonesia, koperasi adalah badan usaha yang beranggotakan orang-seorang atau badan hukum koperasi dengan melandaskan kegiatannya berdasarkan prinsip koperasi sekaligus sebagai gerakan ekonomi rakyat yang berdasarkan atas <strong>asas kekeluargaan</strong>.
          </p>
          <div className="highlight-grid">
            <div className="highlight-item glass">
              <h4>🤝 Asas Kekeluargaan</h4>
              <p>Keputusan diambil demi kesejahteraan bersama, bukan keuntungan individu semata. Semua anggota saling menolong.</p>
            </div>
            <div className="highlight-item glass">
              <h4>🏗️ Gotong Royong</h4>
              <p>Bahu-membahu membangun usaha. Beban kerja dan keuntungan dipikul serta dinikmati bersama secara adil.</p>
            </div>
          </div>
          <div className="vs-box glass">
            <h4>Koperasi vs Perseroan Terbatas (PT)</h4>
            <div className="vs-table">
              <div className="vs-header-row">
                <div>Fitur</div>
                <div>Koperasi</div>
                <div>PT (Perusahaan Biasa)</div>
              </div>
              <div className="vs-row">
                <div className="vs-feature">Tujuan Utama</div>
                <div className="vs-coop">Mensejahterakan anggota</div>
                <div className="vs-pt">Mengejar profit maksimal pemilik</div>
              </div>
              <div className="vs-row">
                <div className="vs-feature">Hak Suara</div>
                <div className="vs-coop">1 Anggota = 1 Suara (Demokratis)</div>
                <div className="vs-pt">Tergantung jumlah saham (Modal)</div>
              </div>
              <div className="vs-row">
                <div className="vs-feature">Pembagian Hasil</div>
                <div className="vs-coop">SHU (Adil sesuai keaktifan)</div>
                <div className="vs-pt">Dividen (Sesuai persentase modal)</div>
              </div>
            </div>
          </div>
        </div>
      ),
      quiz: {
        question: 'Apa asas utama yang melandasi kegiatan koperasi di Indonesia?',
        options: [
          'Asas kebebasan pasar mutlak',
          'Asas kekeluargaan dan gotong royong',
          'Asas kepemilikan modal terbesar',
          'Asas persaingan individu bebas'
        ],
        correct: 1, // index 1
        explanation: 'Koperasi di Indonesia didirikan berlandaskan Asas Kekeluargaan dan Gotong Royong sebagaimana tertuang dalam UUD 1945 Pasal 33.'
      }
    },
    {
      title: '2. Prinsip-Prinsip Koperasi',
      subtitle: 'Aturan main agar koperasi berjalan adil dan demokratis.',
      badgeName: 'Prinsip Master ⚙️',
      color: 'var(--color-mint)',
      content: (
        <div className="learn-module-content">
          <p className="lead-text">
            Berdasarkan UU No. 25 Tahun 1992 tentang Perkoperasian, terdapat 5 prinsip utama koperasi Indonesia ditambah 2 prinsip pengembangan:
          </p>
          <div className="principles-list">
            <div className="principle-item glass">
              <span className="principle-num">1</span>
              <div>
                <h4>Keanggotaan bersifat sukarela dan terbuka</h4>
                <p>Siapa saja boleh bergabung tanpa paksaan, dan keluar kapan pun dengan mekanisme yang diatur bersama.</p>
              </div>
            </div>
            <div className="principle-item glass">
              <span className="principle-num">2</span>
              <div>
                <h4>Pengelolaan dilakukan secara demokratis</h4>
                <p>Pengurus dipilih oleh anggota lewat Rapat Anggota, dan setiap keputusan besar diputuskan bersama.</p>
              </div>
            </div>
            <div className="principle-item glass">
              <span className="principle-num">3</span>
              <div>
                <h4>Pembagian SHU secara adil sebanding jasa usaha</h4>
                <p>Makin banyak kamu belanja atau nabung di koperasi, makin besar bagian keuntungan (SHU) yang kamu terima!</p>
              </div>
            </div>
            <div className="principle-item glass">
              <span className="principle-num">4</span>
              <div>
                <h4>Balas jasa yang terbatas terhadap modal</h4>
                <p>Bunga atau balas jasa modal tidak boleh berlebihan, karena modal di koperasi hanya alat pembantu, bukan penguasa.</p>
              </div>
            </div>
            <div className="principle-item glass">
              <span className="principle-num">5</span>
              <div>
                <h4>Kemandirian</h4>
                <p>Koperasi harus bisa berdiri sendiri tanpa bergantung atau disetir oleh pihak luar.</p>
              </div>
            </div>
          </div>
        </div>
      ),
      quiz: {
        question: 'Bagaimana hak suara anggota ditentukan dalam pengambilan keputusan koperasi?',
        options: [
          'Anggota dengan simpanan modal paling banyak mendapat hak suara terbesar',
          'Pengurus koperasi memiliki seluruh hak suara',
          'Setiap anggota memiliki satu hak suara yang sama (demokratis)',
          'Hak suara dibeli menggunakan koin khusus'
        ],
        correct: 2,
        explanation: 'Prinsip pengelolaan demokratis menegaskan bahwa setiap anggota memiliki tepat 1 hak suara (one man one vote) tanpa memandang jumlah modal yang mereka simpan.'
      }
    },
    {
      title: '3. Jenis-Jenis Koperasi',
      subtitle: 'Koperasi ada banyak macamnya sesuai kebutuhan anggota.',
      badgeName: 'Kop-Spesialis 🎒',
      color: 'var(--color-orange)',
      content: (
        <div className="learn-module-content">
          <p className="lead-text">
            Koperasi digolongkan menjadi beberapa jenis berdasarkan kesamaan kegiatan dan kepentingan ekonomi anggotanya:
          </p>
          <div className="types-grid">
            <div className="type-item glass border-violet">
              <span className="badge badge-violet">Konsumen</span>
              <h4>Koperasi Konsumen</h4>
              <p>Menjual barang-barang kebutuhan sehari-hari (sembako, alat tulis, jajan) untuk anggotanya dengan harga murah. Contoh: Koperasi Karyawan, Koperasi Sekolah.</p>
            </div>
            <div className="type-item glass border-mint">
              <span className="badge badge-mint">Simpan Pinjam</span>
              <h4>Koperasi Simpan Pinjam (KSP)</h4>
              <p>Wadah anggota menabung (simpanan) dan meminjam uang dengan bunga rendah dan syarat mudah demi menghindari lintah darat.</p>
            </div>
            <div className="type-item glass border-orange">
              <span className="badge badge-orange">Produsen</span>
              <h4>Koperasi Produsen</h4>
              <p>Beranggotakan para produsen (pembuat barang) untuk membeli bahan baku bersama dan memasarkan produk mereka. Contoh: Koperasi Susu Sapi KPBS Pangalengan, Koperasi Pengrajin Batik.</p>
            </div>
            <div className="type-item glass border-blue">
              <span className="badge badge-blue">Jasa</span>
              <h4>Koperasi Jasa</h4>
              <p>Menyediakan layanan jasa untuk kepentingan anggotanya. Contoh: Koperasi Angkutan Umum (seperti Kopaja/JakLingko), Koperasi Jasa Keuangan.</p>
            </div>
          </div>
        </div>
      ),
      quiz: {
        question: 'Jika sekelompok petani berkumpul membuat koperasi untuk membeli pupuk murah secara grosir dan menjual beras bersama, jenis koperasi apa yang paling cocok?',
        options: [
          'Koperasi Simpan Pinjam',
          'Koperasi Jasa',
          'Koperasi Produsen / Pemasaran',
          'Koperasi Konsumen Sekolah'
        ],
        correct: 2,
        explanation: 'Koperasi Produsen atau Pemasaran sangat cocok untuk produsen (dalam hal ini petani) agar bisa memotong rantai tengkulak dalam membeli bahan baku (pupuk) dan memasarkan hasil panen (beras).'
      }
    },
    {
      title: '4. Mekanisme RAT & SHU',
      subtitle: 'Pesta Demokrasi & Pembagian Hasil di akhir tahun buku.',
      badgeName: 'SHU Tycoon 💰',
      color: 'var(--color-blue)',
      content: (
        <div className="learn-module-content">
          <p className="lead-text">
            Di akhir periode (biasanya setahun sekali), seluruh pengurus dan anggota mengadakan pertemuan besar yang disebut **RAT (Rapat Anggota Tahunan)**. Ini adalah kekuasaan tertinggi di Koperasi.
          </p>
          <div className="rat-steps">
            <div className="step-card glass">
              <h4>📢 Laporan & Evaluasi</h4>
              <p>Pengurus melaporkan kinerja keuangan, untung-rugi, dan rencana tahun depan kepada seluruh anggota.</p>
            </div>
            <div className="step-card glass">
              <h4>🗳️ Pengambilan Keputusan</h4>
              <p>Anggota memilih pengurus baru, menyetujui anggaran, dan memutuskan alokasi penggunaan keuntungan koperasi.</p>
            </div>
            <div className="step-card glass">
              <h4>💸 Distribusi SHU (Sisa Hasil Usaha)</h4>
              <p>Keuntungan bersih setelah dikurangi dana cadangan dibagikan kembali ke anggota sebagai balas jasa.</p>
            </div>
          </div>

          <div className="shu-formula-box glass">
            <h4>Bagaimana SHU Anggota Dihitung?</h4>
            <p>SHU per anggota terdiri dari dua bagian:</p>
            <div className="formula-cards">
              <div className="formula-card">
                <h5>1. Jasa Modal (JM)</h5>
                <p>Bagian keuntungan karena menyimpan modal (Simpanan Pokok & Wajib).</p>
                <code className="code-formula">JM = (Simpananmu / Total Simpanan Koperasi) × Alokasi SHU Modal</code>
              </div>
              <div className="formula-card">
                <h5>2. Jasa Anggota / Transaksi (JA)</h5>
                <p>Bagian keuntungan karena kamu rajin bertransaksi (belanja/pinjam) di koperasi.</p>
                <code className="code-formula">JA = (Belanjamu / Total Belanja Koperasi) × Alokasi SHU Transaksi</code>
              </div>
            </div>
            <div className="formula-sum text-center">
              <strong>Total SHU Kamu = Jasa Modal + Jasa Anggota</strong>
            </div>
          </div>
        </div>
      ),
      quiz: {
        question: 'Roni memiliki simpanan kecil di koperasi tapi dia adalah pelanggan paling setia yang belanja setiap hari. Manakah porsi SHU yang akan ia dapatkan paling besar?',
        options: [
          'Jasa Modal (JM)',
          'Jasa Anggota / Jasa Usaha (JA)',
          'Bonus dari Pengurus Koperasi',
          'Dividen Saham Utama'
        ],
        correct: 1,
        explanation: 'Jasa Anggota (atau Jasa Usaha) dihitung dari keaktifan belanja/transaksi anggota di koperasi. Karena Roni belanja setiap hari, porsi Jasa Anggota-nya akan sangat besar, meskipun modal simpanannya kecil.'
      }
    }
  ];

  const handleSelectAnswer = (idx) => {
    if (quizSubmitted) return;
    setSelectedAnswer(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    setQuizSubmitted(true);
    
    const currentQuiz = modules[activeModule].quiz;
    if (selectedAnswer === currentQuiz.correct) {
      const updated = { ...correctAnswers, [activeModule]: true };
      setCorrectAnswers(updated);
      
      // Notify parent app (to unlock badge/award)
      if (onUnlockBadge) {
        onUnlockBadge(modules[activeModule].badgeName);
      }
    }
  };

  const handleNextModule = () => {
    setActiveModule((prev) => (prev + 1) % modules.length);
    setSelectedAnswer(null);
    setQuizSubmitted(false);
  };

  const activeModuleData = modules[activeModule];
  const isCorrect = selectedAnswer === activeModuleData.quiz.correct;

  return (
    <div className="learn-container" id="learning-section-root">
      {/* Header */}
      <div className="learn-header text-center">
        <h2 className="section-title">Pusat Edukasi KopCerdas</h2>
        <p className="section-subtitle">
          Yuk pelajari dasar-dasar perkoperasian Indonesia melalui modul interaktif. Selesaikan kuis di setiap akhir modul untuk membuka lencana penghargaan!
        </p>
      </div>

      <div className="learn-layout">
        {/* Left Sidebar Links */}
        <aside className="learn-sidebar">
          {modules.map((mod, idx) => {
            const isCompleted = correctAnswers[idx];
            return (
              <button
                key={idx}
                id={`learn-sidebar-tab-${idx}`}
                className={`sidebar-btn ${activeModule === idx ? 'active' : ''}`}
                onClick={() => {
                  setActiveModule(idx);
                  setSelectedAnswer(null);
                  setQuizSubmitted(false);
                }}
                style={{
                  borderLeftColor: activeModule === idx ? mod.color : 'transparent'
                }}
              >
                <div className="sidebar-btn-info">
                  <span className="sidebar-btn-title">{mod.title}</span>
                  <span className="sidebar-btn-sub">{mod.subtitle}</span>
                </div>
                {isCompleted && (
                  <span className="completion-badge" title="Unlocked Badge!">
                    🏆
                  </span>
                )}
              </button>
            );
          })}

          <div className="unlocked-badges-box glass">
            <h4>Lencana Terbuka ({Object.keys(correctAnswers).length} / 4)</h4>
            <div className="badges-flex">
              {modules.map((mod, idx) => {
                const isUnlocked = correctAnswers[idx];
                return (
                  <div 
                    key={idx} 
                    className={`badge-item-mini ${isUnlocked ? 'unlocked' : 'locked'}`}
                    title={isUnlocked ? mod.badgeName : 'Selesaikan kuis untuk membuka'}
                  >
                    {isUnlocked ? mod.badgeName.split(' ')[1] : '🔒'}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Module Content Area */}
        <main className="learn-main glass">
          <div className="module-title-bar" style={{ borderBottomColor: activeModuleData.color }}>
            <div>
              <h3>{activeModuleData.title}</h3>
              <p>{activeModuleData.subtitle}</p>
            </div>
            <div className="module-badge-meta">
              <span className="badge badge-violet">
                Reward: {activeModuleData.badgeName}
              </span>
            </div>
          </div>

          {/* Core Text */}
          <div className="module-body-scroll">
            {activeModuleData.content}

            {/* Micro-Quiz Box */}
            <div className="micro-quiz-box glass" id={`micro-quiz-${activeModule}`}>
              <div className="quiz-header">
                <HelpCircle size={18} className="quiz-header-icon" />
                <h4>Mini Kuis: Uji Pemahamanmu</h4>
              </div>

              <p className="quiz-question">{activeModuleData.quiz.question}</p>

              <div className="quiz-options-list">
                {activeModuleData.quiz.options.map((opt, oIdx) => {
                  let optionClass = 'quiz-option';
                  if (selectedAnswer === oIdx) optionClass += ' selected';
                  
                  if (quizSubmitted) {
                    if (oIdx === activeModuleData.quiz.correct) {
                      optionClass += ' correct';
                    } else if (selectedAnswer === oIdx) {
                      optionClass += ' incorrect';
                    } else {
                      optionClass += ' disabled';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      id={`quiz-option-${activeModule}-${oIdx}`}
                      className={optionClass}
                      onClick={() => handleSelectAnswer(oIdx)}
                      disabled={quizSubmitted}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + oIdx)}</span>
                      <span className="option-text">{opt}</span>
                      {quizSubmitted && oIdx === activeModuleData.quiz.correct && (
                        <Check size={16} className="check-icon" />
                      )}
                      {quizSubmitted && selectedAnswer === oIdx && oIdx !== activeModuleData.quiz.correct && (
                        <X size={16} className="x-icon" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="quiz-actions-row">
                {!quizSubmitted ? (
                  <button
                    id="submit-quiz-btn"
                    className="btn btn-mint btn-sm"
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                  >
                    Kirim Jawaban
                  </button>
                ) : (
                  <div className="quiz-feedback-container">
                    {isCorrect ? (
                      <div className="feedback-banner success">
                        🎉 <strong>Hebat! Jawabanmu Benar.</strong> Kamu berhasil membuka lencana <strong>{activeModuleData.badgeName}</strong>!
                      </div>
                    ) : (
                      <div className="feedback-banner failure">
                        ❌ <strong>Kurang tepat.</strong> Coba pelajari materi di atas sekali lagi.
                      </div>
                    )}
                    
                    <div className="feedback-explanation">
                      <p>{activeModuleData.quiz.explanation}</p>
                    </div>

                    <div className="feedback-actions">
                      {!isCorrect && (
                        <button
                          id="retry-quiz-btn"
                          className="btn btn-outline btn-sm"
                          onClick={() => {
                            setSelectedAnswer(null);
                            setQuizSubmitted(false);
                          }}
                        >
                          Coba Lagi
                        </button>
                      )}
                      <button
                        id="next-module-btn"
                        className="btn btn-primary btn-sm"
                        onClick={handleNextModule}
                      >
                        <span>Modul Berikutnya</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
