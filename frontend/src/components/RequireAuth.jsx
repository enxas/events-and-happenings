import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RequireAuth = ({ allowedRoles }) => {
	const { auth } = useAuth()
	const location = useLocation()

	console.log(auth)

	const hasAllowedRole = auth?.roles?.find((role) =>
		allowedRoles?.includes(role)
	)

	if (hasAllowedRole) {
		return <Outlet />
	} else if (auth?.accessToken) {
		return <Navigate to="/unauthorized" state={{ from: location }} replace />
	} else {
		return <Navigate to="/login" state={{ from: location }} replace />
	}
}

export default RequireAuth
