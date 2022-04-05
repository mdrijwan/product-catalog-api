import * as uuid from 'uuid'
import { createData } from '../helpers/common'
import { formatResponse } from '../helpers/formatter'

const now = new Date().getTime()

export const product = async (event) => {
  const data = JSON.parse(event.body)
  try {
    const item = {
      id: uuid.v4(),
      name: data.name,
      price: data.price,
      quantity: data.quantity,
      created_at: now,
      updated_at: now,
    }
    const productData = await createData(item)
    if (!productData) {
      throw new Error('Product creation failed!')
    }
    console.log('DATA', productData)

    return formatResponse(201, productData)
  } catch (error) {
    console.error(error)

    return formatResponse(400, error.message)
  }
}
