"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function Nav() {
  const router = useRouter();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setLogged(!!data.user));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setLogged(!!session?.user));
    return () => data.subscription.unsubscribe();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <nav className="nav container">
      <Link href="/" className="brand">Memória na Caneca</Link>
      <div className="navlinks">
        {logged ? (
          <>
            <Link href="/painel">Minhas memórias</Link>
            <Link href="/criar" className="button smallButton">Criar memória</Link>
            <button className="navTextButton" onClick={logout}>Sair</button>
          </>
        ) : (
          <Link href="/login" className="button smallButton">Entrar</Link>
        )}
      </div>
    </nav>
  );
}
