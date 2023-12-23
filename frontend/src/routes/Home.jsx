import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
	const [happenings, setHappenings] = useState([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(`http://127.0.0.1:3500/events`);
				const json = await response.json();
				console.log(json);
				setHappenings(json.data);
			} catch (e) {
				console.error(e);
			}
		}

		fetchData();
	}, []);

	return (
		<>
		<Header/>

			<div className="flex">
				{happenings.map((happening) => {
					return (
						<div
							key={happening._id}
							className="max-w-sm bg-white border border-gray-200 rounded-lg shadow"
						>
							<Link to={`/events/${happening._id}`}>
								<img
									className="rounded-t-lg"
									src="http://127.0.0.1:3500/img/thumbnails/thumb1.jpg"
									alt=""
								/>
							</Link>
							<div className="p-5">
								<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-90">
									{happening.title}
								</h5>

								<p className="mb-3 font-normal text-gray-70">
									{happening.description}
								</p>

								<p className="text-sm text-gray-500"> {happening.place}, {happening.city}</p>

								<p className="mb-3 font-normal text-gray-70">
									{happening.startsAt}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}
