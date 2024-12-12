import { tags } from "~/database/schema";
import { useDrizzle } from "../../utils/drizzle";
import { eventHandler } from "h3";

export default eventHandler(async (event) => {
    const db = useDrizzle();
    const delRes = await db.delete(tags);
    return delRes;
})