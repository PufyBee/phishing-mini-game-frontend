// pages/academy/results.js
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Results() {
    const { query } = useRouter()
    const [ready, setReady] = useState(false)

    // Next.js may hydrate before query is populated; wait a tick
    useEffect(() => setReady(true), [])

    const level = (query.level || '').toString()
    const score = Number(query.score || 0)
    const total = Number(query.total || 0)
    const answered = Number(query.answered || 0)

    if (!ready) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center p-10">
                <p>Loading results…</p>
            </div>
        )
    }

    const accuracy = total ? Math.round((answered / total) * 100) : 0

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-10 text-center">
            <h1 className="text-3xl font-bold mb-4">Challenge Complete 🎉</h1>
            <p className="mb-2">Level: <b>{level || '—'}</b></p>
            <p className="mb-2">Score: <b>{score}</b></p>
            <p className="mb-2">Answered: <b>{answered}</b> / {total} ({accuracy}%)</p>

            <div className="mt-6 flex gap-3">
                <Link href="/academy/setup" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                    Play Again
                </Link>
                <Link href="/" className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                    Home
                </Link>
            </div>
        </div>
    )
}
