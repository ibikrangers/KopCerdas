import React, { useState } from 'react';
import { ArrowRight, Award, BookOpen, Users, TrendingUp, Heart, Calculator, ShieldCheck } from 'lucide-react';

export default function LandingPage({ setActiveTab }) {
  // Mini interactive calculator state
  const [deposit, setDeposit] = useState(500000); // Simpanan anggota (Rp)
  const [purchase, setPurchase] = useState(1000000); // Total belanja anggota (Rp)
  // Constants for SHU calculation
  const totalCoopDeposit = 5000000; // Total simpanan seluruh koperasi (Rp)
  const totalCoopPurchase = 10000000; // Total belanja seluruh koperasi (Rp)
  const shuJasaModalTotal = 2000000;  // Porsi SHU untuk Jasa Modal
  const shuJasaAnggotaTotal = 3000000; // Porsi SHU untuk Jasa Usaha/Transaksi

  // Calculations
  const jasaModal = (deposit / totalCoopDeposit) * shuJasaModalTotal;
  const jasaUsaha = (purchase / totalCoopPurchase) * shuJasaAnggotaTotal;
  const totalSHU = jasaModal + jasaUsaha;

  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const characters = [
    { name: 'Rian the Gamer', role: 'Anggota Koperasi Konsumen', desc: 'Suka jajan snack dan beli peralatan gaming di Koperasi Sekolah. Transaksinya besar banget!', color: 'var(--color-violet)' },
    { name: 'Alya the Creator', role: 'Bendahara Koperasi', desc: 'Rutin menabung simpanan wajib tiap bulan. Punya simpanan modal paling tinggi di Koperasi.', color: 'var(--color-pink)' },
    { name: 'Dono the Scholar', role: 'Anggota Koperasi Jasa', desc: 'Menggunakan jasa printer & fotokopi koperasi untuk tugas sekolah. Suka gotong royong!', color: 'var(--color-mint)' }
  ];

  return (
    <div className="landing-container" id="landing-page-root">
      {/* Hero Section */}
      <header className="hero-section text-center">
        <div className="container hero-content">
          <div className="badge badge-violet hero-badge">
            <ShieldCheck size={12} />
            <span>Koperasi Era Baru Gen-Z & Gen-Alpha</span>
          </div>
          <h1 className="hero-title" id="main-heading">
            Kolaborasi Seru, Sukses Bersama di <span className="gradient-text">KopCerdas!</span>
          </h1>
          <p className="hero-subtitle">
            Bukan sekadar bisnis biasa. Temukan bagaimana Koperasi menyatukan kekuatan bersama (Gotong Royong) untuk membangun ekonomi yang adil dan demokratis lewat pembelajaran interaktif!
          </p>
          <div className="hero-actions flex-center">
            <button 
              id="hero-learn-btn"
              className="btn btn-primary"
              onClick={() => setActiveTab('learn')}
            >
              <BookOpen size={20} />
              <span>Pelajari Koperasi</span>
              <ArrowRight size={16} />
            </button>
            <button 
              id="hero-quiz-btn"
              className="btn btn-secondary"
              onClick={() => setActiveTab('quiz')}
            >
              <Award size={20} />
              <span>Kuis & Ranks</span>
            </button>
          </div>
        </div>
      </header>

      {/* Feature Highlights */}
      <section className="section features-section" id="features-info">
        <div className="container">
          <h2 className="section-title">Kenapa Harus Koperasi?</h2>
          <p className="section-subtitle">
            Koperasi adalah pilar ekonomi Indonesia yang didesain adil untuk seluruh anggotanya. Ini bedanya dengan bisnis konvensional!
          </p>

          <div className="grid-auto">
            <div className="feature-card glass glass-hover" id="feature-1">
              <div className="feature-icon-wrapper color-violet">
                <Users size={24} />
              </div>
              <h3>1 Member = 1 Vote</h3>
              <p>
                Di koperasi, keputusan diambil secara demokratis. Kaya atau miskin, semua punya hak suara yang sama (satu orang satu suara), beda dengan PT yang suaranya tergantung jumlah saham.
              </p>
            </div>

            <div className="feature-card glass glass-hover" id="feature-2">
              <div className="feature-icon-wrapper color-mint">
                <TrendingUp size={24} />
              </div>
              <h3>Bagi Hasil SHU yang Adil</h3>
              <p>
                Keuntungan (SHU) dibagikan berdasarkan keaktifan anggota. Makin sering kamu belanja atau transaksi di koperasi, makin besar pula SHU yang kamu terima di akhir tahun!
              </p>
            </div>

            <div className="feature-card glass glass-hover" id="feature-3">
              <div className="feature-icon-wrapper color-orange">
                <Heart size={24} />
              </div>
              <h3>Berasaskan Kekeluargaan</h3>
              <p>
                Tujuan utama koperasi adalah kesejahteraan bersama seluruh anggota secara gotong royong, bukan memperkaya pemilik modal sendirian.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Interactive Calculator Sandbox */}
      <section className="section calculator-section" id="shu-calculator-widget">
        <div className="container">
          <h2 className="section-title">Kalkulator SHU Interaktif</h2>
          <p className="section-subtitle">
            Coba geser slider di bawah untuk melihat bagaimana SHU (Sisa Hasil Usaha) kamu dihitung berdasarkan simpanan modal dan keaktifan belanjamu!
          </p>

          <div className="calculator-layout glass">
            <div className="calculator-inputs">
              <div className="form-group">
                <div className="slider-label-row">
                  <span className="form-label">Simpanan Modal Kamu</span>
                  <div className="input-with-symbol">
                    <span className="currency-symbol">Rp</span>
                    <input 
                      type="number"
                      className="text-input-calc"
                      value={deposit === 0 ? '' : deposit}
                      onChange={(e) => setDeposit(Math.min(5000000, Math.max(0, Number(e.target.value))))}
                      min="0"
                      max="5000000"
                      id="calc-deposit-input"
                    />
                  </div>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="5000000" 
                  step="50000"
                  value={deposit} 
                  onChange={(e) => setDeposit(Number(e.target.value))}
                  className="range-input range-violet"
                  id="calc-deposit-slider"
                />
                <span className="input-hint">Mempengaruhi Jasa Modal (Total modal koperasi: {formatRupiah(totalCoopDeposit)})</span>
              </div>

              <div className="form-group">
                <div className="slider-label-row">
                  <span className="form-label">Total Belanja Kamu di Koperasi</span>
                  <div className="input-with-symbol">
                    <span className="currency-symbol">Rp</span>
                    <input 
                      type="number"
                      className="text-input-calc"
                      value={purchase === 0 ? '' : purchase}
                      onChange={(e) => setPurchase(Math.min(10000000, Math.max(0, Number(e.target.value))))}
                      min="0"
                      max="10000000"
                      id="calc-purchase-input"
                    />
                  </div>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="10000000" 
                  step="100000"
                  value={purchase} 
                  onChange={(e) => setPurchase(Number(e.target.value))}
                  className="range-input range-mint"
                  id="calc-purchase-slider"
                />
                <span className="input-hint">Mempengaruhi Jasa Usaha/Transaksi (Total belanja koperasi: {formatRupiah(totalCoopPurchase)})</span>
              </div>
            </div>

            <div className="calculator-outputs">
              <div className="calc-result-header">
                <Calculator size={20} className="calc-icon" />
                <h3>Estimasi SHU Kamu</h3>
              </div>

              <div className="result-breakdowns">
                <div className="result-row">
                  <span className="result-name">Jasa Modal (Simpanan)</span>
                  <span className="result-value text-violet">{formatRupiah(jasaModal)}</span>
                </div>
                <div className="result-row">
                  <span className="result-name">Jasa Anggota (Belanja)</span>
                  <span className="result-value text-mint">{formatRupiah(jasaUsaha)}</span>
                </div>
                <div className="result-divider"></div>
                <div className="result-row result-total">
                  <span className="result-name">Total SHU Diterima</span>
                  <span className="result-value text-glow">{formatRupiah(totalSHU)}</span>
                </div>
              </div>

              <div className="calc-explanation">
                <p>
                  💡 <strong>Info:</strong> SHU (Sisa Hasil Usaha) dibagikan secara adil berdasarkan persentase simpanan modalmu dan keaktifan belanjamu di koperasi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Characters Intro Section */}
      <section className="section characters-section" id="characters-list">
        <div className="container">
          <h2 className="section-title">Temui Karakter Koperasi</h2>
          <p className="section-subtitle">
            Karakter-karakter keren ini menggambarkan peran penting anggota dan pengurus dalam ekosistem koperasi!
          </p>

          <div className="grid-auto">
            {characters.map((char, idx) => (
              <div key={idx} className="character-card glass" id={`char-card-${idx}`}>
                <div className="character-avatar-placeholder" style={{ backgroundColor: char.color }}>
                  {char.name[0]}
                </div>
                <div className="character-info">
                  <span className="badge badge-blue character-badge">{char.role}</span>
                  <h3>{char.name}</h3>
                  <p>{char.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section text-center" id="landing-cta-banner">
        <div className="container glass cta-inner">
          <h2>Siap Menguasai Ilmu Koperasi Keren?</h2>
          <p>
            Pelajari materi edukatif koperasi interaktif, uji pemahamanmu dengan kuis kelulusan, dan raih peringkat teratas di papan skor!
          </p>
          <button 
            id="cta-start-learning-btn"
            className="btn btn-mint btn-lg"
            onClick={() => setActiveTab('learn')}
          >
            <BookOpen size={24} />
            <span>Mulai Pelajari Materi</span>
          </button>
        </div>
      </section>
    </div>
  );
}
