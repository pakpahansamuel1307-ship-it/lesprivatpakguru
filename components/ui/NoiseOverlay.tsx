export default function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[55] opacity-[0.035] mix-blend-overlay"
      aria-hidden="true"
    >
      <svg width="100%" height="100%">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
