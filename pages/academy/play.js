import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

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
    if (!email) return <div className="h-full flex items-center justify-center text-gray-500">Select an email.</div>;
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
                <button disabled={reviewed} onClick={() => onMark("safe")} className="px-4 py-2 rounded-xl bg-blue-600 text-white disabled:opacity-50">Safe</button>
                <button disabled={reviewed} onClick={() => onMark("phish")} className="px-4 py-2 rounded-xl bg-red-600 text-white disabled:opacity-50">Report</button>
            </div>
        </div>
    );
}

function Summary({ open, score, correct, incorrect, onReplay }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 text-center">
                <h3 className="text-xl font-bold">Round Complete</h3>
                <div>⭐ Score: <b>{score}</b></div>
                <div>✅ Correct: <b>{correct}</b> • ❌ Incorrect: <b>{incorrect}</b></div>
                <button onClick={onReplay} className="px-4 py-2 rounded-xl bg-purple-600 text-white">Play Again</button>
            </div>
        </div>
    );
}

export default function Play() {
    const router = useRouter();
    const level = (router.query.level || "easy").toString();

    const [items, setItems] = useState([]);
    const [openId, setOpenId] = useState(null);
    const [reviewed, setReviewed] = useState({});
    const [score, setScore] = useState(0);
    const [summaryOpen, setSummaryOpen] = useState(false);
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);

    useEffect(() => {
        if (!level) return;
        (async () => {
            const r = await fetch(`${API}/academy/emails?level=${level}`);
            const data = await r.json();
            setItems(data);
            setOpenId(data[0]?.id ?? null);
            setReviewed({});
            setSummaryOpen(false);
            setCorrect(0);
            setIncorrect(0);
            setScore(0);
        })();
    }, [level]);

    const selected = useMemo(() => items.find(e => e.id === openId), [items, openId]);
    const allReviewed = items.length > 0 && Object.keys(reviewed).length === items.length;

    const onMark = (choice) => {
        const e = selected;
        if (!e || reviewed[e.id]) return;
        const ok = (choice === "phish" && e.isPhish) || (choice === "safe" && !e.isPhish);
        setReviewed(prev => ({ ...prev, [e.id]: { ok } }));
        setScore(s => s + (ok ? 10 : -5));
        setCorrect(c => c + (ok ? 1 : 0));
        setIncorrect(i => i + (ok ? 0 : 1));

        const remaining = items.filter(x => !reviewed[x.id] && x.id !== e.id);
        if (remaining[0]) setOpenId(remaining[0].id);
    };

    useEffect(() => {
        if (allReviewed && !summaryOpen) {
            setSummaryOpen(true);
            fetch(`${API}/academy/result`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ level, score })
            });
        }
    }, [allReviewed, summaryOpen, level, score]);

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-extrabold">Academy — {level.toUpperCase()}</h1>
                    <div className="px-3 py-1 rounded bg-white border font-semibold">⭐ {score}</div>
                </div>
                <div className="grid md:grid-cols-[380px_minmax(0,1fr)] gap-4">
                    <div className="space-y-2">
                        {items.map(e => (
                            <InboxItem
                                key={e.id}
                                email={e}
                                active={openId === e.id}
                                reviewed={!!reviewed[e.id]}
                                onClick={() => setOpenId(e.id)}
                            />
                        ))}
                    </div>
                    <div className="rounded-2xl border bg-white p-5 min-h-[60vh]">
                        <EmailPreview email={selected} reviewed={selected ? !!reviewed[selected.id] : true} onMark={onMark} />
                    </div>
                </div>
            </div>
            <Summary open={summaryOpen} score={score} correct={correct} incorrect={incorrect} onReplay={() => router.reload()} />
        </main>
    );
}
