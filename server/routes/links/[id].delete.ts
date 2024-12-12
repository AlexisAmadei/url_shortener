import { eq } from "drizzle-orm";
import { links } from "../../database/schema";
import { useDrizzle } from "../../utils/drizzle";

export default defineEventHandler(async (event) => {
    const db = useDrizzle();
    const id = getRouterParam(event, 'id');

    await db.delete(links).where(eq(links.id, id)).execute();

    return {
        "status": 204,
        "message": "Link deleted successfully."
    };
});