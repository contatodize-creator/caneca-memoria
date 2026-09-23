import Link from "next/link";
import Nav from "../components/Nav";
import HeroExperience from "../components/HeroExperience";
import HomeVideo from "../components/HomeVideo";

export default function Home() {
  return (
    <main className="homePage">
      <Nav />

      <div className="container homeContainer">
        <section className="homeHero">
          <div className="homeHeroCopy">
            <span className="eyebrow">DizeCode • QR dinâmico</span>
            <h1>Todo produto tem algo a dizer.</h1>
            <p className="homeLead">
              Transforme produtos, presentes e materiais impressos em experiências digitais com vídeo, foto, áudio e mensagens que podem ser atualizadas mesmo depois do QR impresso.
            </p>
            <div className="actions">
              <Link href="/login?next=/criar" className="button">Criar meu primeiro QR grátis</Link>
              <Link href="/revender" className="button secondary">DizeCode para negócios</Link>
            </div>
            <div className="homeBenefits" aria-label="Recursos principais">
              <span>QR dinâmico</span>
              <span>Conteúdo editável</span>
              <span>Vídeo, foto e áudio</span>
            </div>
          </div>
          <div className="homeHeroVisual"><HeroExperience /></div>
        </section>

        <section className="homeVideoSection" id="video">
          <div className="homeSectionCopy">
            <span className="eyebrow">Veja como funciona</span>
            <h2>Do QR para uma experiência em segundos.</h2>
            <p>
              A pessoa aponta a câmera, abre o QR e acessa o conteúdo que você preparou. Simples para quem cria e simples para quem recebe.
            </p>
            <Link href="/login?next=/criar" className="button">Criar experiência</Link>
          </div>
          <HomeVideo />
        </section>

        <section className="homeUses">
          <div className="homeSectionHeader">
            <span className="eyebrow">Um QR, muitas possibilidades</span>
            <h2>Use a DizeCode onde fizer sentido para você.</h2>
          </div>
          <div className="useGrid">
            <div className="useCard"><span>🎁</span><h3>Presentes</h3><p>Fotos, vídeos, áudios e mensagens em presentes personalizados.</p></div>
            <div className="useCard"><span>📦</span><h3>Produtos</h3><p>Conteúdo digital em embalagens, etiquetas e produtos personalizados.</p></div>
            <div className="useCard"><span>📣</span><h3>Marketing</h3><p>Campanhas, promoções, lançamentos e materiais que continuam atualizáveis.</p></div>
            <div className="useCard"><span>🎉</span><h3>Eventos</h3><p>Convites, casamentos, aniversários, formaturas e lembranças especiais.</p></div>
            <div className="useCard"><span>🏪</span><h3>Comércio</h3><p>Cardápios, instruções, pós-venda, vitrines e relacionamento com clientes.</p></div>
            <div className="useCard"><span>💼</span><h3>Revenda</h3><p>Ofereça experiências digitais junto aos produtos que você já vende.</p></div>
          </div>
        </section>

        <section className="businessBand homeBusinessBand">
          <div>
            <span className="eyebrow">Para quem vende produtos personalizados</span>
            <h2>Venda o produto físico e também a experiência digital.</h2>
            <p className="lead">Crie DizeCodes para seus clientes, aplique sua margem e gerencie tudo em um único painel.</p>
          </div>
          <Link href="/revender" className="button">Conhecer plano Revendedor</Link>
        </section>

        <section className="homeFinalCta">
          <span className="eyebrow">Comece sem complicação</span>
          <h2>Dê voz ao que é físico.</h2>
          <p>Crie sua primeira experiência e veja a DizeCode funcionando na prática.</p>
          <div className="actions">
            <Link href="/login?next=/criar" className="button">Começar grátis</Link>
            <Link href="/planos" className="button secondary">Ver planos</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
