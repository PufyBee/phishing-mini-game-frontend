import { useEffect } from "react";
import { useRouter } from "next/router";

export default function FinaleRedirect() {
    const router = useRouter();
    useEffect(() => {
        router.replace("/story/day/999"); // reuse Day screen for boss with special id
    }, [router]);
    return null;
}
