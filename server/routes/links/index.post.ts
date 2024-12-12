import { defineEventHandler, readBody, createError } from "h3";
import { links } from "../../database/schema";
import { db } from "../../database";
import generateSlug from "~/utils/generateSlug";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);

        if (body.url && body.title) {
            const slug = generateSlug(body.title);
            const res = await db.insert(links).values({ slug, url: body.url, title: body.title }).returning();
            return {
                status: 201,
                body: res,
            };
        } else {
            throw createError({
                status: 400,
                message: "Invalid request body. URL and title are required.",
            });
        }
    } catch (error: any) {
        if (error.code === "23505") {
            return {
                "status": 409,
                "message": "A link with the same slug already exists."
            };
        }
        console.error("Unexpected error:", error);
        throw createError({
            status: 500,
            message: "Internal server error",
        });
    }
});
