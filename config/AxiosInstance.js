import axios from "axios";
import { base_url } from "../utils/variables";
import { useEffect } from "react";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTJhOGVmNGRkYTRlZTI5Y2Y3MzMwOSIsInVzZXJuYW1lIjoic2tpbGx6b19fIiwibmFtZSI6IiIsInByb2ZpbGVfcGljdHVyZSI6IiIsImlhdCI6MTcwNDExMTY0OSwiZXhwIjoxNzA0MTE1MjQ5fQ.GFM7gxIMDZvmWLtevs1YiTGK9WvdEp5dk2Xuzb6w_GM";

export const axiosInstance = axios.create({
  baseURL: base_url,
  timeout: 10000,
  headers: {
    Authorization: `Bearer ${token} `,
  },
});

// const useAxiosPrivate = () => {
//   const refresh = useRefreshToken();
//   const { auth } = useAuth();

//   useEffect(() => {

//       const requestIntercept = axiosPrivate.interceptors.request.use(
//           config => {
//               if (!config.headers['Authorization']) {
//                   config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
//               }
//               return config;
//           }, (error) => Promise.reject(error)
//       );

//       const responseIntercept = axiosPrivate.interceptors.response.use(
//           response => response,
//           async (error) => {
//               const prevRequest = error?.config;
//               if (error?.response?.status === 403 && !prevRequest?.sent) {
//                   prevRequest.sent = true;
//                   const newAccessToken = await refresh();
//                   prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//                   return axiosPrivate(prevRequest);
//               }
//               return Promise.reject(error);
//           }
//       );

//       return () => {
//           axiosPrivate.interceptors.request.eject(requestIntercept);
//           axiosPrivate.interceptors.response.eject(responseIntercept);
//       }
//   }, [auth, refresh])

//   return axiosPrivate;
// }

// export default useAxiosPrivate;
