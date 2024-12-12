import { defineEventHandler, readBody, createError } from "h3";
import { links } from "../../database/schema";
import { db } from "../../database";
import generateSlug from "~/utils/generateSlug";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (body.url && body.title) {
            const slug = generateSlug(body.title);
            await db.insert(links).values({ slug, url: body.url, title: body.title }).execute();
            return {
                statusCode: 201,
                body: JSON.stringify({
                    message: "Link added successfully",
                    link: { slug, url: body.url, title: body.title },
                }),
            };
        } else {
            throw createError({
                statusCode: 400,
                message: "Invalid input",
            });
        }
    } catch (error: any) {
        if (error.code === "23505") {
            return {
                statusCode: 409,
                body: JSON.stringify({
                    message: `A link with the same slug already exists.`,
                    detail: error.detail,
                }),
            };
        }
        console.error("Unexpected error:", error);
        throw createError({
            statusCode: 500,
            message: "Internal server error",
        });
    }
});
