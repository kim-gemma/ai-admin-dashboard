package com.example.backend.websocket;

import com.google.gson.Gson;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * WebSocket 핸들러 — /ws/users
 *
 * 메시지 형식 (JSON):
 *   요청(사용자 추가): { "action": "addUser", "name": "홍길동", "email": "hong@example.com" }
 *   요청(목록 조회):   { "action": "getUsers" }
 *
 *   응답(addUser):  { "status": "ok", "action": "addUser", "user": { "id": 42, "name": "...", "email": "..." } }
 *   응답(getUsers): { "status": "ok", "action": "getUsers", "users": [...] }
 *   오류:           { "status": "error", "message": "..." }
 */
@Component
public class UserWebSocketHandler extends TextWebSocketHandler {

    private final Gson gson = new Gson();
    private final Random random = new Random();

    // 인메모리 사용자 목록 (DB 연결 전 테스트용)
    private final List<Map<String, Object>> userStore = new CopyOnWriteArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("[User WS] 연결됨: " + session.getId());
    }

    @Override
    @SuppressWarnings("unchecked")
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        System.out.println("[User WS] 수신: " + payload);

        try {
            Map<String, Object> request = gson.fromJson(payload, Map.class);
            String action = (String) request.get("action");

            switch (action != null ? action : "") {

                case "addUser" -> {
                    String name  = (String) request.get("name");
                    String email = (String) request.get("email");

                    Map<String, Object> newUser = Map.of(
                            "id",    random.nextInt(1000),
                            "name",  name  != null ? name  : "",
                            "email", email != null ? email : ""
                    );
                    userStore.add(newUser);

                    Map<String, Object> response = Map.of(
                            "status", "ok",
                            "action", "addUser",
                            "user",   newUser
                    );
                    session.sendMessage(new TextMessage(gson.toJson(response)));
                }

                case "getUsers" -> {
                    Map<String, Object> response = Map.of(
                            "status", "ok",
                            "action", "getUsers",
                            "users",  new ArrayList<>(userStore)
                    );
                    session.sendMessage(new TextMessage(gson.toJson(response)));
                }

                default -> {
                    Map<String, String> response = Map.of(
                            "status",  "error",
                            "message", "알 수 없는 action: " + action
                    );
                    session.sendMessage(new TextMessage(gson.toJson(response)));
                }
            }
        } catch (Exception e) {
            Map<String, String> response = Map.of(
                    "status",  "error",
                    "message", "잘못된 요청 형식입니다."
            );
            session.sendMessage(new TextMessage(gson.toJson(response)));
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("[User WS] 연결 종료: " + session.getId() + " / " + status);
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        System.err.println("[User WS] 오류: " + exception.getMessage());
        session.close(CloseStatus.SERVER_ERROR);
    }
}
