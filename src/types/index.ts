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

export interface IOpinions {
  _id?: string;
  postId: string;
  userId: string;
  comments?: string;
  rate?: number;
  upVote?: number;
  downVote?: number;
  createdAt?: string;
}

export interface IUserPopulates {
  _id: string;
  email: string;
  isDeleted: boolean;
  isPremium: boolean;
  needsPasswordChange: boolean;
  paymentStatus: {
    success: boolean;
    transaction: string;
    amount: number;
  };
  profilePicture: string;
  role: "user" | "admin";
  status: "active" | "block";
  username: string;
  __v: number;
}

export interface IStoryReels {
  _id: string;
  user: IUserPopulates;
  images: Array<string>;
  description: string;
  createdAt: string;
  updatedAt: string;
  isDelete: boolean;
}

export interface ICarouselProps {
  _id: string;
  user: IUserPopulates;
  images: [
    {
      url: string;
      type: string;
      duration: number;
    },
  ];
  description: string;
  createdAt: string;
  updatedAt: string;
  isDelete: boolean;
}
