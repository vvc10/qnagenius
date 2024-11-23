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
  } catch (error) {
    console.error('Error fetching projects:', error);
    
    // Additional logging to get more insights into the error
    if (error instanceof Error) {
      console.error('Error Message:', error.message);
      console.error('Error Stack:', error.stack);
    }

    return res.status(500).json({ success: false, message: 'Error fetching projects', error: error.message });
  }
}
