import React, { useMemo } from 'react';

export const FloatingPetals: React.FC = () => {
  const petals = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: `${(i * 7.5 + Math.random() * 5) % 96}%`,
      delay: `${(i * 0.9 + Math.random() * 2).toFixed(1)}s`,
      duration: `${(8 + Math.random() * 6).toFixed(1)}s`,
      size: 14 + Math.floor(Math.random() * 12),
      rotation: Math.floor(Math.random() * 360),
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute opacity-0"
          style={{
            left: p.left,
            top: '-30px',
            animation: `petalFall ${p.duration} linear infinite`,
            animationDelay: p.delay,
            transform: `rotate(${p.rotation}deg)`,
          }}
        >
          <svg
            width={p.size}
            height={p.size}
            viewBox="0 0 30 30"
            fill="none"
            className="filter drop-shadow(0 2px 4px rgba(225,29,72,0.3))"
          >
            <path
              d="M15 2 C8 7, 3 14, 5 22 C7 28, 20 28, 25 22 C29 15, 23 7, 15 2 Z"
              fill="url(#petalGradient)"
              opacity="0.75"
            />
            <defs>
              <linearGradient id="petalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="60%" stopColor="#e11d48" />
                <stop offset="100%" stopColor="#881337" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes petalFall {
          0% {
            transform: translateY(-20px) rotate(0deg) translateX(0px);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
          }
          85% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(40px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
