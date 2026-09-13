"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ThemeBadge from "../../../components/ThemeBadge";
import { fetchPublicMemory } from "../../../lib/memory-api";
import { PublicMemory } from "../../../lib/types";

export default function MemoryPage() {
  const { slug } = useParams<{slug:string}>();
  const [memory, setMemory] = useState<PublicMemory | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetchPublicMemory(slug).then(setMemory).catch(()=>setMemory(null)).finally(()=>setChecked(true));
  }, [slug]);

  if (!checked) return <main><div className="memoryPage"><div className="memoryHero"><p>Carregando sua surpresa...</p></div></div></main>;
  if (!memory) return <main><div className="memoryPage"><div className="memoryHero"><h2>Essa memória não está disponível.</h2><p className="muted">Ela pode ter sido pausada, removida ou o QR pode estar incorreto.</p></div></div></main>;

  return (
    <main><div className="memoryPage"><div className="memoryHero"><ThemeBadge theme={memory.theme} /><h1>{memory.title}</h1>{memory.recipient && <p>Para <strong>{memory.recipient}</strong></p>}{memory.sender && <p className="small">Com carinho, {memory.sender}</p>}</div>
      {memory.mediaUrl && <div className="mediaFrame">{memory.mediaType === "image" && <img src={memory.mediaUrl} alt="Memória" />}{memory.mediaType === "video" && <video src={memory.mediaUrl} controls playsInline />}{memory.mediaType === "audio" && <audio src={memory.mediaUrl} controls />}</div>}
      <div className="note"><strong>Uma mensagem para você</strong><p>{memory.message}</p></div>
    </div></main>
  );
}
