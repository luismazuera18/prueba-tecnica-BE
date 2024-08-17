import { isEmpty } from '../../utils/index.js'
import logger from '../../utils/logger.js'

const libName = '[animals]'

export default async (req, resp) => {
  const fName = `${libName}[getAnimalsForName]`

  const { name } = req.params ?? {}

  if (isEmpty(name)) {
    const error = 'No se proporciono nombre a animal a buscar'
    logger.error(`${fName} ${error}`)
    return resp.status(404).json({ success: false, error })
  }

  try {
    logger.info(`${fName} Buscando animal por nombre: ${name}...`)
    const result = await fetch(`https://api.api-ninjas.com/v1/animals?name=${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': process.env.API_NINJAS_KEY,
      },
    })
    const data = await result.json()
    return resp.status(200).json({ success: true, data })
  } catch (err) {
    const error = `Ocurrio un error al buscar animal por nombre: ${name}`
    logger.error(`${fName} ${error}`)
    console.error(err)
    return resp.status(404).json({ success: false, error })
  }
}
