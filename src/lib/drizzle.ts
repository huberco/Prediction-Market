import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './db/schema'

const globalForDb = globalThis as unknown as {
  client: postgres.Sql | undefined
}

const postgresUrl = process.env.POSTGRES_URL
if (!postgresUrl) {
  throw new Error('POSTGRES_URL environment variable is required')
}

const client = globalForDb.client ?? postgres(postgresUrl, { prepare: false })

globalForDb.client = client

export const db = drizzle(client, { schema })
