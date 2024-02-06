import { useRef, useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { login } from "../api/user"

const Login = () => {
	const { setAuth, persist, setPersist } = useAuth()

	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname || "/home"

	const userRef = useRef()
	const errRef = useRef()

	const [user, setUser] = useState("c2@c.com")
	const [pwd, setPwd] = useState("123456")
	const [errMsg, setErrMsg] = useState("")

	useEffect(() => {
		userRef.current.focus()
	}, [])

	useEffect(() => {
		setErrMsg("")
	}, [user, pwd])

	const handleSubmit = async (e) => {
		e.preventDefault()

		const [response, error] = await login(user, pwd)

		console.log(JSON.stringify(response))
		//console.log(JSON.stringify(response));
		const accessToken = response?.accessToken
		const roles = response?.roles
		setAuth({ username: response.username, roles, accessToken })
		setUser("")
		setPwd("")
		navigate(from, { replace: true })
	}

	const togglePersist = () => {
		setPersist((prev) => !prev)
	}

	useEffect(() => {
		localStorage.setItem("persist", persist)
	}, [persist])

	return (
		<section>
			<p
				ref={errRef}
				className={errMsg ? "errmsg" : "offscreen"}
				aria-live="assertive"
			>
				{errMsg}
			</p>
			<h1>Sign In</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Username:</label>
				<input
					type="text"
					id="username"
					ref={userRef}
					autoComplete="off"
					onChange={(e) => setUser(e.target.value)}
					value={user}
				/>

				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					onChange={(e) => setPwd(e.target.value)}
					value={pwd}
				/>
				<button>Sign In</button>
				<div className="persistCheck">
					<input
						type="checkbox"
						id="persist"
						onChange={togglePersist}
						checked={persist}
					/>
					<label htmlFor="persist">Trust This Device</label>
				</div>
			</form>
			<p>
				Need an Account?
				<br />
				<span className="line">
					<Link to="/register">Sign Up</Link>
				</span>
			</p>
		</section>
	)
}

export default Login
