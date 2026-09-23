import Link from "next/link";
import Nav from "../components/Nav";
import HeroExperience from "../components/HeroExperience";
import HomeVideo from "../components/HomeVideo";

const faqs = [
  ["O QR expira ou fica ativo para sempre?", "O QR impresso continua sendo o mesmo. O que pode variar conforme o plano é a disponibilidade e os recursos da experiência digital vinculada a ele."],
  ["Dá para trocar o conteúdo depois de imprimir o QR?", "Sim. Essa é uma das principais vantagens do QR dinâmico da DizeCode: você mantém o QR e atualiza o conteúdo da experiência."],
  ["Funciona sem internet?", "Para abrir fotos, vídeos, áudios e mensagens hospedados na experiência, o celular precisa de acesso à internet."],
  ["Como funciona a edição depois de publicado?", "Você acessa sua conta, abre o QR no painel e altera o conteúdo disponível para aquela experiência, sem precisar reimprimir o código."],
  ["Qual a diferença entre um QR e uma experiência?", "O QR é o código físico que leva ao endereço. A experiência é o conteúdo digital que aparece quando a pessoa escaneia esse código."],
];

export default function Home() {
  return (
    <main className="homePage">
      <Nav />
      <div className="container homeContainer">
        <section className="homeHero">
          <div className="homeHeroCopy">
            <span className="eyebrow">DizeCode • QR dinâmico</span>
            <h1>Todo produto tem algo a dizer.</h1>
            <p className="homeLead">Transforme produtos, presentes e materiais impressos em experiências digitais com vídeo, foto, áudio e mensagens que podem ser atualizadas mesmo depois do QR impresso.</p>
            <div className="actions">
              <Link href="/login?next=/criar" className="button">Criar meu primeiro QR grátis</Link>
              <Link href="/revender" className="button secondary">DizeCode para negócios</Link>
            </div>
            <div className="homeBenefits"><span>QR dinâmico</span><span>Conteúdo editável</span><span>Vídeo, foto e áudio</span></div>
          </div>
          <div className="homeHeroVisual"><HeroExperience /></div>
        </section>

        <section className="homeVideoSection" id="video">
          <div className="homeSectionCopy">
            <span className="eyebrow">Veja como funciona</span>
            <h2>Do QR para uma experiência em segundos.</h2>
            <p>A pessoa aponta a câmera, abre o QR e acessa o conteúdo que você preparou. Simples para quem cria e simples para quem recebe.</p>
            <Link href="/login?next=/criar" className="button">Criar experiência</Link>
          </div>
          <HomeVideo />
        </section>

        <section className="homeUses">
          <div className="homeSectionHeader"><span className="eyebrow">Um QR, muitas possibilidades</span><h2>Use a DizeCode onde fizer sentido para você.</h2></div>
          <div className="useGrid">
            <div className="useCard"><span>🎁</span><h3>Presentes</h3><p>Fotos, vídeos, áudios e mensagens em presentes personalizados.</p></div>
            <div className="useCard"><span>📦</span><h3>Produtos</h3><p>Conteúdo digital em embalagens, etiquetas e produtos personalizados.</p></div>
            <div className="useCard"><span>📣</span><h3>Marketing</h3><p>Campanhas, promoções, lançamentos e materiais que continuam atualizáveis.</p></div>
            <div className="useCard"><span>🎉</span><h3>Eventos</h3><p>Convites, casamentos, aniversários, formaturas e lembranças especiais.</p></div>
            <div className="useCard"><span>🏪</span><h3>Comércio</h3><p>Cardápios, instruções, pós-venda, vitrines e relacionamento com clientes.</p></div>
            <div className="useCard"><span>💼</span><h3>Revenda</h3><p>Ofereça experiências digitais junto aos produtos que você já vende.</p></div>
          </div>
        </section>

        <section className="resellerSpotlight">
          <div>
            <span className="eyebrow">Uma nova receita para o seu negócio</span>
            <h2>Você já vende o produto. Agora pode vender também a experiência.</h2>
            <p>Agregue uma experiência digital ao produto personalizado, defina sua margem e entregue algo que continua vivo depois da venda.</p>
          </div>
          <div className="marginExample"><span>Exemplo de potencial de revenda</span><strong>100 clientes × R$ 19,90</strong><b>= R$ 1.990</b><small>de receita adicional no exemplo</small></div>
          <Link href="/revender" className="button">Conhecer plano Revendedor</Link>
        </section>

        <section className="howPlansWork">
          <div className="homeSectionHeader"><span className="eyebrow">Sem confusão</span><h2>QR e experiência são partes do mesmo produto.</h2><p className="lead">O QR é o código que você imprime. A experiência é o conteúdo digital que ele abre.</p></div>
          <div className="conceptGrid">
            <div><b>1</b><h3>Crie o QR</h3><p>Gere o código que será aplicado ao produto ou material.</p></div>
            <div><b>2</b><h3>Monte a experiência</h3><p>Adicione mensagem, foto, vídeo ou áudio conforme os recursos do seu plano.</p></div>
            <div><b>3</b><h3>Atualize quando precisar</h3><p>Edite o conteúdo sem precisar trocar o QR que já foi impresso.</p></div>
          </div>
          <Link href="/planos" className="textLink">Comparar os planos →</Link>
        </section>

        <section className="faqSection">
          <div className="homeSectionHeader"><span className="eyebrow">Perguntas frequentes</span><h2>Antes de criar seu primeiro DizeCode.</h2></div>
          <div className="faqList">{faqs.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
        </section>

        <section className="homeFinalCta">
          <span className="eyebrow">Comece sem complicação</span><h2>Dê voz ao que é físico.</h2><p>Crie sua primeira experiência e veja a DizeCode funcionando na prática.</p>
          <div className="actions"><Link href="/login?next=/criar" className="button">Começar grátis</Link><Link href="/planos" className="button secondary">Ver planos</Link></div>
        </section>

        <footer className="siteFooter">
          <div><strong>DIZECODE</strong><p>QRs dinâmicos para conectar produtos físicos a experiências digitais.</p></div>
          <div className="footerLinks"><Link href="/planos">Planos</Link><Link href="/revender">Para negócios</Link><Link href="/termos">Termos de uso</Link><Link href="/privacidade">Privacidade</Link></div>
        </footer>
      </div>
    </main>
  );
}
