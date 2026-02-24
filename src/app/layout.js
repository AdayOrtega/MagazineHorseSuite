import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSections } from "@/lib/getSections";

export const revalidate = 60;

export const metadata = {
  title: "Magazine HorseSuite",
  description:
    "Revista digital sobre el mundo del caballo: doma clásica, salto, doma vaquera, salud, entrenamiento, yeguadas y cultura ecuestre.",
};

export default async function RootLayout({ children }) {
  const sections = await getSections();

  return (
    <html lang="es">
      <body>
        <Header sections={sections || []} />
        {children}
        <Footer sections={sections || []} />
      </body>
    </html>
  );
}
