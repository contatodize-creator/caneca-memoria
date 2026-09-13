"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "../../components/Nav";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function login(e: FormEvent) {
    e.preventDefault();
    setLoading(true); setError(""); setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError(error.message);
    router.push("/painel");
    router.refresh();
  }

  async function signup() {
    setLoading(true); setError(""); setMessage("");
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) return setError(error.message);
    if (data.session) {
      router.push("/painel");
      router.refresh();
    } else {
      setMessage("Cadastro criado. Confira seu e-mail para confirmar a conta e depois entre normalmente.");
    }
  }

  return (
    <main>
      <Nav />
      <div className="authWrap">
        <div className="formCard">
          <span className="eyebrow">área do cliente</span>
          <h2 style={{marginTop: 14}}>Entre para gerenciar suas memórias</h2>
          <p className="muted">Suas memórias e mídias ficam vinculadas à sua conta.</p>
          <form className="authForm" onSubmit={login}>
            <label>E-mail
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
            </label>
            <label>Senha
              <input type="password" minLength={6} value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
            </label>
            {error && <div className="errorBox">{error}</div>}
            {message && <div className="successBox">{message}</div>}
            <div className="actions">
              <button className="button" type="submit" disabled={loading}>{loading ? "Aguarde..." : "Entrar"}</button>
              <button className="button secondary" type="button" onClick={signup} disabled={loading}>Criar conta</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
