package com.example.backend;

// [변경됨] HTTP REST → WebSocket 방식으로 전환
// 기존 POST /api/login 엔드포인트는 WebSocket /ws/auth 로 대체되었습니다.
// AuthWebSocketHandler 를 참고하세요.

// @RestController
// @RequestMapping("/api")
// @CrossOrigin(origins = "http://localhost:5173")
// public class AuthController {
//     @PostMapping("/login")
//     public String login() {
//         return "ok";
//     }
// }
