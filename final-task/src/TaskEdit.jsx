import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./TaskEdit.css";

function TaskEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/tasks/${id}`)
      .then((res) => {
        setTask(res.data);
      })
      .catch(() => setErrorMessage("タスク情報の取得に失敗しました"));
  }, [id]);

  const handleUpdate = () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!task.title || !task.title.trim()) {
      setErrorMessage("タイトルは必須です。");
      return;
    }

    axios
      .put(`http://localhost:8080/api/tasks/${id}`, task)
      .then(() => {
        setSuccessMessage("更新が完了しました！");

        setTimeout(() => {
          navigate("/tasks");
        }, 1500);
      })
      .catch(() => {
        setErrorMessage("更新に失敗しました。");
      });
  };

  if (!task) return <div>読み込み中...</div>;

  return (
    <div className="task-edit-page">
      <h1>タスク詳細/編集</h1>

      <div className="content-box">
        <div className="header-row">
          <h2>タスク詳細/編集</h2>
          <button onClick={() => navigate("/tasks")}>← 一覧へ戻る</button>
        </div>

        <div className="input-group">
          <label>タイトル</label>
          <input
            type="text"
            value={task.title || ""}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            maxLength={50}
          />
          <div className="char-count">{task.title?.length || 0} / 50</div>
        </div>

        <div className="input-group">
          <label>タスクメモ</label>
          <textarea
            value={task.taskMemo || ""}
            onChange={(e) => setTask({ ...task, taskMemo: e.target.value })}
            maxLength={200}
          />
          <div className="char-count">{task.taskMemo?.length || 0} / 200</div>
        </div>

        <div className="button-center">
          <button onClick={handleUpdate}>更新</button>
        </div>

        {successMessage && (
          <div
            style={{
              marginTop: "15px",
              padding: "8px",
              color: "green",
              border: "1px solid green",
              backgroundColor: "#f0fff0",
              fontSize: "12px",
              textAlign: "center",
              borderRadius: "4px",
            }}
          >
            ✔ {successMessage}
          </div>
        )}

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
          <p
            onClick={() => navigate("/tasks")}
            style={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline",
            }}
          >
            変更を破棄して戻る
          </p>
        </div>
      </div>
    </div>
  );
}

export default TaskEdit;
