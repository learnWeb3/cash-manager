import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

import { Dashboard } from '../pages/dashboard';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';

const AppRouter = () => {

	return (
		<Router>
			<Routes>
				<Route element={<ProtectedRoute requireAuth={true} />}>
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>

				<Route element={<ProtectedRoute requireAuth={false} redirectPath={'dashboard'} />}>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>

				{/* Error Handler */}
				<Route path="*" element={<Navigate to={'/login'} replace />}/>
			</Routes>
		</Router>
  	);
}

export default AppRouter;