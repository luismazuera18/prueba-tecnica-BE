import { Router } from 'express'
import getAnimalsForName from './getAnimals.js'

const router = Router({ mergeParams: true })

router.get(`/:name`, getAnimalsForName)

export default router
