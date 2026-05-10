const STYLES = `
  @keyframes boltGlow {
    0%,100% { filter: drop-shadow(0 2px 6px rgba(37,150,190,0.35)); }
    50%      { filter: drop-shadow(0 2px 12px rgba(37,150,190,0.65)); }
  }
  @keyframes barShimmer {
    0%,100% { box-shadow: 0 1px 6px rgba(37,150,190,0.4); }
    50%      { box-shadow: 0 1px 12px rgba(37,150,190,0.65); }
  }
  @keyframes goldPulse {
    0%,100% { opacity: 1; box-shadow: 0 0 0 2px rgba(201,164,71,0.25); }
    50%      { opacity: 0.8; box-shadow: 0 0 0 4px rgba(201,164,71,0.12); }
  }
  @keyframes lineGlow {
    0%,100% { opacity: 0.55; }
    50%      { opacity: 1; }
  }
  @keyframes blink {
    0%,49%  { opacity: 1; }
    50%,100% { opacity: 0.3; }
  }
  @keyframes fadeOut {
    from { opacity: 1; }
    to   { opacity: 0; pointer-events: none; }
  }
`;

const BoltSVG = () => (
  <svg viewBox="0 0 40 64" fill="none" style={{ width: 44, height: 70, animation: 'boltGlow 2.8s ease-in-out infinite' }}>
    <defs>
      <linearGradient id="boltFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#2596be" />
        <stop offset="100%" stopColor="#1a6f8a" />
      </linearGradient>
    </defs>
    <polygon points="24,2 6,34 18,34 16,62 36,28 22,28" fill="url(#boltFill)" />
  </svg>
);

function LoadingScreen({ progress, isComplete }) {
  const pct = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <>
      <style>{STYLES}</style>

      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        animation: isComplete ? 'fadeOut 0.65s ease-out forwards' : 'none',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}>

        {/* Subtle dot grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(37,150,190,0.1) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 55% 55% at 50% 50%, black 10%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 55% 55% at 50% 50%, black 10%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Card container */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '20px',
          padding: '3rem 3.5rem 2.5rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
          minWidth: 360,
        }}>

          {/* Gold top accent line */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '15%',
            right: '15%',
            height: '3px',
            background: 'linear-gradient(to right, transparent, #C9A447, transparent)',
            borderRadius: '0 0 4px 4px',
            animation: 'lineGlow 2.5s ease-in-out infinite',
          }} />

          {/* Bolt icon */}
          <div style={{ marginBottom: '1rem' }}>
            <BoltSVG />
          </div>

          {/* Brand name */}
          <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1E293B', letterSpacing: '0.05em' }}>
              ELECTRO
            </span>
            <span style={{ fontSize: '1.75rem', fontWeight: 700, color: '#2596be', letterSpacing: '0.05em' }}>
              MART
            </span>
          </div>

          {/* Tagline */}
          <p style={{
            fontSize: '0.65rem',
            color: '#94A3B8',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            margin: '0 0 2rem',
          }}>
            Electronics. Elevated.
          </p>

          {/* Divider */}
          <div style={{
            width: '100%',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #CBD5E1 40%, #CBD5E1 60%, transparent)',
            marginBottom: '2rem',
          }} />

          {/* Percentage */}
          <div style={{
            fontSize: '5rem',
            fontWeight: 800,
            color: '#1E293B',
            lineHeight: 1,
            letterSpacing: '-0.05em',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'flex-end',
            gap: '4px',
          }}>
            {pct}
            <span style={{ fontSize: '2rem', color: '#2596be', fontWeight: 600, paddingBottom: '0.5rem' }}>%</span>
          </div>

          {/* Progress bar track */}
          <div style={{
            width: '100%',
            height: 6,
            borderRadius: 9999,
            backgroundColor: '#EFF6FF',
            border: '1px solid #DBEAFE',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '1.25rem',
          }}>
            <div style={{
              height: '100%',
              width: `${pct}%`,
              borderRadius: 9999,
              background: 'linear-gradient(90deg, #1a6f8a 0%, #2596be 55%, #C9A447 100%)',
              backgroundSize: '360px 100%',
              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              animation: 'barShimmer 2s ease-in-out infinite',
              position: 'relative',
            }}>
              {pct > 3 && (
                <div style={{
                  position: 'absolute',
                  right: -1,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: '#C9A447',
                  animation: 'goldPulse 1.6s ease-in-out infinite',
                }} />
              )}
            </div>
          </div>

          {/* Loading label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              display: 'inline-block',
              width: 7,
              height: 7,
              borderRadius: '50%',
              backgroundColor: '#2596be',
              animation: 'blink 1.1s step-start infinite',
            }} />
            <span style={{
              fontSize: '0.65rem',
              color: '#94A3B8',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
            }}>
              Loading
            </span>
            <span style={{
              display: 'inline-block',
              width: 7,
              height: 7,
              borderRadius: '50%',
              backgroundColor: '#C9A447',
              animation: 'blink 1.1s step-start infinite',
              animationDelay: '0.55s',
            }} />
          </div>

        </div>
      </div>
    </>
  );
}

export default LoadingScreen;
