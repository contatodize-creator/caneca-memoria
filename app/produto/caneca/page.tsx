"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Nav from "../../../components/Nav";
import { collections } from "../../../lib/catalog";
import styles from "./page.module.css";

export default function CanecaPage() {
  const [collection, setCollection] = useState("amor");
  const [mode, setMode] = useState<"sozinho" | "assistido">("sozinho");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialCollection = params.get("colecao");
    if (initialCollection && collections.some((item) => item.slug === initialCollection)) {
      setCollection(initialCollection);
    }
  }, []);

  const selectedCollection = useMemo(
    () => collections.find((item) => item.slug === collection) || collections[0],
    [collection]
  );

  const nextPath = `/criar?produto=caneca&colecao=${collection}&modo=${mode}`;
  const loginHref = `/login?next=${encodeURIComponent(nextPath)}`;

  return (
    <main>
      <Nav />
      <div className={`container ${styles.productPage}`}>
        <section className={styles.productHero}>
          <div className={styles.productVisual}>
            <div className={styles.productMug}>
              <div className={styles.productMugPrint}>
                <span className={styles.mugMiniLabel}>{selectedCollection.title}</span>
                <strong>Tem algo aqui para você.</strong>
                <div className={styles.mugQr}>▦</div>
                <small>Escaneie e descubra</small>
              </div>
            </div>
            <div className={styles.productBadge}>QR permanente • conteúdo editável</div>
          </div>

          <div className={styles.productInfo}>
            <span className="eyebrow">primeiro produto da plataforma</span>
            <h1>Caneca Interativa</h1>
            <p className="lead">Uma caneca personalizada que guarda uma experiência digital: mensagem, foto, vídeo ou áudio acessados por um QR Code único.</p>

            <div className={styles.productHighlights}>
              <span>✓ QR único</span>
              <span>✓ Página personalizada</span>
              <span>✓ Editável depois</span>
              <span>✓ Opção de ajuda</span>
            </div>

            <div className={styles.configBlock}>
              <div className={styles.configTitle}>1. Escolha o tema da caneca</div>
              <div className={styles.themePicker}>
                {collections.map((item) => (
                  <button
                    type="button"
                    key={item.slug}
                    className={`${styles.themeChoice} ${collection === item.slug ? styles.active : ""}`}
                    onClick={() => setCollection(item.slug)}
                  >
                    <span>{item.icon}</span>
                    {item.title}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.configBlock}>
              <div className={styles.configTitle}>2. Como você quer personalizar?</div>
              <div className={styles.modeGrid}>
                <button type="button" className={`${styles.modeCard} ${mode === "sozinho" ? styles.active : ""}`} onClick={() => setMode("sozinho")}>
                  <strong>Eu mesmo vou montar</strong>
                  <span>Você envia mensagem, foto, vídeo ou áudio e cria sua página.</span>
                </button>
                <button type="button" className={`${styles.modeCard} ${mode === "assistido" ? styles.active : ""}`} onClick={() => setMode("assistido")}>
                  <strong>Quero que façam para mim</strong>
                  <span>Ideal para idosos, presentes especiais ou quem prefere ajuda.</span>
                </button>
              </div>
            </div>

            <div className={styles.productSummary}>
              <div><span className="small">Sua escolha</span><strong>Caneca • {selectedCollection.title} • {mode === "sozinho" ? "Personalização própria" : "Atendimento assistido"}</strong></div>
              <Link href={loginHref} className="button">Começar personalização</Link>
            </div>
          </div>
        </section>

        <section className="section compactSection">
          <div className="sectionHeading"><div><span className="sectionKicker">Como funciona</span><h2>Do pedido à surpresa</h2></div></div>
          <div className="grid3">
            <div className="card"><h2>01</h2><h3>Escolha</h3><p>Defina o tema e a forma de personalização.</p></div>
            <div className="card"><h2>02</h2><h3>Crie</h3><p>Adicione mensagem, mídia e as informações da homenagem.</p></div>
            <div className="card"><h2>03</h2><h3>Escaneie</h3><p>O QR impresso abre a experiência digital personalizada.</p></div>
          </div>
        </section>
      </div>
    </main>
  );
}
