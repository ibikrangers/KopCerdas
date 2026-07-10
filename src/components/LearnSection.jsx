import React, { useState } from 'react';
import { BookOpen, Check, X, Award, HelpCircle, ArrowRight, ShieldCheck, ChevronRight, HelpCircle as InfoIcon, RefreshCw } from 'lucide-react';

export default function LearnSection({ onUnlockBadge }) {
  const [activeModule, setActiveModule] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState({}); // Track completed modules

  // Module 1 Interactive States: Comparison
  const [activeCompareTab, setActiveCompareTab] = useState('tujuan');

  // Module 2 Interactive States: Flashcards flipped
  const [flippedCards, setFlippedCards] = useState({});
  const toggleFlipCard = (cardIdx) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardIdx]: !prev[cardIdx]
    }));
  };

  // Module 3 Interactive States: Types Selector & Simulation Logs
  const [activeTypeTab, setActiveTypeTab] = useState('konsumen');
  const [simLog, setSimLog] = useState('');
  const runTypeSim = (type) => {
    if (type === 'konsumen') {
      setSimLog('Rian belanja pulpen & buku seharga Rp 15.000 di Koperasi Sekolah. Koperasi mencatat transaksi Rian, dan Rian berhak atas SHU Jasa Anggota di akhir tahun!');
    } else if (type === 'simpan_pinjam') {
      setSimLog('Alya menabung Simpanan Wajib Rp 50.000. Kas Koperasi bertambah untuk modal usaha bersama, dan simpanan Alya tercatat aman dengan jasa modal adil.');
    } else if (type === 'produsen') {
      setSimLog('Petani menyetorkan 10 liter susu sapi segar ke koperasi produsen. Koperasi memasarkan susu ke pabrik besar secara kolektif, menghindarkan petani dari tengkulak.');
    } else if (type === 'jasa') {
      setSimLog('Supir angkot JakLingko mendaftar ke Koperasi Jasa Transportasi. Koperasi mengurus izin trayek dan perawatan armada bersama secara gotong royong.');
    }
  };

  // Module 4 Interactive States: RAT Workflow
  const [ratStep, setRatStep] = useState(0);
  const [votedCandidate, setVotedCandidate] = useState(null);
  // Module 4 Live Calculator
  const [miniDeposit, setMiniDeposit] = useState(500000);
  const [miniPurchase, setMiniPurchase] = useState(1000000);
  const miniJasaModal = (miniDeposit / 5000000) * 2000000;
  const miniJasaUsaha = (miniPurchase / 10000000) * 3000000;
  const miniTotalSHU = miniJasaModal + miniJasaUsaha;

  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const modules = [
    {
      title: '1. Definisi & Nilai Dasar',
      subtitle: 'Memahami apa itu Koperasi dan fondasi gotong royong.',
      badgeName: 'Definisi Hero 🛡️',
      color: 'var(--color-violet)',
      content: (
        <div className="learn-module-content">
          <p className="lead-text">
            Kata <strong>Koperasi</strong> berasal dari kata <em>cooperation</em> (kerja sama). Koperasi melandaskan kegiatannya berdasarkan prinsip kebersamaan dan <strong>asas kekeluargaan</strong>.
          </p>

          {/* Interactive Comparison Widget */}
          <div className="interactive-widget-box glass">
            <h4>Interactive: Bandingkan Koperasi vs PT (Perusahaan Biasa)</h4>
            <p className="widget-desc">Klik tombol di bawah untuk melihat perbedaan filosofi dan cara kerja keduanya:</p>
            
            <div className="compare-tabs">
              <button 
                className={`compare-tab-btn ${activeCompareTab === 'tujuan' ? 'active' : ''}`}
                onClick={() => setActiveCompareTab('tujuan')}
              >
                🎯 Tujuan Utama
              </button>
              <button 
                className={`compare-tab-btn ${activeCompareTab === 'suara' ? 'active' : ''}`}
                onClick={() => setActiveCompareTab('suara')}
              >
                🗳️ Hak Suara
              </button>
              <button 
                className={`compare-tab-btn ${activeCompareTab === 'hasil' ? 'active' : ''}`}
                onClick={() => setActiveCompareTab('hasil')}
              >
                💰 Pembagian Keuntungan
              </button>
            </div>

            <div className="compare-cards-row">
              <div className="compare-card coop-theme">
                <span className="card-badge">KOPERASI</span>
                {activeCompareTab === 'tujuan' && (
                  <div>
                    <h5>Mensejahterakan Anggota</h5>
                    <p>Fokus utama adalah membantu kebutuhan ekonomi para anggotanya secara adil dan gotong royong.</p>
                  </div>
                )}
                {activeCompareTab === 'suara' && (
                  <div>
                    <h5>1 Anggota = 1 Suara</h5>
                    <p>Sepenuhnya demokratis. Semua orang memiliki hak suara yang sama tanpa memedulikan modal simpanannya.</p>
                  </div>
                )}
                {activeCompareTab === 'hasil' && (
                  <div>
                    <h5>Sisa Hasil Usaha (SHU)</h5>
                    <p>Dibagi adil berdasarkan keaktifan anggota belanja atau menabung di koperasi.</p>
                  </div>
                )}
              </div>

              <div className="compare-card pt-theme">
                <span className="card-badge">PT (PERUSAHAAN BIASA)</span>
                {activeCompareTab === 'tujuan' && (
                  <div>
                    <h5>Maksimalisasi Profit Pemilik</h5>
                    <p>Fokus utama adalah menghasilkan keuntungan finansial sebesar-besarnya untuk pemilik saham.</p>
                  </div>
                )}
                {activeCompareTab === 'suara' && (
                  <div>
                    <h5>Tergantung Kepemilikan Saham</h5>
                    <p>Siapa yang memiliki modal terbesar, dialah yang menguasai jalannya suara dan keputusan perusahaan.</p>
                  </div>
                )}
                {activeCompareTab === 'hasil' && (
                  <div>
                    <h5>Dividen Saham</h5>
                    <p>Hanya dibagikan kepada pemegang saham sesuai porsi persentase kepemilikan modal mereka.</p>
                  </div>
                )}
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
        correct: 1,
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
            Berdasarkan UU No. 25 Tahun 1992, koperasi dijalankan dengan aturan/prinsip yang menjamin keadilan.
          </p>

          {/* Interactive Flashcards */}
          <div className="interactive-widget-box glass">
            <h4>Interactive Flashcards: Pelajari 5 Prinsip Koperasi</h4>
            <p className="widget-desc">Klik kartu di bawah untuk membalik (flip) dan melihat penjelasan detailnya:</p>
            
            <div className="flashcards-grid">
              {[
                { title: 'Sukarela & Terbuka', desc: 'Siapa saja boleh bergabung tanpa paksaan, dan keluar kapan pun secara terbuka sesuai mekanisme.', emoji: '🚪' },
                { title: 'Demokratis', desc: 'Pengelolaan dilakukan secara demokratis (1 orang = 1 suara) dalam Rapat Anggota Tahunan.', emoji: '🗳️' },
                { title: 'SHU yang Adil', desc: 'Sisa Hasil Usaha (SHU) dibagikan sebanding dengan jasa usaha dan keaktifan transaksi anggota.', emoji: '⚖️' },
                { title: 'Balas Jasa Terbatas', desc: 'Balas jasa terhadap modal yang diberikan bersifat terbatas agar modal tidak menguasai koperasi.', emoji: '💸' },
                { title: 'Kemandirian', desc: 'Koperasi harus berdiri sendiri, tidak bergantung atau dikendalikan oleh pihak luar koperasi.', emoji: '🏗️' }
              ].map((card, cIdx) => (
                <div 
                  key={cIdx} 
                  className={`flashcard-container ${flippedCards[cIdx] ? 'flipped' : ''}`}
                  onClick={() => toggleFlipCard(cIdx)}
                >
                  <div className="flashcard-inner">
                    <div className="flashcard-front">
                      <span className="card-emoji">{card.emoji}</span>
                      <h5>Prinsip {cIdx + 1}</h5>
                      <h4>{card.title}</h4>
                      <span className="click-hint">Klik untuk membalik 🔄</span>
                    </div>
                    <div className="flashcard-back">
                      <h5>Penjelasan:</h5>
                      <p>{card.desc}</p>
                      <span className="click-hint">Klik untuk membalik 🔄</span>
                    </div>
                  </div>
                </div>
              ))}
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
            Koperasi digolongkan menjadi beberapa jenis berdasarkan kesamaan kegiatan ekonomi anggotanya:
          </p>

          {/* Interactive Types Selector & Simulation */}
          <div className="interactive-widget-box glass">
            <h4>Interactive Simulator: Eksplorasi Jenis Koperasi</h4>
            <p className="widget-desc">Pilih tab di bawah dan klik tombol "Jalankan Simulasi Transaksi" untuk melihat contoh kasus nyata:</p>
            
            <div className="types-selector-tabs">
              {[
                { id: 'konsumen', label: '🛍️ Koperasi Konsumen', desc: 'Menjual barang kebutuhan sehari-hari dengan harga terjangkau bagi anggotanya.' },
                { id: 'simpan_pinjam', label: '💰 Koperasi Simpan Pinjam', desc: 'Menyediakan tempat menabung dan meminjam modal dengan bunga rendah/adil.' },
                { id: 'produsen', label: '🥛 Koperasi Produsen', desc: 'Membantu produsen membeli bahan baku secara grosir dan memasarkan hasil produksinya.' },
                { id: 'jasa', label: '🚖 Koperasi Jasa', desc: 'Menyediakan layanan jasa bersama (seperti transportasi atau pengiriman) bagi anggotanya.' }
              ].map(tab => (
                <button
                  key={tab.id}
                  className={`type-tab-btn ${activeTypeTab === tab.id ? 'active' : ''}`}
                  onClick={() => { setActiveTypeTab(tab.id); setSimLog(''); }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="type-tab-content">
              {activeTypeTab === 'konsumen' && (
                <div className="type-desc-panel animate-fade-in">
                  <h5>🛍️ Koperasi Konsumen</h5>
                  <p>Fokus pada penyediaan barang konsumsi sehari-hari. Contoh utama adalah **Koperasi Karyawan** atau **Koperasi Sekolah**.</p>
                  <button className="btn btn-mint btn-sm mt-1" onClick={() => runTypeSim('konsumen')}>Jalankan Simulasi Transaksi 🚀</button>
                </div>
              )}
              {activeTypeTab === 'simpan_pinjam' && (
                <div className="type-desc-panel animate-fade-in">
                  <h5>💰 Koperasi Simpan Pinjam (KSP)</h5>
                  <p>Membantu anggota mengumpulkan tabungan dan memberikan pinjaman modal usaha kecil tanpa jaminan berat.</p>
                  <button className="btn btn-mint btn-sm mt-1" onClick={() => runTypeSim('simpan_pinjam')}>Jalankan Simulasi Transaksi 🚀</button>
                </div>
              )}
              {activeTypeTab === 'produsen' && (
                <div className="type-desc-panel animate-fade-in">
                  <h5>🥛 Koperasi Produsen</h5>
                  <p>Sangat ideal bagi peternak susu sapi, pengrajin batik, atau petani untuk menghemat biaya operasional bersama.</p>
                  <button className="btn btn-mint btn-sm mt-1" onClick={() => runTypeSim('produsen')}>Jalankan Simulasi Transaksi 🚀</button>
                </div>
              )}
              {activeTypeTab === 'jasa' && (
                <div className="type-desc-panel animate-fade-in">
                  <h5>🚖 Koperasi Jasa</h5>
                  <p>Bergerak di bidang pelayanan jasa kolektif, seperti koperasi angkutan perkotaan (JakLingko/Kopaja).</p>
                  <button className="btn btn-mint btn-sm mt-1" onClick={() => runTypeSim('jasa')}>Jalankan Simulasi Transaksi 🚀</button>
                </div>
              )}

              {/* Simulation Output Logger */}
              {simLog && (
                <div className="sim-log-box animate-scale-in">
                  <span className="log-badge">LOG SIMULASI</span>
                  <p className="log-text">{simLog}</p>
                </div>
              )}
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
            Di akhir tahun buku, koperasi mengadakan **Rapat Anggota Tahunan (RAT)** untuk membahas pembagian Sisa Hasil Usaha (SHU).
          </p>

          {/* Interactive RAT Step Timeline */}
          <div className="interactive-widget-box glass">
            <h4>Interactive RAT: Ikuti Proses Rapat Anggota Tahunan</h4>
            <p className="widget-desc">Klik tombol langkah di bawah untuk mengikuti jalannya rapat:</p>
            
            <div className="rat-steps-timeline">
              {['📢 1. Laporan Pengurus', '🗳️ 2. Pengambilan Keputusan', '💸 3. Pembagian SHU'].map((step, sIdx) => (
                <button
                  key={sIdx}
                  className={`timeline-step-btn ${ratStep === sIdx ? 'active' : ''}`}
                  onClick={() => setRatStep(sIdx)}
                >
                  {step}
                </button>
              ))}
            </div>

            <div className="rat-step-content-box">
              {ratStep === 0 && (
                <div className="rat-scenario-view animate-fade-in">
                  <h5>📢 Laporan Pertanggungjawaban Pengurus</h5>
                  <p>Pengurus mempresentasikan laporan kas, keuntungan bersih, dan rencana kerja tahun depan kepada seluruh anggota yang hadir.</p>
                  <div className="scenario-action-box">
                    <p className="scenario-char-talk">💬 <strong>Alya (Bendahara):</strong> "Tahun ini koperasi kita mendapatkan keuntungan bersih (SHU berjalan) sebesar Rp 5.000.000!"</p>
                  </div>
                </div>
              )}
              {ratStep === 1 && (
                <div className="rat-scenario-view animate-fade-in">
                  <h5>🗳️ Pengambilan Keputusan Demokratis (Voting)</h5>
                  <p>Anggota memberikan suara secara voting (1 Orang = 1 Suara) untuk memilih pengurus baru tahun depan.</p>
                  <div className="scenario-action-box">
                    <p className="scenario-prompt">Pilih kandidat pengurus favoritmu di bawah:</p>
                    <div className="candidate-vote-row">
                      <button 
                        className={`btn btn-sm ${votedCandidate === 'dono' ? 'btn-mint' : 'btn-secondary'}`}
                        onClick={() => setVotedCandidate('dono')}
                      >
                        👨‍🎓 Dono the Scholar
                      </button>
                      <button 
                        className={`btn btn-sm ${votedCandidate === 'alya' ? 'btn-mint' : 'btn-secondary'}`}
                        onClick={() => setVotedCandidate('alya')}
                      >
                        👩‍🎨 Alya the Creator
                      </button>
                    </div>
                    {votedCandidate && (
                      <p className="vote-success-text">🎉 Pilihanmu berhasil direkam secara demokratis!</p>
                    )}
                  </div>
                </div>
              )}
              {ratStep === 2 && (
                <div className="rat-scenario-view animate-fade-in">
                  <h5>💸 Pembagian SHU secara Adil & Nyata</h5>
                  <p>SHU dibagikan ke seluruh anggota. Coba input data di bawah untuk mensimulasikan perhitungan SHU-mu secara instan:</p>
                  
                  <div className="mini-calc-layout">
                    <div className="mini-calc-inputs">
                      <div className="form-group-sm">
                        <label>Simpanan Modal Kamu (Rp):</label>
                        <input 
                          type="number" 
                          value={miniDeposit} 
                          onChange={(e) => setMiniDeposit(Math.min(5000000, Math.max(0, Number(e.target.value))))}
                          className="mini-text-input" 
                        />
                      </div>
                      <div className="form-group-sm">
                        <label>Total Belanja Kamu (Rp):</label>
                        <input 
                          type="number" 
                          value={miniPurchase} 
                          onChange={(e) => setMiniPurchase(Math.min(10000000, Math.max(0, Number(e.target.value))))}
                          className="mini-text-input" 
                        />
                      </div>
                    </div>

                    <div className="mini-calc-result font-mono">
                      <div>Jasa Modal: {formatRupiah(miniJasaModal)}</div>
                      <div>Jasa Anggota: {formatRupiah(miniJasaUsaha)}</div>
                      <div className="text-glow font-bold mt-1">Total SHU: {formatRupiah(miniTotalSHU)}</div>
                    </div>
                  </div>
                </div>
              )}
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
