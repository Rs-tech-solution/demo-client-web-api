import twillio from 'twilio';

const { Twilio } = twillio;

const twilioClient = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

type smsParamType = {
  body: string;
  phoneNumber: string;
};

export const SendSMS = async (param: smsParamType) => {
  return await twilioClient.messages.create({
    body: param.body,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: param.phoneNumber,
  });
};
