export type VerifyOtpResponseType = {
  user: AuthVerifyType | {};
  token: string;
};

export type SendOtpResponseType = {
  success: Boolean;
};

export type AuthVerifyType = {
  phoneNumber: string;
  imageSrc: string;
  name: string;
  id: number;
  isGuest: boolean;
  roles: string[] | [];
};

export type VerifyOtpType = { phoneNumber: string; otp: string };

export type UserAuthType = {
  phoneNumber: string;
  email: string;
  name: string;
  isGuest: boolean;
};

export type GuestAuthType = {
  phoneNumber: string;
  email: string;
  name: string;
};

export type UserPayloadType = {
  id: number;
  roles: string[];
};
