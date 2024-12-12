import { eq } from "drizzle-orm";
import { links } from "../../database/schema/links";
import { useDrizzle } from "../../utils/drizzle";
import { defineEventHandler, readBody, getRouterParam } from "h3";

export default defineEventHandler(async event => {
    const db = useDrizzle()
    const body = await readBody(event)
    const slug = getRouterParam(event, 'slug');

    console.log(
        `Updating link with slug: ${slug} with data: ${JSON.stringify(body)}`
    );

    await db.update(links)
        .set({ title: body.title, url: body.url })
        .where(eq(links.slug, slug))
        .returning({ updatedId: links.slug });
    return { body }
});