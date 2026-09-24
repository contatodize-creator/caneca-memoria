"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import Nav from "../components/Nav";
import HeroExperience from "../components/HeroExperience";

const faqs = [
  ["Dá para trocar o conteúdo depois de imprimir o QR?", "Sim. O QR continua o mesmo e você atualiza a experiência digital pelo painel."],
  ["O que posso colocar no DizeCode?", "Você pode criar experiências com mensagem, fotos, vídeo e áudio, conforme os recursos disponíveis no seu plano."],
  ["Funciona em qualquer produto?", "O QR pode ser aplicado em canecas, embalagens, cartões, etiquetas, convites, materiais promocionais e muitos outros produtos."],
  ["Precisa instalar aplicativo?", "Não. A pessoa aponta a câmera do celular para o QR e abre a experiência no navegador."],
];

const qrExamples = [
  {icon:"🎁", title:"Presente com memória", type:"VÍDEO + MENSAGEM", text:"A pessoa escaneia o QR no presente e abre uma experiência feita especialmente para ela."},
  {icon:"📦", title:"Produto conectado", type:"CONTEÚDO EDITÁVEL", text:"Use o mesmo QR para instruções, novidades, pós-venda ou conteúdo exclusivo do produto."},
  {icon:"🎉", title:"Evento que continua", type:"FOTOS + ÁUDIO", text:"Convites e lembranças podem abrir fotos, recados, músicas e momentos especiais."},
];

export default function Home() {
  const demoPath = "/demo";
  const demoUrl = typeof window !== "undefined" ? `${window.location.origin}${demoPath}` : `https://dizecode.com.br${demoPath}`;
  return <main className="homePage"><Nav/><div className="container homeContainer">
    <section className="productHero">
      <div className="homeHeroCopy"><span className="eyebrow">DizeCode • QR dinâmico</span><h1>Um QR. Uma experiência que você atualiza quando quiser.</h1><p className="homeLead">Crie um QR para seu produto e conecte vídeos, fotos, áudios e mensagens. Depois de impresso, você pode mudar o conteúdo sem trocar o código.</p><div className="actions"><Link href="/login?next=/criar" className="button">Criar meu QR grátis</Link><a href="#teste" className="button secondary">Testar agora</a></div><div className="homeBenefits"><span>✓ QR dinâmico</span><span>✓ Sem aplicativo</span><span>✓ Conteúdo editável</span></div></div>
      <div className="homeHeroVisual"><HeroExperience/></div>
    </section>

    <section className="liveDemo" id="teste">
      <div className="liveDemoCopy"><span className="eyebrow">TESTE A DIZECODE AGORA</span><h2>Aponte a câmera do celular para este QR.</h2><p>Este é um QR real da DizeCode. Escaneie e veja como uma experiência pode aparecer para quem recebe o seu produto.</p><div className="liveDemoHints"><span>1. Abra a câmera</span><span>2. Aponte para o QR</span><span>3. Abra a experiência</span></div></div>
      <div className="liveQrCard"><div className="realQr"><QRCodeSVG value={demoUrl} size={210} level="H" marginSize={2}/></div><strong>DizeCode demonstrativo</strong><small>{demoUrl}</small><Link href={demoPath} className="textLink">Abrir neste dispositivo →</Link></div>
    </section>

    <section className="productProof" id="exemplos"><div className="homeSectionHeader"><span className="eyebrow">VEJA O PRODUTO</span><h2>O QR está no produto. A experiência aparece no celular.</h2><p className="lead">A DizeCode conecta o que você vende ou presenteia a um conteúdo digital que continua editável.</p></div><div className="qrExampleGrid">{qrExamples.map((item,i)=><article className="qrExampleCard" key={item.title}><div className="qrExampleTop"><div className="fakeQr" aria-label="Representação de QR"><i/><i/><i/><span/></div><div className="qrArrow">→</div><div className="phonePreview"><div className="phoneNotch"/><div className="phoneIcon">{item.icon}</div><b>{item.title}</b><small>{item.type}</small><div className="phoneLine"/><div className="phoneLine short"/></div></div><h3>{item.title}</h3><p>{item.text}</p><span className="exampleLabel">Exemplo {i+1}</span></article>)}</div></section>

    <section className="productSteps"><div className="homeSectionHeader"><span className="eyebrow">DO PAINEL PARA O PRODUTO</span><h2>Você cria. Imprime. E continua no controle.</h2></div><div className="productStepGrid"><div><b>1</b><span>▦</span><h3>Crie seu DizeCode</h3><p>Gere um QR único pelo painel.</p></div><div><b>2</b><span>▶</span><h3>Adicione a experiência</h3><p>Coloque mensagem, foto, vídeo ou áudio.</p></div><div><b>3</b><span>▣</span><h3>Aplique no produto</h3><p>Baixe o QR e use na sua arte, etiqueta ou embalagem.</p></div><div><b>4</b><span>↻</span><h3>Atualize depois</h3><p>Altere o conteúdo sem precisar reimprimir o QR.</p></div></div><div className="centerProductCta"><Link href="/login?next=/criar" className="button">Criar meu primeiro DizeCode</Link></div></section>

    <section className="physicalExamples"><div className="homeSectionHeader"><span className="eyebrow">ONDE USAR</span><h2>Coloque o DizeCode no que você já vende.</h2></div><div className="physicalGrid"><div><span>☕</span><h3>Canecas e personalizados</h3><p>Transforme uma estampa em porta de entrada para uma memória ou mensagem.</p></div><div><span>▣</span><h3>Embalagens e etiquetas</h3><p>Conecte o cliente a instruções, campanhas e conteúdo pós-venda.</p></div><div><span>✉</span><h3>Cartões e convites</h3><p>Leve quem recebe para vídeos, fotos, músicas e recados especiais.</p></div><div><span>◈</span><h3>Brindes e materiais</h3><p>Adicione uma camada digital a produtos físicos e materiais promocionais.</p></div></div></section>

    <section className="resellerSpotlight"><div><span className="eyebrow">PARA QUEM VENDE PRODUTOS</span><h2>Venda o produto físico e também a experiência digital.</h2><p>Agregue DizeCode aos seus personalizados, defina sua margem e crie uma nova fonte de receita usando produtos que você já comercializa.</p></div><div className="marginExample"><span>Exemplo de potencial de revenda</span><strong>100 clientes × R$ 19,90</strong><b>= R$ 1.990</b><small>de receita adicional no exemplo</small></div><Link href="/revender" className="button">DizeCode para negócios</Link></section>
    <section className="faqSection"><div className="homeSectionHeader"><span className="eyebrow">DÚVIDAS RÁPIDAS</span><h2>O necessário para começar.</h2></div><div className="faqList">{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    <section className="homeFinalCta"><span className="eyebrow">TESTE NO SEU PRODUTO</span><h2>Crie seu primeiro QR e veja a experiência funcionando.</h2><p>Comece grátis, teste no celular e só depois decida onde aplicar.</p><div className="actions"><Link href="/login?next=/criar" className="button">Criar meu QR grátis</Link><Link href="/planos" className="button secondary">Ver planos</Link></div></section>
    <footer className="siteFooter"><div><strong>DIZECODE</strong><p>QRs dinâmicos para conectar produtos físicos a experiências digitais.</p></div><div className="footerLinks"><Link href="/planos">Planos</Link><Link href="/revender">Para negócios</Link><Link href="/termos">Termos de uso</Link><Link href="/privacidade">Privacidade</Link></div></footer>
  </div></main>;
}
