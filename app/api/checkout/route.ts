import { NextRequest, NextResponse } from "next/server";

const PRODUCTS = {
  experience: { title: "Memora Experiência+", amount: 9.9, recurring: false },
  pro: { title: "Memora Pro", amount: 29.9, recurring: true },
  reseller: { title: "Memora Revendedor", amount: 89.9, recurring: true },
  business: { title: "Memora Business", amount: 199, recurring: true },
} as const;

type ProductKey = keyof typeof PRODUCTS;

async function getUser(req: NextRequest) {
  const authorization = req.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Supabase não configurado.");
  const response = await fetch(`${url}/auth/v1/user`, { headers: { apikey: key, Authorization: authorization }, cache: "no-store" });
  if (!response.ok) return null;
  return response.json();
}

export async function POST(req: NextRequest) {
  try {
    const user = await getUser(req);
    if (!user?.id || !user?.email) return NextResponse.json({ error: "Faça login para continuar." }, { status: 401 });
    const { product } = await req.json() as { product?: ProductKey };
    if (!product || !(product in PRODUCTS)) return NextResponse.json({ error: "Plano inválido." }, { status: 400 });
    const selected = PRODUCTS[product];
    const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    if (!token) return NextResponse.json({ error: "Pagamento ainda não configurado." }, { status: 503 });
    const origin = new URL(req.url).origin;
    const externalReference = `memora:${product}:${user.id}`;
    const commonHeaders = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

    if (!selected.recurring) {
      const mp = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST", headers: commonHeaders,
        body: JSON.stringify({
          items: [{ id: product, title: selected.title, quantity: 1, currency_id: "BRL", unit_price: selected.amount }],
          payer: { email: user.email }, external_reference: externalReference,
          back_urls: { success: `${origin}/pagamento?status=success`, pending: `${origin}/pagamento?status=pending`, failure: `${origin}/pagamento?status=failure` },
          auto_return: "approved", notification_url: `${origin}/api/mercadopago/webhook`, statement_descriptor: "MEMORA"
        })
      });
      const data = await mp.json();
      if (!mp.ok || !data.init_point) throw new Error(data?.message || "Mercado Pago não criou o checkout.");
      return NextResponse.json({ url: data.init_point });
    }

    const mp = await fetch("https://api.mercadopago.com/preapproval", {
      method: "POST", headers: commonHeaders,
      body: JSON.stringify({
        reason: selected.title, external_reference: externalReference, payer_email: user.email,
        auto_recurring: { frequency: 1, frequency_type: "months", transaction_amount: selected.amount, currency_id: "BRL" },
        back_url: `${origin}/pagamento?status=subscription`, status: "pending"
      })
    });
    const data = await mp.json();
    if (!mp.ok || !data.init_point) throw new Error(data?.message || "Mercado Pago não criou a assinatura.");
    return NextResponse.json({ url: data.init_point });
  } catch (error: any) {
    console.error("checkout_error", error?.message || error);
    return NextResponse.json({ error: "Não foi possível iniciar o pagamento. Tente novamente." }, { status: 500 });
  }
}
