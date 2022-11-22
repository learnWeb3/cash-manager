import { Outlet } from "react-router-dom";

import Sidebar from '../components/sidebar/Sidebar';

type TProtectedRoute = {
	requireAuth: boolean,
	requireAdmin?: boolean, 
	redirectPath?: String
};

const ProtectedRoute = ({ requireAuth, requireAdmin = false, redirectPath = '/login' }: TProtectedRoute) => {
    // const connected = useSelector(state => state.session.isConnected);
    // const userData = useSelector(state => state.session.userData);

    // if (!(connected === requireAuth)) {
        // console.log("YOUR ARE NOT CONECTED", connected, requireAuth);
        // return <Navigate to={redirectPath} replace />;
    // }

    return (
		<>
			{/* { connected && <ClientSockets/>} */}
			{/* { requireAdmin && userData && userData.role != "ADMIN" && <Navigate to={redirectPath} replace /> } */}
			{ requireAuth && <Sidebar />}
			<Outlet/>
		</>
	)
};

export default ProtectedRoute;