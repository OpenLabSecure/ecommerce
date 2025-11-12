"use client"

import { useState } from "react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
    const [message, setMessage] = useState<string | null>(null);


    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/auth/password-reset",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) throw new Error();
            setStatus("ok");
            setMessage("Si existe una cuenta con ese correo, se ha enviado un enlace de restablecimiento de contraseña.");
        } catch (error: any) {
            setStatus("error");
            setMessage(error?.message || "Ocurrió un error. Por favor, inténtalo de nuevo.");
        }
    }

    return (
        <main className="mx-auto max-w-md px-6 py-10">
            <h1 className="text-2xl font-bold mb-6">¿Olvidaste tu contraseña?</h1>
            <p className="text-sm text-gray-600 md-6">
                Ingresa tu correo electrónico a continuación y te enviaremos un enlace para restablecer tu contraseña.
            </p>

            <form onSubmit={onSubmit} className="spacce-y-4">
                <label className="block">
                    <span className="text-sm font-medium">Correo Electrónico</span>
                    <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    className="mt-1 w-full rounded-lg border px-3 py-2"
                    placeholder="tucorreo@ejemplo.com"
                    />
                </label>
                <button
                    disabled={status === "loading"}
                    className="w-full rounded-lg bg-black px-4 py-2 text-white disabled:opacity-60"
                >
                    {status === "loading" ? "Enviando..." : "Enviar Enlace de Restablecimiento"}
                </button>

                {
                    message && (
                        <p className={
                            status === "error" ? "text-sm text-red-600" : "text-sm text-green-600"
                        }>
                            {message}
                        </p>
                    )
                }
                
            </form>
        </main>
    )
}