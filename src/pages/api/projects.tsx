import type { NextApiRequest, NextApiResponse } from 'next';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../app/db/firebase.config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const projectsCollection = collection(db, 'projects'); // Ensure 'projects' is your Firestore collection name
    const snapshot = await getDocs(projectsCollection);

    if (snapshot.empty) {
      return res.status(404).json({ success: false, message: 'No projects found' });
    }

    const projects = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({ success: true, data: projects });
  } catch (error: unknown) {
    console.error('Error fetching projects:', error);

    // Type guard to check if error is an instance of Error
    if (error instanceof Error) {
      console.error('Error Message:', error.message);
      console.error('Error Stack:', error.stack);
      return res.status(500).json({ success: false, message: 'Error fetching projects', error: error.message });
    }

    // Handle case where error is not an instance of Error
    return res.status(500).json({ success: false, message: 'Unknown error occurred' });
  }
}
