// src/api/auth.ts
import axios from "axios";

export const login = async () => {
  const res = await axios.post("http://localhost:8082/api/login");
  return res.data;
};