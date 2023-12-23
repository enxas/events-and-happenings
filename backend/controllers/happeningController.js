import mongoose from 'mongoose';
import Happening from '../model/Happening.js';
import httpStatus from '../helpers/httpStatusCodes.js';

export const createHappening = async (req, res) => {
	if (!req?.body?.title || !req?.body?.description || !req?.body?.place || !req?.body?.city || !req?.body?.address || !req?.body?.startsAt) {
		return res.status(400).json({ 'message': 'Missing required inputs' });
	}

	try {
		const result = await Happening.create({
			title: req.body.title,
			description: req.body.description,
			place: req.body.place,
			city: req.body.city,
			address: req.body.address,
			startsAt: req.body.startsAt,
			user_id: req.user._id,
		});

		console.log(req.user);

		res.status(201).json(result);
	} catch (error) {
		console.error(error);
	}
};

export const getHappening = async (req, res) => {

	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.sendStatus(404);
	}

	const result = await Happening.findById(req.params.id).exec();

	if (result == null) {
		return res.sendStatus(404);
	}

	return res.status(httpStatus.OK).json(result);

};

export const getHappenings = async (req, res) => {
	const result = await Happening.find();

	if (result == null) {
		return res.sendStatus(404);
	}

	return res.status(httpStatus.OK).json({ data: result });
};