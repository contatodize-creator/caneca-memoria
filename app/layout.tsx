import "./globals.css";

export const metadata = {
  title: "DizeCode | Todo produto tem algo a dizer",
  description: "Crie experiências digitais por QR Code para presentes, produtos, campanhas, eventos, personalizados e marketing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
