import { connectToDB } from '@/utils/database';
import City from '@/models/city';

export const DELETE = async (req, { params }) => {
  console.log('DELETE', params.id);
  try {
    await connectToDB();
    await City.findByIdAndRemove(params.id);
    return new Response('City deleted successfully', { status: 200 });
  } catch (err) {
    return new Response('Failed to delete City', { status: 500 });
  }
};
