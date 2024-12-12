import { tags } from "../../database/schema";
import { useDrizzle } from "../../utils/drizzle";

export default defineEventHandler(async event => {
    const db = useDrizzle();
    const body = await readBody(event);

    console.log(body);

    try {
        const results = await db.insert(tags).values({
            id: body.id,
            name: body.name,
            color: body.color
        }).returning();

        return { body };
    } catch (error) {
        console.error("Error inserting tag:", error);
        return { error: "Failed to insert tag" };
    }
});