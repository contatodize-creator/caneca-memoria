"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Nav from "../../components/Nav";
import ThemeBadge from "../../components/ThemeBadge";
import { deleteMemory, listMemories } from "../../lib/memory-api";
import { Memory } from "../../lib/types";

export default function Painel() {
  const router = useRouter();
  const [items, setItems] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function refresh() {
    setLoading(true); setError("");
    try { setItems(await listMemories()); }
    catch (err: any) {
      if ((err?.message || "").includes("login")) router.replace("/login");
      else setError(err?.message || "Falha ao carregar memórias.");
    } finally { setLoading(false); }
  }

  useEffect(() => { refresh(); }, []);

  async function remove(slug: string) {
    if (!confirm("Excluir esta memória e sua mídia?")) return;
    try { await deleteMemory(slug); await refresh(); }
    catch (err: any) { setError(err?.message || "Falha ao excluir."); }
  }

  return (
    <main>
      <Nav />
      <div className="panelWrap">
        <div className="panelHeader"><div><h2>Minhas Memórias</h2><p className="muted">Gerencie o conteúdo sem trocar o QR impresso.</p></div><Link href="/criar" className="button">+ Nova memória</Link></div>
        {error && <div className="errorBox" style={{marginBottom: 18}}>{error}</div>}
        {loading ? <div className="empty"><p>Carregando suas memórias...</p></div> : !items.length ? (
          <div className="empty"><h3>Você ainda não criou nenhuma memória.</h3><p className="muted">Crie a primeira para gerar um QR permanente.</p><Link href="/criar" className="button">Criar agora</Link></div>
        ) : (
          <div className="memoryGrid">{items.map(item => <div className="memoryCard" key={item.slug}><div className="memoryThumb">{item.mediaType === "video" ? "▶" : item.mediaType === "audio" ? "♪" : "▧"}</div><div className="memoryBody"><ThemeBadge theme={item.theme} /><h3 style={{marginTop:12}}>{item.title}</h3><p className="small">{item.recipient ? `Para ${item.recipient}` : "Sem destinatário"}</p><div className="memoryMeta"><span className="small">{item.scans} acessos</span><span className="small">{item.active ? "Ativa" : "Pausada"}</span></div><div className="actions"><Link className="button secondary" href={`/m/${item.slug}`}>Abrir</Link><Link className="button secondary" href={`/editar/${item.slug}`}>Editar</Link><button className="button danger" onClick={()=>remove(item.slug)}>Excluir</button></div></div></div>)}</div>
        )}
      </div>
    </main>
  );
}
