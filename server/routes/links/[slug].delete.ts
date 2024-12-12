import { eq } from "drizzle-orm";
import { links } from "../../database/schema";
import { useDrizzle } from "../../utils/drizzle";

export default defineEventHandler(async (event) => {
    const db = useDrizzle();
    const slug = getRouterParam(event, 'slug');

    const result = await db.delete(links).where(eq(links.slug, slug));

    return { statusCode: 200, body: { message: "Link deleted successfully" } };
});