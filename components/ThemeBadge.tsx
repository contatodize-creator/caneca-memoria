const labels = {
  amor: "Amor",
  familia: "Família",
  pet: "Pet",
  aniversario: "Aniversário",
  homenagem: "Homenagem"
};

export default function ThemeBadge({ theme }: { theme: keyof typeof labels }) {
  return <span className={`theme theme-${theme}`}>{labels[theme]}</span>;
}
