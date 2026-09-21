"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function CheckoutButton({product,label,featured=false}:{product:"experience"|"pro"|"reseller"|"business";label:string;featured?:boolean}){
 const router=useRouter();const[loading,setLoading]=useState(false);const[error,setError]=useState("");
 async function checkout(){setLoading(true);setError("");const{data:{session}}=await supabase.auth.getSession();if(!session){router.push(`/login?next=/planos`);return}try{const res=await fetch("/api/checkout",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${session.access_token}`},body:JSON.stringify({product})});const data=await res.json();if(!res.ok||!data.url)throw new Error(data.error||"Falha ao iniciar pagamento");window.location.assign(data.url)}catch(e:any){setError(e.message||"Não foi possível abrir o pagamento.");setLoading(false)}}
 return <><button className={`button ${featured?"":"secondary"}`} onClick={checkout} disabled={loading}>{loading?"Abrindo pagamento...":label}</button>{error&&<p className="small" style={{color:"#8b2f24",marginTop:8}}>{error}</p>}</>
}
