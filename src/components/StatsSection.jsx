import React from 'react';
import { TrendingUp, Activity, BarChart2, ShieldCheck, Zap, RefreshCw } from 'lucide-react';
import { STATS_DATA, TELEMETRY_SPECS } from '../data/stats';

/**
 * StatsSection Component
 * Detailed performance telemetry report following the pinned scroll experience.
 * Offers accessible, responsive data inspection, spec grid, and replay shortcut.
 */
export default function StatsSection({ onReplay }) {
  const getIcon = (id) => {
    switch (id) {
      case 'box1':
        return <TrendingUp className="w-5 h-5 text-[#def54f]" />;
      case 'box2':
        return <Activity className="w-5 h-5 text-[#6ac9ff]" />;
      case 'box3':
        return <BarChart2 className="w-5 h-5 text-zinc-300" />;
      case 'box4':
        return <Zap className="w-5 h-5 text-[#fa7328]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section
      aria-label="Comprehensive Telemetry Breakdown"
      className="relative z-10 py-24 px-6 sm:px-12 lg:px-20 bg-[#07080b] border-t border-zinc-800 text-white select-none"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs font-mono-tech text-cyan-400 uppercase tracking-widest mb-3">
              Telemetry Summary // Complete Log
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight text-white">
              PERFORMANCE ARCHIVE
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onReplay}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono-tech uppercase tracking-wider text-cyan-300 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Replay Scroll Track</span>
            </button>
          </div>
        </div>

        {/* 4 Primary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_DATA.map((item, index) => (
            <div
              key={item.id}
              className="relative p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/90 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-zinc-800/80 border border-zinc-700/60">
                    {getIcon(item.id)}
                  </div>
                  <span className="text-xs font-mono-tech text-zinc-500">
                    METRIC // 0{index + 1}
                  </span>
                </div>

                <div>
                  <div 
                    className="text-5xl font-heading font-black tracking-tight"
                    style={{ color: item.style.backgroundColor }}
                  >
                    {item.metric}
                  </div>
                  <h3 className="text-sm font-bold text-zinc-100 mt-2 leading-snug">
                    {item.label}
                  </h3>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-zinc-800/60">
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Specification Bar */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800">
          <div className="text-xs font-mono-tech uppercase tracking-widest text-cyan-400 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Chassis & Aerodynamic Telemetry Constants</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TELEMETRY_SPECS.map((spec) => (
              <div key={spec.label} className="space-y-1">
                <div className="text-xs text-zinc-500 font-mono-tech uppercase">
                  {spec.label}
                </div>
                <div className="text-xl sm:text-2xl font-bold font-mono-tech text-white">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
