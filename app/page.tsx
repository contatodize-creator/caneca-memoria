import Link from "next/link";
import Nav from "../components/Nav";

export default function Home() {
  return (
    <main>
      <Nav />
      <div className="container">
        <section className="hero">
          <div>
            <span className="eyebrow">presente físico + memória digital</span>
            <h1>Um presente que continua vivo depois da entrega.</h1>
            <p className="lead">A caneca leva um QR Code único. Ao escanear, a pessoa recebe sua mensagem, foto, vídeo ou áudio em uma página especial.</p>
            <div className="actions">
              <Link href="/personalizar" className="button">Personalizar minha caneca</Link>
              <Link href="/painel" className="button secondary">Área de gestão</Link>
            </div>
            <p className="small" style={{ marginTop: 14 }}>Você pode personalizar sozinho ou escolher atendimento assistido.</p>
          </div>
          <div className="heroCard">
            <div className="mug"><div className="mugArt"><div className="qrFake">▦</div><h3>Tem algo aqui para você.</h3><p className="small">Aponte a câmera e descubra.</p></div></div>
          </div>
        </section>
        <section className="section">
          <div className="grid3">
            <div className="card"><h2>01</h2><h3>Compre</h3><p>A venda pode acontecer no Shopify, site próprio, WhatsApp ou loja física.</p></div>
            <div className="card"><h2>02</h2><h3>Personalize</h3><p>O cliente preenche sozinho ou recebe ajuda para montar a homenagem.</p></div>
            <div className="card"><h2>03</h2><h3>Surpreenda</h3><p>O QR impresso abre a experiência digital e continua editável depois.</p></div>
          </div>
        </section>
      </div>
    </main>
  );
}
