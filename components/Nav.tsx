"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function Nav() {
  const router = useRouter();
  const [logged, setLogged] = useState(false);
  const [account, setAccount] = useState("");
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => { setLogged(!!data.user); setAccount(data.user?.email || ""); });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => { setLogged(!!session?.user); setAccount(session?.user?.email || ""); });
    return () => data.subscription.unsubscribe();
  }, []);
  async function logout() {
    setLeaving(true);
    await supabase.auth.signOut();
    setLogged(false);
    setAccount("");
    router.replace("/login");
    router.refresh();
    setLeaving(false);
  }
  return <nav className="nav container"><Link href="/" className="brand">DIZECODE</Link><div className="navlinks"><Link href="/planos">Planos</Link><Link href="/revender">Para negócios</Link>{logged?<><span className="navAccount" title={account}>Conectado: {account}</span><Link href="/painel">Meus QRs</Link><Link href="/criar" className="button smallButton">Criar QR</Link><button className="navTextButton" onClick={logout} disabled={leaving}>{leaving?"Saindo...":"Sair"}</button></>:<Link href="/login" className="button smallButton">Entrar grátis</Link>}</div></nav>;
}
