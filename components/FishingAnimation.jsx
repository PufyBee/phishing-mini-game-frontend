export default function FishingAnimation() {
    return (
        <div className="w-64 h-64 sm:w-72 sm:h-72 relative select-none">
            <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                    <radialGradient id="water" cx="50%" cy="60%" r="70%">
                        <stop offset="0%" stopColor="#e9f3ff" />
                        <stop offset="100%" stopColor="#d6e8ff" />
                    </radialGradient>
                </defs>
                <circle cx="100" cy="120" r="78" fill="url(#water)" />
                <g>
                    <circle className="ripple r1" cx="100" cy="120" r="34" fill="none" stroke="#9ec5ff" strokeWidth="2" />
                    <circle className="ripple r2" cx="100" cy="120" r="34" fill="none" stroke="#9ec5ff" strokeWidth="2" />
                    <circle className="ripple r3" cx="100" cy="120" r="34" fill="none" stroke="#9ec5ff" strokeWidth="2" />
                </g>
                <g className="sway">
                    <path d="M100 10 C 100 40, 100 60, 100 80" stroke="#444" strokeWidth="2" fill="none" />
                    <path d="M100 80 C 100 95, 108 100, 108 110" stroke="#444" strokeWidth="2" fill="none" />
                    <path d="M108 110 q 6 8 -2 14" stroke="#444" strokeWidth="2" fill="none" />
                </g>
                <g className="bobber">
                    <circle cx="100" cy="120" r="16" fill="#ffffff" stroke="#222" strokeWidth="2" />
                    <path d="M84 120 h32 a16 16 0 0 1 -32 0 z" fill="#e11d48" />
                    <circle cx="100" cy="104" r="4" fill="#e11d48" stroke="#222" strokeWidth="1.5" />
                </g>
            </svg>

            <style jsx>{`
        .bobber { animation: bob 2.6s ease-in-out infinite; transform-origin: 100px 120px; transform-box: fill-box; }
        @keyframes bob { 0%,100% { transform: translateY(0px);} 50% { transform: translateY(-6px);} }
        .sway { animation: sway 5s ease-in-out infinite; transform-origin: 100px 10px; transform-box: fill-box; }
        @keyframes sway { 0%,100% { transform: rotate(0deg);} 50% { transform: rotate(2deg);} }
        .ripple { animation: ripple 3s ease-out infinite; transform-origin: 100px 120px; transform-box: fill-box; opacity: .35; }
        .r2 { animation-delay: .7s; } .r3 { animation-delay: 1.4s; }
        @keyframes ripple { 0% { transform: scale(.9); opacity: .35;} 100% { transform: scale(1.6); opacity: 0;} }
      `}</style>
        </div>
    );
}
