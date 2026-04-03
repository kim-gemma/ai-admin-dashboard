import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login();          // WebSocket /ws/auth
      console.log("ws res ====", res);
      if (res.status === "ok") {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <button onClick={handleLogin}>로그인</button>
  );
}

export default Login;
