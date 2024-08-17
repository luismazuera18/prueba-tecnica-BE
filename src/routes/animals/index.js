import { Router } from 'express'
import getAnimalsForName from './getAnimals.js'

const router = Router({ mergeParams: true })

// se espera el name por params obligatorio para poder realizar la busqueda
router.get(`/:name`, getAnimalsForName)

export default router
