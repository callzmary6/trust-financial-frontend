export type QuoteData = {
  fullName: string;
  email: string;
  phoneNumber: number;
  countryDialCode: number | string;
  countryName: string;
  password: string | number;
  flightFrequency: number;
  referralPlatform: string;
  termsAndConditionAccepted: boolean;
  otpReference?: string;
};

export type LoginData = {
  email: string;
  password: string;
};
