"use client";

import styles from "./HeroExperience.module.css";

export default function HeroExperience() {
  return (
    <figure className={styles.figure}>
      <div className={styles.card}>
        <img
          src="/dizecode-pai-filho.png"
          alt="Caneca real com QR Code ao lado de um celular mostrando uma experiência digital"
          className={styles.photo}
        />
      </div>
      <figcaption className={styles.caption}>
        <strong>EXEMPLO DE APLICAÇÃO</strong>
        <span>Um QR conecta o produto físico à experiência digital.</span>
      </figcaption>
    </figure>
  );
}
