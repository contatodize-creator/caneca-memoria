import { NextRequest, NextResponse } from "next/server";

const PRODUCTS = {
  experience: { title: "DizeCode Experiência+", amount: 9.9, periodDays: null },
  pro: { title: "DizeCode Pro — 30 dias", amount: 29.9, periodDays: 30 },
  reseller: { title: "DizeCode Revendedor — 30 dias", amount: 89.9, periodDays: 30 },
  business: { title: "DizeCode Business — 30 dias", amount: 199, periodDays: 30 },
} as const;
type ProductKey = keyof typeof PRODUCTS;

async function getUser(req: NextRequest) {
  const authorization=req.headers.get("authorization"); if(!authorization?.startsWith("Bearer ")) return null;
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if(!url||!key) throw new Error("Supabase não configurado.");
  const response=await fetch(`${url}/auth/v1/user`,{headers:{apikey:key,Authorization:authorization},cache:"no-store"});
  if(!response.ok)return null; return response.json();
}

export async function POST(req:NextRequest){try{
 const user=await getUser(req); if(!user?.id||!user?.email)return NextResponse.json({error:"Faça login para continuar."},{status:401});
 const body=await req.json() as {product?:ProductKey}; const product=body.product;
 if(!product||!(product in PRODUCTS))return NextResponse.json({error:"Plano inválido."},{status:400});
 const selected=PRODUCTS[product];
 const token=process.env.MERCADO_PAGO_ACCESS_TOKEN; if(!token)return NextResponse.json({error:"Pagamento ainda não configurado."},{status:503});
 const origin=new URL(req.url).origin, externalReference=`dizecode:${product}:${user.id}`;
 const headers={Authorization:`Bearer ${token}`,"Content-Type":"application/json"};
 const preferenceBody={
   items:[{id:product,title:selected.title,description:selected.periodDays?`Acesso ao plano DizeCode por ${selected.periodDays} dias`:"Experiência digital DizeCode com QR dinâmico",quantity:1,currency_id:"BRL",unit_price:selected.amount}],
   payer:{email:user.email},external_reference:externalReference,
   back_urls:{success:`${origin}/pagamento?status=success`,pending:`${origin}/pagamento?status=pending`,failure:`${origin}/pagamento?status=failure`},
   auto_return:"approved",notification_url:`${origin}/api/mercadopago/webhook`,statement_descriptor:"DIZECODE",
   payment_methods:{installments:12}
 };
 const mp=await fetch("https://api.mercadopago.com/checkout/preferences",{method:"POST",headers,body:JSON.stringify(preferenceBody),cache:"no-store"}); const data=await mp.json();
 if(!mp.ok||!data?.init_point){console.error("mercadopago_preference_error",{status:mp.status,message:data?.message,error:data?.error,cause:data?.cause,external_reference:externalReference});return NextResponse.json({error:"O Mercado Pago não conseguiu criar o pagamento."},{status:502})}
 return NextResponse.json({url:data.init_point,preferenceId:data.id});
}catch(error:any){console.error("checkout_error",error?.message||error);return NextResponse.json({error:"Não foi possível iniciar o pagamento. Tente novamente."},{status:500})}}
