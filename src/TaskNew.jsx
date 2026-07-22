import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./TaskNew.css";

function TaskNew() {
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSave = async () => {
    setErrorMessage("");

    if (!title.trim()) {
      setErrorMessage("タイトルは必須です。");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/tasks", {
        title,
        taskMemo: memo,
      });
      navigate("/tasks");
    } catch (error) {
      console.error("登録失敗:", error);

      setErrorMessage("登録に失敗しました。");
    }
  };

  return (
    <div className="task-new-page">
      <h1>タスク新規追加</h1>

      <div className="content-box">
        <div className="header-row">
          <h2>タスク新規追加</h2>
          <Link to="/tasks">
            <button>← 一覧へ戻る</button>
          </Link>
        </div>

        <div className="input-group">
          <label>タイトル</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
          />
          <div className="char-count">{title.length} / 50</div>
        </div>

        <div className="input-group">
          <label>タイトル（メモ欄）</label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            maxLength={200}
          />
          <div className="char-count">{memo.length} / 200</div>
        </div>

        <button className="save-button" onClick={handleSave}>
          登録
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

        <div className="back-link">
          <Link to="/tasks">変更を破棄して戻る</Link>
        </div>
      </div>
    </div>
  );
}

export default TaskNew;
