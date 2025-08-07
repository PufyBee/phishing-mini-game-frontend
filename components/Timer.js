import React, { useEffect, useState } from 'react'

export default function Timer({ initial, onExpire }) {
    const [time, setTime] = useState(initial)

    useEffect(() => {
        if (time <= 0) {
            onExpire()
            return
        }
        const id = setTimeout(() => setTime((t) => t - 1), 1000)
        return () => clearTimeout(id)
    }, [time, onExpire])

    return (
        <div className="text-xl font-mono">
            ⏱ {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}
        </div>
    )
}
