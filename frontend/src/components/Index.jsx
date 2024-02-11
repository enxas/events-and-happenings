import { useEffect, useState } from "react"
import { getEvents } from "../api/happening"
import { Container } from "react-bootstrap"
import "./Index.scss"
import { Link } from "react-router-dom"

export default function Index() {
	const [happenings, setHappenings] = useState([])

	useEffect(() => {
		async function init() {
			const happeningsRes = await getEvents()
			setHappenings(happeningsRes.data)
		}

		init()
	}, [])

	return (
		<Container className="d-flex py-3">
			{happenings.map((happening) => (
				<article
					key={happening._id}
					className="event-card mb-2 shadow mb-5 rounded"
				>
					<Link to={`/happenings/${happening._id}`}>
						<img src={happening.thumbnail} />
					</Link>

					<div className="p-3">
						<h3>{happening.title}</h3>
						<p>
							<small>
								{happening.place}, {happening.city}
							</small>
						</p>
						<hr />
						<p className="m-0">{happening.startsAt}</p>
					</div>
				</article>
			))}
		</Container>
	)
}
