"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Nav from "../../components/Nav";
import ThemeBadge from "../../components/ThemeBadge";
import { deleteMemory, listMemories } from "../../lib/memory-api";
import { supabase } from "../../lib/supabase";
import { Memory } from "../../lib/types";

type Usage={plan:string;qr_limit:number;qr_used:number;premium_credits:number};
const planNames:Record<string,string>={free:"Free",pro:"Pro",reseller:"Revendedor",business:"Business"};

export default function Painel(){
 const router=useRouter();const[items,setItems]=useState<Memory[]>([]);const[usage,setUsage]=useState<Usage|null>(null);const[loading,setLoading]=useState(true);const[error,setError]=useState("");
 async function refresh(){setLoading(true);setError("");try{const[memories,planResult]=await Promise.all([listMemories(),supabase.rpc("get_my_plan_usage")]);setItems(memories);if(planResult.error)throw planResult.error;const row=planResult.data?.[0];if(row)setUsage({plan:row.plan,qr_limit:Number(row.qr_limit),qr_used:Number(row.qr_used),premium_credits:Number(row.premium_credits)});}catch(err:any){if((err?.message||"").includes("login"))router.replace("/login");else setError(err?.message||"Falha ao carregar seu painel.");}finally{setLoading(false)}}
 useEffect(()=>{refresh()},[]);
 async function remove(slug:string){if(!confirm("Excluir esta experiência e sua mídia?"))return;try{await deleteMemory(slug);await refresh()}catch(err:any){setError(err?.message||"Falha ao excluir.")}}
 const full=!!usage&&usage.qr_used>=usage.qr_limit;const pct=usage?Math.min(100,Math.round((usage.qr_used/usage.qr_limit)*100)):0;
 return <main><Nav/><div className="panelWrap">
  <div className="panelHeader"><div><span className="eyebrow">seu espaço Memora</span><h2 style={{marginTop:12}}>Meus QRs</h2><p className="muted">Gerencie suas experiências sem trocar o QR já impresso.</p></div>{full?<Link href="/planos" className="button">Aumentar meu limite</Link>:<Link href="/criar" className="button">+ Criar novo QR</Link>}</div>
  {usage&&<section className="usageCard"><div className="usageTop"><div><span className="planPill">Plano {planNames[usage.plan]||usage.plan}</span><h3>{usage.qr_used} de {usage.qr_limit} QRs utilizados</h3></div><Link href="/planos" className="button secondary">Ver planos</Link></div><div className="usageTrack" aria-label={`${pct}% do limite utilizado`}><div className="usageFill" style={{width:`${pct}%`}}/></div><div className="usageBottom"><span>{usage.qr_limit-usage.qr_used} disponíveis</span>{usage.premium_credits>0&&<span>{usage.premium_credits} crédito(s) Experiência+</span>}</div>{full&&<div className="upgradeNotice"><div><strong>Você chegou ao limite do seu plano.</strong><p>Seu QR atual continua funcionando normalmente. Para criar outro, escolha um plano maior ou adquira uma Experiência+.</p></div><Link href="/planos" className="button">Liberar mais QRs</Link></div>}</section>}
  {error&&<div className="errorBox" style={{marginBottom:18}}>{error}</div>}
  {loading?<div className="empty"><p>Carregando seus QRs...</p></div>:!items.length?<div className="empty"><h3>Seu primeiro QR está a poucos passos.</h3><p className="muted">Crie gratuitamente uma experiência e teste no seu celular antes de imprimir.</p><Link href="/criar" className="button">Criar meu primeiro QR</Link></div>:<div className="memoryGrid">{items.map(item=><div className="memoryCard" key={item.slug}><div className="memoryThumb">{item.mediaType==="video"?"▶":item.mediaType==="audio"?"♪":"▧"}</div><div className="memoryBody"><ThemeBadge theme={item.theme}/><h3 style={{marginTop:12}}>{item.title}</h3><p className="small">{item.recipient?`Para ${item.recipient}`:"Experiência digital"}</p><div className="memoryMeta"><span className="small">{item.scans} acessos</span><span className="small">{item.active?"Ativo":"Pausado"}</span></div><div className="actions"><Link className="button secondary" href={`/m/${item.slug}`}>Abrir</Link><Link className="button secondary" href={`/editar/${item.slug}`}>Editar</Link><button className="button danger" onClick={()=>remove(item.slug)}>Excluir</button></div></div></div>)}</div>}
 </div></main>
}
