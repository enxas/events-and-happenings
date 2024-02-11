import express from 'express'
import { getHappenings, getHappening, createHappening, deleteHappening } from '../controllers/happeningController.js'
import verifyJWT from '../middleware/verifyJWT.js'
import multer from 'multer'
import path from 'path'
import verifyRoles from '../middleware/verifyRoles.js'
import ACCOUNT_ROLES from '../config/accountRoles.js'

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '..', 'public', 'img', 'thumbnails'))
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
		cb(null, uniqueSuffix + '.' + file.mimetype.split('/')[1])
	}
})

const __dirname = import.meta.dirname
const upload = multer({ storage: storage })

const router = express.Router()

router.route('/')
	.get(getHappenings)
	.post(verifyJWT, upload.single('thumbnail'), createHappening)

router.route('/:id')
	.get(getHappening)
	.delete(verifyJWT, verifyRoles(ACCOUNT_ROLES.Admin), deleteHappening)

export default router