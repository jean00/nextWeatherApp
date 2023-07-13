import { connectToDB } from '@/utils/database';
import City from '@/models/city';

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const cities = await City.find({ creator: params.id }).populate('creator');
    return new Response(JSON.stringify(cities), { status: 200 });
  } catch (err) {
    return new Response('Failed to fetch all cities', { status: 500 });
  }
};
