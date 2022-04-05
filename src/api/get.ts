import { getData } from './../helpers/common'
import { formatResponse } from '../helpers/formatter'

export const product = async (event) => {
  try {
    const id = event.pathParameters.id
    const productData = await getData(id)
    if (!productData) {
      throw new Error('No data found')
    }
    console.log('DATA', productData)

    return formatResponse(200, productData)
  } catch (error) {
    console.error(error)

    return formatResponse(400, error.message)
  }
}
