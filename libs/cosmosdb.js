import * as dotenv from 'dotenv'
dotenv.config()

import { CosmosClient } from '@azure/cosmos'

const cosmosSecret = process.env.COSMOS_CONNECTION_STRING;
const databaseName = process.env.COSMOS_DATABASE_NAME;
const containerName = process.env.COSMOS_CONTAINER_NAME;

const cosmosClient = new CosmosClient(cosmosSecret);
const { database } = await cosmosClient.databases.createIfNotExists({ id: databaseName });
const { container } = await database.containers.createIfNotExists({ id: containerName });

export const executeSqlFind = async (propertyName, propertyValue) => {
  const querySpec = {
    query: `SELECT * FROM Expenses e WHERE e.${propertyName} LIKE @propertyValue`,
    parameters: [
      {
        name: `@propertyValue`,
        value: propertyValue
      }
    ]
  };

  try {
    const { resources: items } = await container.items.query(querySpec).fetchAll();
    return items
  } catch (error) {
    console.error(error)
    return [{ error }]
  }
}
