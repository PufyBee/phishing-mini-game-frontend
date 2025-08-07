// pages/academy/setup.js
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

const levels = [
    { name: 'Easy', emails: 5, time: 60, color: 'green' },
    { name: 'Medium', emails: 10, time: 45, color: 'yellow' },
    { name: 'Hard', emails: 15, time: 30, color: 'red' },
]

export default function AcademySetup() {
    const [selected, setSelected] = useState(null)
    const router = useRouter()

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <button
                className="mb-4 text-purple-600 hover:underline"
                onClick={() => router.push('/')}
            >
                ← Back
            </button>
            <h2 className="text-3xl font-bold mb-6">Phish Academy Challenge</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {levels.map((lvl) => {
                    const active = selected === lvl.name
                    return (
                        <div
                            key={lvl.name}
                            onClick={() => setSelected(lvl.name)}
                            className={`
                p-6 border-2 rounded-lg cursor-pointer
                ${active ? `border-${lvl.color}-600 bg-${lvl.color}-50` : 'border-gray-300 bg-white'}
                hover:border-${lvl.color}-500
                transition
              `}
                        >
                            <h3 className="text-xl font-semibold">{lvl.name}</h3>
                            <p className="mt-2 text-gray-600">
                                {lvl.emails} emails · {lvl.time}s
                            </p>
                        </div>
                    )
                })}
            </div>
            <Link
                href={selected ? `/academy/play?level=${selected.toLowerCase()}` : '#'}
                className={`
          mt-8 px-6 py-3 font-semibold rounded-lg shadow
          ${selected
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          transition
        `}
            >
                Start Challenge
            </Link>
        </div>
    )
}
