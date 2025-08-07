import React from 'react'

export default function EmailCard({ email, onGuess }) {
    return (
        <div className="p-4 border rounded-lg shadow-sm bg-white flex flex-col justify-between">
            <div>
                <p className="font-semibold">{email.sender}</p>
                <p className="mt-1">{email.subject}</p>
                <p className="mt-2 text-gray-500 text-sm">{email.snippet}</p>
            </div>
            <div className="mt-4 flex justify-between">
                <button
                    onClick={() => onGuess(email.id, true)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                >
                    🏴 Phish
                </button>
                <button
                    onClick={() => onGuess(email.id, false)}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                >
                    ✔️ Legit
                </button>
            </div>
        </div>
    )
}
