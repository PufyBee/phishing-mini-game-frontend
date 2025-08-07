// pages/index.js
import Link from 'next/link'

export default function ModeSelector() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-5xl font-extrabold mb-12 text-purple-600">
                🎣 Phishing Mini-Game
            </h1>
            <div className="flex flex-col sm:flex-row gap-6">
                <button
                    onClick={() => alert('🚧 Build Campaign is coming soon!')}
                    className="px-8 py-4 bg-white border border-purple-600 text-purple-600 font-semibold rounded-lg shadow hover:bg-purple-50 transition"
                >
                    📧 Build Campaign
                </button>
                <Link
                    href="/academy/setup"
                    className="px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition"
                >
                    🏫 Phish Academy
                </Link>
            </div>
        </div>
    )
}
