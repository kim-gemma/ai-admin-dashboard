// src/api/auth.ts — WebSocket 기반 로그인
import { sendWsMessage } from "./socket";

interface LoginResponse {
  status: string;
  message: string;
}

const WS_AUTH_URL = "ws://localhost:8082/ws/auth";

export const login = (): Promise<LoginResponse> =>
  sendWsMessage<LoginResponse>(WS_AUTH_URL, { action: "login" });
