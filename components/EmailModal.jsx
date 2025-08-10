export default function EmailModal({ email, onClose, onGuess }) {
    if (!email) return null;
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4">
                <div className="space-y-1">
                    <div className="text-xs text-gray-500">{email.sender}</div>
                    <h2 className="text-lg font-bold">{email.subject}</h2>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{email.body}</p>
                </div>
                <div className="flex gap-3 justify-end">
                    <button onClick={() => onGuess("safe")} className="px-4 py-2 rounded-xl bg-blue-600 text-white">Mark Safe</button>
                    <button onClick={() => onGuess("phish")} className="px-4 py-2 rounded-xl bg-red-600 text-white">Report Phish</button>
                    <button onClick={onClose} className="px-3 py-2 rounded-xl bg-gray-200">Close</button>
                </div>
            </div>
        </div>
    );
}
