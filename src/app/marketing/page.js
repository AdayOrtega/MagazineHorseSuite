"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/lib/authClient";

export default function MarketingPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) router.push("/login?next=/marketing");
  }, [router]);

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="font-display text-4xl font-bold">Marketing Dashboard</h1>
      <p className="mt-4 text-muted-foreground">
        Placeholder. Zona marketing protegida en cliente (requiere token).
      </p>
    </main>
  );
}
