"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Nav from "../../../components/Nav";
import { collections } from "../../../lib/catalog";
import styles from "./page.module.css";

const SHOPIFY_PRODUCT_URL = "https://canekim.myshopify.com/products/caneca-interativa-com-qr-code";

export default function CanecaPage() {
  const [collection, setCollection] = useState("amor");
  const [mode, setMode] = useState<"sozinho" | "assistido">("sozinho");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialCollection = params.get("colecao");
    const initialMode = params.get("modo");
    if (initialCollection && collections.some((item) => item.slug === initialCollection)) setCollection(initialCollection);
    if (initialMode === "assistido") setMode("assistido");
  }, []);

  const selectedCollection = useMemo(() => collections.find((item) => item.slug === collection) || collections[0], [collection]);
  const personalizePath = `/criar?produto=caneca&colecao=${collection}&modo=${mode}`;
  const loginHref = `/login?next=${encodeURIComponent(personalizePath)}`;
  const shopifyHref = `${SHOPIFY_PRODUCT_URL}?colecao=${encodeURIComponent(collection)}&modo=${mode}`;

  return (
    <main>
      <Nav />
      <div className={`container ${styles.productPage}`}>
        <section className={styles.productHero}>
          <div className={styles.productVisual}>
            <div className={styles.productMug}><div className={styles.productMugPrint}><span className={styles.mugMiniLabel}>{selectedCollection.title}</span><strong>Tem algo aqui para você.</strong><div className={styles.mugQr}>▦</div><small>Escaneie e descubra</small></div></div>
            <div className={styles.productBadge}>QR permanente • conteúdo editável</div>
          </div>

          <div className={styles.productInfo}>
            <span className="eyebrow">CANEKIM • produto interativo</span>
            <h1>Caneca Interativa</h1>
            <p className="lead">Escolha o tema e como deseja personalizar. A experiência digital fica ligada a um QR Code único impresso na caneca.</p>
            <div className={styles.productHighlights}><span>✓ QR único</span><span>✓ Página personalizada</span><span>✓ Editável depois</span><span>✓ Opção de ajuda</span></div>

            <div className={styles.configBlock}>
              <div className={styles.configTitle}>1. Para quem é o presente?</div>
              <div className={styles.themePicker}>{collections.map((item) => <button type="button" key={item.slug} className={`${styles.themeChoice} ${collection === item.slug ? styles.active : ""}`} onClick={() => setCollection(item.slug)}><span>{item.icon}</span>{item.title}</button>)}</div>
            </div>

            <div className={styles.configBlock}>
              <div className={styles.configTitle}>2. Como você quer personalizar?</div>
              <div className={styles.modeGrid}>
                <button type="button" className={`${styles.modeCard} ${mode === "sozinho" ? styles.active : ""}`} onClick={() => setMode("sozinho")}><strong>Eu mesmo vou montar</strong><span>Você envia mensagem, foto, vídeo ou áudio e cria sua página.</span></button>
                <button type="button" className={`${styles.modeCard} ${mode === "assistido" ? styles.active : ""}`} onClick={() => setMode("assistido")}><strong>Quero que a CANEKIM faça para mim</strong><span>Você envia o material e nós organizamos a experiência.</span></button>
              </div>
            </div>

            <div className={styles.productSummary}>
              <div><span className="small">Sua escolha</span><strong>Caneca • {selectedCollection.title} • {mode === "sozinho" ? "Personalização própria" : "Atendimento assistido"}</strong></div>
              <Link href={loginHref} className="button">Personalizar experiência</Link>
            </div>
            <div className="actions"><a href={shopifyHref} className="button secondary">Ver produto na loja CANEKIM</a></div>
          </div>
        </section>

        <section className="section compactSection">
          <div className="sectionHeading"><div><span className="sectionKicker">Como funciona</span><h2>Você vende. O sistema organiza. Você produz.</h2></div></div>
          <div className="grid3"><div className="card"><h2>01</h2><h3>Pedido</h3><p>O cliente escolhe a caneca e paga pela Shopify.</p></div><div className="card"><h2>02</h2><h3>Personalização</h3><p>Ele monta a experiência ou solicita atendimento assistido.</p></div><div className="card"><h2>03</h2><h3>Produção</h3><p>A CANEKIM recebe os dados, produz a caneca com o QR e envia.</p></div></div>
        </section>
      </div>
    </main>
  );
}
