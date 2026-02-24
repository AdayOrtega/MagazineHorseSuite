"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken, getRole } from "@/lib/authClient";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    const role = getRole();
    if (!token) router.push("/login?next=/admin");
    else if (role !== "admin") router.push("/");
  }, [router]);

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="font-display text-4xl font-bold">Admin Dashboard</h1>
      <p className="mt-4 text-muted-foreground">
        Placeholder. Aquí luego puedes enlazar al panel real o a secciones internas del magazine.
      </p>
    </main>
  );
}
