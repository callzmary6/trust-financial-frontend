export type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  refferalCode?: string;
};

export type LoginData = {
  email: string;
  password: string;
};


export type ForgotPasswordData = {
  email: string;
}

export type OtpData = {
  otpCode: string;
}

export type ChangePassword = {
  newPassword: string;
  confirmPassword: string;
}