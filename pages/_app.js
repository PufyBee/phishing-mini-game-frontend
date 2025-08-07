// pages/_app.js
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <header className="w-full bg-white shadow-md p-4">
                <div className="max-w-4xl mx-auto">
                    <a href="/" className="text-xl font-bold text-purple-600 hover:underline">
                        🎣 Phishing Mini-Game
                    </a>
                </div>
            </header>

            {/* Full‐width gray background */}
            <main className="w-full min-h-screen bg-gray-100 py-8">
                {/* Centered white “panel” for each page’s content */}
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
                    <Component {...pageProps} />
                </div>
            </main>
        </>
    )
}
