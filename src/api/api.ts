import axios from "axios";

export type ApiResponse<T = unknown> = {
  code: number;
  data: T;
  error: null | string;
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
