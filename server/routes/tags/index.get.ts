import { defineEventHandler } from "h3";
import { useDrizzle } from "../../utils/drizzle";

export default defineEventHandler(async event => {
    const db = useDrizzle()
    try {
        const results = await db.query.tags.findMany();
        return { tags: results };
    } catch (error) {
        console.error('error fetching tags', error);
        return {
            status: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
});
