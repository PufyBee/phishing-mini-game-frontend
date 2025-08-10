// frontend/pages/index.js
import Link from "next/link";
import FishingAnimation from "../components/FishingAnimation";

export default function Home() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-2xl w-full p-6 space-y-8">
                {/* NEW: animation above everything */}
                <div className="flex justify-center">
                    <FishingAnimation />
                </div>

                <h1 className="text-3xl font-extrabold">Phishing Mini-Game</h1>
                <p className="text-gray-700">
                    Choose a mode: <b>Phish Academy:</b> a quick mode designed to test your phishing merit.{" "}
                    <b>Story Mode:</b> a campaign that covers 10 days as a new employee, sussing out a malicious attacker
                    and capturing them for good.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                    <Link href="/academy/setup" className="block rounded-2xl p-6 bg-white border hover:shadow">
                        <div className="text-xl font-bold">🏆 Phish Academy</div>
                        <div className="text-gray-600 text-sm mt-1">Timed rounds • points • difficulty</div>
                    </Link>
                    <Link href="/story/intro" className="block rounded-2xl p-6 bg-white border hover:shadow">
                        <div className="text-xl font-bold">📖 Story Mode</div>
                        <div className="text-gray-600 text-sm mt-1">Inbox narrative • clue board • boss</div>
                    </Link>
                </div>
            </div>
        </main>
    );
}
