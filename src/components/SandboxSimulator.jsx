import React, { useState } from 'react';
import SandboxSetup from './SandboxSetup';
import SandboxDashboard from './SandboxDashboard';
import SandboxVoting from './SandboxVoting';
import SandboxRAT from './SandboxRAT';
import { Award, RefreshCw, Trophy, ArrowRight, Star, Heart, TrendingUp, ShieldCheck } from 'lucide-react';

const INITIAL_INVENTORY = [
  { id: 1, name: 'Snack Krupuk/Camilan', icon: '🍪', stock: 10, cost: 5000, sellPrice: 8000 },
  { id: 2, name: 'Minuman Dingin Soda/Teh', icon: '🥤', stock: 5, cost: 6000, sellPrice: 10000 },
  { id: 3, name: 'Alat Tulis Pena/Buku', icon: '✏️', stock: 8, cost: 4000, sellPrice: 7000 }
];

export default function SandboxSimulator({ onUnlockBadge }) {
  const [phase, setPhase] = useState('setup'); // 'setup', 'dashboard', 'voting', 'rat', 'completed'
  const [coopName, setCoopName] = useState('');
  const [coopType, setCoopType] = useState('konsumen');
  const [funds, setFunds] = useState(0);
  const [members, setMembers] = useState([]);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [logs, setLogs] = useState([]);
  const [turnsLeft, setTurnsLeft] = useState(8); // 8 turns for a concise gameplay loop
  const [shuTotal, setShuTotal] = useState(0);
  const [ratResults, setRatResults] = useState(null);

  // Setup start
  const handleStartCoop = (config) => {
    setCoopName(config.coopName);
    setCoopType(config.coopType);
    
    // Initial funds = sum of all members' Simpanan Pokok
    const initialFunds = config.members.length * config.simpananPokok;
    setFunds(initialFunds);
    
    // Set members and pay simpanan pokok (subtract from their pocket money)
    const membersWithInitialCapital = config.members.map(m => ({
      ...m,
      pocketMoney: m.pocketMoney - config.simpananPokok
    }));
    setMembers(membersWithInitialCapital);
    
    setInventory(INITIAL_INVENTORY.map(item => ({ ...item, stock: 10 })));
    setShuTotal(0);
    setTurnsLeft(8);
    setLogs([
      `Koperasi "${config.coopName}" resmi berdiri!`,
      `Dana awal terkumpul Rp${initialFunds.toLocaleString('id-ID')} dari Simpanan Pokok ${config.members.length} anggota.`
    ]);
    setPhase('dashboard');
  };

  // Actions
  const handleBuyStock = (itemId) => {
    if (turnsLeft <= 0) return;
    
    const item = inventory.find(i => i.id === itemId);
    if (!item || funds < item.cost) return;

    setFunds(prev => prev - (item.cost * 5));
    setInventory(prev => prev.map(i => i.id === itemId ? { ...i, stock: i.stock + 5 } : i));
    setTurnsLeft(prev => prev - 1);
    
    addLog(`Pengurus membeli stok 5 unit ${item.name} (-Rp${(item.cost * 5).toLocaleString('id-ID')})`);
  };

  const handleMemberTransaction = (memberId, itemId) => {
    if (turnsLeft <= 0) return;

    const member = members.find(m => m.id === memberId);
    const item = inventory.find(i => i.id === itemId);
    
    if (!member || !item || item.stock <= 0 || member.pocketMoney < item.sellPrice) return;

    const profit = item.sellPrice - item.cost;

    // Update member money, trans count, value, and happiness
    setMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        const nextHappiness = Math.min(100, m.happiness + 8);
        return {
          ...m,
          pocketMoney: m.pocketMoney - item.sellPrice,
          transactions: m.transactions + 1,
          transactionValue: m.transactionValue + item.sellPrice,
          happiness: nextHappiness
        };
      }
      return m;
    }));

    // Update inventory
    setInventory(prev => prev.map(i => i.id === itemId ? { ...i, stock: i.stock - 1 } : i));
    
    // Update coop funds & SHU
    setFunds(prev => prev + item.sellPrice);
    setShuTotal(prev => prev + profit);
    setTurnsLeft(prev => prev - 1);

    addLog(`${member.name} membeli 1 unit ${item.name} seharga Rp${item.sellPrice.toLocaleString('id-ID')}. Profit koperasi: +Rp${profit.toLocaleString('id-ID')}.`);
  };

  const handleMemberSave = (memberId, amount, type) => {
    if (turnsLeft <= 0) return;

    const member = members.find(m => m.id === memberId);
    if (!member || member.pocketMoney < amount) return;

    setMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        const nextHappiness = Math.min(100, m.happiness + 5);
        return {
          ...m,
          pocketMoney: m.pocketMoney - amount,
          simpananWajib: type === 'wajib' ? m.simpananWajib + amount : m.simpananWajib,
          simpananSukarela: type === 'sukarela' ? m.simpananSukarela + amount : m.simpananSukarela,
          happiness: nextHappiness
        };
      }
      return m;
    }));

    setFunds(prev => prev + amount);
    setTurnsLeft(prev => prev - 1);

    const typeStr = type === 'wajib' ? 'Simpanan Wajib' : 'Simpanan Sukarela';
    addLog(`${member.name} menabung ${typeStr} sebesar Rp${amount.toLocaleString('id-ID')}. Kas koperasi bertambah.`);
  };

  const handleMemberLoan = (memberId, amount) => {
    if (turnsLeft <= 0 || funds < amount) return;

    const member = members.find(m => m.id === memberId);
    if (!member || member.loanBalance > 0) return;

    setMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        return {
          ...m,
          pocketMoney: m.pocketMoney + amount,
          loanBalance: amount,
          happiness: Math.min(100, m.happiness + 10)
        };
      }
      return m;
    }));

    setFunds(prev => prev - amount);
    setTurnsLeft(prev => prev - 1);

    addLog(`${member.name} mengajukan pinjaman Rp${amount.toLocaleString('id-ID')} disetujui. Kas koperasi berkurang.`);
  };

  const handleMemberRepay = (memberId) => {
    if (turnsLeft <= 0) return;

    const member = members.find(m => m.id === memberId);
    if (!member || member.loanBalance <= 0) return;

    const totalRepay = member.loanBalance * 1.1; // 10% interest
    const interestProfit = member.loanBalance * 0.1;

    if (member.pocketMoney < totalRepay) return;

    setMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        return {
          ...m,
          pocketMoney: m.pocketMoney - totalRepay,
          loanBalance: 0,
          transactionValue: m.transactionValue + totalRepay, // Credit interest/repayment as support transaction
          happiness: Math.min(100, m.happiness + 5)
        };
      }
      return m;
    }));

    setFunds(prev => prev + totalRepay);
    setShuTotal(prev => prev + interestProfit);
    setTurnsLeft(prev => prev - 1);

    addLog(`${member.name} melunasi pinjaman sebesar Rp${totalRepay.toLocaleString('id-ID')} (pokok + 10% jasa/bunga). Pendapatan bunga Koperasi: +Rp${interestProfit.toLocaleString('id-ID')}.`);
  };

  const addLog = (msg) => {
    setLogs(prev => [msg, ...prev]);
  };

  // Voting Interruption
  const handleTriggerVote = () => {
    setPhase('voting');
  };

  const handleCompleteVote = (isPassed, cost) => {
    if (isPassed) {
      setFunds(prev => prev - cost);
      setMembers(prev => prev.map(m => ({ ...m, happiness: Math.min(100, m.happiness + 15) })));
      addLog(`Keputusan disetujui: Program kerja berjalan, kas berkurang Rp${cost.toLocaleString('id-ID')}, kepuasan naik!`);
    } else {
      setMembers(prev => prev.map(m => ({ ...m, happiness: Math.max(0, m.happiness - 5) })));
      addLog(`Keputusan ditolak: Program dibatalkan, kas aman, kepuasan anggota turun sedikit.`);
    }
    setPhase('dashboard');
  };

  // RAT Phase
  const handleTriggerRAT = () => {
    setPhase('rat');
  };

  const handleCompleteRAT = (payoutsList, config) => {
    setRatResults({
      payouts: payoutsList,
      config: config
    });
    
    // Add payouts back to member's pocket money and boost happiness
    setMembers(prev => prev.map(m => {
      const payoutInfo = payoutsList.find(p => p.id === m.id);
      const payoutVal = payoutInfo ? payoutInfo.totalPayout : 0;
      const happinessBoost = payoutVal > 100000 ? 15 : payoutVal > 40000 ? 10 : 5;
      return {
        ...m,
        pocketMoney: m.pocketMoney + payoutVal,
        happiness: Math.min(100, m.happiness + happinessBoost)
      };
    }));

    // Deduct distributed SHU (except reserves) from funds
    const reservesAllocated = (config.cadanganPercent / 100) * shuTotal;
    const shuDistributed = shuTotal - reservesAllocated;
    setFunds(prev => prev - shuDistributed);

    // Unlock simulation badge in parent
    if (onUnlockBadge) {
      onUnlockBadge('Manajer Sandbox 🎮');
    }

    setPhase('completed');
  };

  const handleRestart = () => {
    setCoopName('');
    setCoopType('konsumen');
    setFunds(0);
    setMembers([]);
    setInventory(INITIAL_INVENTORY);
    setLogs([]);
    setTurnsLeft(8);
    setShuTotal(0);
    setRatResults(null);
    setPhase('setup');
  };

  // Compute final rank based on funds and happiness
  const getFinalRank = () => {
    const avgHappiness = members.reduce((acc, m) => acc + m.happiness, 0) / members.length;
    
    if (funds > 1500000 && avgHappiness > 90) {
      return {
        name: 'Koperasi Sejahtera Gemilang (Bintang 5) 🌟🏆',
        desc: 'Hebat! Kamu berhasil melipatgandakan kas koperasi sambil menjaga anggota sangat bahagia. Gotong royong berjalan sempurna!'
      };
    } else if (funds > 800000 && avgHappiness > 70) {
      return {
        name: 'Koperasi Tunas Harapan (Bintang 3) ⭐⭐⭐',
        desc: 'Bagus sekali! Koperasimu berjalan stabil, sehat finansial, dan seluruh anggota merasa terbantu dengan program-programmu.'
      };
    } else {
      return {
        name: 'Koperasi Pemula Gotong Royong (Bintang 1) ⭐',
        desc: 'Awal yang baik! Kamu sudah berhasil membagikan SHU lewat RAT, namun coba tingkatkan transaksi anggota atau perbesar kas di permainan berikutnya!'
      };
    }
  };

  return (
    <div className="sandbox-main-wrapper container" id="sandbox-simulator-root">
      {phase !== 'setup' && phase !== 'completed' && (
        <div className="sandbox-game-header text-center">
          <span className="badge badge-mint">Sandbox Mode</span>
          <h2 className="gradient-text">{coopName} ({coopType === 'konsumen' ? 'Koperasi Konsumen' : 'Koperasi Simpan Pinjam'})</h2>
        </div>
      )}

      {phase === 'setup' && (
        <SandboxSetup onStart={handleStartCoop} />
      )}

      {phase === 'dashboard' && (
        <SandboxDashboard
          coopName={coopName}
          coopType={coopType}
          funds={funds}
          inventory={inventory}
          members={members}
          logs={logs}
          turnsLeft={turnsLeft}
          shuTotal={shuTotal}
          onBuyStock={handleBuyStock}
          onMemberTransaction={handleMemberTransaction}
          onMemberSave={handleMemberSave}
          onMemberLoan={handleMemberLoan}
          onMemberRepay={handleMemberRepay}
          onTriggerRAT={handleTriggerRAT}
          onTriggerVote={handleTriggerVote}
        />
      )}

      {phase === 'voting' && (
        <SandboxVoting
          members={members}
          coopType={coopType}
          onCompleteVote={handleCompleteVote}
        />
      )}

      {phase === 'rat' && (
        <SandboxRAT
          coopName={coopName}
          coopType={coopType}
          funds={funds}
          members={members}
          shuTotal={shuTotal}
          onCompleteRAT={handleCompleteRAT}
        />
      )}

      {phase === 'completed' && (
        <div className="completed-screen-container glass text-center animate-scale-in" id="simulation-completed-panel">
          <div className="trophy-wrapper">
            <Trophy className="completed-trophy-icon text-yellow-light animate-bounce" size={80} />
          </div>
          
          <h2 className="gradient-text">Buku Laporan Periode Selesai!</h2>
          <p className="completed-subtitle">
            Koperasi <strong>{coopName}</strong> sukses menjalankan agenda tahunan RAT dan membagikan SHU kepada seluruh anggotanya.
          </p>

          <div className="results-rank-card glass">
            <div className="badge badge-orange"><Award size={14} /> <span>Peringkat Manajemen</span></div>
            <h3>{getFinalRank().name}</h3>
            <p>{getFinalRank().desc}</p>
          </div>

          <div className="final-stats-grid">
            <div className="final-stat-box glass">
              <span className="final-label">Sisa Kas Koperasi</span>
              <h3>Rp {Math.round(funds).toLocaleString('id-ID')}</h3>
            </div>
            <div className="final-stat-box glass">
              <span className="final-label">Total SHU Terbagi</span>
              <h3>Rp {Math.round(shuTotal).toLocaleString('id-ID')}</h3>
            </div>
            <div className="final-stat-box glass">
              <span className="final-label">Kepuasan Akhir Anggota</span>
              <h3>
                {Math.round(members.reduce((acc, m) => acc + m.happiness, 0) / members.length)}%
              </h3>
            </div>
          </div>

          <div className="payout-summary-box glass">
            <h4>Laporan Akhir Payout RAT Anggota:</h4>
            <div className="final-payout-list">
              {ratResults && ratResults.payouts.map(p => (
                <div key={p.id} className="final-payout-row glass">
                  <span>{p.avatar} <strong>{p.name}</strong></span>
                  <span>Belanja: Rp {p.transactionValue.toLocaleString('id-ID')}</span>
                  <span className="text-glow font-bold">Total SHU: Rp {p.totalPayout.toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="completed-actions">
            <button 
              id="restart-simulation-btn"
              className="btn btn-secondary btn-lg"
              onClick={handleRestart}
            >
              <RefreshCw size={18} />
              <span>Main Lagi</span>
            </button>
            
            <p className="completed-quiz-prompt">
              💡 Rencana selanjutnya? Yuk tes pengetahuan koperasimu di bagian **Kuis & Ranks** untuk membuktikan keahlianmu!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
