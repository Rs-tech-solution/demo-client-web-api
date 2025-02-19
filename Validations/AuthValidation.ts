export const guestAuthSchema = {
  name: { type: 'string' },
  phoneNumber: { type: 'string', convert: true },
  email: { type: 'string', optional: true },
};

export const verifyOtpSchema = {
  phoneNumber: { type: 'string', convert: true },
  otp: { type: 'string', convert: true },
};

export const loginSchema = { phoneNumber: { type: 'string', convert: true } };

export const firebaseTokenSchema = { idToken: { type: 'string' } };
