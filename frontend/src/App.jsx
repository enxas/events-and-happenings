import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Missing from "./components/Missing"
import Login from "./components/Login"
import Register from "./components/Register"
import Unauthorized from "./components/Unauthorized"
import Home from "./components/Home"
import PersistLogin from "./components/PersistLogin"
import RequireAuth from "./components/RequireAuth"
import ACCOUNT_ROLES from "./config/accountRoles"
import Index from "./components/Index"
import HappeningCreateUpdate from "./components/HappeningCreateUpdate"

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{/* public routes */}
				<Route index element={<Index />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route path="unauthorized" element={<Unauthorized />} />

				{/* we want to protect these routes */}
				<Route element={<PersistLogin />}>
					<Route element={<RequireAuth allowedRoles={[ACCOUNT_ROLES.User]} />}>
						<Route path="home" element={<Home />} />
					</Route>
					<Route element={<RequireAuth allowedRoles={[ACCOUNT_ROLES.User, ACCOUNT_ROLES.Admin]} />}>
						<Route path="/happenings/create" element={<HappeningCreateUpdate />} />
					</Route>
				</Route>

				{/* catch all */}
				<Route path="*" element={<Missing />} />
			</Route>
		</Routes>
	)
}

export default App
