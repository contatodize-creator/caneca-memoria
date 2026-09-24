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

  if (!checked) return <main className="publicExperience"><div className="experienceShell"><div className="experienceCard experienceLoading"><p>Carregando sua experiência...</p></div></div></main>;
  if (!memory) return <main className="publicExperience"><div className="experienceShell"><div className="experienceCard experienceLoading"><h2>Essa experiência não está disponível.</h2><p>Ela pode ter sido pausada, removida ou o QR pode estar incorreto.</p></div></div></main>;

  return (
    <main className={`publicExperience experience-${memory.theme}`}>
      <div className="experienceShell">
        <article className="experienceCard">
          <header className="experienceHeader">
            <div className="experienceBrand">DIZECODE</div>
            <ThemeBadge theme={memory.theme} />
            <h1>{memory.title}</h1>
            {(memory.recipient || memory.sender) && <div className="experiencePeople">
              {memory.recipient && <span>Para <strong>{memory.recipient}</strong></span>}
              {memory.sender && <span>De <strong>{memory.sender}</strong></span>}
            </div>}
          </header>

          {memory.mediaUrl && <section className={`experienceMedia ${memory.mediaType}`}>
            {memory.mediaType === "image" && <img src={memory.mediaUrl} alt={memory.title || "Imagem da experiência"} />}
            {memory.mediaType === "video" && <video src={memory.mediaUrl} controls playsInline preload="metadata" />}
            {memory.mediaType === "audio" && <div className="experienceAudio"><span className="experienceAudioIcon">♪</span><p>Uma mensagem em áudio para você</p><audio src={memory.mediaUrl} controls preload="metadata" /></div>}
          </section>}

          {memory.message && <section className="experienceMessage">
            <span className="experienceMessageLabel">Uma mensagem para você</span>
            <p>{memory.message}</p>
          </section>}
          <footer className="experienceFooter">Criado com DizeCode</footer>
        </article>
      </div>
    </main>
  );
}
