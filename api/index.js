import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();
const scoresRef = admin.firestore().collection("scores");
const getHighScores = scoresRef.orderBy("score", "desc").limit(25).get();

export default async function handler(req, res) {
  if (req.method === "GET") {
    getHighScores
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return res.status(200).json(data);
      })
      .catch((error) => {
        console.log(error);
        return res.status(404).json(error);
      });
  }

  if (req.method === "POST") {
    const submission = JSON.parse(req.body);
    console.log(submission.name);
    scoresRef
      .add({
        name: submission.name,
        score: submission.score,
      })
      .then(() => {
        const getNewHighScores = scoresRef
          .orderBy("score", "desc")
          .limit(25)
          .get();
        getNewHighScores.then((snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          return res.status(200).json(data);
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(404).json(error);
      });
    return res.status(200);
  }
}
