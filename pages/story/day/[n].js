import { useRouter } from "next/router";
import { useEffect, useMemo, useState, useCallback } from "react";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

function TopBar({ title, score }) {
    return (
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b px-4 py-3 flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-extrabold">{title}</h1>
            <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-sm rounded bg-gray-100">⭐ {score}</span>
                <Link href="/story/profile" className="px-3 py-1 rounded bg-gray-200 text-sm">Clue Board</Link>
            </div>
        </div>
    );
}

function InboxItem({ email, active, reviewed, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left p-3 rounded-xl border transition bg-white
        ${active ? 'ring-2 ring-purple-400' : 'hover:shadow'}
        ${reviewed ? 'opacity-70' : ''}`}
        >
            <div className="text-[11px] text-gray-500">{email.sender}</div>
            <div className="font-semibold line-clamp-1">{email.subject}</div>
            <div className="text-sm text-gray-600 line-clamp-1">{email.snippet}</div>
        </button>
    );
}

function EmailPreview({ email, reviewed, onMark }) {
    if (!email) {
        return <div className="h-full flex items-center justify-center text-gray-500">Select an email to read.</div>;
    }
    return (
        <div className="h-full flex flex-col">
            <div className="border-b pb-3">
                <div className="text-xs text-gray-500">{email.sender}</div>
                <h2 className="text-2xl font-bold mt-1">{email.subject}</h2>
            </div>
            <div className="prose max-w-none whitespace-pre-wrap text-[15px] leading-6 py-4 grow">
                {email.body}
            </div>
            <div className="flex gap-3 pt-2">
                <button
                    disabled={reviewed}
                    onClick={() => onMark("safe")}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white disabled:opacity-50"
                >
                    Mark Safe
                </button>
                <button
                    disabled={reviewed}
                    onClick={() => onMark("phish")}
                    className="px-4 py-2 rounded-xl bg-red-600 text-white disabled:opacity-50"
                >
                    Report Phish
                </button>
            </div>
        </div>
    );
}

function SummaryModal({ open, summary, onNext }) {
    if (!open) return null;
    const { correct, incorrect, gained, clues } = summary || { clues: [] };
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4">
                <h3 className="text-xl font-bold">Day Complete</h3>
                <div className="text-sm">
                    <div>✅ Correct: <b>{correct}</b></div>
                    <div>❌ Incorrect: <b>{incorrect}</b></div>
                    <div>⭐ Score gained: <b>{gained}</b></div>
                </div>
                <div>
                    <div className="font-semibold mb-1">🧩 New clues</div>
                    {clues.length === 0 ? (
                        <div className="text-sm text-gray-600">No new clues today.</div>
                    ) : (
                        <ul className="text-sm list-disc pl-5 space-y-1">
                            {clues.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                    )}
                </div>
                <div className="flex justify-end">
                    <button onClick={onNext} className="px-4 py-2 rounded-xl bg-purple-600 text-white">Next Day</button>
                </div>
            </div>
        </div>
    );
}

export default function Day() {
    const router = useRouter();
    const n = Number(router.query.n);
    const isBoss = n === 999;

    const [emails, setEmails] = useState([]);
    const [openId, setOpenId] = useState(null);
    const [score, setScore] = useState(0);
    const [reviewed, setReviewed] = useState({});  // id -> {choice, correct, clue?}
    const [summaryOpen, setSummaryOpen] = useState(false);
    const [lastSummary, setLastSummary] = useState({ correct: 0, incorrect: 0, gained: 0, clues: [] });

    const loadProgress = useCallback(async () => {
        const r = await fetch(`${API}/api/story/progress`);
        const data = await r.json();
        setScore(data.score ?? 0);
    }, []);

    // Load day emails
    useEffect(() => {
        if (!n) return;
        (async () => {
            const url = isBoss ? "/api/story/finale" : `/api/story/day/${n}`;
            const r = await fetch(`${API}${url}`);
            const data = await r.json();
            setEmails(data);
            setOpenId(data[0]?.id ?? null);
            setReviewed({});
            setSummaryOpen(false);
            await loadProgress();
        })();
    }, [n, isBoss, loadProgress]);

    const selected = useMemo(() => emails.find(e => e.id === openId), [emails, openId]);
    const allReviewed = emails.length > 0 && Object.keys(reviewed).length === emails.length;

    const onMark = async (choice) => {
        const e = selected;
        if (!e || reviewed[e.id]) return;

        const correct = (choice === "phish" && e.isPhish) || (choice === "safe" && !e.isPhish);
        const gain = correct ? 10 : -5;

        // Update local reviewed map
        setReviewed(prev => ({ ...prev, [e.id]: { choice, correct, clue: (!e.isPhish && e.clue) ? e.clue : null } }));
        setScore(s => s + gain);

        // Push score + possible clue
        await fetch(`${API}/api/story/progress`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                gain,
                clues: (!e.isPhish && e.clue) ? { [e.id]: e.clue } : {}
            })
        });

        // Auto-focus next unread email
        const remaining = emails.filter(x => !reviewed[x.id] && x.id !== e.id);
        if (remaining[0]) setOpenId(remaining[0].id);
    };

    const openSummary = async () => {
        const entries = Object.values(reviewed);
        const correct = entries.filter(x => x.correct).length;
        const incorrect = entries.length - correct;
        const gained = entries.reduce((acc, x) => acc + (x.correct ? 10 : -5), 0);
        const clues = entries.map(x => x.clue).filter(Boolean);

        setLastSummary({ correct, incorrect, gained, clues });
        // Mark day cleared
        await fetch(`${API}/api/story/progress`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gain: 0, clues: {}, dayCleared: isBoss ? 0 : n })
        });
        setSummaryOpen(true);
    };

    const goNext = () => {
        setSummaryOpen(false);
        if (isBoss) return router.push("/story/profile");
        if (n < 10) return router.push(`/story/day/${n + 1}`);
        return router.push("/story/boss");
    };

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <TopBar title={isBoss ? "Boss Round" : `Day ${n} of 10`} score={score} />
                <div className="grid md:grid-cols-[380px_minmax(0,1fr)] gap-4 p-4">
                    <div className="space-y-2">
                        {emails.map(e => (
                            <InboxItem
                                key={e.id}
                                email={e}
                                active={openId === e.id}
                                reviewed={!!reviewed[e.id]}
                                onClick={() => setOpenId(e.id)}
                            />
                        ))}
                    </div>
                    <div className="rounded-2xl border bg-white p-5 min-h-[60vh] flex flex-col">
                        <EmailPreview
                            email={selected}
                            reviewed={selected ? !!reviewed[selected.id] : true}
                            onMark={onMark}
                        />
                        <div className="mt-4 border-t pt-3 flex justify-end">
                            <button
                                disabled={!allReviewed}
                                onClick={openSummary}
                                className="px-4 py-2 rounded-xl bg-purple-600 text-white disabled:opacity-50"
                            >
                                End Day
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <SummaryModal open={summaryOpen} summary={lastSummary} onNext={goNext} />
        </main>
    );
}
