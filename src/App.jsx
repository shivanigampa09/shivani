import React, { useState, useEffect } from 'react';
import HelloIntro from './components/HelloIntro';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ParticleCanvas from './components/ParticleCanvas';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import FaultyTerminal from './components/FaultyTerminal';
import Footer from './components/Footer';

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);

  // Scroll reveal observer for elements across sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll(
      '.project-card, .dev-tool-card, .skill-card, .edu-card, .terminal-window-wrapper, .section-title'
    );
    elements.forEach((el) => {
      el.classList.add('reveal-on-scroll');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [introFinished]);

  return (
    <div className="portfolio-app">
      {/* Full-screen Black Intro Gate with HELLO letter reveal & scroll-to-enter */}
      <HelloIntro onComplete={() => setIntroFinished(true)} />

      {/* Interactive cursor */}
      <CustomCursor />

      {/* Floating Ambient Aurora Glow mesh */}
      <div className="aurora-mesh" aria-hidden="true">
        <div className="aurora-blob blob-1"></div>
        <div className="aurora-blob blob-2"></div>
        <div className="aurora-blob blob-3"></div>
      </div>

      {/* Fluid ambient particle mesh background */}
      <ParticleCanvas />

      {/* Top Floating Glass Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className={`portfolio-main ${introFinished ? 'revealed' : ''}`}>
        {/* Hero Section with Decrypted Text & 3D Interactive Lanyard */}
        <Hero />

        {/* About Section with Interactive 3D Storybook */}
        <AboutSection />

        {/* Skills & Tech Stack Matrix */}
        <SkillsSection />

        {/* Featured Projects Showcase with Modals & Live Links */}
        <ProjectsSection />

        {/* Professional Experience & Education Timeline */}
        <ExperienceSection />

        {/* Interactive Developer CRT Terminal (CLI) */}
        <FaultyTerminal />
      </main>

      {/* Footer */}
      <Footer />

      <style>{`
        .portfolio-app {
          position: relative;
          min-height: 100vh;
          overflow-x: hidden;
          background-color: var(--bg-dark);
        }

        .portfolio-main {
          position: relative;
          z-index: 10;
          transition: filter 0.6s ease;
        }
      `}</style>
    </div>
  );
}
