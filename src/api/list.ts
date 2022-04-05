import { scanTable } from '../helpers/common'
import { formatResponse } from '../helpers/formatter'

export const products = async () => {
  try {
    const productsData = await scanTable()
    if (productsData.length === 0) {
      throw new Error('No products found')
    }
    console.log('DATA', productsData)

    return formatResponse(200, productsData)
  } catch (error) {
    console.error(error)

    return formatResponse(400, error.message)
  }
}
