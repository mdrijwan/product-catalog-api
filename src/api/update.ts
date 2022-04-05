import { formatResponse } from '../helpers/formatter'
import { updateData } from '../helpers/common'

export const product = async (event) => {
  try {
    const id = event.pathParameters.id
    const data = JSON.parse(event.body)
    const productData = await updateData(id, data)
    if (!productData) {
      throw new Error('Product update failed!')
    }
    console.log('DATA', productData)

    return formatResponse(202, productData)
  } catch (error) {
    console.error(error)

    return formatResponse(400, error.message)
  }
}
