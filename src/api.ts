import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import dotenv from "dotenv";

dotenv.config();

type RequestBody = {
  [key: string]: any;
};

const api = (body: RequestBody): Promise<AxiosResponse<any>> =>
  axios.post(`${process.env.WTP_URL}`, body, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
      "Content-Type": "application/json",
    },
  });

export default api;
