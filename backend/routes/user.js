import express from 'express'
import { getHappenings } from '../controllers/userController.js'
import verifyJWT from '../middleware/verifyJWT.js'

const router = express.Router()

router.route('/:id/events')
	.get(getHappenings)

export default router