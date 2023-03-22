import { MongoClient } from 'mongodb'

const url = "mongodb://localhost:27017/"
const dbName = 'learn-mongodb'

const client = new MongoClient(url)

async function run() {
	try {
		await client.connect();
		const db = client.db(dbName)
		const res = await db.command({ ping: 1 });
		console.log(res);
		const user = db.collection('user');
	} catch (e) {
		console.error(e)
	} finally {
		await client.close();
	}
}

run()