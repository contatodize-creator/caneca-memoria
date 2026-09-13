"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Nav from "../../../components/Nav";
import QrCard from "../../../components/QrCard";
import { getOwnedMemory, replaceMedia, updateMemory } from "../../../lib/memory-api";
import { Memory, MediaType, Theme } from "../../../lib/types";

export default function Editar() {
  const { slug } = useParams<{slug:string}>();
  const router = useRouter();
  const [memory, setMemory] = useState<Memory | null>(null);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [newFile, setNewFile] = useState<File | null>(null);
  const [externalUrl, setExternalUrl] = useState("");

  useEffect(() => {
    getOwnedMemory(slug).then(setMemory).catch(() => router.replace("/login")).finally(()=>setReady(true));
  }, [slug, router]);

  if (!ready) return <main><Nav /><div className="formWrap"><div className="empty">Carregando...</div></div></main>;
  if (!memory) return <main><Nav /><div className="formWrap"><div className="empty">Memória não encontrada.</div></div></main>;

  const url = typeof window !== "undefined" ? `${window.location.origin}/m/${memory.slug}` : "";
  function update<K extends keyof Memory>(key: K, value: Memory[K]) { setMemory(prev => prev ? {...prev, [key]: value} : prev); }

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!memory) return;
    setSaving(true); setError("");
    try {
      await updateMemory(slug, { title: memory.title, recipient: memory.recipient, sender: memory.sender, message: memory.message, mediaType: memory.mediaType, theme: memory.theme, active: memory.active, mediaUrl: externalUrl.trim() ? externalUrl.trim() : undefined });
      if (newFile) await replaceMedia(slug, newFile);
      router.push("/painel");
      router.refresh();
    } catch (err: any) { setError(err?.message || "Não foi possível salvar."); }
    finally { setSaving(false); }
  }

  return (
    <main><Nav /><div className="formWrap"><div className="formCard"><h2>Editar memória</h2><p className="muted">O endereço e o QR desta caneca continuam os mesmos.</p><form className="formGrid" onSubmit={save}>
      <label className="full">Título<input value={memory.title} onChange={e=>update("title", e.target.value)} /></label>
      <label>Destinatário<input value={memory.recipient || ""} onChange={e=>update("recipient", e.target.value)} /></label>
      <label>Remetente<input value={memory.sender || ""} onChange={e=>update("sender", e.target.value)} /></label>
      <label>Tema<select value={memory.theme} onChange={e=>update("theme", e.target.value as Theme)}><option value="amor">Amor</option><option value="familia">Família</option><option value="pet">Pet</option><option value="aniversario">Aniversário</option><option value="homenagem">Homenagem</option></select></label>
      <label>Tipo de mídia<select value={memory.mediaType} onChange={e=>update("mediaType", e.target.value as MediaType)}><option value="video">Vídeo</option><option value="image">Imagem</option><option value="audio">Áudio</option></select></label>
      <label className="full">Mensagem<textarea value={memory.message} onChange={e=>update("message", e.target.value)} /></label>
      <label className="full">Substituir arquivo<div className="fileBox"><input type="file" accept={memory.mediaType === "video" ? "video/*" : memory.mediaType === "image" ? "image/*" : "audio/*"} onChange={e=>setNewFile(e.target.files?.[0] || null)} /><div className="small">Deixe vazio para manter o arquivo atual.</div></div></label>
      <label className="full">Ou trocar por URL externa<input value={externalUrl} onChange={e=>setExternalUrl(e.target.value)} placeholder="https://... (deixe vazio para manter a mídia atual)" /></label>
      <label className="toggleRow"><input type="checkbox" checked={memory.active} onChange={e=>update("active", e.target.checked)} /> Memória ativa</label>
      {error && <div className="full errorBox">{error}</div>}
      <div className="full"><button className="button" disabled={saving}>{saving ? "Salvando..." : "Salvar alterações"}</button></div>
    </form></div><QrCard url={url} slug={memory.slug} /></div></main>
  );
}
