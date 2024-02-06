import { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { createHappening } from "../api/happening"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { Container } from "react-bootstrap"

export default function HappeningCreateUpdate() {
	const [formData, setFormData] = useState()
	const axiosPrivate = useAxiosPrivate()

	async function handleSubmit(e) {
		e.preventDefault()
		const createRes = await createHappening(
			axiosPrivate,
			formData.title,
			formData.description,
			formData.place,
			formData.city,
			formData.address,
			formData.startsAt,
			formData.thumbnail,
		)
		console.log(createRes)
	}

	function handleChanged(e) {
		setFormData((oldValue) => ({
			...oldValue,
			[e.target.name]: e.target.value,
		}))
	}

	function handleFileChange(e) {
		if (e.target.files) {
			setFormData((oldValue) => ({
				...oldValue,
				[e.target.name]: e.target.files[0],
			}))
		}
	}

	return (
		<Container>
			<h2>Create new Happening</h2>

			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3">
					<Form.Label>Title</Form.Label>
					<Form.Control
						name="title"
						type="text"
						placeholder="Enter title"
						required
						onChange={handleChanged}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Description</Form.Label>
					<Form.Control
						name="description"
						as="textarea"
						rows={3}
						onChange={handleChanged}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Place</Form.Label>
					<Form.Control
						name="place"
						type="text"
						placeholder="Enter place"
						required
						onChange={handleChanged}
					/>
					<Form.Text className="text-muted">Name of location</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>City</Form.Label>
					<Form.Control
						name="city"
						type="text"
						placeholder="Enter City"
						required
						onChange={handleChanged}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Address</Form.Label>
					<Form.Control
						name="address"
						type="text"
						placeholder="Enter Address"
						required
						onChange={handleChanged}
					/>
					<Form.Text className="text-muted">Street name, number etc.</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Start time</Form.Label>
					<Form.Control
						name="startsAt"
						type="datetime-local"
						placeholder="Enter time"
						required
						onChange={handleChanged}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Thumbnail</Form.Label>
					<Form.Control
						name="thumbnail"
						type="file"
						required
						onChange={handleFileChange}
					/>
				</Form.Group>

				<Button className="float-end" variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</Container>
	)
}
