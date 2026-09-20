"use client";

import { QRCodeSVG } from "qrcode.react";

export default function HeroQr() {
  const url = typeof window !== "undefined" ? window.location.origin : "https://caneca-memoria-v3-git-main-contatodize-9219s-projects.vercel.app";
  return (
    <div className="heroQrWrap">
      <div className="demoTop"><span className="liveDot">●</span> QR DINÂMICO REAL</div>
      <div className="realQr"><QRCodeSVG value={url} size={190} level="H" includeMargin /></div>
      <h2>Teste agora com seu celular.</h2>
      <p className="muted">Escaneie este QR. Ele abre o próprio site e mostra, na prática, como a experiência funciona.</p>
      <div className="qrBenefits"><span>QR permanente</span><span>Destino editável</span><span>Pronto para imprimir</span></div>
    </div>
  );
}
