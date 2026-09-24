import Link from "next/link";
import "./demo.css";

export default function DemoPage(){
  return <main className="demoExperience">
    <div className="demoExperienceCard">
      <span className="demoBrand">DIZECODE</span>
      <div className="demoHeroIcon">🎁</div>
      <span className="eyebrow">EXPERIÊNCIA DEMONSTRATIVA</span>
      <h1>Este produto tem algo para dizer.</h1>
      <p className="demoIntro">Você acabou de abrir uma experiência DizeCode a partir de um QR.</p>
      <div className="demoMessage"><strong>Uma mensagem pode viver além do produto físico.</strong><p>Aqui o criador pode adicionar uma mensagem, fotos, vídeo ou áudio e depois atualizar o conteúdo sem precisar trocar o QR já impresso.</p></div>
      <div className="demoFeatureGrid"><div><span>📷</span><b>Fotos</b><small>Momentos, catálogo ou instruções.</small></div><div><span>▶</span><b>Vídeo</b><small>Recados, tutoriais e histórias.</small></div><div><span>♫</span><b>Áudio</b><small>Voz, música ou mensagem especial.</small></div><div><span>↻</span><b>Editável</b><small>O conteúdo pode mudar. O QR permanece.</small></div></div>
      <div className="demoHighlight"><b>O QR que você escaneou é a porta.</b><span>Esta página é a experiência.</span></div>
      <Link href="/login?next=/criar" className="button demoButton">Criar meu DizeCode grátis</Link>
      <Link href="/" className="demoBack">← Voltar para a DizeCode</Link>
    </div>
  </main>;
}
