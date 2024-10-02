import { Nexios } from "nexios-http";
import { NexiosOptions } from "nexios-http/types/interfaces";
// https://cook-storia-culinary-backend-project.vercel.app/api/v1
// `http://localhost:5000/api/v1`
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

// // Add request interceptor
// nexiosInstance.interceptors.request.use((config) => {
//   const accessToken = cookies().get("accessToken")?.value;

//   if (accessToken) {
//     config.headers = {
//       ...config.headers,
//       Authorization: `Bearer ${accessToken}`,
//     };
//   }

//   return config;
// });

// // Add response interceptor
// nexiosInstance.interceptors.response.use((response) => {
//   // Transform response data if needed
//   return response;
// });

// export default nexiosInstance;
