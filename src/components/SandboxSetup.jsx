import React, { useState } from 'react';
import { ShieldCheck, Info, Users, ArrowRight, UserPlus, UserCheck } from 'lucide-react';

const CANDIDATES = [
  { id: 1, name: 'Alya the Creator', avatar: '👩‍🎨', role: 'Kreator Konten', pocketMoney: 300000, desc: 'Punya uang jajan bulanan lumayan tinggi. Suka menabung untuk target masa depan.', personality: 'Suka menabung, lebih mementingkan bunga/jasa modal.' },
  { id: 2, name: 'Rian the Gamer', avatar: '🎮', role: 'Pro Gamer', pocketMoney: 100000, desc: 'Suka jajan camilan manis & minuman dingin pas main game. Transaksinya bakal kencang.', personality: 'Aktif belanja, mementingkan harga murah & porsi Jasa Anggota.' },
  { id: 3, name: 'Dono the Scholar', avatar: '👨‍🎓', role: 'Ketua Kelas', pocketMoney: 150000, desc: 'Sering fotokopi tugas & butuh alat tulis. Sangat mendukung asas gotong royong.', personality: 'Suka kerja sama, seimbang antara menabung dan belanja.' },
  { id: 4, name: 'Chika the Designer', avatar: '👩‍💻', role: 'UI/UX Enthusiast', pocketMoney: 200000, desc: 'Suka beli aksesoris keren & stiker aesthetic. Sangat menghargai barang berkualitas.', personality: 'Cukup aktif belanja barang kreatif, peduli kualitas dibanding diskon.' },
  { id: 5, name: 'Budi the Athlete', avatar: '⚽', role: 'Kapten Futsal', pocketMoney: 80000, desc: 'Sering dehidrasi setelah latihan, bakal sering beli minuman isotonik di koperasi.', personality: 'Belanja harian tinggi tapi tabungan kecil. Mementingkan Jasa Anggota.' },
  { id: 6, name: 'Eka the Musician', avatar: '🎸', role: 'Gitaris Band', pocketMoney: 120000, desc: 'Butuh sewa studio musik & kadang butuh pinjaman dana kecil untuk servis gitarnya.', personality: 'Kadang butuh pinjaman/kredit, peduli suku bunga pinjaman rendah.' }
];

export default function SandboxSetup({ onStart }) {
  const [coopName, setCoopName] = useState('KopCerdas GenZ');
  const [coopType, setCoopType] = useState('konsumen');
  const [selectedCandidates, setSelectedCandidates] = useState([1, 2, 3]); // recruit 1,2,3 by default
  const [simpananPokok, setSimpananPokok] = useState(50000);

  const toggleCandidate = (id) => {
    if (selectedCandidates.includes(id)) {
      if (selectedCandidates.length <= 3) {
        alert('Minimal harus merekrut 3 anggota pendiri agar Koperasi sah berdiri secara hukum!');
        return;
      }
      setSelectedCandidates(selectedCandidates.filter(cId => cId !== id));
    } else {
      setSelectedCandidates([...selectedCandidates, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!coopName.trim()) {
      alert('Nama Koperasi tidak boleh kosong!');
      return;
    }
    
    // Convert selected candidates to full member profiles for simulator
    const recruitedMembers = CANDIDATES.filter(c => selectedCandidates.includes(c.id)).map(c => ({
      ...c,
      simpananPokok: simpananPokok,
      simpananWajib: 10000, // Initial Simpanan Wajib
      simpananSukarela: 0,
      transactions: 0,
      transactionValue: 0,
      loanBalance: 0,
      happiness: 85, // Starts at 85% happiness
      votePreference: 'netral'
    }));

    onStart({
      coopName,
      coopType,
      simpananPokok,
      members: recruitedMembers
    });
  };

  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="setup-container glass" id="setup-form-root">
      <div className="setup-header text-center">
        <h2>🛠️ Inisialisasi Koperasi Baru</h2>
        <p>Tentukan visi dan rekrut pendiri untuk mendirikan koperasi pertamamu.</p>
      </div>

      <form onSubmit={handleSubmit} className="setup-form">
        {/* Step 1: Basic Info */}
        <div className="setup-section">
          <h3>1. Identitas Koperasi</h3>
          <div className="form-group">
            <label className="form-label" htmlFor="setup-coop-name">Nama Koperasi Kamu</label>
            <input 
              type="text" 
              id="setup-coop-name"
              className="form-input"
              value={coopName} 
              onChange={(e) => setCoopName(e.target.value)} 
              placeholder="Contoh: Koperasi Sekolah Madu"
              maxLength={25}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Jenis Koperasi</label>
            <div className="type-selector-grid">
              <div 
                id="type-select-konsumen"
                className={`type-option glass ${coopType === 'konsumen' ? 'selected' : ''}`}
                onClick={() => setCoopType('konsumen')}
              >
                <h4>🛒 Koperasi Konsumen</h4>
                <p>Menyediakan barang kebutuhan (jajan, atk) untuk dibeli anggota. Keuntungan didapat dari selisih jual beli barang.</p>
                <div className="selector-indicator"></div>
              </div>

              <div 
                id="type-select-simpanpinjam"
                className={`type-option glass ${coopType === 'simpanpinjam' ? 'selected' : ''}`}
                onClick={() => setCoopType('simpanpinjam')}
              >
                <h4>💸 Koperasi Simpan Pinjam</h4>
                <p>Wadah anggota menabung dan meminjam uang secara gotong royong. Keuntungan didapat dari bunga pinjaman yang rendah.</p>
                <div className="selector-indicator"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Financial Policy */}
        <div className="setup-section">
          <h3>2. Kebijakan Simpanan Pokok</h3>
          <div className="form-group">
            <div className="slider-label-row">
              <span className="form-label">Simpanan Pokok (Modal Awal per Anggota)</span>
              <span className="slider-value">{formatRupiah(simpananPokok)}</span>
            </div>
            <input 
              type="range" 
              min="20000" 
              max="150000" 
              step="10000"
              value={simpananPokok} 
              onChange={(e) => setSimpananPokok(Number(e.target.value))}
              className="range-input range-violet"
              id="setup-simpanan-pokok"
            />
            <span className="input-hint">Simpanan Pokok dibayarkan **sekali saja** oleh setiap anggota saat mendaftar masuk. Menjadi modal awal kas koperasi.</span>
          </div>
        </div>

        {/* Step 3: Recruit Members */}
        <div className="setup-section">
          <div className="section-header-flex">
            <h3>3. Rekrut Anggota Pendiri ({selectedCandidates.length} terpilih)</h3>
            <span className="badge badge-orange">Minimal 3 Anggota</span>
          </div>
          <p className="setup-instruction">
            Pilihlah minimal 3 anggota pendiri di bawah. Setiap anggota memiliki kebutuhan dan kepribadian belanja/menabung yang berbeda-beda!
          </p>

          <div className="candidates-list-grid">
            {CANDIDATES.map((cand) => {
              const isSelected = selectedCandidates.includes(cand.id);
              return (
                <div 
                  key={cand.id} 
                  id={`candidate-card-${cand.id}`}
                  className={`candidate-card glass ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleCandidate(cand.id)}
                >
                  <div className="cand-avatar">{cand.avatar}</div>
                  <div className="cand-details">
                    <div className="cand-title-row">
                      <h4>{cand.name}</h4>
                      <span className="badge badge-blue cand-role">{cand.role}</span>
                    </div>
                    <p className="cand-desc">{cand.desc}</p>
                    <div className="cand-meta">
                      <span>💰 Uang Saku: {formatRupiah(cand.pocketMoney)}</span>
                      <span>🧠 Kepribadian: {cand.personality}</span>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className={`cand-select-btn ${isSelected ? 'selected' : ''}`}
                    aria-label={isSelected ? 'Batal Rekrut' : 'Rekrut Anggota'}
                  >
                    {isSelected ? <UserCheck size={18} /> : <UserPlus size={18} />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Submit */}
        <div className="setup-actions text-center">
          <button 
            type="submit" 
            id="start-coop-btn"
            className="btn btn-mint btn-lg submit-coop-btn"
            disabled={selectedCandidates.length < 3}
          >
            <span>Dirikan Koperasi 🚀</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
