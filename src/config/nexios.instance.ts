// "use server"

import { Nexios } from "nexios-http";
import { NexiosOptions } from "nexios-http/types/interfaces";

//`https://cook-storia-culinary-backend-project.vercel.app/api/v1`
//`http://localhost:5000/api/v1`
const defaultConfig: NexiosOptions = {
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  credentials: "include",
  timeout: 10000,
};

const nexiosInstance = new Nexios(defaultConfig);

export default nexiosInstance;
