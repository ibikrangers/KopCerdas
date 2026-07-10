import React, { useState, useEffect } from 'react';
import { Award, Percent, DollarSign, Calculator, HelpCircle, Check } from 'lucide-react';

export default function SandboxRAT({
  coopName,
  coopType,
  funds,
  members,
  shuTotal,
  onCompleteRAT
}) {
  // SHU Allocations (percentages)
  const [cadangan, setCadangan] = useState(30); // Dana Cadangan (Koperasi development)
  const [jasaModal, setJasaModal] = useState(30); // Jasa Modal (Deposits payout)
  const [jasaUsaha, setJasaUsaha] = useState(30); // Jasa Usaha (Transactions payout)
  const [danaLain, setDanaLain] = useState(10); // Dana Pengurus, Pendidikan, Sosial

  const [payouts, setPayouts] = useState([]);
  const [allocationError, setAllocationError] = useState(false);

  const totalPercentage = Number(cadangan) + Number(jasaModal) + Number(jasaUsaha) + Number(danaLain);

  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Recalculate payouts on slider changes
  useEffect(() => {
    if (totalPercentage !== 100) {
      setAllocationError(true);
      return;
    }
    setAllocationError(false);

    // Calculate totals in the Koperasi
    const totalSimpanan = members.reduce((acc, m) => acc + m.simpananPokok + m.simpananWajib + m.simpananSukarela, 0);
    const totalTransaksi = members.reduce((acc, m) => acc + (coopType === 'konsumen' ? m.transactionValue : m.transactionValue), 0);

    const shuForModal = (jasaModal / 100) * shuTotal;
    const shuForUsaha = (jasaUsaha / 100) * shuTotal;

    const calculated = members.map(m => {
      const simpananMemb = m.simpananPokok + m.simpananWajib + m.simpananSukarela;
      const shareModal = totalSimpanan > 0 ? (simpananMemb / totalSimpanan) : 0;
      
      const transMemb = m.transactionValue;
      const shareUsaha = totalTransaksi > 0 ? (transMemb / totalTransaksi) : 0;

      const payoutM = shareModal * shuForModal;
      const payoutU = shareUsaha * shuForUsaha;

      return {
        id: m.id,
        name: m.name,
        avatar: m.avatar,
        role: m.role,
        transactions: m.transactions,
        transactionValue: m.transactionValue,
        simpanan: simpananMemb,
        payoutJM: Math.round(payoutM),
        payoutJA: Math.round(payoutU),
        totalPayout: Math.round(payoutM + payoutU)
      };
    });

    setPayouts(calculated);
  }, [cadangan, jasaModal, jasaUsaha, danaLain, shuTotal, members, coopType, totalPercentage]);

  const handleSubmit = () => {
    if (allocationError) return;
    onCompleteRAT(payouts, {
      cadanganPercent: cadangan,
      jasaModalPercent: jasaModal,
      jasaUsahaPercent: jasaUsaha,
      danaLainPercent: danaLain
    });
  };

  return (
    <div className="rat-container glass" id="rat-dialog-root">
      <div className="rat-header text-center">
        <div className="badge badge-violet"><Percent size={14} /> <span>Rapat Anggota Tahunan (RAT)</span></div>
        <h2>Pembagian Sisa Hasil Usaha (SHU)</h2>
        <p>
          Keuntungan Bersih Koperasi (SHU) terkumpul sebesar <strong>{formatRupiah(shuTotal)}</strong>. Tentukan alokasi pembagian SHU di bawah! Total alokasi harus tepat <strong>100%</strong>.
        </p>
      </div>

      {/* Allocation Sliders & Calculations */}
      <div className="rat-grid-layout">
        
        {/* Left Side: Sliders */}
        <div className="rat-sliders-panel glass">
          <h3>Konfigurasi Alokasi SHU</h3>
          
          <div className="form-group slider-group">
            <div className="slider-label-row">
              <span className="form-label">🏛️ Dana Cadangan Koperasi</span>
              <span className="slider-value text-blue">{cadangan}%</span>
            </div>
            <input 
              type="range" min="10" max="50" step="5" value={cadangan} 
              onChange={(e) => setCadangan(Number(e.target.value))}
              className="range-input range-blue"
              id="rat-slider-cadangan"
            />
            <span className="input-hint">Dipakai untuk mengembangkan modal koperasi dan menutup kerugian di masa depan.</span>
          </div>

          <div className="form-group slider-group">
            <div className="slider-label-row">
              <span className="form-label">💰 Jasa Modal (Simpanan)</span>
              <span className="slider-value text-violet">{jasaModal}%</span>
            </div>
            <input 
              type="range" min="10" max="50" step="5" value={jasaModal} 
              onChange={(e) => setJasaModal(Number(e.target.value))}
              className="range-input range-violet"
              id="rat-slider-jasa-modal"
            />
            <span className="input-hint">Dibagikan kepada anggota sebanding dengan jumlah tabungan/simpanan mereka.</span>
          </div>

          <div className="form-group slider-group">
            <div className="slider-label-row">
              <span className="form-label">🛒 Jasa Usaha/Transaksi Anggota</span>
              <span className="slider-value text-mint">{jasaUsaha}%</span>
            </div>
            <input 
              type="range" min="10" max="50" step="5" value={jasaUsaha} 
              onChange={(e) => setJasaUsaha(Number(e.target.value))}
              className="range-input range-mint"
              id="rat-slider-jasa-usaha"
            />
            <span className="input-hint">Dibagikan kepada anggota sebanding dengan tingkat keaktifan belanja/transaksi mereka.</span>
          </div>

          <div className="form-group slider-group">
            <div className="slider-label-row">
              <span className="form-label">🎁 Dana Pengurus, Sosial & Pendidikan</span>
              <span className="slider-value text-orange">{danaLain}%</span>
            </div>
            <input 
              type="range" min="5" max="30" step="5" value={danaLain} 
              onChange={(e) => setDanaLain(Number(e.target.value))}
              className="range-input range-orange"
              id="rat-slider-dana-lain"
            />
            <span className="input-hint">Untuk bonus pengurus, kegiatan sosial masyarakat, dan pendidikan perkoperasian.</span>
          </div>

          {/* Allocation Checker Banner */}
          <div className={`allocation-status-banner ${allocationError ? 'error' : 'success'}`}>
            {allocationError ? (
              <span>❌ Total Alokasi: <strong>{totalPercentage}%</strong>. Harap sesuaikan agar total menjadi tepat 100%!</span>
            ) : (
              <span>✅ Total Alokasi: <strong>100%</strong>. Siap dibagikan ke seluruh anggota!</span>
            )}
          </div>
        </div>

        {/* Right Side: Live Member Payout Breakdown */}
        <div className="rat-results-panel glass">
          <div className="calc-result-header">
            <Calculator size={20} className="text-mint" />
            <h3>Estimasi Payout Anggota</h3>
          </div>

          <div className="payout-list-scroll">
            {payouts.map((memb) => (
              <div key={memb.id} className="payout-item-card glass" id={`payout-card-${memb.id}`}>
                <div className="payout-member-info">
                  <span className="payout-avatar">{memb.avatar}</span>
                  <div>
                    <h4>{memb.name}</h4>
                    <span className="payout-sub">Simpanan: {formatRupiah(memb.simpanan)} | Transaksi: {formatRupiah(memb.transactionValue)}</span>
                  </div>
                </div>

                <div className="payout-breakdown-details">
                  <div className="payout-row">
                    <span>JM ({jasaModal}%):</span>
                    <span className="text-violet">{formatRupiah(memb.payoutJM)}</span>
                  </div>
                  <div className="payout-row">
                    <span>JA ({jasaUsaha}%):</span>
                    <span className="text-mint">{formatRupiah(memb.payoutJA)}</span>
                  </div>
                  <div className="payout-divider"></div>
                  <div className="payout-row payout-total">
                    <span>Total SHU:</span>
                    <strong className="text-glow">{formatRupiah(memb.totalPayout)}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rat-submit-box">
            <p className="rat-summary-info">
              💡 <strong>Insight RAT:</strong> Anggota yang aktif melakukan transaksi (misal belanja kebutuhan) mendapatkan porsi <strong>Jasa Usaha (JA)</strong> yang tinggi, sedangkan yang gemar menabung mendapat porsi <strong>Jasa Modal (JM)</strong> tinggi. Koperasi berlandaskan keadilan, bukan kapitalisme murni!
            </p>
            <button 
              id="confirm-rat-distribution-btn"
              className="btn btn-mint w-full btn-lg"
              disabled={allocationError}
              onClick={handleSubmit}
            >
              <Check size={18} />
              <span>Bagikan SHU & Tutup Buku 💰</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
