import React, { useState } from 'react';
import { Vote, Users, HelpCircle, Check, X, ArrowRight } from 'lucide-react';

export default function SandboxVoting({ members, coopType, onCompleteVote }) {
  const [userVote, setUserVote] = useState(null); // 'setuju' or 'tidak'
  const [voteTally, setVoteTally] = useState(null); // Will hold vote result object when calculated

  // Pre-defined proposal based on cooperative type
  const proposal = coopType === 'konsumen' 
    ? {
        title: 'Beli Kulkas Showcase Minuman Dingin 🧊',
        cost: 200000,
        desc: 'Usulan membeli kulkas pendingin mini seharga Rp 200.000 untuk memajang minuman dingin. Diharapkan meningkatkan penjualan minuman dan kebahagiaan anggota.',
        options: { setuju: 'Setuju (Beli)', tidak: 'Tidak Setuju (Hemat Kas)' },
        memberStances: {
          1: { vote: 'setuju', reason: 'Alya: Investasi bagus untuk menaikkan penjualan harian, modal kas kita cukup.' },
          2: { vote: 'setuju', reason: 'Rian: Mantap! Main game sambil minum soda dingin itu surga dunia.' },
          3: { vote: 'setuju', reason: 'Dono: Sangat menunjang kebutuhan anggota di cuaca panas.' },
          4: { vote: 'setuju', reason: 'Chika: Minuman dingin di kulkas transparan kelihatan lebih aesthetic.' },
          5: { vote: 'setuju', reason: 'Budi: Wah, sehabis olahraga butuh air dingin segar. Setuju!' },
          6: { vote: 'tidak', reason: 'Eka: Kas sebesar Rp200.000 lebih baik untuk cadangan darurat saja.' }
        }
      }
    : {
        title: 'Beli Sistem Software Kasir KSP Digital 💻',
        cost: 150000,
        desc: 'Usulan membeli software pembukuan KSP digital seharga Rp 150.000 untuk mempercepat pencatatan simpan pinjam dan transparansi kasir.',
        options: { setuju: 'Setuju (Maju/Digital)', tidak: 'Tidak Setuju (Manual Saja)' },
        memberStances: {
          1: { vote: 'setuju', reason: 'Alya: Membantu saya mencatat kas secara akurat, tidak pusing hitung manual lagi.' },
          2: { vote: 'tidak', reason: 'Rian: Selama bunga pinjaman tetap rendah, pakai manual juga tidak masalah.' },
          3: { vote: 'setuju', reason: 'Dono: Transparansi data sangat penting untuk mencegah korupsi dan salah catat.' },
          4: { vote: 'setuju', reason: 'Chika: Aplikasi digital mempermudah anggota melihat saldo simpanan mereka.' },
          5: { vote: 'tidak', reason: 'Budi: Lebih baik uangnya untuk dana sosial atau menambah modal pinjaman.' },
          6: { vote: 'setuju', reason: 'Eka: Teknologi baru membuat proses pengajuan pinjaman saya lebih cepat.' }
        }
      };

  const handleCastVote = () => {
    if (userVote === null) return;
    
    // Tally votes from members and user
    const tallies = { setuju: 0, tidak: 0, details: [] };

    // Tally members
    members.forEach(member => {
      const stance = proposal.memberStances[member.id] || { vote: 'setuju', reason: 'Setuju' };
      tallies[stance.vote]++;
      tallies.details.push({
        name: member.name,
        avatar: member.avatar,
        vote: stance.vote,
        reason: stance.reason
      });
    });

    // Add user's vote (User acts as 1 member with 1 vote!)
    tallies[userVote]++;
    tallies.details.push({
      name: 'Kamu (Pengurus)',
      avatar: '👑',
      vote: userVote,
      reason: userVote === 'setuju' ? 'Memilih untuk menyetujui program kerja.' : 'Memilih untuk memprioritaskan penghematan kas.'
    });

    const isPassed = tallies.setuju > tallies.tidak;

    setVoteTally({
      ...tallies,
      isPassed
    });
  };

  const handleFinish = () => {
    onCompleteVote(voteTally.isPassed, proposal.cost);
  };

  return (
    <div className="voting-container glass" id="voting-dialog-root">
      <div className="voting-header text-center">
        <div className="badge badge-orange"><Vote size={14} /> <span>Musyawarah Demokratis</span></div>
        <h2>Rapat Anggota: Pengambilan Suara (Voting)</h2>
        <p>Setiap anggota memiliki <strong>1 Hak Suara yang setara</strong>, tidak peduli seberapa banyak tabungannya!</p>
      </div>

      <div className="proposal-card glass">
        <h3>{proposal.title}</h3>
        <p className="proposal-desc">{proposal.desc}</p>
        <div className="proposal-cost">Biaya Program: <strong>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(proposal.cost)}</strong></div>
      </div>

      {voteTally === null ? (
        /* Voting Phase */
        <div className="voting-actions-panel">
          <div className="member-stances-list">
            <h4>Pendapat & Stance Anggota Pendiri:</h4>
            <div className="stances-grid">
              {members.map(member => {
                const stance = proposal.memberStances[member.id] || { vote: 'setuju', reason: 'Setuju' };
                return (
                  <div key={member.id} className="stance-item glass" id={`stance-${member.id}`}>
                    <div className="stance-member-info">
                      <span>{member.avatar}</span>
                      <strong>{member.name}</strong>
                    </div>
                    <p>"{stance.reason.split(': ')[1]}"</p>
                    <span className={`badge ${stance.vote === 'setuju' ? 'badge-mint' : 'badge-orange'}`}>
                      {stance.vote === 'setuju' ? 'Cenderung Setuju' : 'Cenderung Tidak Setuju'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="user-vote-box glass">
            <h4>Bagaimana Hak Suara Kamu?</h4>
            <p className="user-vote-desc">Kamu memiliki 1 hak suara seperti anggota lainnya. Pilihlah dengan bijak!</p>
            <div className="user-vote-options">
              <button 
                id="vote-yes-btn"
                className={`btn ${userVote === 'setuju' ? 'btn-mint' : 'btn-outline'}`}
                onClick={() => setUserVote('setuju')}
              >
                <Check size={18} />
                <span>{proposal.options.setuju}</span>
              </button>
              <button 
                id="vote-no-btn"
                className={`btn ${userVote === 'tidak' ? 'btn-danger' : 'btn-outline'}`}
                onClick={() => setUserVote('tidak')}
              >
                <X size={18} />
                <span>{proposal.options.tidak}</span>
              </button>
            </div>
            <button 
              id="submit-vote-btn"
              className="btn btn-mint btn-lg submit-vote-cta"
              onClick={handleCastVote}
              disabled={userVote === null}
            >
              <span>Hitung Suara Koperasi 🗳️</span>
            </button>
          </div>
        </div>
      ) : (
        /* Results Phase */
        <div className="vote-results-panel glass animate-scale-in" id="vote-results-tally">
          <div className="results-header text-center">
            {voteTally.isPassed ? (
              <div className="result-banner success">
                🎉 <strong>Usulan Diterima!</strong> ({voteTally.setuju} Setuju vs {voteTally.tidak} Tidak Setuju)
              </div>
            ) : (
              <div className="result-banner failure">
                ❌ <strong>Usulan Ditolak!</strong> ({voteTally.setuju} Setuju vs {voteTally.tidak} Tidak Setuju)
              </div>
            )}
          </div>

          <div className="tally-breakdown">
            <h4>Rincian Suara Anggota:</h4>
            <div className="tally-list">
              {voteTally.details.map((detail, idx) => (
                <div key={idx} className="tally-item glass">
                  <div className="tally-member">
                    <span>{detail.avatar}</span>
                    <strong>{detail.name}</strong>
                  </div>
                  <span className={`badge ${detail.vote === 'setuju' ? 'badge-mint' : 'badge-orange'}`}>
                    {detail.vote === 'setuju' ? 'Setuju' : 'Tidak Setuju'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="vote-impact-box">
            <h4>Dampak Keputusan:</h4>
            {voteTally.isPassed ? (
              <p>
                ✅ Kas koperasi dikurangi sebesar <strong>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(proposal.cost)}</strong> untuk mendanai program. Tingkat kepuasan anggota naik <strong>+15%</strong>!
              </p>
            ) : (
              <p>
                ⚠️ Dana kas koperasi tetap utuh. Beberapa anggota yang sangat menginginkan program ini mengalami penurunan tingkat kepuasan <strong>-5%</strong>, namun stabilitas keuangan terjaga.
              </p>
            )}
          </div>

          <div className="text-center">
            <button 
              id="close-vote-btn"
              className="btn btn-mint btn-lg"
              onClick={handleFinish}
            >
              <span>Kembali ke Dashboard</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
