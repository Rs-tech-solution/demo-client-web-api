import admin from 'firebase-admin';
import serviceAccount from '../serviceAccountKey.json' with { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: 'https://ngo-site-builder.firebaseio.com',
});

type otpParamType = {
  uniqueId: string;
  payload: Object;
};

export const generateIdToken = async (param: otpParamType) => {
  try {
    const verification = await admin
      .auth()
      .createCustomToken(param.uniqueId, param.payload);

    return verification;
  } catch (error) {
    throw error;
  }
};

export const verifyIdToken = async (idToken: string) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    return decodedToken;
  } catch (error) {
    throw error;
  }
};
