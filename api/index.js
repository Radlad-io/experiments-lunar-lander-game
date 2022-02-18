import * as admin from 'firebase-admin';
import Filter from 'bad-words';

var filter = new Filter()

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
const scoresRef = admin.firestore().collection('scores');
const getHighScores = scoresRef
                        .orderBy("score", "desc")
                        .limit(2)
                        .get()

export default async function handler(req, res) {
  if(req.method === 'GET'){
    getHighScores.then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error)
      return res.status(404).json(error);
    });
  }

  if(req.method === 'POST'){
    const submission = JSON.parse(req.body)
    console.log(submission.name)
    if(filter.isProfane(submission.name)){
      console.log('firing')
      return res.status(404).json({success: false});
    }
    scoresRef.add({
      name: submission.name,
      score: submission.score
    })
    .then(() => {
      return res.status(200).json({success: true});
    })
    .catch((error) => {
      return res.status(404).json(error);
    })

  }
}