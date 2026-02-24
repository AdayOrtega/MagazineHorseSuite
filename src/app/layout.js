import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Magazine HorseSuite — Mundo del Caballo",
  description:
    "Revista digital sobre el mundo del caballo: doma clásica, salto, doma vaquera, cría responsable (PRE) y cultura ecuestre.",
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
