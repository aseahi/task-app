import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMessage("");

    if (!userId.trim() || !password.trim()) {
      setErrorMessage("ユーザーID、パスワードは必須項目です。");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/login", {
        userId: userId,
        password: password,
      });

      localStorage.setItem("isLoggedIn", "true");
      navigate("/tasks");
    } catch (error) {
      setErrorMessage("ユーザーIDまたはパスワードが正しくありません");
    }
  };

  return (
    <div className="login-page">
      <h1 className="main-title">まいにちタスク管理</h1>

      <div className="login-box">
        <h2>ログイン</h2>
        <div className="input-group">
          <label>ユーザーID</label>
          <input
            type="text"
            placeholder="ユーザーID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>パスワード</label>
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button" onClick={handleLogin}>
          ログイン
        </button>

        {errorMessage && (
          <div
            style={{
              marginTop: "15px",
              padding: "8px",
              color: "red",
              border: "1px solid red",
              backgroundColor: "#fff5f5",
              fontSize: "12px",
              textAlign: "center",
              borderRadius: "4px",
            }}
          >
            ⚠️ {errorMessage}
          </div>
        )}
      </div>

      <Link to="/tasks" className="task-link">
        タスク一覧へ
      </Link>
    </div>
  );
}

export default Login;
