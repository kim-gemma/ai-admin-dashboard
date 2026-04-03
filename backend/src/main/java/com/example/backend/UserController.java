package com.example.backend;

// [변경됨] HTTP REST → WebSocket 방식으로 전환
// 기존 POST /api/users 엔드포인트는 WebSocket /ws/users 로 대체되었습니다.
// UserWebSocketHandler 를 참고하세요.
//   action: "addUser"  → 사용자 추가
//   action: "getUsers" → 사용자 목록 조회

// @RestController
// @RequestMapping("/api/users")
// @CrossOrigin(origins = "http://localhost:5173")
// public class UserController {
//     @PostMapping
//     public Map<String, Object> addUser(@RequestBody Map<String, Object> user) {
//         user.put("id", new Random().nextInt(1000));
//         return user;
//     }
// }
