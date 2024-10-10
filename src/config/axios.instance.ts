import { Nexios } from "nexios-http";
import { NexiosOptions } from "nexios-http/types/interfaces";
// `https://cook-storia-culinary-backend-project.vercel.app/api/v1`
//
const defaultConfig: NexiosOptions = {
  baseURL: `http://localhost:5000/api/v1`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  credentials: "include",
  timeout: 10000,
};

export const nexiosInstance = new Nexios(defaultConfig);
