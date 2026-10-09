import React, { forwardRef } from 'react';
import { ChevronDown, ArrowDownRight } from 'lucide-react';
import CarVisual from './CarVisual';
import { STATS_DATA, TELEMETRY_SPECS } from '../data/stats';

/**
 * HeroSection Component
 * The cinematic dark graphite viewport stage.
 * Features:
 * - Restrained cyan ambient glow & technical graphite grid
 * - Header telemetry HUD with dynamic speed, progress, and stage readouts
 * - Central horizontal asphalt road with local car.png, cyan glowing trail, and WELCOME ITZFIZZ
 * - Four floating metric cards revealing at distinct scroll positions (responsive for desktop & mobile)
 * - Centered scroll indicator with animated hint
 */
const HeroSection = forwardRef(function HeroSection(
  {
    roadRef,
    carRef,
    trailRef,
    lettersContainerRef,
    letterRefs,
    metricCardRefs,
    scrollIndicatorRef,
    speedDisplayRef,
    progressDisplayRef,
    phaseDisplayRef,
    progressBarRef,
    onScrollDown,
  },
  ref
) {
  // Helper to place metric cards gracefully across both mobile and desktop viewports
  const getCardPositionClasses = (id) => {
    switch (id) {
      case 'box1':
        return 'top-[13%] left-3 sm:left-6 md:left-auto md:top-[7%] md:right-[30%]';
      case 'box2':
        return 'bottom-[13%] left-3 sm:left-6 md:left-auto md:bottom-[7%] md:right-[35%]';
      case 'box3':
        return 'top-[13%] right-3 sm:right-6 md:top-[7%] md:right-[10%]';
      case 'box4':
        return 'bottom-[13%] right-3 sm:right-6 md:bottom-[7%] md:right-[12%]';
      default:
        return '';
    }
  };

  return (
    <div
      ref={ref}
      className="relative w-full h-screen flex flex-col justify-between overflow-hidden graphite-grid select-none bg-[#090a0f] text-white"
    >
      {/* Cinematic Vignette & Ambient Cyan Lighting */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 cinematic-vignette z-[1]" 
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/4 left-1/3 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[150px] rounded-full z-[1]" 
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute bottom-10 right-1/4 w-[500px] h-[250px] bg-emerald-500/5 blur-[130px] rounded-full z-[1]" 
      />

      {/* TOP BAR / TELEMETRY HUD */}
      <header className="relative z-20 px-4 sm:px-8 lg:px-10 pt-5 pb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-800/40">
        <div className="flex items-center gap-3">
          <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400 font-heading text-base sm:text-lg shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            V
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold tracking-widest text-sm sm:text-base lg:text-lg text-white">
                VELOCITY
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-mono-tech tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-1.5 sm:px-2 py-0.5 rounded">
                BEYOND THE ORDINARY
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] text-zinc-500 font-mono-tech tracking-wider uppercase">
              McLaren 720S Aerodynamic Telemetry Simulation
            </p>
          </div>
        </div>

        {/* Dynamic Telemetry HUD Readout */}
        <div className="flex items-center gap-3 sm:gap-6 bg-zinc-900/80 border border-zinc-800/80 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl backdrop-blur-md">
          <div className="text-right">
            <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-zinc-500 block font-mono-tech">
              Velocity
            </span>
            <div className="text-sm sm:text-lg font-bold font-mono-tech text-white flex items-baseline gap-1">
              <span ref={speedDisplayRef}>000</span>
              <span className="text-[9px] sm:text-[10px] text-cyan-400">KM/H</span>
            </div>
          </div>

          <div className="w-px h-7 sm:h-8 bg-zinc-800" />

          <div>
            <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-zinc-500 block font-mono-tech">
              Scrub Trajectory
            </span>
            <div className="text-sm sm:text-lg font-bold font-mono-tech text-cyan-400 flex items-baseline gap-1">
              <span ref={progressDisplayRef}>000%</span>
            </div>
          </div>

          <div className="w-px h-7 sm:h-8 bg-zinc-800 hidden md:block" />

          <div className="hidden md:block">
            <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-zinc-500 block font-mono-tech">
              Corridor Stage
            </span>
            <span 
              ref={phaseDisplayRef}
              className="text-xs font-mono-tech uppercase font-semibold text-emerald-400 tracking-wider"
            >
              GRID / IDLE
            </span>
          </div>
        </div>
      </header>

      {/* CENTRAL STAGE (ROAD & CAR & FLOATING STATS) */}
      <main className="relative z-10 w-full flex-1 flex flex-col justify-center items-center px-0">
        {/* Floating Metric Cards (revealed by scrollTrigger scrub) */}
        {STATS_DATA.map((stat, index) => (
          <div
            key={stat.id}
            ref={(el) => {
              if (metricCardRefs && metricCardRefs.current) {
                metricCardRefs.current[index] = el;
              }
            }}
            id={stat.id}
            style={stat.style}
            className={`telemetry-card absolute z-20 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl flex flex-col justify-center items-start shadow-2xl transition-shadow duration-300 will-change-transform will-change-opacity
              w-[160px] sm:w-[220px] md:w-[260px] lg:w-[300px] ${getCardPositionClasses(stat.id)}`}
          >
            <div className="flex items-center justify-between w-full mb-1">
              <span className="text-[9px] sm:text-[10px] font-mono-tech tracking-widest uppercase opacity-75">
                Metric #{index + 1}
              </span>
              <ArrowDownRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 opacity-70" />
            </div>

            <div className="text-2xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight leading-none">
              {stat.metric}
            </div>

            <div className="text-[11px] sm:text-xs md:text-sm font-semibold mt-1 leading-snug">
              {stat.label}
            </div>

            <div className="text-[10px] opacity-75 mt-1 font-sans leading-tight hidden lg:block">
              {stat.detail}
            </div>
          </div>
        ))}

        {/* The Central Asphalt Road & Car Visual Component */}
        <CarVisual
          roadRef={roadRef}
          carRef={carRef}
          trailRef={trailRef}
          lettersContainerRef={lettersContainerRef}
          letterRefs={letterRefs}
        />
      </main>

      {/* BOTTOM FOOTER & SCROLL CONTROLS */}
      <footer className="relative z-20 px-4 sm:px-8 lg:px-10 pb-5 pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-800/40">
        {/* Telemetry specs badges */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-mono-tech text-zinc-400">
          {TELEMETRY_SPECS.slice(0, 3).map((spec) => (
            <div key={spec.label} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-zinc-500">{spec.label}:</span>
              <span className="text-zinc-300 font-semibold">{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Centered Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          onClick={onScrollDown}
          className="cursor-pointer flex flex-col items-center gap-1.5 text-center group transition-opacity duration-300"
          aria-label="Scroll down to accelerate"
        >
          <div className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/80 group-hover:border-cyan-500/60 transition-colors shadow-lg shadow-black/40">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[10px] sm:text-[11px] font-mono-tech uppercase tracking-widest text-zinc-300 group-hover:text-cyan-300 transition-colors">
              SCROLL TO ACCELERATE
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
          </div>
          <span className="text-[9px] text-zinc-500 font-mono-tech tracking-wider uppercase hidden sm:block">
            Scroll controls car position & reveals telemetry
          </span>
        </div>

        {/* Subtle Progress Bar */}
        <div className="w-full sm:w-44 lg:w-48 flex flex-col gap-1">
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono-tech text-zinc-500">
            <span>TRACK DISTANCE</span>
            <span className="text-cyan-400 font-medium">100% CORRIDOR</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full w-0"
            />
          </div>
        </div>
      </footer>
    </div>
  );
});

export default HeroSection;
