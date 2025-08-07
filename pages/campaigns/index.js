// pages/campaigns/index.js
import { useRouter } from 'next/router'

export default function CampaignsPlaceholder() {
    const router = useRouter()

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-4xl font-bold mb-4 text-purple-600">
                📧 Build Campaign
            </h1>
            <p className="text-lg mb-6 text-gray-700">
                This feature is coming soon!
                In the meantime, try out the Phish Academy challenge.
            </p>
            <button
                onClick={() => router.push('/')}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
            >
                ← Back to Home
            </button>
        </div>
    )
}
