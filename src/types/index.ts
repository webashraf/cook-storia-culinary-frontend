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


export interface IRecipeFormData {
  title: string;
  ingredients: string[];
  cookingTime: number;
  preparationTime: number;
  categories: string[];
  tags: string[];
  dietaryRestrictions: string[];
  cuisine: string;
  instructions: string;
  image: string;
  servings: number;
  nutritionFacts: {
    calories: number | any;
    protein: number;
    fat: number;
    carbohydrates: number;
  };
}