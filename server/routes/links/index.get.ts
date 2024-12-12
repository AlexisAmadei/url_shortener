import { eventHandler } from 'h3';
import { useDrizzle } from '../../utils/drizzle';

export default eventHandler(async (event) => {
  const db = useDrizzle();
  try {
    const results = await db.query.links.findMany()
    return results;
  } catch (error) {
    console.error('error fetching links', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
});
