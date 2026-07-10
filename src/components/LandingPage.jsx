import React, { useState } from 'react';
import { ArrowRight, Gamepad2, BookOpen, Users, TrendingUp, Heart, Calculator, ShieldCheck } from 'lucide-react';

export default function LandingPage({ setActiveTab }) {
  // Mini interactive calculator state
  const [deposit, setDeposit] = useState(500000); // Simpanan anggota (Rp)
  const [purchase, setPurchase] = useState(1000000); // Total belanja anggota (Rp)
  const [totalCoopDeposit, setTotalCoopDeposit] = useState(5000000); // Total simpanan seluruh koperasi (Rp)
  const [totalCoopPurchase, setTotalCoopPurchase] = useState(10000000); // Total belanja seluruh koperasi (Rp)
  
  // Distributable SHU (Sisa Hasil Usaha)
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
            Bukan sekadar bisnis biasa. Temukan bagaimana Koperasi menyatukan kekuatan bersama (Gotong Royong) untuk membangun ekonomi yang adil dan demokratis lewat Sandbox Game yang seru!
          </p>
          <div className="hero-actions flex-center">
            <button 
              id="hero-play-sandbox-btn"
              className="btn btn-mint"
              onClick={() => setActiveTab('sandbox')}
            >
              <Gamepad2 size={20} />
              <span>Main Sandbox Simulator</span>
            </button>
            <button 
              id="hero-learn-btn"
              className="btn btn-secondary"
              onClick={() => setActiveTab('learn')}
            >
              <BookOpen size={20} />
              <span>Pelajari Koperasi</span>
              <ArrowRight size={16} />
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
                  <span className="slider-value">{formatRupiah(deposit)}</span>
                </div>
                <input 
                  type="range" 
                  min="50000" 
                  max="1000000" 
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
                  <span className="slider-value">{formatRupiah(purchase)}</span>
                </div>
                <input 
                  type="range" 
                  min="100000" 
                  max="3000000" 
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
                  <span className="result-name">Jasa Modal (Kepemilikan Modal)</span>
                  <span className="result-value text-violet">{formatRupiah(jasaModal)}</span>
                </div>
                <div className="result-row">
                  <span className="result-name">Jasa Anggota (Keaktifan Belanja)</span>
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
                  💡 <strong>Penjelasan:</strong> Meskipun simpanan modalmu kecil, jika kamu aktif bertransaksi (belanja), kamu tetap bisa mendapatkan SHU yang besar melalui <strong>Jasa Anggota</strong>. Inilah keadilan koperasi!
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
            Karakter-karakter keren ini akan menemanimu mengelola koperasi di Sandbox Game!
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
          <h2>Siap Menjadi Pengurus Koperasi Keren?</h2>
          <p>
            Masuk ke Koperasi Sandbox Simulator. Rekrut anggotamu, kelola kas koperasi, adakan voting demokratis, dan bagikan SHU di akhir tahun!
          </p>
          <button 
            id="cta-start-simulation-btn"
            className="btn btn-mint btn-lg"
            onClick={() => setActiveTab('sandbox')}
          >
            <Gamepad2 size={24} />
            <span>Mulai Simulasi Koperasi</span>
          </button>
        </div>
      </section>
    </div>
  );
}
