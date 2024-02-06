import { useEffect, useState } from "react"
import { getEvents } from "../api/happening"
import Card from "react-bootstrap/Card"

export default function Index() {
	const [happenings, setHappenings] = useState([])
	useEffect(() => {
		async function init() {
			const happeningsRes = await getEvents()
			setHappenings(happeningsRes.data)
			console.log(happenings)
		}

		init()
	}, [])

	return (
		<div className="d-flex">
			{happenings.map((happening) => (
				<Card
					bg="primary"
					key={happening._id}
					text={"light"}
					style={{ width: "18rem" }}
					className="mb-2"
				>
					<Card.Header>Header</Card.Header>
					<Card.Body>
						<Card.Img src={happening.thumbnail} />
						<Card.Title>{happening.title} </Card.Title>
						<Card.Text>{happening.description}</Card.Text>
					</Card.Body>
				</Card>
			))}
		</div>
	)
}
