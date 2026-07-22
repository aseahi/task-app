import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./TaskList.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");

  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tasks");
      setTasks(Array.isArray(response.data) ? response.data : []);
      setMessage("");
    } catch (error) {
      console.error("タスク取得失敗:", error);
      setMessage("タスクの読み込みに失敗しました。");
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await axios.put(
        `http://localhost:8080/api/tasks/${task.id}`,
        updatedTask,
      );
      fetchTasks();
    } catch (error) {
      console.error("更新失敗:", error);
      alert("更新に失敗しました。");
    }
  };

  const confirmDelete = (id) => {
    setDeleteTargetId(id);
  };

  const executeDelete = async () => {
    if (deleteTargetId === null) return;
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${deleteTargetId}`);
      setDeleteTargetId(null);
      fetchTasks();
    } catch (error) {
      console.error("削除失敗:", error);
      alert("削除に失敗しました。");
    }
  };

  const cancelDelete = () => {
    setDeleteTargetId(null);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="task-list-page">
      <h1>タスク一覧</h1>

      {message && <p style={{ color: "red" }}>{message}</p>}

      <div className="button-group">
        <Link to="/tasks/new">
          <button>タスク追加</button>
        </Link>
        <button onClick={handleLogout}>ログアウト</button>
      </div>

      {deleteTargetId !== null && (
        <div
          style={{
            margin: "15px auto",
            maxWidth: "400px",
            padding: "12px",
            color: "red",
            border: "1px solid red",
            backgroundColor: "#fff5f5",
            fontSize: "14px",
            textAlign: "center",
            borderRadius: "4px",
          }}
        >
          <div>⚠️ 本当にこのタスクを削除しますか？</div>
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={executeDelete}
              style={{
                marginRight: "10px",
                padding: "5px 15px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              はい
            </button>
            <button
              onClick={cancelDelete}
              style={{
                padding: "5px 15px",
                backgroundColor: "#ccc",
                color: "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              いいえ
            </button>
          </div>
        </div>
      )}

      <table className="task-table">
        <thead>
          <tr>
            <th>完了</th>
            <th>タスク名</th>
            <th>編集/削除</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                <input
                  type="checkbox"
                  checked={task.completed || false}
                  onChange={() => handleToggleComplete(task)}
                />
              </td>
              <td>{task.title}</td>
              <td>
                <Link to={`/tasks/${task.id}`}>
                  <button>詳細/編集</button>
                </Link>

                <button onClick={() => confirmDelete(task.id)}>削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
