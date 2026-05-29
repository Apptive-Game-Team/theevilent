import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import Home from './pages/Home';
import Games from './pages/Games';
import Team from './pages/Team';

function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Custom mouse hover glow trail
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'games':
        return <Games />;
      case 'team':
        return <Team />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div style={styles.appLayout}>
      {/* Glow highlight following the cursor */}
      <div 
        className="custom-cursor-glow" 
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
        }}
      />

      {/* Atmospheric Canvas Embers Background */}
      <ParticleBackground />

      {/* Main Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Pages Container with subtle entry transitions */}
      <main style={styles.mainContent} className="page-fade-in">
        {renderContent()}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  appLayout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    position: 'relative',
  },
  mainContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
};

// Global keyframe for page fade-in animation
if (typeof document !== 'undefined') {
  const appStyle = document.createElement('style');
  appStyle.innerHTML = `
    .page-fade-in {
      animation: pageFadeInEffect 0.5s ease-out;
    }
    @keyframes pageFadeInEffect {
      from {
        opacity: 0;
        transform: translateY(6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(appStyle);
}

export default App;
