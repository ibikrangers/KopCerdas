import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import LearnSection from './components/LearnSection';
import SandboxSimulator from './components/SandboxSimulator';
import QuizSection from './components/QuizSection';
import { GraduationCap } from 'lucide-react';
import kopcerdasLogo from './assets/KOPCERDAS.png';

function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [unlockedBadges, setUnlockedBadges] = useState([]);

  // Handler to unlock badges from child components
  const handleUnlockBadge = (badgeName) => {
    if (!unlockedBadges.includes(badgeName)) {
      setUnlockedBadges(prev => [...prev, badgeName]);
      
      // Optional: Add a cute browser notification/sound effect trigger
      console.log(`Badge Unlocked: ${badgeName}`);
    }
  };

  return (
    <div className="app-wrapper" id="app-root-container">
      {/* Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Educational/Gamified Content */}
      <main className="main-content" id="app-main-content">
        {activeTab === 'landing' && (
          <LandingPage setActiveTab={setActiveTab} />
        )}
        
        {activeTab === 'learn' && (
          <LearnSection onUnlockBadge={handleUnlockBadge} />
        )}
        
        {activeTab === 'sandbox' && (
          <SandboxSimulator onUnlockBadge={handleUnlockBadge} />
        )}
        
        {activeTab === 'quiz' && (
          <QuizSection unlockedBadges={unlockedBadges} setActiveTab={setActiveTab} />
        )}
      </main>

      {/* Modern Gamified Footer */}
      <footer className="footer-container" id="app-footer">
        <div className="container footer-content">
          <div className="footer-info">
            <div className="footer-logo">
              <img src={kopcerdasLogo} alt="KopCerdas" className="logo-img-mini" />
              <span>Kop<span className="logo-text-accent">Cerdas</span></span>
            </div>
            <p>Gotong Royong Modern untuk Generasi Penerus Perekonomian Bangsa.</p>
          </div>
          
          <div className="footer-links">
            <button className="footer-link" onClick={() => { setActiveTab('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Beranda</button>
            <button className="footer-link" onClick={() => { setActiveTab('learn'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Materi Belajar</button>
            <button className="footer-link" onClick={() => { setActiveTab('sandbox'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Sandbox Game</button>
            <button className="footer-link" onClick={() => { setActiveTab('quiz'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Kuis Kelulusan</button>
          </div>
        </div>
        <div className="container footer-bottom text-center">
          <p>© 2026 KopCerdas. Dirancang untuk edukasi Gen Z & Gen Alpha dengan format interaktif sandbox.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
