const STYLES = `
  @keyframes fadeOut {
    from { opacity: 1; }
    to   { opacity: 0; pointer-events: none; }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

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
        animation: isComplete ? 'fadeOut 0.6s ease-out forwards' : 'fadeIn 0.4s ease-out forwards',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        overflow: 'hidden',
      }}>

        {/* Brand name with fill reveal */}
        <div style={{ position: 'relative', display: 'inline-block', lineHeight: 1 }}>

          {/* Ghost (unfilled) text */}
          <span style={{
            fontSize: 'clamp(4.5rem, 13vw, 9rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: '#E2E8F0',
            whiteSpace: 'nowrap',
            display: 'block',
            userSelect: 'none',
          }}>
            ELECTROMART
          </span>

          {/* Filled text — clips from right, reveals left→right */}
          <span style={{
            position: 'absolute',
            inset: 0,
            fontSize: 'clamp(4.5rem, 13vw, 9rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: '#2596be',
            whiteSpace: 'nowrap',
            display: 'block',
            clipPath: `inset(0 ${100 - pct}% 0 0)`,
            transition: 'clip-path 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
            userSelect: 'none',
          }}>
            ELECTROMART
          </span>

        </div>

        {/* Loading label + percentage */}
        <div style={{
          marginTop: '2rem',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: 'clamp(320px, 78vw, 860px)',
          paddingInline: '0.15rem',
        }}>
          <span style={{
            fontSize: '1rem',
            color: '#64748B',
            letterSpacing: '0.18em',
            fontWeight: 400,
            textTransform: 'uppercase',
          }}>
            Loading...
          </span>
          <span style={{
            fontSize: '1.6rem',
            color: '#2596be',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            minWidth: '4.5ch',
            textAlign: 'right',
          }}>
            {pct}<span style={{ fontSize: '1rem', fontWeight: 500, marginLeft: 2 }}>%</span>
          </span>
        </div>

      </div>
    </>
  );
}

export default LoadingScreen;
