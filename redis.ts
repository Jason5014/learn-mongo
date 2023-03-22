import Redis from 'ioredis'

const redis = new Redis(6379)

const pub = new Redis(6379)
const sub = new Redis(6379)

async function run() {
	try {
		// value
		// 设置一条数据
		await redis.set('name', 'jason')
		// 设置一条数据并设置过期时间
		// await redis.set('name', 'jason', 'EX', 5)
		// 获取一条数据
		const result = await redis.get('name')
		console.log('value:', result)

		// list
		await redis.lpush('software', 'mongo', 'redis')
		const len = await redis.llen('software')
		const list = await redis.lrange('software', 0, len)
		console.log('list:', list)

		// map
		// await redis.hmset('person', 'name', 'jason', 'age', 23)
		await redis.hmset('person', { name: 'jason', age: 23 })
		const map = await redis.hgetall('person')
		console.log('map:', map)

		// publish/subscribe
		let counter = 0;
		// subscribe
		const r = await sub.subscribe('channel-1')
		console.log('subscribe:', r)
		sub.on('message', (channel, message) => {
			console.log(`Received ${message} from ${channel}`)
		})
		// publish
		const timmer = setInterval(() => {
			counter ++;
			pub.publish('channel-1', 'hello')
			if (counter > 10) {
				pub.disconnect();
				sub.disconnect();
				clearInterval(timmer);
			}
		}, 1000)
	} catch (err) {
		console.error(err)
	} finally {
		redis.disconnect()
	}
}

run()
