// "use server"

import { Nexios } from "nexios-http";
import { NexiosOptions } from "nexios-http/types/interfaces";

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
