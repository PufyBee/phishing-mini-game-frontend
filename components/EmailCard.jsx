export default function EmailCard({ email, onOpen }) {
    return (
        <button
            onClick={() => onOpen(email)}
            className="w-full text-left border rounded-xl p-4 bg-white hover:shadow transition"
        >
            <div className="text-xs text-gray-500">{email.sender}</div>
            <div className="font-semibold">{email.subject}</div>
            <div className="text-sm text-gray-600 truncate">{email.snippet}</div>
        </button>
    );
}
