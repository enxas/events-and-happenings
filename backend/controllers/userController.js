import mongoose from 'mongoose'
import Happening from '../model/Happening.js'
import httpStatus from '../helpers/httpStatusCodes.js'

export const getHappenings = async (req, res) => {
	console.log(req.params.id)
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.sendStatus(404)
	}

	const result = await Happening.find({ user_id: req.params.id }).exec()

	if (result == null) {
		return res.sendStatus(404)
	}

	return res.status(httpStatus.OK).json({ data: result })
}