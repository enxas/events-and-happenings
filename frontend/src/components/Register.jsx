import { useRef, useState, useEffect } from "react"
import axios from "../api/axios"
import { Link } from "react-router-dom"
import { register } from "../api/user"


const Register = () => {
	const userRef = useRef()
	const errRef = useRef()

	const [email, setEmail] = useState("")

	const [user, setUser] = useState("")
	const [validName, setValidName] = useState(false)

	const [pwd, setPwd] = useState("")
	const [validPwd, setValidPwd] = useState(false)

	const [matchPwd, setMatchPwd] = useState("")
	const [validMatch, setValidMatch] = useState(false)

	const [errMsg, setErrMsg] = useState("")
	const [success, setSuccess] = useState(false)

	useEffect(() => {
		setValidName(user)
	}, [user])

	useEffect(() => {
		setValidPwd(pwd)
		setValidMatch(pwd === matchPwd)
	}, [pwd, matchPwd])

	useEffect(() => {
		setErrMsg("")
	}, [user, pwd, matchPwd])

	const handleSubmit = async (e) => {
		e.preventDefault()

		const [response, error] = await register(email, user, pwd)

		// TODO: remove console.logs before deployment
		console.log(JSON.stringify(response))
		//console.log(JSON.stringify(response))
		setSuccess(true)
		//clear state and controlled inputs
		setUser("")
		setPwd("")
		setMatchPwd("")
	}

	return (
		<>
			{success ? (
				<section>
					<h1>Success!</h1>
					<p>
						<a href="#">Sign In</a>
					</p>
				</section>
			) : (
				<section>
					<p
						ref={errRef}
						className={errMsg ? "errmsg" : "offscreen"}
						aria-live="assertive"
					>
						{errMsg}
					</p>
					<h1>Register</h1>
					<form onSubmit={handleSubmit}>
						<label htmlFor="email">Email:</label>
						<input
							type="text"
							id="email"
							autoComplete="off"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
							aria-invalid={validName ? "false" : "true"}
							aria-describedby="uidnote"
						/>

						<label htmlFor="username">Username:</label>
						<input
							type="text"
							id="username"
							autoComplete="off"
							onChange={(e) => setUser(e.target.value)}
							value={user}
							required
							aria-invalid={validName ? "false" : "true"}
							aria-describedby="uidnote"
						/>

						<label htmlFor="password">Password:</label>
						<input
							type="password"
							id="password"
							onChange={(e) => setPwd(e.target.value)}
							value={pwd}
							required
							aria-invalid={validPwd ? "false" : "true"}
							aria-describedby="pwdnote"
						/>

						<label htmlFor="password_re">Repeat Password:</label>
						<input
							type="password"
							id="password_re"
							onChange={(e) => setMatchPwd(e.target.value)}
							value={matchPwd}
							required
							aria-invalid={validPwd ? "false" : "true"}
							aria-describedby="pwdnote"
						/>

						<button disabled={!validName || !validPwd ? true : false}>
							Sign Up
						</button>
					</form>
					<p>
						Already registered?
						<br />
						<span className="line">
							<Link to="/">Sign In</Link>
						</span>
					</p>
				</section>
			)}
		</>
	)
}

export default Register
