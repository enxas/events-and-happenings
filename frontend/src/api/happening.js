import ApiError from "../errors/ApiError"
import axios from "./axios"

function formatErrorResponse(error) {
	console.log(error)
	if (error.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		return new ApiError(error.response.data)
	} else if (error.request) {
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		// http.ClientRequest in node.js
		console.error(error.request)
	} else {
		// Something happened in setting up the request that triggered an Error
		console.error('Error', error.message)
	}
}

async function getEvents() {
	try {
		const response = await axios.get('/events',
			{
				headers: { 'Content-Type': 'application/json' },
			}
		)
		return response.data
	} catch (error) {
		return formatErrorResponse(error)
	}
}

async function getEvent(id) {
	try {
		const response = await axios.get('/events/' + id,
			{
				headers: { 'Content-Type': 'application/json' },
			}
		)
		return response.data
	} catch (error) {
		return formatErrorResponse(error)
	}
}

async function createHappening(axiosPrivate, title, description, place, city, address, startsAt, thumbnail) {
	try {
		const response = await axiosPrivate.post('/events',
			{ title, description, place, city, address, startsAt, thumbnail },
			{
				headers: { 'Content-Type': 'multipart/form-data' },
				withCredentials: true,
			}
		)
		return response.data
	} catch (error) {
		return formatErrorResponse(error)
	}
}

export {
	getEvent,
	getEvents,
	createHappening,
}