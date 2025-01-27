const dbUri = process.env.MONGO_URI

if (!(dbUri.includes('test') || dbUri.includes('Test'))) {
    throw new Error('Can only run tests against a "test" database '+ dbUri)
}

export * from '../db.js'

import { disconnectDb } from '../db.js'
import { deleteAllUsers } from '../user/userData.js';

export async function cleanoutDatabase() {
    await deleteAllUsers();
}

beforeEach(async () => {
    await cleanoutDatabase()
})

afterAll(async () => {
    await disconnectDb()
})