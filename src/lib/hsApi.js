import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HS_API_URL || "https://horsesuite-27558.nodechef.com/api",
});

export default api;
