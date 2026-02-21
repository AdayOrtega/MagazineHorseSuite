import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Pastor Alemán — Revista Digital",
  description:
    "La revista digital de referencia en español sobre el Pastor Alemán. Belleza, trabajo, cría responsable, adiestramiento y comunidad.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
