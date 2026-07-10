import React from 'react';
import { TrendingUp, DollarSign, Package, Users, Plus, Coins, FileText, CheckCircle, Calendar, ArrowUpRight, HelpCircle, Lightbulb } from 'lucide-react';

export default function SandboxDashboard({
  coopName,
  coopType,
  funds,
  inventory,
  members,
  logs,
  turnsLeft,
  shuTotal,
  onBuyStock,
  onMemberTransaction,
  onMemberSave,
  onMemberLoan,
  onMemberRepay,
  onTriggerRAT,
  onTriggerVote
}) {
  
  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const getAvgHappiness = () => {
    if (members.length === 0) return 0;
    const sum = members.reduce((acc, m) => acc + m.happiness, 0);
    return Math.round(sum / members.length);
  };

  const getTotalMemberDeposits = () => {
    return members.reduce((acc, m) => acc + m.simpananPokok + m.simpananWajib + m.simpananSukarela, 0);
  };

  return (
    <div className="dashboard-layout-container" id="sandbox-dashboard-root">
      {/* Top Banner Stats */}
      <div className="dashboard-stats-grid">
        <div className="stat-card glass border-violet" id="stat-kas">
          <div className="stat-icon-row">
            <span className="stat-label">Total Kas Koperasi</span>
            <div className="stat-icon color-violet-glow"><Coins size={20} className="text-violet" /></div>
          </div>
          <h2 className="stat-val">{formatRupiah(funds)}</h2>
          <span className="stat-sub">Modal operasional aktif</span>
        </div>

        <div className="stat-card glass border-mint" id="stat-deposits">
          <div className="stat-icon-row">
            <span className="stat-label">Total Simpanan Anggota</span>
            <div className="stat-icon color-mint-glow"><DollarSign size={20} className="text-mint" /></div>
          </div>
          <h2 className="stat-val">{formatRupiah(getTotalMemberDeposits())}</h2>
          <span className="stat-sub">Tabungan pokok + wajib + sukarela</span>
        </div>

        <div className="stat-card glass border-orange" id="stat-shu">
          <div className="stat-icon-row">
            <span className="stat-label">SHU Berjalan (Profit)</span>
            <div className="stat-icon color-orange-glow"><TrendingUp size={20} className="text-orange" /></div>
          </div>
          <h2 className="stat-val text-orange-light">{formatRupiah(shuTotal)}</h2>
          <span className="stat-sub">Keuntungan yang siap dibagikan</span>
        </div>

        <div className="stat-card glass border-blue" id="stat-happiness">
          <div className="stat-icon-row">
            <span className="stat-label">Rata-rata Kepuasan</span>
            <div className="stat-icon color-blue-glow"><Users size={20} className="text-blue" /></div>
          </div>
          <h2 className="stat-val">{getAvgHappiness()}%</h2>
          <div className="progress-bar-container mini">
            <div 
              className="progress-bar" 
              style={{ 
                width: `${getAvgHappiness()}%`, 
                backgroundColor: getAvgHappiness() > 70 ? 'var(--color-mint)' : getAvgHappiness() > 40 ? 'var(--color-yellow)' : 'var(--color-danger)'
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Panel Grid */}
      <div className="dashboard-panels-grid">
        
        {/* Left Side: Operations & Actions */}
        <div className="panel-col main-operations-panel">
          
          {/* Turn Header */}
          <div className="turns-banner glass">
            <div className="turns-info">
              <Calendar size={18} />
              <span>Sisa Langkah Periode Ini: <strong>{turnsLeft} Aksi Lagi</strong></span>
            </div>
            {turnsLeft > 0 ? (
              <span className="turns-hint">Pilih transaksi anggota atau belanja stok di bawah untuk memajukan simulasi!</span>
            ) : (
              <button 
                id="rat-trigger-btn"
                className="btn btn-mint animate-pulse-glow"
                onClick={onTriggerRAT}
              >
                Mulai Rapat Anggota Tahunan (RAT) 🗳️
              </button>
            )}
          </div>

          {/* Type-Specific Inventory / Loan Controls */}
          {coopType === 'konsumen' ? (
            <div className="inventory-section glass" id="inventory-controls">
              <div className="panel-header">
                <Package size={20} />
                <h3>Kelola Inventaris Koperasi</h3>
              </div>
              <div className="inventory-grid">
                {inventory.map((item) => (
                  <div key={item.id} className="inventory-item-card glass" id={`inv-card-${item.id}`}>
                    <div className="inv-badge">{item.icon}</div>
                    <div className="inv-info">
                      <h4>{item.name}</h4>
                      <p>Stok: <strong>{item.stock} unit</strong></p>
                      <p>Harga Beli: {formatRupiah(item.cost)}</p>
                      <p>Harga Jual: <span className="text-mint">{formatRupiah(item.sellPrice)}</span></p>
                    </div>
                    <button
                      id={`buy-stock-btn-${item.id}`}
                      className="btn btn-secondary btn-sm"
                      onClick={() => onBuyStock(item.id)}
                      disabled={funds < item.cost || turnsLeft <= 0}
                    >
                      <Plus size={14} />
                      <span>Beli Stok (+5)</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="loan-info-section glass" id="ksp-info">
              <div className="panel-header">
                <Coins size={20} />
                <h3>Informasi KSP (Simpan Pinjam)</h3>
              </div>
              <div className="ksp-explainer">
                <p>
                  💡 <strong>Cara Kerja KSP:</strong> Kas didapat dari Simpanan Pokok & Wajib anggota. Anggota bisa menabung <strong>Simpanan Sukarela</strong> (menambah Kas) atau memohon <strong>Pinjaman</strong> (mengurangi Kas). Pinjaman yang dikembalikan menyertakan <strong>Bunga 10%</strong> yang akan masuk menjadi keuntungan SHU Koperasi!
                </p>
              </div>
            </div>
          )}

          {/* Members Operations Panel */}
          <div className="members-section-dashboard" id="members-operations">
            <h3 className="section-title-sm">Anggota Koperasi ({members.length})</h3>
            
            <div className="members-grid-dashboard">
              {members.map((member) => (
                <div key={member.id} className="member-op-card glass" id={`member-card-${member.id}`}>
                  <div className="member-op-header">
                    <span className="member-op-avatar">{member.avatar}</span>
                    <div>
                      <h4>{member.name}</h4>
                      <span className="badge badge-blue">{member.role}</span>
                    </div>
                    <span className="member-op-happiness" title="Kepuasan Anggota">
                      ❤️ {member.happiness}%
                    </span>
                  </div>

                  <div className="member-op-details">
                    <div className="detail-row">
                      <span>Total Simpanan</span>
                      <strong>{formatRupiah(member.simpananPokok + member.simpananWajib + member.simpananSukarela)}</strong>
                    </div>
                    
                    {coopType === 'konsumen' ? (
                      <div className="detail-row">
                        <span>Total Transaksi</span>
                        <strong>{member.transactions}x ({formatRupiah(member.transactionValue)})</strong>
                      </div>
                    ) : (
                      <>
                        <div className="detail-row">
                          <span>Sisa Pinjaman</span>
                          <strong className={member.loanBalance > 0 ? 'text-orange-light' : ''}>
                            {formatRupiah(member.loanBalance)}
                          </strong>
                        </div>
                        <div className="detail-row">
                          <span>Nabung Sukarela</span>
                          <strong>{formatRupiah(member.simpananSukarela)}</strong>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="member-op-actions">
                    {coopType === 'konsumen' ? (
                      <>
                        {inventory.map((item) => (
                          <button
                            key={item.id}
                            id={`member-${member.id}-buy-${item.id}-btn`}
                            className="btn btn-outline btn-sm action-btn-item"
                            onClick={() => onMemberTransaction(member.id, item.id)}
                            disabled={item.stock <= 0 || member.pocketMoney < item.sellPrice || turnsLeft <= 0}
                          >
                            <span>Beli {item.icon}</span>
                          </button>
                        ))}
                        <button
                          id={`member-${member.id}-save-wajib-btn`}
                          className="btn btn-secondary btn-sm action-btn-item"
                          onClick={() => onMemberSave(member.id, 10000, 'wajib')}
                          disabled={member.pocketMoney < 10000 || turnsLeft <= 0}
                        >
                          <span>S. Wajib (Rp10rb)</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          id={`member-${member.id}-deposit-sukarela-btn`}
                          className="btn btn-outline btn-sm action-btn-item"
                          onClick={() => onMemberSave(member.id, 50000, 'sukarela')}
                          disabled={member.pocketMoney < 50000 || turnsLeft <= 0}
                        >
                          <span>Nabung Rp50rb</span>
                        </button>

                        <button
                          id={`member-${member.id}-request-loan-btn`}
                          className="btn btn-secondary btn-sm action-btn-item"
                          onClick={() => onMemberLoan(member.id, 100000)}
                          disabled={member.loanBalance > 0 || funds < 100000 || turnsLeft <= 0}
                        >
                          <span>Pinjam Rp100rb</span>
                        </button>

                        <button
                          id={`member-${member.id}-repay-loan-btn`}
                          className="btn btn-mint btn-sm action-btn-item"
                          onClick={() => onMemberRepay(member.id)}
                          disabled={member.loanBalance <= 0 || member.pocketMoney < (member.loanBalance * 1.1) || turnsLeft <= 0}
                        >
                          <span>Bayar Pinjam (+10% Bunga)</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Logs, Events, & Guide */}
        <div className="panel-col logs-and-events-panel">
          {/* Democratic Event Trigger */}
          {turnsLeft === 3 && (
            <div className="event-trigger-box glass animate-pulse-glow" id="vote-alert-card">
              <div className="event-badge">🗳️ Dynamic Vote Event</div>
              <h4>Musyawarah Rencana Koperasi!</h4>
              <p>Ada usulan dari pengurus untuk dibahas bersama seluruh anggota. Rapat Anggota harus mengambil suara secara demokratis!</p>
              <button 
                id="enter-voting-event-btn"
                className="btn btn-primary w-full"
                onClick={onTriggerVote}
              >
                Mulai Diskusi & Voting
              </button>
            </div>
          )}

          {/* Quick Guide */}
          <div className="quick-guide-box glass">
            <div className="guide-header">
              <Lightbulb size={18} className="text-yellow-light" />
              <h4>Tips Pengurus Koperasi</h4>
            </div>
            <p className="guide-desc">
              Tugasmu adalah menyeimbangkan dana kas koperasi dengan kebahagiaan anggota. 
            </p>
            <ul className="guide-tips">
              <li>🛒 <strong>Konsumen:</strong> Pastikan stok barang tidak habis (0) agar anggota bisa terus belanja. Jika barang habis, anggota akan kecewa dan tingkat kebahagiaan turun!</li>
              <li>💸 <strong>Simpan Pinjam:</strong> Pastikan kas tidak habis dipinjamkan semua, sisakan untuk anggota yang ingin menarik tabungan atau tabungan sukarela. Bunga pengembalian pinjaman (10%) meningkatkan SHU berjalan.</li>
              <li>🗳️ <strong>Voting:</strong> Setiap anggota punya 1 hak suara. Hasil vote akan berdampak pada kas dan kepuasan anggota.</li>
            </ul>
          </div>

          {/* Logs */}
          <div className="logs-box glass">
            <div className="panel-header">
              <FileText size={20} />
              <h3>Catatan Transaksi & Log</h3>
            </div>
            <div className="logs-list" id="transaction-logs-list">
              {logs.length === 0 ? (
                <div className="no-logs">Belum ada transaksi terjadi. Silakan klik aksi pada kartu anggota.</div>
              ) : (
                logs.map((log, idx) => (
                  <div key={idx} className="log-item">
                    <span className="log-time">[{idx + 1}]</span>
                    <span className="log-text">{log}</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
