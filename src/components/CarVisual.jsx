import React, { forwardRef } from 'react';
import { HEADLINE_TEXT } from '../data/stats';

/**
 * CarVisual Component
 * Renders the horizontal asphalt track, proportional McLaren vehicle,
 * cyan glowing trail (scaled via scaleX with left-center transform-origin),
 * and the spaced "W E L C O M E   I T Z F I Z Z" typographic reveal.
 */
const CarVisual = forwardRef(function CarVisual(
  {
    carRef,
    trailRef,
    roadRef,
    lettersContainerRef,
    letterRefs,
  },
  ref
) {
  const letters = Array.from(HEADLINE_TEXT);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden select-none"
      aria-label="High-velocity asphalt track"
    >
      {/* Asphalt Track Surface */}
      <div
        ref={roadRef}
        id="road"
        className="relative w-full h-[170px] sm:h-[200px] md:h-[230px] lg:h-[250px] road-surface border-y border-zinc-800/80 overflow-hidden flex items-center shadow-2xl"
      >
        {/* Top & Bottom Rumble Curbs */}
        <div 
          aria-hidden="true" 
          className="absolute inset-x-0 top-0 h-1.5 road-curb-top z-1 opacity-80 pointer-events-none" 
        />
        <div 
          aria-hidden="true" 
          className="absolute inset-x-0 bottom-0 h-1.5 road-curb-bottom z-1 opacity-80 pointer-events-none" 
        />

        {/* Center Dashed Lane Markings */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[3px] road-center-line opacity-30 z-0 pointer-events-none"
        />

        {/* Cyan Glowing Trail (Animated strictly via scaleX & transformOrigin: left center) */}
        <div
          ref={trailRef}
          id="trail"
          className="absolute left-0 top-1.5 bottom-1.5 glow-trail-cyan z-[2] pointer-events-none will-change-transform rounded-r-sm"
          style={{
            transformOrigin: 'left center',
            transform: 'scaleX(0)',
          }}
          aria-hidden="true"
        />

        {/* Spaced "W E L C O M E   I T Z F I Z Z" Headline Layer */}
        <div
          ref={lettersContainerRef}
          id="valueText"
          className="absolute left-[3%] sm:left-[5%] top-1/2 -translate-y-1/2 z-[5] flex items-center gap-1 sm:gap-2 md:gap-3 pointer-events-none select-none max-w-[94%] whitespace-nowrap flex-nowrap"
          aria-label={HEADLINE_TEXT}
        >
          {letters.map((char, index) => (
            <span
              key={`letter-${index}-${char}`}
              ref={(el) => {
                if (letterRefs && letterRefs.current) {
                  letterRefs.current[index] = el;
                }
              }}
              className="value-letter font-heading font-black text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl tracking-wider text-zinc-500/30 inline-block will-change-transform will-change-opacity"
              style={{
                opacity: 0.2,
                transition: 'opacity 0.2s ease, color 0.2s ease, text-shadow 0.2s ease',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        {/* Local McLaren 720S Top-Down Asset */}
        <img
          ref={carRef}
          id="car"
          src={`${import.meta.env.BASE_URL}car.png`}
          alt="McLaren 720S sports car top-down view racing along track"
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[115px] sm:h-[145px] md:h-[175px] lg:h-[195px] object-contain car-shadow z-10 pointer-events-none will-change-transform select-none"
          style={{
            aspectRatio: '3981 / 1901',
          }}
          loading="eager"
        />
      </div>
    </div>
  );
});

export default CarVisual;
