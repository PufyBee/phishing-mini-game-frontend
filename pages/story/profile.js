import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Profile() {
    const router = useRouter();
    const [clues, setClues] = useState({});
    const [score, setScore] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const r = await fetch(`${API}/api/story/progress`);
                const data = await r.json();
                setClues(data?.clues || {});
                setScore(data?.score || 0);
            } catch {
                setClues({});
            }
        })();
    }, []);

    const entries = Object.entries(clues); // [[id, "clue text"], ...]

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-extrabold">Clue Board</h1>
                    <div className="px-3 py-1 rounded bg-white border font-semibold">⭐ {score}</div>
                </div>

                <div className="rounded-2xl border bg-white p-5">
                    {entries.length === 0 ? (
                        <p className="text-gray-600">No clues yet. Review emails and mark safe/phish to uncover clues.</p>
                    ) : (
                        <ul className="list-disc pl-6 space-y-2">
                            {entries.map(([key, text]) => (
                                <li key={key} className="text-gray-800">{text}</li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => router.back()}
                        className="px-5 py-3 bg-purple-600 text-white rounded-xl"
                    >
                        Back to story
                    </button>
                    <button
                        onClick={() => router.push("/")}
                        className="px-5 py-3 bg-gray-200 rounded-xl"
                    >
                        Home
                    </button>
                </div>

                <p className="text-sm text-gray-500">
                    Tip: The Boss unlocks automatically after Day 10 from the day flow. No shortcut here.
                </p>
            </div>
        </main>
    );
}
