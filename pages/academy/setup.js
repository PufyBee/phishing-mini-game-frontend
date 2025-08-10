import Link from "next/link";

export default function Setup() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-xl w-full p-6 space-y-6">
                <h1 className="text-2xl font-extrabold">Phish Academy</h1>
                <p className="text-gray-700">Pick a difficulty to start.</p>
                <div className="grid gap-3">
                    <Link href="/academy/play?level=easy" className="px-5 py-3 rounded-xl bg-green-600 text-white">Easy</Link>
                    <Link href="/academy/play?level=medium" className="px-5 py-3 rounded-xl bg-yellow-600 text-white">Medium</Link>
                    <Link href="/academy/play?level=hard" className="px-5 py-3 rounded-xl bg-red-600 text-white">Hard</Link>
                </div>
                <Link href="/" className="text-sm text-gray-600">← Back home</Link>
            </div>
        </main>
    );
}
