import { NextRequest, NextResponse } from "next/server";

const PRODUCTS = {
  experience: { title: "DizeCode Experiência+", monthly: 9.9, annual: null },
  pro: { title: "DizeCode Pro", monthly: 29.9, annual: 299 },
  reseller: { title: "DizeCode Revendedor", monthly: 89.9, annual: 899 },
  business: { title: "DizeCode Business", monthly: 199, annual: 1990 },
} as const;
type ProductKey = keyof typeof PRODUCTS;
type BillingCycle = "monthly"|"annual";

async function getUser(req: NextRequest) {
 const authorization=req.headers.get("authorization"); if(!authorization?.startsWith("Bearer ")) return null;
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
 if(!url||!key) throw new Error("Supabase não configurado.");
 const response=await fetch(`${url}/auth/v1/user`,{headers:{apikey:key,Authorization:authorization},cache:"no-store"});
 if(!response.ok)return null; return response.json();
}
export async function POST(req:NextRequest){try{
 const user=await getUser(req); if(!user?.id||!user?.email)return NextResponse.json({error:"Faça login para continuar."},{status:401});
 const body=await req.json() as {product?:ProductKey;billingCycle?:BillingCycle}; const product=body.product;
 if(!product||!(product in PRODUCTS))return NextResponse.json({error:"Plano inválido."},{status:400});
 const selected=PRODUCTS[product]; const cycle:BillingCycle=product==="experience"?"monthly":(body.billingCycle==="annual"?"annual":"monthly");
 const amount=cycle==="annual"&&selected.annual?selected.annual:selected.monthly;
 const days=product==="experience"?null:(cycle==="annual"?365:30);
 const token=process.env.MERCADO_PAGO_ACCESS_TOKEN;if(!token)return NextResponse.json({error:"Pagamento ainda não configurado."},{status:503});
 const origin=new URL(req.url).origin,externalReference=`dizecode:${product}:${cycle}:${user.id}`;
 const preferenceBody={items:[{id:`${product}-${cycle}`,title:product==="experience"?selected.title:`${selected.title} — ${cycle==="annual"?"Plano anual":"30 dias"}`,description:days?`Acesso DizeCode por ${days} dias`:"Experiência digital DizeCode com QR dinâmico",quantity:1,currency_id:"BRL",unit_price:amount}],payer:{email:user.email},external_reference:externalReference,back_urls:{success:`${origin}/pagamento?status=success`,pending:`${origin}/pagamento?status=pending`,failure:`${origin}/pagamento?status=failure`},auto_return:"approved",notification_url:`${origin}/api/mercadopago/webhook`,statement_descriptor:"DIZECODE",payment_methods:{installments:12}};
 const mp=await fetch("https://api.mercadopago.com/checkout/preferences",{method:"POST",headers:{Authorization:`Bearer ${token}`,"Content-Type":"application/json"},body:JSON.stringify(preferenceBody),cache:"no-store"});const data=await mp.json();
 if(!mp.ok||!data?.init_point){console.error("mercadopago_preference_error",{status:mp.status,message:data?.message,error:data?.error,cause:data?.cause,external_reference:externalReference});return NextResponse.json({error:"O Mercado Pago não conseguiu criar o pagamento."},{status:502})}
 return NextResponse.json({url:data.init_point,preferenceId:data.id});
}catch(error:any){console.error("checkout_error",error?.message||error);return NextResponse.json({error:"Não foi possível iniciar o pagamento. Tente novamente."},{status:500})}}
