export default function ClueBoard({ clues }) {
    const keys = Object.keys(clues || {});
    return (
        <div className="border rounded-2xl p-4 bg-white">
            <h3 className="font-bold mb-2">🧩 Clue Board</h3>
            {keys.length === 0 ? (
                <p className="text-sm text-gray-600">No clues yet. Mark legit company emails as Safe to collect clues.</p>
            ) : (
                <ul className="space-y-1">
                    {keys.map(k => (
                        <li key={k} className="text-sm">
                            <span className="font-semibold">{k}:</span> {clues[k]}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
