import Link from "next/link";
import Nav from "../components/Nav";
import HeroQr from "../components/HeroQr";

export default function Home() {
  return (
    <main>
      <Nav />
      <div className="container">
        <section className="hero">
          <div>
            <span className="eyebrow">QR dinâmico + experiência digital</span>
            <h1>Transforme qualquer coisa física em uma experiência.</h1>
            <p className="lead">Um QR que pode guardar histórias, vender, ensinar, surpreender e continuar mudando depois de impresso. Use em presentes, produtos, embalagens, campanhas, eventos, cartões, vitrines e muito mais.</p>
            <div className="actions">
              <Link href="/login?next=/criar" className="button">Criar meu primeiro QR grátis</Link>
              <Link href="/revender" className="button secondary">Quero usar no meu negócio</Link>
            </div>
            <p className="small" style={{marginTop:14}}>Comece grátis. Sem cartão. O mesmo QR pode continuar levando a novos conteúdos.</p>
          </div>
          <div className="heroCard experienceDemo"><HeroQr /></div>
        </section>
        <section className="section">
          <span className="eyebrow">feito para pessoas e negócios</span>
          <h2 className="sectionTitle">Onde a Memora pode estar</h2>
          <div className="useGrid">
            <div className="useCard"><span>🎁</span><h3>Presentes</h3><p>Fotos, vídeos, áudios e mensagens em presentes personalizados.</p></div>
            <div className="useCard"><span>📦</span><h3>Produtos</h3><p>Transforme embalagens, etiquetas e personalizados em experiências.</p></div>
            <div className="useCard"><span>📣</span><h3>Marketing</h3><p>Campanhas atualizáveis, promoções, lançamentos e captação de leads.</p></div>
            <div className="useCard"><span>🎉</span><h3>Eventos</h3><p>Convites, casamentos, aniversários, formaturas e lembranças.</p></div>
            <div className="useCard"><span>🏪</span><h3>Comércio</h3><p>Cardápios, vitrines, instruções, pós-venda e fidelização.</p></div>
            <div className="useCard"><span>💼</span><h3>Revenda</h3><p>Venda experiências digitais junto aos produtos que você já produz.</p></div>
          </div>
        </section>
        <section className="section businessBand"><div><span className="eyebrow">nova fonte de receita</span><h2>Você personaliza produtos? Venda também a experiência.</h2><p className="lead">Gráficas, lojas de presentes, fotógrafos, agências e personalizadores podem criar QRs para seus clientes, aplicar sua própria margem e administrar tudo em um único painel.</p></div><Link href="/revender" className="button">Conhecer plano Revendedor</Link></section>
        <section className="section centerCta"><h2>O primeiro QR é por nossa conta.</h2><p className="lead">Crie uma experiência simples gratuitamente e descubra o que um QR pode fazer pelo seu presente, produto ou campanha.</p><div className="actions"><Link href="/login?next=/criar" className="button">Começar grátis</Link><Link href="/planos" className="button secondary">Ver planos</Link></div></section>
      </div>
    </main>
  );
}
