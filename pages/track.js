// pages/track.js
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Track() {
    const { query, replace } = useRouter()

    useEffect(() => {
        // Send tracking event to your backend
        fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/track?camp=${query.camp}&user=${query.user}`
        ).finally(() => {
            // After logging, redirect user to a “landing” page or external URL
            replace('/thank-you')  // you can change this route or URL
        })
    }, [query, replace])

    return (
        <p className="p-8 text-center">
            Logging your click…
            <br />
            Redirecting now…
        </p>
    )
}
