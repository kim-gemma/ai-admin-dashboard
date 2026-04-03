package com.example.backend.config;

import com.example.backend.websocket.AuthWebSocketHandler;
import com.example.backend.websocket.UserWebSocketHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final AuthWebSocketHandler authWebSocketHandler;
    private final UserWebSocketHandler userWebSocketHandler;

    public WebSocketConfig(AuthWebSocketHandler authWebSocketHandler,
                           UserWebSocketHandler userWebSocketHandler) {
        this.authWebSocketHandler = authWebSocketHandler;
        this.userWebSocketHandler = userWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(authWebSocketHandler, "/ws/auth")
                .setAllowedOrigins("http://localhost:5173");

        registry.addHandler(userWebSocketHandler, "/ws/users")
                .setAllowedOrigins("http://localhost:5173");
    }
}
