import express from 'express'
import { getHappenings, getHappening, createHappening } from '../controllers/happeningController.js'
import verifyJWT from '../middleware/verifyJWT.js'

const router = express.Router()

router.route('/')
	.get(getHappenings)
	.post(verifyJWT, createHappening)
//.put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
//.delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

router.route('/:id')
	.get(getHappening)

export default router