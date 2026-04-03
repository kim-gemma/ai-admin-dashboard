package com.example.backend.websocket;

import com.google.gson.Gson;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;

/**
 * WebSocket 핸들러 — /ws/auth
 *
 * 메시지 형식 (JSON):
 *   요청: { "action": "login" }
 *   응답: { "status": "ok", "message": "로그인 성공" }
 *         { "status": "error", "message": "..." }
 */
@Component
public class AuthWebSocketHandler extends TextWebSocketHandler {

    private final Gson gson = new Gson();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        System.out.println("[Auth WS] 연결됨: " + session.getId());
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        System.out.println("[Auth WS] 수신: " + payload);

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> request = gson.fromJson(payload, Map.class);
            String action = (String) request.get("action");

            if ("login".equals(action)) {
                Map<String, String> response = Map.of(
                        "status", "ok",
                        "message", "로그인 성공"
                );
                session.sendMessage(new TextMessage(gson.toJson(response)));
            } else {
                Map<String, String> response = Map.of(
                        "status", "error",
                        "message", "알 수 없는 action: " + action
                );
                session.sendMessage(new TextMessage(gson.toJson(response)));
            }
        } catch (Exception e) {
            Map<String, String> response = Map.of(
                    "status", "error",
                    "message", "잘못된 요청 형식입니다."
            );
            session.sendMessage(new TextMessage(gson.toJson(response)));
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("[Auth WS] 연결 종료: " + session.getId() + " / " + status);
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        System.err.println("[Auth WS] 오류: " + exception.getMessage());
        session.close(CloseStatus.SERVER_ERROR);
    }
}
