import { connectToDB } from '@/utils/database';
import City from '@/models/city';

export const POST = async (req, res) => {
  const { userId, name, country } = await req.json();
  try {
    if (await City.findOne({ name: name, country: country })) {
      return new Response('Failed to save the city', { status: 409 });
    }
    await connectToDB();
    const newCity = new City({ creator: userId, name, country });
    await newCity.save();
    return new Response(JSON.stringify(newCity), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response('Failed to save the city', { status: 500 });
  }
};
