"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "../../components/Nav";
import QrCard from "../../components/QrCard";
import { createMemory } from "../../lib/memory-api";
import { supabase } from "../../lib/supabase";
import { MediaType, Theme } from "../../lib/types";

const themeOptions: { value: Theme; label: string }[] = [
  { value: "amor", label: "Amor" },
  { value: "familia", label: "Família" },
  { value: "bebes", label: "Bebês" },
  { value: "pets", label: "Pets" },
  { value: "fe", label: "Fé" },
  { value: "futebol", label: "Futebol & Esportes" },
  { value: "humor", label: "Memes & Humor" },
  { value: "profissoes", label: "Profissões" },
  { value: "empresas", label: "Empresas" },
  { value: "aniversarios", label: "Aniversários" },
  { value: "amizade", label: "Amizade" },
  { value: "lembrancas", label: "Lembranças" },
  { value: "homenagem", label: "Homenagem" },
];

export default function Criar() {
  const router = useRouter();
  const [title, setTitle] = useState("Uma surpresa para você");
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [mediaType, setMediaType] = useState<MediaType>("video");
  const [theme, setTheme] = useState<Theme>("amor");
  const [mode, setMode] = useState<"sozinho" | "assistido">("sozinho");
  const [product, setProduct] = useState("caneca");
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const incomingTheme = params.get("colecao") as Theme | null;
    const incomingMode = params.get("modo");
    const incomingProduct = params.get("produto");

    if (incomingTheme && themeOptions.some((item) => item.value === incomingTheme)) setTheme(incomingTheme);
    if (incomingMode === "assistido") setMode("assistido");
    if (incomingProduct) setProduct(incomingProduct);

    supabase.auth.getUser().then(({ data }) => { if (!data.user) router.replace(`/login?next=${encodeURIComponent(window.location.pathname + window.location.search)}`); });
  }, [router]);

  const base = typeof window !== "undefined" ? window.location.origin : "";
  const publicUrl = slug ? `${base}/m/${slug}` : "";

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true); setError("");
    try {
      const id = await createMemory({ title, recipient, sender, message, mediaType, theme, mediaFile, mediaUrl });
      setSlug(id);
    } catch (err: any) {
      setError(err?.message || "Não foi possível criar a memória.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main>
      <Nav />
      <div className="formWrap">
        <div className="formCard">
          <span className="eyebrow">{product === "caneca" ? "Caneca Interativa" : "Produto interativo"} • {mode === "assistido" ? "Atendimento assistido" : "Personalização própria"}</span>
          <h2 style={{ marginTop: 16 }}>Crie a experiência que será aberta pelo QR</h2>
          <p className="muted">O QR permanece igual mesmo que você edite o conteúdo depois.</p>
          {mode === "assistido" && <div className="assistBox"><strong>Modo assistido selecionado.</strong><span>Preencha o que souber agora. Depois, este fluxo poderá ser conectado ao atendimento para nossa equipe finalizar a experiência com o cliente.</span></div>}
          <form className="formGrid" onSubmit={submit}>
            <label className="full">Título<input value={title} onChange={e=>setTitle(e.target.value)} required /></label>
            <label>Para quem é?<input value={recipient} onChange={e=>setRecipient(e.target.value)} placeholder="Ex.: Mãe" /></label>
            <label>De quem é?<input value={sender} onChange={e=>setSender(e.target.value)} placeholder="Seu nome" /></label>
            <label>Tema<select value={theme} onChange={e=>setTheme(e.target.value as Theme)}>{themeOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
            <label>Tipo de mídia<select value={mediaType} onChange={e=>setMediaType(e.target.value as MediaType)}><option value="video">Vídeo</option><option value="image">Imagem</option><option value="audio">Áudio</option></select></label>
            <label className="full">Mensagem<textarea value={message} onChange={e=>setMessage(e.target.value)} required placeholder="Escreva algo que a pessoa vai guardar..." /></label>
            <label className="full">Enviar arquivo<div className="fileBox"><input type="file" accept={mediaType === "video" ? "video/*" : mediaType === "image" ? "image/*" : "audio/*"} onChange={e=>setMediaFile(e.target.files?.[0] || null)} /><div className="small">Arquivo enviado para o Storage privado da sua conta.</div></div></label>
            <label className="full">Ou cole uma URL de mídia<input value={mediaUrl} onChange={e=>setMediaUrl(e.target.value)} placeholder="https://..." /></label>
            {error && <div className="full errorBox">{error}</div>}
            <div className="full"><button className="button" type="submit" disabled={saving}>{saving ? "Criando..." : "Criar experiência e gerar QR"}</button></div>
          </form>
        </div>
        {slug && <><QrCard url={publicUrl} slug={slug} /><div className="actions"><button className="button secondary" onClick={()=>router.push(`/m/${slug}`)}>Ver experiência</button><button className="button" onClick={()=>router.push("/painel")}>Ir para o painel</button></div></>}
      </div>
    </main>
  );
}
