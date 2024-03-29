import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import { Dashboard } from "../pages/dashboard";
import { UsersView, ProfileView } from "../pages/users";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Products from "../pages/products/Products";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute requireAuth={true} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UsersView />} />
          <Route path="/users/:userId" element={<ProfileView />} />
		  <Route path="/products" element={<Products />} />
        </Route>

        <Route
          element={
            <ProtectedRoute requireAuth={false} redirectPath={"dashboard"} />
          }
        >
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Error Handler */}
        <Route path="*" element={<Navigate to={"/login"} replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
