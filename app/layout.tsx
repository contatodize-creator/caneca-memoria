import "./globals.css";

export const metadata = {
  title: "Memora | QR Codes que conectam o físico ao digital",
  description: "Crie experiências digitais por QR Code para presentes, produtos personalizados, campanhas, eventos e marketing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
