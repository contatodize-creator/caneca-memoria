"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

const KEY = "dizecode-home-video";
const DEFAULT_VIDEO = "/Woman_opens_gift_and_smiles_20260924224939.mp4";

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
  const [url,setUrl]=useState(DEFAULT_VIDEO);
  const [draft,setDraft]=useState(DEFAULT_VIDEO);
  const [logged,setLogged]=useState(false);
  const [editing,setEditing]=useState(false);
  useEffect(()=>{
    const saved=window.localStorage.getItem(KEY)||DEFAULT_VIDEO;
    setUrl(saved); setDraft(saved);
    supabase.auth.getUser().then(({data})=>setLogged(!!data.user));
  },[]);
  const src=useMemo(()=>embedUrl(url),[url]);
  function save(){const next=draft.trim()||DEFAULT_VIDEO;window.localStorage.setItem(KEY,next);setUrl(next);setDraft(next);setEditing(false)}
  return <div className="dizeHomeVideo">
    <style jsx global>{`
      .homeVideoSection{width:100%;padding:28px 0 72px!important;overflow:hidden!important}
      .dizeHomeVideo{width:100%!important;max-width:760px!important;margin:0 auto!important;position:relative!important;inset:auto!important;transform:none!important}
      .dizeHomeVideo .dizeVideoFrame{width:100%!important;max-width:760px!important;height:auto!important;aspect-ratio:16/9!important;margin:0 auto!important;overflow:hidden!important;border-radius:24px!important;background:#111!important;box-shadow:0 18px 55px rgba(50,70,60,.14)!important;position:relative!important;inset:auto!important;transform:none!important}
      .dizeHomeVideo .dizeVideoFrame video,.dizeHomeVideo .dizeVideoFrame iframe{display:block!important;position:static!important;inset:auto!important;transform:none!important;width:100%!important;max-width:100%!important;height:100%!important;min-height:0!important;max-height:none!important;aspect-ratio:16/9!important;object-fit:contain!important;background:#111!important;border:0!important;margin:0!important}
      .dizeHomeVideo .videoAdmin{margin-top:12px!important}
      @media(max-width:800px){.dizeHomeVideo{max-width:94vw!important}.dizeHomeVideo .dizeVideoFrame{max-width:94vw!important;border-radius:18px!important}}
    `}</style>
    <div className="dizeVideoFrame">
      {src.match(/youtube|vimeo/) ? <iframe src={src} title="Vídeo DizeCode" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/> : <video src={src} controls playsInline preload="metadata"/>}
    </div>
    {logged&&<div className="videoAdmin">
      {!editing?<button className="videoEdit" onClick={()=>setEditing(true)}>Trocar vídeo</button>:<><input value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Cole o link do YouTube, Vimeo ou vídeo..."/><button className="button" onClick={save}>Salvar vídeo</button><button className="button secondary" onClick={()=>{setDraft(url);setEditing(false)}}>Cancelar</button></>}
      <small>Visível apenas para você quando estiver logado.</small>
    </div>}
  </div>
}
