import { formatErrorResponse } from "../utils/utils"
import axios from "./axios"

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

async function deleteEvent(axiosPrivate, id) {
	try {
		const response = await axiosPrivate.delete('/events/' + id,
			{
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true,
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
	deleteEvent,
}