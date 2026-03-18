// src/api/auth.ts
import axios from "axios";

export const createUser = async (user:any) => {
  const res= await axios.post("http://localhost:8082/api/users", user);
  return res.data;
}