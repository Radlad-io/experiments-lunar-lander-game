import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    })
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  console.log(req.body)
  const score = await db.collection('scores').doc('kevin_merinsky').get();

  if (!score.exists) {
    return res.status(404).json({});
  }

  return res.status(200).json({ id: score.id, ...score.data() });
}