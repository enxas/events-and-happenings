import { useEffect, useState } from "react"
import { deleteEvent, getEvent } from "../api/happening"
import { useNavigate, useParams } from "react-router-dom"
import { Container } from "react-bootstrap"
import ApiError from "../errors/ApiError"
import useAuth from "../hooks/useAuth"
import { hasAllowedRole } from "../utils/utils"
import ACCOUNT_ROLES from "../config/accountRoles"
import useAxiosPrivate from "../hooks/useAxiosPrivate"

export default function HappeningPage() {
	const [happening, setHappening] = useState([])
	const { id } = useParams()
	const navigate = useNavigate()
	const { auth } = useAuth()
	const axiosPrivate = useAxiosPrivate()

	useEffect(() => {
		async function init() {
			const happeningRes = await getEvent(id)

			if (happeningRes instanceof ApiError) {
				navigate("/not-found")
			} else {
				setHappening(happeningRes.data)
				console.log(happeningRes)
			}
		}

		init()
	}, [id])

	return (
		<Container>
			<h1>{happening.title}</h1>
			<img src={happening.thumbnail} />
			<p>{happening.description}</p>
			<hr />
			<p>
				Address: {happening.address}, {happening.city}
			</p>
			<p>Place: {happening.place}</p>
			<p>Start time: {happening.startsAt}</p>

			{hasAllowedRole(auth.roles, [ACCOUNT_ROLES.Admin]) && (
				<span
					onClick={async () => {
						await deleteEvent(axiosPrivate, id)
						navigate("/")
					}}
					className="btn btn-danger"
				>
					Delete post
				</span>
			)}
		</Container>
	)
}
