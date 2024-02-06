import express from 'express'
import { getHappenings, getHappening, createHappening } from '../controllers/happeningController.js'
import verifyJWT from '../middleware/verifyJWT.js'
import multer from 'multer'
import path from 'path'

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
//.put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
//.delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router.route('/:id')
	.get(getHappening)

export default router