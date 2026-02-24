"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const apiBase = process.env.NEXT_PUBLIC_HORSESUITE_API_URL;
      const loginPath = process.env.NEXT_PUBLIC_HORSESUITE_LOGIN_PATH || "/api/auth/login";

      if (!apiBase) {
        setErr("Falta NEXT_PUBLIC_HORSESUITE_API_URL en .env.local");
        setLoading(false);
        return;
      }

      const res = await fetch(`${apiBase}${loginPath}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErr(data?.message || "Login failed");
        setLoading(false);
        return;
      }

      // Ajusta estas keys si tu backend usa otras:
      const token = data?.token;
      const role = data?.role || data?.user?.role;

      if (!token) {
        setErr("El backend no devolvió token");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);
      if (role) localStorage.setItem("role", role);

      router.push(next);
      router.refresh();
    } catch (e) {
      setErr(e?.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container mx-auto px-4 py-12 max-w-md">
      <h1 className="font-display text-3xl font-bold mb-6">Acceder</h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground">Email</label>
          <input
            className="w-full mt-1 border rounded px-3 py-2 bg-background"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label className="text-sm text-muted-foreground">Contraseña</label>
          <input
            className="w-full mt-1 border rounded px-3 py-2 bg-background"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {err ? <p className="text-sm text-red-500">{err}</p> : null}

        <button
          disabled={loading}
          className="w-full rounded px-4 py-2 bg-primary text-primary-foreground font-medium disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Login"}
        </button>
      </form>
    </main>
  );
}
