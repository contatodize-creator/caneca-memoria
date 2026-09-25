import { NextRequest, NextResponse } from "next/server";

const PRICE = 9.9;

function parseRef(ref?: string | null) {
  const m = /^(?:dizecode|memora):(experience):([0-9a-f-]{36})$/i.exec(ref || "");
  return m ? { product: m[1].toLowerCase(), userId: m[2].toLowerCase() } : null;
}

async function getUser(req: NextRequest) {
  const authorization = req.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Supabase não configurado");
  const r = await fetch(`${url}/auth/v1/user`, { headers: { apikey: key, Authorization: authorization }, cache: "no-store" });
  if (!r.ok) return null;
  return r.json();
}

async function grantCredit(userId: string, paymentId: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase admin não configurado");
  const r = await fetch(`${url}/rest/v1/rpc/grant_experience_credit`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ p_user_id: userId, p_provider_id: paymentId }),
  });
  if (!r.ok) throw new Error(`Falha ao liberar crédito (${r.status})`);
  const granted = await r.json();
  console.info("payment_return_activation", { userId, paymentId, granted });
  return Boolean(granted);
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUser(req);
    if (!user?.id) return NextResponse.json({ error: "Faça login para confirmar o pagamento." }, { status: 401 });
    const { paymentId } = (await req.json()) as { paymentId?: string };
    if (!paymentId || !/^\d+$/.test(String(paymentId))) return NextResponse.json({ error: "Pagamento inválido." }, { status: 400 });
    const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    if (!token) throw new Error("Mercado Pago não configurado");
    const mp = await fetch(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(paymentId)}`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" });
    if (!mp.ok) throw new Error(`Mercado Pago ${mp.status}`);
    const payment = await mp.json();
    const ref = parseRef(payment.external_reference);
    if (!ref || ref.userId !== String(user.id).toLowerCase()) return NextResponse.json({ error: "Este pagamento não pertence a esta conta." }, { status: 403 });
    if (payment.status !== "approved") return NextResponse.json({ status: String(payment.status || "pending") });
    if (Math.abs(Number(payment.transaction_amount) - PRICE) > 0.001 || String(payment.currency_id) !== "BRL") return NextResponse.json({ error: "Valor do pagamento não confere." }, { status: 400 });
    const activated = await grantCredit(ref.userId, String(payment.id));
    return NextResponse.json({ status: "approved", activated, alreadyActivated: !activated });
  } catch (e: any) {
    console.error("payment_confirm_error", e?.message || e);
    return NextResponse.json({ error: "Não foi possível confirmar o pagamento agora." }, { status: 500 });
  }
}
