import { Link, useNavigate } from "react-router-dom"
import useLogout from "../hooks/useLogout"
import { Container } from "react-bootstrap"
import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth"
import { getUserEvents } from "../api/user"

const Home = () => {
	const navigate = useNavigate()
	const logout = useLogout()
	const { auth } = useAuth()

	const signOut = async () => {
		await logout()
		navigate("/linkpage")
	}

	const [happenings, setHappenings] = useState([])

	useEffect(() => {
		async function init() {
			const happeningsRes = await getUserEvents(auth.id)
			setHappenings(happeningsRes.data)
			console.log(happeningsRes)
		}

		init()
	}, [])

	return (
		<Container>
			<h1>Home</h1>
			<p>Your announced events:</p>
			{happenings.length > 0 ? (
				happenings.map((happening) => (
					<Link to={`/happenings/${happening._id}`} key={happening._id}>
						<p>{happening.title}</p>
					</Link>
				))
			) : (
				<p>None so far</p>
			)}
		</Container>
	)
}

export default Home
