import { connectToDatabase } from '@/lib/database';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Attempting to connect to MongoDB...'); // Log before connecting

  try {
    await connectToDatabase();
    console.log('MongoDB connection successful'); // Log if connection is successful
    res.status(200).json({ message: 'MongoDB connected successfully!' });
  } catch (error) {
    console.error('MongoDB connection failed:', error); // Log the error if connection fails

    // Assert that error is an instance of Error
    const err = error as Error;
    res.status(500).json({ message: 'Failed to connect to MongoDB', error: err.message });
  }
}