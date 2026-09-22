"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

const KEY = "dizecode-home-video";

function embedUrl(value:string){
  const v=value.trim();
  if(!v) return "";
  const yt=v.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([^?&/]+)/i);
  if(yt?.[1]) return `https://www.youtube.com/embed/${yt[1]}?rel=0`;
  const vm=v.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if(vm?.[1]) return `https://player.vimeo.com/video/${vm[1]}`;
  return v;
}

export default function HomeVideo(){
  const [url,setUrl]=useState("");
  const [draft,setDraft]=useState("");
  const [logged,setLogged]=useState(false);
  const [editing,setEditing]=useState(false);
  useEffect(()=>{
    const saved=window.localStorage.getItem(KEY)||"";
    setUrl(saved); setDraft(saved);
    supabase.auth.getUser().then(({data})=>setLogged(!!data.user));
  },[]);
  const src=useMemo(()=>embedUrl(url),[url]);
  function save(){window.localStorage.setItem(KEY,draft.trim());setUrl(draft.trim());setEditing(false)}
  return <div className="videoShell">
    <div className="videoPlaceholder">
      {src ? (src.match(/youtube|vimeo/) ? <iframe src={src} title="Vídeo DizeCode" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/> : <video src={src} controls playsInline/>) : <><div className="play">▶</div><strong>Seu vídeo aparece aqui</strong><span>Tutorial • demonstração • propaganda<br/>YouTube, Vimeo ou link direto de vídeo</span></>}
    </div>
    {logged&&<div className="videoAdmin">
      {!editing?<button className="videoEdit" onClick={()=>setEditing(true)}>Trocar vídeo</button>:<><input value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Cole o link do YouTube, Vimeo ou vídeo..."/><button className="button" onClick={save}>Salvar vídeo</button><button className="button secondary" onClick={()=>{setDraft(url);setEditing(false)}}>Cancelar</button></>}
      <small>Visível apenas para você quando estiver logado.</small>
    </div>}
  </div>
}
