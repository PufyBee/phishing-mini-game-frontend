import { useEffect, useState } from "react";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Boss() {
    const [step, setStep] = useState(1); // 1: accuse, 2: tasks, 3: result
    const [suspects, setSuspects] = useState([]);
    const [pick, setPick] = useState(null);
    const [accuse, setAccuse] = useState(null); // {correct, difficulty, score}
    const [tasks, setTasks] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState(null); // {passed, feedback, ...}

    useEffect(() => {
        fetch(`${API}/api/story/suspects`).then(r => r.json()).then(setSuspects);
    }, []);

    const submitAccuse = async () => {
        if (!pick) return;
        const r = await fetch(`${API}/api/story/accuse`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ suspectId: pick })
        });
        const data = await r.json();
        setAccuse(data);
        const t = await fetch(`${API}/api/story/boss/tasks`).then(r => r.json());
        setTasks(t.tasks);
        setAnswers(Array(t.tasks.length).fill(null));
        setStep(2);
    };

    const submitTasks = async () => {
        const r = await fetch(`${API}/api/story/boss/submit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answers })
        });
        const data = await r.json();
        setResult(data);
        setStep(3);
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-extrabold">Boss — Trace & Contain</h1>
                    <Link href="/story/profile" className="px-3 py-1 rounded bg-gray-200 text-sm">Clue Board</Link>
                </div>

                {step === 1 && (
                    <div className="rounded-2xl border bg-white p-5 space-y-4">
                        <p className="text-gray-700">
                            Based on your collected clues, <b>who is the attacker?</b>
                        </p>
                        <div className="space-y-3">
                            {suspects.map(s => (
                                <label key={s.id} className="flex items-start gap-3 p-3 rounded-xl border bg-white hover:shadow">
                                    <input type="radio" name="sus" value={s.id} onChange={() => setPick(s.id)} />
                                    <div>
                                        <div className="font-semibold">{s.name} — {s.title}</div>
                                        <div className="text-sm text-gray-600">{s.dept} • Hint: {s.motiveHint}</div>
                                    </div>
                                </label>
                            ))}
                        </div>
                        <div className="flex justify-end">
                            <button onClick={submitAccuse} disabled={!pick} className="px-4 py-2 rounded-xl bg-purple-600 text-white disabled:opacity-50">
                                Confirm Accusation
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="rounded-2xl border bg-white p-5 space-y-4">
                        <div className="text-sm text-gray-700">
                            Difficulty: <b>{accuse?.difficulty}</b>. Complete the containment steps:
                        </div>
                        <ol className="space-y-4 list-decimal pl-6">
                            {tasks.map((t, i) => (
                                <li key={t.id} className="space-y-2">
                                    <div className="font-semibold">{t.prompt}</div>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        {t.options.map((opt, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setAnswers(prev => prev.map((v, k) => k === i ? idx : v))}
                                                className={`text-left p-3 rounded-xl border ${answers[i] === idx ? 'ring-2 ring-purple-500' : 'hover:shadow'}`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <div className="flex justify-end">
                            <button
                                onClick={submitTasks}
                                disabled={answers.some(v => v === null)}
                                className="px-4 py-2 rounded-xl bg-red-600 text-white disabled:opacity-50"
                            >
                                Execute Containment
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="rounded-2xl border bg-white p-5 space-y-4">
                        <h2 className="text-xl font-bold">{result?.passed ? "Containment Successful 🎉" : "Containment Failed"}</h2>
                        <div className="text-sm text-gray-700">
                            ⭐ Final Score: <b>{result?.score}</b><br />
                            Correct: <b>{result?.correct}</b> / {result?.total}
                        </div>
                        <div>
                            <div className="font-semibold mb-2">Feedback</div>
                            <ul className="list-disc pl-6 text-sm space-y-1">
                                {result?.feedback?.map(f => (
                                    <li key={f.id} className={f.ok ? "text-green-700" : "text-red-700"}>
                                        {f.ok ? "✓" : "✗"} {f.why}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex gap-3">
                            <Link href="/story/profile" className="px-4 py-2 rounded-xl bg-gray-200">View Clues</Link>
                            <Link href="/" className="px-4 py-2 rounded-xl bg-purple-600 text-white">Home</Link>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
