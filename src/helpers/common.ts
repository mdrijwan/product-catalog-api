import { DynamoDB } from 'aws-sdk'
import { Candidate } from './model'

let dynamoDb: DynamoDB.DocumentClient

if (process.env.IS_OFFLINE) {
  dynamoDb = new DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  })
} else dynamoDb = new DynamoDB.DocumentClient()

const now = new Date().getTime()
const table = process.env.DYNAMODB_TABLE

export async function getData(id) {
  let item: Candidate
  const result = await dynamoDb
    .get({
      TableName: table,
      Key: {
        id: id,
      },
    })
    .promise()

  if (result.Item) {
    item = Object.assign(result.Item)
  }

  return item
}

export async function createData(item: Candidate) {
  await dynamoDb
    .put({
      TableName: table,
      Item: item,
    })
    .promise()

  return item
}

export async function deleteData(id) {
  const result = await dynamoDb
    .delete({
      TableName: table,
      Key: {
        id: id,
      },
      ConditionExpression: 'attribute_exists(id)',
    })
    .promise()

  return result
}

export async function updateData(id, data) {
  const existingData = await getData(id)
  const productName = await getName(id)
  const obj = productName.find((o) => o.name)
  const name = data.name ? data.name : obj.name
  let update =
    'SET #c_name = :name, updated_at = :updated_at'
  let value = {
    ':name': name,
    ':updated_at': now,
  }

  if (existingData === undefined) {
    update += ', created_at = :created_at'
    value = Object.assign(value, { ':created_at': now })
  }

  if (data.price) {
    update += ', price = :price'
    value = Object.assign(value, { ':availability': data.price })
  }

  if (data.quantity) {
    update += ', quantity = :quantity'
    value = Object.assign(value, { ':availability': data.quantity })
  }

  const result = await dynamoDb
    .update({
      TableName: table,
      Key: {
        id: id,
      },
      ExpressionAttributeValues: value,
      ExpressionAttributeNames: {
        '#c_name': 'name',
      },
      UpdateExpression: update,
      ReturnValues: 'ALL_NEW',
    })
    .promise()

  return result.Attributes
}

export async function scanTable() {
  const result = await dynamoDb
    .scan({
      TableName: table,
    })
    .promise()

  return result.Items
}

export async function getName(id) {
  const result = await dynamoDb
    .query({
      TableName: table,
      KeyConditionExpression: 'id = :id',
      FilterExpression: 'attribute_exists(#c_name)',
      ExpressionAttributeValues: {
        ':id': id,
      },
      ExpressionAttributeNames: {
        '#c_name': 'name',
      },
    })
    .promise()

  return result.Items
}
