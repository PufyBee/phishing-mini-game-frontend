import Link from "next/link";

export default function Intro() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-2xl w-full space-y-6 p-6">
                <h1 className="text-3xl font-extrabold">Story Mode</h1>
                <div className="rounded-2xl border bg-white p-5 space-y-3">
                    <h2 className="text-xl font-bold">Your Objective</h2>
                    <p className="text-gray-700">
                        Over 10 days, review your inbox, report phishing, and collect clues.
                        Use those clues to deduce <span className="font-semibold">who the attacker is</span>.
                        On the final day, you’ll face a unique <span className="font-semibold">Trace & Contain</span> sequence.
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                        <li>Mark each email as <i>Safe</i> or <i>Phish</i>.</li>
                        <li>Legit emails may reveal <i>clues</i> about the attacker.</li>
                        <li>After Day 10, you must <i>name the attacker</i> and complete the containment steps.</li>
                    </ul>
                </div>
                <div className="flex gap-3">
                    <Link href="/story/day/1" className="px-5 py-3 bg-purple-600 text-white rounded-xl">Start Day 1</Link>
                    <Link href="/story/profile" className="px-5 py-3 bg-gray-200 rounded-xl">View Clue Board</Link>
                </div>
                <Link href="/" className="text-sm text-gray-600">← Back home</Link>
            </div>
        </main>
    );
}
