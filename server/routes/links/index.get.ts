import { eventHandler } from 'h3';
import { useDrizzle } from '../../utils/drizzle';

export default eventHandler(async (event) => {
  const db = useDrizzle();

  try {
    const results = await db.query.links.findMany();
    if (results.length === 0) {
      return {
        status: 204,
        body: null,
      }
    }
    return {
      status: 200,
      body: results,
    }
  } catch (error) {
    console.error('error fetching links', error);
    return {
      "status": 500,
      "message": "Internal Server Error"
    };
  }

});
