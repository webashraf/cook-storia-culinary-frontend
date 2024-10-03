import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IUser {
  name: string;
  email: string;
  id: string;
  profilePicture?: string;
  role: string;
}
