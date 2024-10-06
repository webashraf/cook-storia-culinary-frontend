import { SVGProps } from "react";

// eslint-disable-next-line no-undef
export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

interface PaymentStatus {
  amount: number;
  success: boolean;
  transaction: string;
  date: string;
}

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
