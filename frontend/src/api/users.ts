// src/api/users.ts — WebSocket 기반 사용자 API
import { sendWsMessage } from "./socket";

const WS_USERS_URL = "ws://localhost:8082/ws/users";

export interface UserItem {
  id: number;
  name: string;
  email: string;
}

interface AddUserResponse {
  status: string;
  action: string;
  user: UserItem;
}

interface GetUsersResponse {
  status: string;
  action: string;
  users: UserItem[];
}

/** 사용자 추가 */
export const createUser = (user: { name: string; email: string }): Promise<UserItem> =>
  sendWsMessage<AddUserResponse>(WS_USERS_URL, {
    action: "addUser",
    ...user,
  }).then((res) => res.user);

/** 사용자 목록 조회 */
export const getUsers = (): Promise<UserItem[]> =>
  sendWsMessage<GetUsersResponse>(WS_USERS_URL, {
    action: "getUsers",
  }).then((res) => res.users);
