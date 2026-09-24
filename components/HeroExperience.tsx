"use client";

import styles from "./HeroExperience.module.css";

export default function HeroExperience() {
  return (
    <div className={styles.card}>
      <img
        src="/dizecode-pai-filho.png"
        alt="Caneca real com QR Code ao lado de um celular mostrando uma experiência digital"
        className={styles.photo}
      />
      <div className={styles.label}>
        <strong>EXEMPLO DE APLICAÇÃO</strong>
        <span>Um QR conecta o produto físico à experiência digital.</span>
      </div>
    </div>
  );
}
