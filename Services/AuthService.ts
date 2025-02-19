import jwt from 'jsonwebtoken';
import { ResultSetHeader } from 'mysql2';
import CustomError from '../Helpers/CustomError.js';
import {
  AuthVerifyType,
  UserAuthType,
  UserPayloadType,
} from '../Models/AuthModel';
import { deleteCache, getCache, setCache } from './CacheService.js';
import { executeQuery, executeCommand } from './ConnectionService.js';
import { verifyIdToken } from './FirebaseService.js';
import { SendSMS } from './TwillioService.js';

enum userQuery {
  GetUserByPhone = 'GetUserByPhoneQuery.sql',
  CreateUser = 'CreateUserQuery.sql',
  UpdateUser = 'UpdateUserQuery.sql',
}

export const sendOtp = async (phoneNumber: string) => {
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
  setCache(`otp_${phoneNumber}`, verificationCode);

  try {
    await SendSMS({
      phoneNumber,
      body: `Your verification code is ${verificationCode}`,
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new CustomError('Error sending OTP!', 500);
  }
};

export const verifyOtp = async (phoneNumber: string, otp: string) => {
  try {
    const otpCacheKey = `otp_${phoneNumber}`;
    const cachedVerificationCode = getCache(otpCacheKey);

    if (cachedVerificationCode === otp) {
      deleteCache(otpCacheKey);

      return {
        success: true,
        message: 'OTP verification successful.',
      };
    } else {
      return {
        success: false,
        message: 'Invalid OTP!',
      };
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw new CustomError('Error verifying OTP!', 500);
  }
};

export const login = async (userData: UserAuthType) => {
  let { data } = await executeQuery(userQuery.GetUserByPhone, {
    phoneNumber: userData.phoneNumber,
  });

  let user = (data as AuthVerifyType[])[0];

  if (user && user.id) {
    user.roles = user.isGuest ? ['Guest'] : ['Donor'];
  } else {
    const { data } = await executeCommand(userQuery.CreateUser, userData);
    const res = data as ResultSetHeader;

    user = {
      ...userData,
      id: res.insertId,
      imageSrc: null,
      roles: ['Guest'],
    };
  }

  return user;
};

export const getUserByFirebaseToken = async (idToken: string) => {
  const decodedToken = await verifyIdToken(idToken);

  const userData = {
    phoneNumber: decodedToken?.phone_number,
    name: '',
    email: '',
    isGuest: false,
  };

  if (userData.phoneNumber) {
    let { data } = await executeQuery(userQuery.GetUserByPhone, {
      phoneNumber: userData.phoneNumber,
    });

    let user = (data as AuthVerifyType[])[0];

    if (user && user.id) {
      user.roles = ['Donor'];
    } else {
      const { data } = await executeCommand(userQuery.CreateUser, userData);
      const res = data as ResultSetHeader;

      user = {
        ...userData,
        id: res.insertId,
        imageSrc: null,
        roles: ['Donor'],
      };
    }

    return user;
  }
  return null;
};

export const generateJwtToken = async (userPayload: UserPayloadType) => {
  try {
    const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return token;
  } catch (err) {
    throw err;
  }
};
