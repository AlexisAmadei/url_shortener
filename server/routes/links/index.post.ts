import { defineEventHandler, readBody, createError } from "h3";
import { links } from "../../database/schema";
import { db } from "../../database";
import generateSlug from "~/utils/generateSlug";
// import { z } from "zod";
// import { customAlphabet } from "nanoid";

// const bodySchema = z.object({
//     url: z.string().url(),
//     title: z.string().optional(),
//     slug: z.string().optional(),
//     maxVisits: z.number().int().optional(),
//     availableAt: z.string().optional(),
//     expiresAt: z.string().optional(),
//     createdAt: z.string().optional(),
//     updatedAt: z.string().optional(),
// })

export default defineEventHandler(async (event) => {
    // const nanoid = customAlphabet('1234567890abcdef', 5);
    //     const body = await readValidatedBody(event, bodySchema.parse);
    //     const slug = body.slug || nanoid();
    //     const res = await db.insert(links).values({
    //         slug: slug,
    //         title: body.title
    //     }).returning();
    try {
        const body = await readBody(event);
        if (body.url && body.title) {
            const slug = body.slug || generateSlug(body.title);
            // fetch tags check differences
            const res = await db.insert(links).values({ slug, url: body.url, title: body.title }).returning();
            setResponseStatus(event, 201);
            return {
                slug: slug,
                url: body.url,
                title: body.title,
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
