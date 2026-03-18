import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const handleLogin = async()=>{
        try {
            const res=await axios.post("http://localhost:8082/api/login");
            console.log('res====',res.data)
            if (String(res.data).toLowerCase().startsWith("ok")) {
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <button onClick={handleLogin}>로그인</button>
    ); 
}

export default Login;
