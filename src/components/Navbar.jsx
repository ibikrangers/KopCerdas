import React, { useState } from 'react';
import { GraduationCap, Menu, X, BookOpen, Gamepad2, Award, Sparkles } from 'lucide-react';
import kopcerdasLogo from '../assets/KOPCERDAS.png';

export default function Navbar({ activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'landing', label: 'Beranda', icon: Sparkles },
    { id: 'learn', label: 'Materi', icon: BookOpen },
    { id: 'sandbox', label: 'Sandbox Game', icon: Gamepad2 },
    { id: 'quiz', label: 'Kuis & Ranks', icon: Award },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsOpen(false);
    // Smooth scroll to top when changing tab
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar-container" id="main-navbar">
      <div className="container navbar-content">
        {/* Logo */}
        <div className="logo-section" onClick={() => handleNavClick('landing')} id="nav-logo">
          <img src={kopcerdasLogo} alt="KopCerdas" className="logo-img" />
          <span className="logo-text">
            Kop<span className="logo-text-accent">Cerdas</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="desktop-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <Icon size={16} className="nav-link-icon" />
                {item.label}
              </button>
            );
          })}
          
          <button 
            id="nav-cta-button"
            className="btn btn-primary btn-sm nav-cta"
            onClick={() => handleNavClick('sandbox')}
          >
            <Gamepad2 size={16} />
            <span>Main Sandbox</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          id="mobile-menu-toggle"
          className="mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="mobile-menu-panel glass" id="mobile-menu-dropdown">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button 
            id="mobile-nav-cta"
            className="btn btn-primary w-full mobile-cta"
            onClick={() => handleNavClick('sandbox')}
          >
            <Gamepad2 size={18} />
            <span>Main Sandbox Simulator</span>
          </button>
        </div>
      )}
    </nav>
  );
}
