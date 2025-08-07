// pages/academy/play.js
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import EmailCard from '../../components/EmailCard'
import Timer from '../../components/Timer'

export default function AcademyPlay() {
    const { query, push } = useRouter()
    const level = (query.level || 'easy').toString().toLowerCase()

    const [emails, setEmails] = useState([])
    const [score, setScore] = useState(0)
    const [answered, setAnswered] = useState(new Set())
    const [expired, setExpired] = useState(false)
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL

    // Fetch emails from FastAPI
    useEffect(() => {
        if (!apiBase || !query.level) return
        fetch(`${apiBase}/academy/emails?level=${level}`)
            .then((r) => {
                if (!r.ok) throw new Error(`API ${r.status}`)
                return r.json()
            })
            .then(setEmails)
            .catch((e) => {
                console.error(e)
                alert('Could not load emails. Is the backend running?')
            })
    }, [apiBase, level, query.level])

    const duration = useMemo(() => {
        if (level === 'hard') return 30
        if (level === 'medium') return 45
        return 60
    }, [level])

    const handleGuess = (id, guessPhish) => {
        if (expired || answered.has(id)) return
        const email = emails.find((e) => e.id === id)
        if (!email) return
        const correct = email.is_phish === guessPhish
        setScore((s) => s + (correct ? 10 : -5))
        setAnswered((prev) => new Set(prev).add(id))
    }

    // When out of time or finished, post score and go to results
    useEffect(() => {
        if (!emails.length) return
        const done = expired || answered.size === emails.length
        if (!done) return

        const postAndGo = async () => {
            try {
                await fetch(`${apiBase}/academy/results`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        level,
                        score,
                        total: emails.length,
                        answered: answered.size,
                    }),
                })
            } catch (e) {
                console.warn('Posting result failed (continuing):', e)
            } finally {
                push(
                    `/academy/results?level=${level}&score=${score}&total=${emails.length}&answered=${answered.size}`
                )
            }
        }
        postAndGo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [expired, answered, emails.length])

    if (!emails.length) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center p-8">
                <p>Loading challenge…</p>
            </div>
        )
    }

    return (
        <div className="min-h-[60vh] p-6 bg-white rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={() => push('/academy/setup')}
                    className="text-purple-600 hover:underline"
                >
                    ← Setup
                </button>
                <div className="flex items-center gap-6">
                    <div className="font-semibold">Score: {score}</div>
                    <Timer initial={duration} onExpire={() => setExpired(true)} />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {emails.map((email) => (
                    <EmailCard key={email.id} email={email} onGuess={handleGuess} />
                ))}
            </div>

            <div className="mt-6 text-sm text-gray-500">
                Answered: {answered.size} / {emails.length}
            </div>
        </div>
    )
}
