"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import { supabase } from "../../lib/supabase";

export default function Pagamento() {
  const [state, setState] = useState<"checking" | "approved" | "pending" | "failure">("checking");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentId = params.get("payment_id") || params.get("collection_id");
    const returned = params.get("status") || params.get("collection_status");
    if (!paymentId) {
      setState(returned === "success" ? "pending" : returned === "pending" ? "pending" : "failure");
      return;
    }
    let cancelled = false;
    async function confirm() {
      try {
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;
        if (!token) { if (!cancelled) setState("failure"); return; }
        const r = await fetch("/api/payment-confirm", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ paymentId }) });
        const result = await r.json();
        if (!cancelled) setState(result.status === "approved" ? "approved" : result.status === "pending" || returned === "pending" ? "pending" : "failure");
      } catch { if (!cancelled) setState("failure"); }
    }
    confirm();
    return () => { cancelled = true; };
  }, []);

  const title = state === "checking" ? "Confirmando seu pagamento..." : state === "approved" ? "Pagamento confirmado" : state === "pending" ? "Pagamento em processamento" : "Não foi possível confirmar o pagamento";
  const text = state === "checking" ? "Aguarde alguns segundos enquanto confirmamos diretamente com o Mercado Pago." : state === "approved" ? "Seu pagamento foi confirmado e o acesso foi liberado para esta conta." : state === "pending" ? "O Mercado Pago ainda informa que o pagamento está em processamento. Não faça outro pagamento; assim que houver confirmação, tente atualizar esta página." : "O pagamento não foi liberado nesta conta. Se o valor já foi pago, não faça uma nova compra.";

  return <main><Nav/><div className="authWrap"><div className="formCard" style={{textAlign:"center"}}><span className="eyebrow">pagamento DizeCode</span><h2 style={{marginTop:16}}>{title}</h2><p className="muted">{text}</p><div className="actions" style={{justifyContent:"center"}}>{state === "approved" ? <Link href="/painel" className="button">Usar meu DizeCode</Link> : <button className="button" onClick={() => window.location.reload()} disabled={state === "checking"}>{state === "checking" ? "Confirmando..." : "Verificar novamente"}</button>}<Link href="/painel" className="button secondary">Ir para meu painel</Link></div></div></div></main>;
}
