import { Outlet } from "react-router-dom";

export default function Root() {
	return (
		<div className="container">
			<div>Root</div>
			<Outlet />
		</div>
	);
}
