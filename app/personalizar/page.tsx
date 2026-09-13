import Link from "next/link";
import Nav from "../../components/Nav";

export default function PersonalizarPage() {
  return (
    <main>
      <Nav />
      <div className="container">
        <section className="section">
          <span className="eyebrow">personalização pós-compra</span>
          <h1>Como você prefere criar sua memória?</h1>
          <p className="lead">Você pode preencher tudo sozinho ou escolher atendimento assistido.</p>
          <div className="grid3">
            <div className="card">
              <h2>Quero personalizar sozinho</h2>
              <p>Adicione mensagem, foto, vídeo ou áudio e edite depois sem trocar o QR.</p>
              <Link href="/login?next=/criar" className="button">Começar personalização</Link>
            </div>
            <div className="card">
              <h2>Quero ajuda para personalizar</h2>
              <p>Ideal para idosos ou para quem prefere que a memória seja montada com ajuda.</p>
              <Link href="/login?next=/criar?modo=assistido" className="button secondary">Atendimento assistido</Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
