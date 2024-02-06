import { Link, useNavigate } from "react-router-dom"
import { logout } from "../api/user"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import { default as BNavbar } from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import useAuth from "../hooks/useAuth"
import useAxiosPrivate from "../hooks/useAxiosPrivate"

export default function Navbar() {
	const navigate = useNavigate()
	const { auth, setAuth } = useAuth()
	const privateAxios = useAxiosPrivate()

	async function handleLogout() {
		const [response, error] = await logout(privateAxios)
		if (error === null) {
			setAuth({});
			navigate("/")
		}
	}

	return (
		<BNavbar collapseOnSelect expand="lg" className="bg-body-tertiary">
			<Container>
				<BNavbar.Brand as={Link} to="/">
					Events & Happenings
				</BNavbar.Brand>
				<BNavbar.Toggle aria-controls="responsive-navbar-nav" />
				<BNavbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="#features">Features</Nav.Link>
						<Nav.Link href="#pricing">Pricing</Nav.Link>
					</Nav>
					<Nav>
						{auth?.accessToken ? (
							<NavDropdown
								title={auth.username || "guest"}
								id="collapsible-nav-dropdown"
							>
								<NavDropdown.Item as={Link} to="/happenings/create">Create Event</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item as={Link} onClick={handleLogout}>
									Logout
								</NavDropdown.Item>
							</NavDropdown>
						) : (
							<>
								<Nav.Link as={Link} to="/login">
									Login
								</Nav.Link>
								<Nav.Link as={Link} to="/register">
									Register
								</Nav.Link>
							</>
						)}
					</Nav>
				</BNavbar.Collapse>
			</Container>
		</BNavbar>
	)
}
