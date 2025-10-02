import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useUserStore } from "./store/useUserStore";
import Loader from "./components/Loader";
import RedirectedRoute from "./components/guards/RedirectedRoute";
import ProtectedRoute from "./components/guards/ProtectedRoute";
import Notes from "./pages/Notes";
import ForgetPassword from "./components/ForgetPassword";
import { ResetPassword } from "./pages/ResetPassword";
import Register from "./pages/Register";
import MainLayout from "./components/MainLayout";
import CreateNotePage from "./pages/CreateNote";
import EditNotePage from "./pages/EditNote";
import ProfileShow from "./pages/ProfileShow";
import ProfileEdit from "./pages/ProfileEdit";
const App = () => {
  const { getLoggedInUser, isAuthLoading } = useUserStore();
  useEffect(() => {
    getLoggedInUser();
  }, [isAuthLoading]);

  if (isAuthLoading) return <Loader />;
  return (
    <div className="bg-main">
      <Routes>
        <Route
          path="/login"
          element={
            <RedirectedRoute>
              <Login />
            </RedirectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectedRoute>
              <Register />
            </RedirectedRoute>
          }
        />
        {/* <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/forgot-password"
          element={
            <RedirectedRoute>
              <ForgetPassword />
            </RedirectedRoute>
          }
        />

        <Route
          path="/reset-password/:token"
          element={
            <RedirectedRoute>
              <ResetPassword />
            </RedirectedRoute>
          }
        />

        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />
          <Route
            path="notes"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />
          <Route
            path="create"
            element={
              <ProtectedRoute>
                <CreateNotePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfileShow />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile/edit"
            element={
              <ProtectedRoute>
                <ProfileEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="notes/note/:id"
            element={
              <ProtectedRoute>
                <EditNotePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="logout"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

export default App;
