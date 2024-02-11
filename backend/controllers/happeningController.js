import mongoose from 'mongoose'
import Happening from '../model/Happening.js'
import httpStatus from '../helpers/httpStatusCodes.js'

export const createHappening = async (req, res) => {
	if (!req?.body?.title) {
		return res.status(400).json({ 'message': 'Missing title' })
	} else if (!req?.body?.description) {
		return res.status(400).json({ 'message': 'Missing description' })
	} else if (!req?.body?.place) {
		return res.status(400).json({ 'message': 'Missing place' })
	} else if (!req?.body?.city) {
		return res.status(400).json({ 'message': 'Missing city' })
	} else if (!req?.body?.address) {
		return res.status(400).json({ 'message': 'Missing address' })
	} else if (!req?.body?.startsAt) {
		return res.status(400).json({ 'message': 'Missing startsAt' })
	} else if (!req?.file) {
		return res.status(400).json({ 'message': 'Missing thumbnail' })
	}

	try {
		const result = await Happening.create({
			title: req.body.title,
			description: req.body.description,
			place: req.body.place,
			city: req.body.city,
			address: req.body.address,
			startsAt: req.body.startsAt,
			thumbnail: req.file.filename,
			user_id: req.user._id,
		})

		res.status(201).json(result)
	} catch (error) {
		console.error(error)
	}
}

export const getHappening = async (req, res) => {

	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.sendStatus(404)
	}

	const result = await Happening.findById(req.params.id).exec()

	if (result == null) {
		return res.sendStatus(404)
	}

	result.thumbnail = `http://localhost:3500/img/thumbnails/${result.thumbnail}`

	return res.status(httpStatus.OK).json({ data: result })
}

export const getHappenings = async (req, res) => {
	const result = await Happening.find().lean()

	for (let i = 0; i < result.length; i++) {
		result[i].thumbnail = `http://localhost:3500/img/thumbnails/${result[i].thumbnail}`
	}

	if (result == null) {
		return res.sendStatus(404)
	}

	return res.status(httpStatus.OK).json({ data: result })
}

export const deleteHappening = async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.sendStatus(404)
	}

	const result = await Happening.findByIdAndDelete(req.params.id)

	return res.status(httpStatus.OK).json({ message: 'deleted' })
}