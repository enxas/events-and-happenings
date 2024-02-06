import axios from "./axios"

async function login(email, password) {
	try {
		const response = await axios.post('/login',
			JSON.stringify({ email, password }),
			{
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
			}
		)
		return [response.data, null]
	} catch (err) {
		return [null, err?.response.data]
	}
}

async function register(email, username, password) {
	try {
		const response = await axios.post('/register',
			JSON.stringify({ email, username, password }),
			{
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true,
			}
		)
		console.log(response)
		return [response.data, null]
	} catch (err) {
		return [null, err?.response.data]
	}
}

async function logout(axiosPrivate) {
	try {
		const response = await axiosPrivate.get('/logout',
			{
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true,
			}
		)
		console.log(response)
		return [response.data, null]
	} catch (err) {
		return [null, err?.response.data]
	}
}

export {
	login,
	register,
	logout,
}