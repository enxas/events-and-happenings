export default class ApiError extends Error {
	constructor(data) {
		super(data.message)
		this.data = data.data
	}
}