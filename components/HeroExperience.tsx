"use client";

import { QRCodeSVG } from "qrcode.react";

export default function HeroExperience() {
  const target = typeof window !== "undefined" ? window.location.origin : "https://caneca-memoria-v3-git-main-contatodize-9219s-projects.vercel.app";
  return (
    <div className="experienceScene">
      <div className="sceneCallout">Escaneie e veja<br/><strong>a experiência!</strong><span>↘</span></div>
      <div className="realBadge"><b>▣ &nbsp; EXEMPLO REAL</b><small>Escaneie o QR e abra esta página no celular.</small></div>
      <div className="productMock">
        <div className="productQr"><QRCodeSVG value={target} size={116} level="M" bgColor="#ffffff" fgColor="#171412" /></div>
        <div className="productCopy">Mais que um produto.<br/><b>Uma história para sempre.</b><div>♡</div></div>
      </div>
      <div className="phoneMock">
        <div className="phoneTop">9:41 <span>● ● ▰</span></div>
        <div className="phoneUrl">🔒 memora.app</div>
        <div className="phoneMedia"><div className="sun">☀</div><div className="play">▶</div></div>
        <h3>Nossa História</h3>
        <p>Pequenos momentos,<br/>grandes lembranças.<br/><b>Sempre juntos!</b></p>
        <div className="heart">♡</div>
        <div className="thumbs"><i>♥</i><i>✦</i><i>☺</i><i>★</i></div>
      </div>
    </div>
  );
}
