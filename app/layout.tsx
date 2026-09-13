import "./globals.css";

export const metadata = {
  title: "Memória na Caneca",
  description: "Canecas com QR Code que revelam mensagens, vídeos, fotos e lembranças.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
