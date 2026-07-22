import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import TaskList from "./TaskList";
import TaskNew from "./TaskNew";
import TaskEdit from "./TaskEdit";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <TaskList />
            </PrivateRoute>
          }
        />

        <Route
          path="/tasks/new"
          element={
            <PrivateRoute>
              <TaskNew />
            </PrivateRoute>
          }
        />

        <Route
          path="/tasks/:id"
          element={
            <PrivateRoute>
              <TaskEdit />
            </PrivateRoute>
          }
        />

        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
