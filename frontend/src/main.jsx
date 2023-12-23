import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/Root";
import Home from "./routes/Home";
import "./index.css";

import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import Happening from "./routes/Happening";
import Login from "./routes/Login";
import Register from "./routes/Register";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />}>
			<Route index element={<Home />} />
			<Route path="/events/:id" element={<Happening />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Route>
		
		
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
