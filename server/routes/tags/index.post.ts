import { tags } from "../../database/schema";
import { useDrizzle } from "../../utils/drizzle";

export default defineEventHandler(async event => {
    const db = useDrizzle();
    const body = await readBody(event);

    console.log(body);

    try {
        const res = await db.insert(tags).values(body).returning();

        return {
            status: 201,
            body: res,
        }
    } catch (error) {
        console.error("Error inserting tag:", error);
        return { error: "Failed to insert tag" };
    }
});