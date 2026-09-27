"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
type Product="experience"|"pro"|"reseller"|"business";
export default function CheckoutButton({product,label,featured=false}:{product:Product;label:string;featured?:boolean}){
 const router=useRouter();const[loading,setLoading]=useState(false);const[error,setError]=useState("");const[choose,setChoose]=useState(false);
 async function checkout(paymentMode?:"subscription"|"pix"){setLoading(true);setError("");const{data:{session}}=await supabase.auth.getSession();if(!session){router.push(`/login?next=/planos`);return}try{const res=await fetch("/api/checkout",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${session.access_token}`},body:JSON.stringify({product,paymentMode})});const data=await res.json();if(!res.ok||!data.url)throw new Error(data.error||"Falha ao iniciar pagamento");window.location.assign(data.url)}catch(e:any){setError(e.message||"Não foi possível abrir o pagamento.");setLoading(false)}}
 const recurring=product!=="experience";
 if(recurring&&choose)return <div style={{display:"grid",gap:8}}><button className={`button ${featured?"":"secondary"}`} onClick={()=>checkout("subscription")} disabled={loading}>{loading?"Abrindo pagamento...":"Cartão — renovação automática"}</button><button className="button secondary" onClick={()=>checkout("pix")} disabled={loading}>{loading?"Abrindo pagamento...":"Pix — acesso por 30 dias"}</button><button type="button" className="forgotButton" onClick={()=>setChoose(false)} disabled={loading}>Voltar</button>{error&&<p className="small" style={{color:"#8b2f24",marginTop:4}}>{error}</p>}</div>;
 return <><button className={`button ${featured?"":"secondary"}`} onClick={()=>recurring?setChoose(true):checkout()} disabled={loading}>{loading?"Abrindo pagamento...":label}</button>{recurring&&<p className="small muted" style={{marginTop:8}}>Cartão com renovação automática ou Pix por 30 dias.</p>}{error&&<p className="small" style={{color:"#8b2f24",marginTop:8}}>{error}</p>}</>
}
