import { revalidatePath } from "next/cache";

export async function POST(request) {
  try {
    const url = new URL(request.url);
    const secret = url.searchParams.get("secret");

    // Secret guardado en Vercel y (opcional) en local
    if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
      return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
        status: 401,
        headers: { "content-type": "application/json" },
      });
    }

    // Sanity manda JSON (normalmente con info del doc)
    const payload = await request.json().catch(() => ({}));

    // Intentamos detectar slug y tipo
    const type = payload?._type || payload?.type;
    const slug =
      payload?.slug?.current ||
      payload?.slug ||
      payload?.document?.slug?.current ||
      payload?.document?.slug;

    // Revalidaciones mínimas para que “aparezca ya”
    // Listados + home + sitemap/robots (por si los usas)
    revalidatePath("/");
    revalidatePath("/articulos");
    revalidatePath("/sitemap.xml");
    revalidatePath("/robots.txt");

    // Si es un artículo y tenemos slug, revalida su página
    if (type === "article" && slug) {
      revalidatePath(`/articulo/${slug}`);
    }

    // Si tienes secciones dependientes del artículo y lo puedes derivar,
    // aquí podrías revalidar también /seccion/<slug>.
    // Ejemplo si Sanity manda section.slug.current:
    const sectionSlug = payload?.section?.slug?.current || payload?.sectionSlug;
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
