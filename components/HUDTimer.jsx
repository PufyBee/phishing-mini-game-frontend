import { useEffect, useState } from "react";

export default function HUDTimer({ seconds = 60, onExpire }) {
    const [time, setTime] = useState(seconds);
    useEffect(() => {
        const id = setInterval(() => setTime(t => {
            if (t <= 1) {
                clearInterval(id);
                onExpire?.();
                return 0;
            }
            return t - 1;
        }), 1000);
        return () => clearInterval(id);
    }, [onExpire]);
    return (
        <div className="text-sm font-semibold px-3 py-1 rounded bg-gray-200">
            ⏳ {time}s
        </div>
    );
}
