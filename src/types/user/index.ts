import { PaymentStatus } from "..";

export interface ILogInUser {
  name: string;
  email: string;
  exp: number;
  iat: number;
  id: string;
  isPremium?: boolean;
  paymentStatus?: PaymentStatus;
  photo: string;
  role: "user" | "admin";
}

export interface IUser {
  _id: string;
  email: string;
  isDeleted: boolean;
  isPremium: boolean;
  needsPasswordChange: boolean;
  paymentStatus?: {
    amount: number;
    success: boolean;
    transaction: string;
  };
  profilePicture: string;
  role: string;
  status: string;
  username: string;
  __v?: number;
}

export interface IUserFormInfo {
  username: string;
  email: string;
  id: string;
  password: string;
  profilePicture: string;
}
