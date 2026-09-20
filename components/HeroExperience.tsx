"use client";

export default function HeroExperience() {
  return (
    <div className="heroPhotoCard">
      <img
        src="/memora-hero-real.webp"
        alt="Caneca real com QR Code ao lado de um celular mostrando uma experiência digital"
        className="heroPhoto"
      />
      <div className="heroPhotoLabel">
        <strong>EXEMPLO DE APLICAÇÃO</strong>
        <span>Um QR conecta o produto físico à experiência digital.</span>
      </div>
    </div>
  );
}
