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
            <h1>Um presente que fala por você.</h1>
            <p className="lead">
              Personalize uma caneca com um QR Code único. Ao escanear, a pessoa
              recebe sua mensagem, foto, vídeo ou áudio em uma página feita para ela.
            </p>
            <div className="actions">
              <Link href="/criar" className="button">Criar uma memória</Link>
              <Link href="/painel" className="button secondary">Ver painel</Link>
            </div>
          </div>
          <div className="heroCard">
            <div className="mug">
              <div className="mugArt">
                <div className="qrFake">▦</div>
                <h3>Tem algo aqui para você.</h3>
                <p className="small">Aponte a câmera e descubra.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="grid3">
            <div className="card"><h2>01</h2><h3>Crie</h3><p>Escolha tema, mensagem e mídia.</p></div>
            <div className="card"><h2>02</h2><h3>Imprima</h3><p>Baixe o QR em SVG para usar na arte da caneca.</p></div>
            <div className="card"><h2>03</h2><h3>Surpreenda</h3><p>O presenteado escaneia e abre a experiência digital.</p></div>
          </div>
        </section>
      </div>
    </main>
  );
}
