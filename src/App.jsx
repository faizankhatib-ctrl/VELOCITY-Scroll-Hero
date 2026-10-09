import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import { STATS_DATA } from './data/stats';
import './App.css';

// Ensure ScrollTrigger is registered
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Main Application Component: VELOCITY — Beyond the Ordinary
 * Orchestrates the complete scroll-driven automotive experience with:
 * - Viewport-pinned cinematic graphite hero stage (320vh duration)
 * - Coordinated GSAP timeline (scrub: 1, no autoplay)
 * - Proportional McLaren 720S car travel across horizontal asphalt road
 * - Cyan glowing trail animated strictly via scaleX & transformOrigin
 * - Dynamic reveal of "W E L C O M E   I T Z F I Z Z" headline letters
 * - Coordinated reveal and reverse-scrub of 4 distinct metric cards
 * - Telemetry HUD speed, progress, and stage scrub
 * - Full responsive resize recalculation and prefers-reduced-motion support
 */
function App() {
  const scrollContainerRef = useRef(null);
  const heroStageRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const lettersContainerRef = useRef(null);
  const letterRefs = useRef([]);
  const metricCardRefs = useRef([]);
  const scrollIndicatorRef = useRef(null);
  const speedDisplayRef = useRef(null);
  const progressDisplayRef = useRef(null);
  const phaseDisplayRef = useRef(null);
  const progressBarRef = useRef(null);

  // Initialize and orchestrate the GSAP ScrollTrigger timeline
  useEffect(() => {
    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // In reduced motion mode: park car cleanly and display all elements statically
      if (scrollContainerRef.current) scrollContainerRef.current.style.height = 'auto';
      if (carRef.current) gsap.set(carRef.current, { x: 0 });
      if (trailRef.current) gsap.set(trailRef.current, { scaleX: 1, transformOrigin: 'left center', width: '100%' });
      if (metricCardRefs.current) {
        metricCardRefs.current.forEach((card) => {
          if (card) gsap.set(card, { opacity: 1, scale: 1, y: 0, pointerEvents: 'auto' });
        });
      }
      if (letterRefs.current) {
        letterRefs.current.forEach((letter) => {
          if (letter) gsap.set(letter, { opacity: 1, color: '#ffffff' });
        });
      }
      if (progressDisplayRef.current) progressDisplayRef.current.textContent = '100%';
      if (speedDisplayRef.current) speedDisplayRef.current.textContent = '341';
      if (phaseDisplayRef.current) phaseDisplayRef.current.textContent = 'TERMINAL VELOCITY';
      return;
    }

    // Scoped GSAP context for safe React lifecycle handling
    const ctx = gsap.context(() => {
      if (!scrollContainerRef.current || !heroStageRef.current || !roadRef.current || !carRef.current) {
        return;
      }

      // Calculate dynamic travel distance based on live element dimensions
      const calculateTravelDistance = () => {
        const roadW = roadRef.current ? roadRef.current.clientWidth : window.innerWidth;
        const carW = carRef.current ? carRef.current.clientWidth : 200;
        // Keep car gracefully within track bounds with slight safety margin
        return Math.max(100, roadW - carW - 16);
      };

      const getCarWidth = () => {
        return carRef.current ? carRef.current.clientWidth : 200;
      };

      const travelDistance = calculateTravelDistance();
      const carW = getCarWidth();

      // Configure base dimensions for trail so scaleX(1) matches exact travel distance + 15px under car
      if (trailRef.current) {
        gsap.set(trailRef.current, {
          transformOrigin: 'left center',
          scaleX: 0,
          width: `${travelDistance + 15}px`,
        });
      }

      // Initialize metric cards initial hidden state
      metricCardRefs.current.forEach((cardEl, idx) => {
        if (!cardEl) return;
        const isTop = idx % 2 === 0;
        gsap.set(cardEl, {
          opacity: 0,
          scale: 0.85,
          y: isTop ? -25 : 25,
          pointerEvents: 'none',
        });
      });

      // Create one master scrubbed timeline pinned to the hero container
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: heroStageRef.current,
          pinSpacing: true,
          scrub: 1, // Smooth 1-second scrub physics
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            const currentSpeed = Math.round(p * 341);

            // Live HUD speed readout
            if (speedDisplayRef.current) {
              speedDisplayRef.current.textContent = String(currentSpeed).padStart(3, '0');
            }

            // Live HUD trajectory percentage
            if (progressDisplayRef.current) {
              progressDisplayRef.current.textContent = `${Math.round(p * 100)}%`;
            }

            // Live Track distance bar
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${p * 100}%`;
            }

            // Telemetry corridor stage name
            if (phaseDisplayRef.current) {
              let phaseName = 'GRID / IDLE';
              if (p > 0.04 && p <= 0.32) phaseName = 'LAUNCH // SECTOR 1';
              else if (p > 0.32 && p <= 0.65) phaseName = 'APEX // SECTOR 2';
              else if (p > 0.65 && p < 0.95) phaseName = 'TOP SPEED // SECTOR 3';
              else if (p >= 0.95) phaseName = 'TERMINAL VELOCITY';
              phaseDisplayRef.current.textContent = phaseName;
            }
          },
        },
      });

      // 1. Car movement strictly across the road according to scroll progress (no autoplay)
      masterTl.to(
        carRef.current,
        {
          x: () => calculateTravelDistance(),
          ease: 'none',
          duration: 1,
        },
        0
      );

      // 2. Cyan glowing trail animation strictly via scaleX with transformOrigin: left center
      masterTl.to(
        trailRef.current,
        {
          scaleX: 1,
          ease: 'none',
          duration: 1,
        },
        0
      );

      // 3. Scroll indicator fades out immediately once scrub starts
      if (scrollIndicatorRef.current) {
        masterTl.to(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            y: 12,
            pointerEvents: 'none',
            duration: 0.08,
            ease: 'power1.out',
          },
          0
        );
      }

      // 4. Headline letter reveals as the front/center of car passes them
      if (letterRefs.current && letterRefs.current.length > 0 && roadRef.current) {
        const roadRect = roadRef.current.getBoundingClientRect();
        const totalDist = travelDistance;

        letterRefs.current.forEach((letterEl) => {
          if (!letterEl) return;
          const letterRect = letterEl.getBoundingClientRect();
          // Distance from track left edge to the letter
          const letterOffsetLeft = letterRect.left - roadRect.left;
          // Normalized time in timeline when the car center reaches this letter
          const carCenterOffset = letterOffsetLeft - (carW * 0.5);
          const triggerFraction = Math.max(
            0.01,
            Math.min(0.96, carCenterOffset / totalDist)
          );

          // Reveal letter when car front/center passes
          masterTl.to(
            letterEl,
            {
              opacity: 1,
              color: '#ffffff',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.9), 0 0 20px rgba(6, 182, 212, 0.95), 0 0 45px rgba(6, 182, 212, 0.5)',
              duration: 0.03,
              ease: 'power1.out',
            },
            triggerFraction
          );
        });
      }

      // 5. Distinct Metric Cards reveals across timeline (fully reversible)
      STATS_DATA.forEach((statData, idx) => {
        const cardEl = metricCardRefs.current[idx];
        if (!cardEl) return;

        masterTl.to(
          cardEl,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            pointerEvents: 'auto',
            duration: 0.12,
            ease: 'back.out(1.2)',
          },
          statData.timelineTrigger
        );
      });
    }, scrollContainerRef);

    // Refresh ScrollTrigger and re-sync trail dimensions on window resize
    const handleResize = () => {
      if (roadRef.current && carRef.current && trailRef.current) {
        const newDist = Math.max(100, roadRef.current.clientWidth - carRef.current.clientWidth - 16);
        trailRef.current.style.width = `${newDist + 15}px`;
      }
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Handle deferred font / image load refresh
    if (document.fonts) {
      document.fonts.ready.then(() => {
        handleResize();
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert(); // Complete GSAP cleanup
    };
  }, []);

  // Smooth scroll helper for scroll indicator click
  const handleScrollDown = () => {
    if (scrollContainerRef.current) {
      const targetPos = window.innerHeight * 1.2;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  };

  // Replay shortcut to smoothly return to top
  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07080b] text-white selection:bg-cyan-400 selection:text-black">
      {/* 
        Scroll Animation Container:
        A 320vh section that pins the hero stage while scrubbing.
      */}
      <div
        ref={scrollContainerRef}
        id="corridor-experience"
        className="relative w-full h-[320vh]"
      >
        <HeroSection
          ref={heroStageRef}
          roadRef={roadRef}
          carRef={carRef}
          trailRef={trailRef}
          lettersContainerRef={lettersContainerRef}
          letterRefs={letterRefs}
          metricCardRefs={metricCardRefs}
          scrollIndicatorRef={scrollIndicatorRef}
          speedDisplayRef={speedDisplayRef}
          progressDisplayRef={progressDisplayRef}
          phaseDisplayRef={phaseDisplayRef}
          progressBarRef={progressBarRef}
          onScrollDown={handleScrollDown}
        />
      </div>

      {/* 
        Comprehensive Telemetry Archive & Outcomes:
        Accessible breakdown revealed once the user scrolls through the corridor.
      */}
      <StatsSection onReplay={handleReplay} />

      {/* Minimalist Tech Footer */}
      <footer className="py-8 px-6 sm:px-12 border-t border-zinc-900 text-center text-xs font-mono-tech text-zinc-500 bg-[#06070a] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-zinc-400 font-semibold">VELOCITY</span>
          <span className="text-zinc-600">//</span>
          <span>Beyond the Ordinary</span>
          <span className="text-zinc-600">//</span>
          <span className="text-zinc-500">Frontend Internship Assignment</span>
        </div>
        <div className="flex items-center gap-3 text-zinc-400 text-[11px]">
          <span>GSAP 3.15 ScrollTrigger</span>
          <span>•</span>
          <span>Tailwind CSS</span>
          <span>•</span>
          <span>React 19</span>
          <span>•</span>
          <span>GitHub Pages Ready</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
