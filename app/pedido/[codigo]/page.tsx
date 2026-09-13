"use client";

import { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Nav from "../../../components/Nav";
import { supabase } from "../../../lib/supabase";

export default function PedidoPage() {
  const { codigo } = useParams<{ codigo: string }>();
  const [pedido, setPedido] = useState<any>(null);
  const [erro, setErro] = useState("");
  const [salvo, setSalvo] = useState(false);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("Uma surpresa para você");
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState("amor");
  const [mediaType, setMediaType] = useState("video");
  const [mediaUrl, setMediaUrl] = useState("");

  useEffect(() => {
    supabase.rpc("lookup_order", { p_code: codigo }).then(({ data, error }) => {
      if (error || !data?.length) setErro("Não encontramos este pedido.");
      else {
        setPedido(data[0]);
        setRecipient(data[0].recipient || "");
        setTheme(data[0].collection_slug || "amor");
      }
    });
  }, [codigo]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErro("");
    const { error } = await supabase.rpc("save_order_personalization", {
      p_code: codigo, p_title: title, p_recipient: recipient, p_sender: sender,
      p_message: message, p_media_type: mediaType, p_media_url: mediaUrl, p_theme: theme
    });
    if (error) setErro("Não foi possível salvar a personalização.");
    else setSalvo(true);
    setSaving(false);
  }

  return <main><Nav/><div className="formWrap"><div className="formCard">
    <span className="eyebrow">CANEKIM • personalização</span>
    {!pedido ? <div className={erro ? "errorBox" : "muted"}>{erro || "Carregando seu pedido..."}</div> : <>
      <h2 style={{marginTop:16}}>Seu pedido já está identificado</h2>
      <p className="muted">{pedido.shopify_order_name || "Pedido CANEKIM"} • {pedido.product_title}</p>
      <div className="successBox">Você não precisa criar conta nem fazer login.</div>
      {salvo ? <div className="successBox" style={{marginTop:18}}><strong>Personalização recebida.</strong><br/>Seu pedido já entrou na fila da CANEKIM.</div> : <form className="formGrid" onSubmit={submit} style={{marginTop:22}}>
        <label className="full">Título<input value={title} onChange={e=>setTitle(e.target.value)} required/></label>
        <label>Para quem é?<input value={recipient} onChange={e=>setRecipient(e.target.value)}/></label>
        <label>De quem é?<input value={sender} onChange={e=>setSender(e.target.value)}/></label>
        <label>Tema<select value={theme} onChange={e=>setTheme(e.target.value)}><option value="amor">Amor</option><option value="familia">Família</option><option value="bebes">Bebês</option><option value="pets">Pets</option><option value="fe">Fé</option><option value="futebol">Futebol</option><option value="humor">Humor</option><option value="profissoes">Profissões</option><option value="empresas">Empresas</option><option value="aniversarios">Aniversários</option><option value="amizade">Amizade</option><option value="lembrancas">Lembranças</option></select></label>
        <label>Tipo de mídia<select value={mediaType} onChange={e=>setMediaType(e.target.value)}><option value="video">Vídeo</option><option value="image">Imagem</option><option value="audio">Áudio</option></select></label>
        <label className="full">Mensagem<textarea value={message} onChange={e=>setMessage(e.target.value)} required/></label>
        <label className="full">Link da mídia<input value={mediaUrl} onChange={e=>setMediaUrl(e.target.value)} placeholder="https://..."/></label>
        {erro && <div className="full errorBox">{erro}</div>}
        <div className="full"><button className="button" disabled={saving}>{saving ? "Enviando..." : "Enviar personalização"}</button></div>
      </form>}
    </>}
  </div></div></main>;
}
