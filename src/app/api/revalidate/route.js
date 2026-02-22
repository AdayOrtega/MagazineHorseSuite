import { revalidatePath } from "next/cache";

export async function POST(request) {
  try {
    const url = new URL(request.url);
    const secret = url.searchParams.get("secret");

    if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
      return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
        status: 401,
        headers: { "content-type": "application/json" },
      });
    }

    const payload = await request.json().catch(() => ({}));

    // Sanity puede mandar distintas formas. Cubrimos varias:
    const doc = payload?.document || payload?.result || payload;
    const type = doc?._type || payload?._type || payload?.type;

    const slug =
      doc?.slug?.current ||
      doc?.slug ||
      payload?.slug?.current ||
      payload?.slug ||
      payload?.document?.slug?.current ||
      payload?.document?.slug;

    // Revalidaciones globales (siempre)
    revalidatePath("/");
    revalidatePath("/articulos");
    revalidatePath("/eventos");
    revalidatePath("/criadores"); // si no depende de Sanity, no molesta
    revalidatePath("/sitemap.xml");
    revalidatePath("/robots.txt");

    // Detalle por tipo (si existe slug y ruta)
    if (slug) {
      // Artículos (incluye “entrevistas” si las haces como articles)
      if (type === "article") {
        revalidatePath(`/articulo/${slug}`);
      }

      // Eventos (solo si tienes ruta de detalle; si no existe, no pasa nada)
      if (type === "event") {
        revalidatePath(`/eventos/${slug}`);
        revalidatePath(`/evento/${slug}`); // por si usaste singular
      }

      // Categorías/Secciones (si tu web usa /seccion/[slug])
      if (type === "category") {
        revalidatePath(`/seccion/${slug}`);
        revalidatePath(`/categoria/${slug}`); // por si algún día lo usas
      }
    }

    // Si Sanity manda sección relacionada explícita
    const sectionSlug = doc?.section?.slug?.current || doc?.sectionSlug || payload?.sectionSlug;
    if (sectionSlug) {
      revalidatePath(`/seccion/${sectionSlug}`);
    }

    return new Response(
      JSON.stringify({
        ok: true,
        revalidated: true,
        received: { type, slug, sectionSlug },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || "Error" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
