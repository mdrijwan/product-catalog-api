import { formatResponse } from '../helpers/formatter'
import { deleteData } from '../helpers/common'

export const product = async (event) => {
  try {
    const id = event.pathParameters.id
    const productData = await deleteData(id)
    if (!productData) {
      throw new Error('Product update failed!')
    }
    console.log('DATA', productData)

    return formatResponse(204, productData)
  } catch (error) {
    console.error(error)

    return formatResponse(400, error.message)
  }
}
