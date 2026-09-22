"use client";

import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

export default function HeroQr() {
  const [url, setUrl] = useState("/");

  useEffect(() => {
    setUrl(`${window.location.origin}/`);
  }, []);

  return (
    <div className="heroQrWrap">
      <div className="demoTop"><span className="liveDot">●</span> QR DINÂMICO REAL</div>
      <div className="realQr"><QRCodeSVG value={url} size={190} level="H" includeMargin /></div>
      <h2>Teste agora com seu celular.</h2>
      <p className="muted">Escaneie este QR. Ele usa automaticamente o endereço atual da DizeCode, inclusive quando o domínio definitivo for conectado.</p>
      <div className="qrBenefits"><span>QR permanente</span><span>Conteúdo editável</span><span>Pronto para imprimir</span></div>
    </div>
  );
}
