import bcrypt from 'bcrypt'
import User from '../model/User.js'
import httpStatus from '../helpers/httpStatusCodes.js'

const handleNewUser = async (req, res) => {
	const { username, email, password } = req.body

	if (!username || !email || !password) {
		return res.status(httpStatus.BAD_REQUEST).json({ 'message': 'All fields are required' })
	}

	// check if user with provided details exist
	const foundUser = await User.findOne({ email: email }).exec()
	if (foundUser) {
		return res.status(httpStatus.CONFLICT).json({ 'message': 'User with this email already registered' })
	}

	try {
		//encrypt the password
		const hashedPassword = await bcrypt.hash(password, 10)

		//create and store the new user
		await User.create({
			"username": username,
			'email': email,
			"password": hashedPassword,
		})

		res.status(httpStatus.CREATED).json({ 'message': `New user ${username} created!` })
	} catch (error) {
		res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ 'message': error.message })
	}
}

export { handleNewUser }