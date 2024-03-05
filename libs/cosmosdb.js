import * as dotenv from 'dotenv'
dotenv.config()

import { CosmosClient } from '@azure/cosmos'

const cosmosSecret = process.env.COSMOS_CONNECTION_STRING
const databaseName = process.env.COSMOS_DATABASE_NAME
const expensesContainerName = process.env.COSMOS_EXPENSES_CONTAINER_NAME
const categoriesContainerName = process.env.COSMOS_CATEGORIES_CONTAINER_NAME

const cosmosClient = new CosmosClient(cosmosSecret);
const { database } = await cosmosClient.databases.createIfNotExists({ id: databaseName })
const { container: expensesContainer } = await database.containers.createIfNotExists({ id: expensesContainerName })
const { container: categoriesContainer } = await database.containers.createIfNotExists({ id: categoriesContainerName })

/**
 * Executes a SQL query on the Expenses container in Cosmos DB.
 * The query selects all items where each given property equals the corresponding value.
 *
 * @param {Object} propNameValuePairs - An object where each key-value pair represents a property name and value.
 * Each key in the object is the name of a property to query, and the corresponding value is the value to match.
 * For example, `{ propertyName0: 'propertyValue0', propertyName1: 'propertyValue1' }` would select all items where
 * `propertyName0` equals `'propertyValue0'` and `propertyName1` equals `'propertyValue1'`.
 * @returns {Promise<Array>} A promise that resolves to an array of items that match the query.
 * If an error occurs, the promise resolves to an array containing a single object with an `error` property.
 *
 * @example
 * executeSqlFind({ propertyName0: 'propertyValue0', propertyName1: 'propertyValue1' })
 *   .then(items => console.log(items))
 *   .catch(error => console.error(error));
 *
 * @async
 */
export const executeSqlFindExpense = async (propNameValuePairs) => {
  const container = expensesContainer
  try {
    const whereClause = Object.keys(propNameValuePairs).map((propertyName, index) => {
      return `e.${propertyName} = ${propNameValuePairs[propertyName]}`
    }).join(' AND ')

    const querySpec = {
      query: `SELECT * FROM Expenses e WHERE ${whereClause}`,
    }

    const { resources: items } = await container.items.query(querySpec).fetchAll()
    return items
  } catch (error) {
    console.error(error)
    return [{ error }]
  }
}

export const executeUpsertExpense = async (data) => {
  const container = expensesContainer
  const result = await container.items.upsert(data)

  if (result.statusCode === 201) {
    console.log("Inserted expense")
  } else if (result.statusCode === 200) {
    console.log("Updated expense")
  } else {
    console.log(`unexpected statusCode ${result.statusCode}`)
  }

  return result
}

export const executeDeleteExpense = async (id, partitionKeyValues) => {
  const container = expensesContainer
  try {
    const result = await container.item(id, partitionKeyValues).delete()
    if (result.statusCode === 204) {
      console.log("Deleted expense item id: " + id)
    }
    return result
  } catch (error) {
    console.error(error)
    return { statusCode: error.statusCode }
  }
}

export const executeUpsertCategory = async (data) => {
  const container = categoriesContainer
  const result = await container.items.upsert(data)

  if (result.statusCode === 201) {
    console.log("Inserted category")
  } else if (result.statusCode === 200) {
    console.log("Updated category")
  } else {
    console.log(`unexpected statusCode ${result.statusCode}`)
  }

  return result
}

export const executeFetchCategories = async () => {
  const container = categoriesContainer
  try {
    const { resources: items } = await container.items.readAll().fetchAll()
    return items
  } catch (error) {
    console.error(error)
    return [{ error }]
  }
}

export const executeDeleteCategory = async (id) => {
  const container = categoriesContainer
  try {
    const result = await container.item(id, [id]).delete()
    if (result.statusCode === 204) {
      console.log("Deleted category item id: " + id)
    }
    return result
  } catch (error) {
    console.error(error)
    return { statusCode: error.statusCode }
  }
}
