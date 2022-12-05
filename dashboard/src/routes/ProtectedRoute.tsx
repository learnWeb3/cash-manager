import { Outlet, Navigate } from "react-router-dom";

import Sidebar from '../components/sidebar/Sidebar';
import { useAppSelector } from "../store/hooks";

type TProtectedRoute = {
	requireAuth: boolean,
	requireAdmin?: boolean, 
	redirectPath?: String
};

const ProtectedRoute = ({ requireAuth, requireAdmin = false, redirectPath = '/login' }: TProtectedRoute) => {
    const session = useAppSelector(state => state.auth);
	const user = useAppSelector(state => state.user.data);

    if (!(session.isLogged === requireAuth))
		return <Navigate to={redirectPath.toString()} replace />;

    return (
		<>
			{/* { connected && <ClientSockets/>} */}
			{ requireAdmin && user && user.role != "ADMIN" && <Navigate to={redirectPath.toString()} replace /> }
			{ requireAuth && <Sidebar />}
			<Outlet/>
		</>
	)
};

export default ProtectedRoute;