import { ControllerAction } from '../Helpers/Types.js';
import CustomError from '../Helpers/CustomError.js';
import * as authService from '../Services/AuthService.js';
import {
  GuestAuthType,
  VerifyOtpType,
  VerifyOtpResponseType,
  SendOtpResponseType,
} from '../Models/AuthModel';

export const sendOtpData: ControllerAction<
  { phoneNumber: string },
  SendOtpResponseType
> = async (context) => {
  const { phoneNumber } = context.params;

  return authService.sendOtp(phoneNumber);
};

export const verifyOtpData: ControllerAction<
  VerifyOtpType,
  VerifyOtpResponseType
> = async (context) => {
  const { phoneNumber, otp } = context.params;

  const res = await authService.verifyOtp(phoneNumber, otp);
  if (res.success) {
    const user = await authService.login({
      phoneNumber,
      name: '',
      email: '',
      isGuest: false,
    });

    if (!user) {
      throw new CustomError('Login Failed!', 500);
    }

    const token = await authService.generateJwtToken({
      id: user.id,
      roles: user.roles,
    });

    return { user, token };
  } else {
    throw new CustomError(res.message, 400);
  }
};

export const guestLogin: ControllerAction<
  GuestAuthType,
  VerifyOtpResponseType
> = async (context) => {
  const { phoneNumber, name, email } = context.params;

  const user = await authService.login({
    phoneNumber,
    name,
    email,
    isGuest: true,
  });

  if (!user) {
    throw new CustomError('Login Failed!', 500);
  }

  const token = await authService.generateJwtToken({
    id: user.id,
    roles: user.roles,
  });

  return { user, token };
};

export const getUserByFirebaseToken: ControllerAction<
  { idToken: string },
  VerifyOtpResponseType
> = async (context) => {
  const { idToken } = context.params;

  const user = await authService.getUserByFirebaseToken(idToken);
  if (user) {
    const token = await authService.generateJwtToken({
      id: user.id,
      roles: user.roles,
    });

    return { user, token };
  } else {
    throw new CustomError('Invalid Token!', 400);
  }
};
