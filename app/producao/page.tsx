"use client";

import { useEffect, useMemo, useState } from "react";
import Nav from "../../components/Nav";
import { supabase } from "../../lib/supabase";

type Item = {
  id: string;
  shopify_order_name: string | null;
  customer_name: string | null;
  product_title: string;
  variant_title: string | null;
  quantity: number;
  collection_slug: string | null;
  personalization_mode: string | null;
  recipient: string | null;
  memory_slug: string | null;
  public_code: string | null;
  production_status: string;
  created_at: string;
};

const labels: Record<string,string> = {
  aguardando_personalizacao: "Aguardando personalização",
  personalizacao_recebida: "Personalização recebida",
  arte_em_preparo: "Arte em preparo",
  pronto_para_produzir: "Pronto para produzir",
  em_producao: "Em produção",
  produzido: "Produzido",
  enviado: "Enviado",
  cancelado: "Cancelado"
};

export default function Producao() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.from("production_orders").select("*").order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setItems((data || []) as Item[]);
        setLoading(false);
      });
  }, []);

  const counts = useMemo(() => ({
    total: items.length,
    aguardando: items.filter(i => i.production_status === "aguardando_personalizacao").length,
    produzir: items.filter(i => ["personalizacao_recebida","arte_em_preparo","pronto_para_produzir","em_producao"].includes(i.production_status)).length,
    enviados: items.filter(i => i.production_status === "enviado").length,
  }), [items]);

  return <main>
    <Nav />
    <div className="panelWrap">
      <div className="panelHeader"><div><span className="eyebrow">CANEKIM • operação</span><h2>Painel de Produção</h2><p className="muted">Pedidos da loja organizados para personalização, produção e envio.</p></div></div>

      <div className="grid4" style={{marginBottom:24}}>
        <div className="card"><span className="small">Pedidos</span><h2>{counts.total}</h2></div>
        <div className="card"><span className="small">Aguardando cliente</span><h2>{counts.aguardando}</h2></div>
        <div className="card"><span className="small">Na produção</span><h2>{counts.produzir}</h2></div>
        <div className="card"><span className="small">Enviados</span><h2>{counts.enviados}</h2></div>
      </div>

      {error && <div className="errorBox">{error}</div>}
      {loading ? <div className="empty"><p>Carregando pedidos...</p></div> : items.length === 0 ? <div className="empty"><h3>Nenhum pedido de produção ainda.</h3><p className="muted">Quando a integração com a Shopify receber o primeiro pedido, ele aparecerá aqui automaticamente.</p></div> : <div className="memoryGrid">
        {items.map(item => <div className="memoryCard" key={item.id}>
          <div className="memoryBody">
            <div className="memoryMeta"><strong>{item.shopify_order_name || "Pedido CANEKIM"}</strong><span className="small">{labels[item.production_status] || item.production_status}</span></div>
            <h3>{item.product_title}</h3>
            <p className="small">{item.customer_name || "Cliente"} • Qtd. {item.quantity}</p>
            <p className="small">Tema: {item.collection_slug || "—"} • {item.personalization_mode === "assistido" ? "Atendimento assistido" : "Cliente monta"}</p>
            {item.recipient && <p className="small">Presente para: {item.recipient}</p>}
            <div className="actions">
              {item.public_code && <a className="button secondary" href={`/pedido/${item.public_code}`}>Abrir personalização</a>}
              {item.memory_slug ? <a className="button secondary" href={`/m/${item.memory_slug}`}>Testar QR</a> : <span className="small">QR ainda não gerado</span>}
            </div>
          </div>
        </div>)}
      </div>}
    </div>
  </main>;
}
