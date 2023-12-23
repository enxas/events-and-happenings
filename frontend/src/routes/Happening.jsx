import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Happening() {

	const [happening, setHappening] = useState(null);
	let { id } = useParams();

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(`http://127.0.0.1:3500/events/${id}`);
				const json = await response.json();
				console.log(json);
				setHappening(json);
			} catch (e) {
				console.error(e);
			}
		}

		fetchData();
	}, [id]);

  return (
	<>
	{happening && (<div>
		<h2>{happening.title}</h2>
	</div>)}
	</>
	
  )
}
