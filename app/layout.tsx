import "./globals.css";
import "./layout-fix.css";
import "./edit-experience.css";
import "./conversion-fixes.css";
import "../components/video-admin.css";

export const metadata = {
  title: "DizeCode | Todo produto tem algo a dizer",
  description: "Crie experiências digitais por QR Code para presentes, produtos, campanhas, eventos, personalizados e marketing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
