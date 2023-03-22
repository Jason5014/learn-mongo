import mongoose, { Schema, connect, disconnect, model } from 'mongoose'

mongoose.set('strictQuery', false)


const ProductSchema = new Schema({
	name: { type: String },
	price: { type: Number },
});
const ProductModel = model('ProductModel', ProductSchema)

const UserSchema = new Schema({
	name: { type: String },
	age: { type: Number },
	hobbies: { type: Array },
	teams: { type: Schema.Types.ObjectId, ref: 'Team' },
}, { collection: 'user' })
const UserModel = model('User', UserSchema)


async function main () {
	try {
		await connect('mongodb://localhost:27017/learn-mongo')
		console.log('[egg mongoose] connected successfully')

		// const product = await ProductModel.create({
		// 	name: 'cellphone',
		// 	price: 1300
		// })
		// console.log(product)
		// const ipad = new ProductModel({
		// 	name: 'ipad',
		// 	price: 3000,
		// })
		// await ipad.save()

		// await UserModel.create(
		// 	{ name: 'Lebron', age: 41, hobbies: ['glof', 'music', 'reading'] },
		// 	{ name: 'Harden', age: 32 },
		// 	{ name: 'Lucy', age: 40, hobbies: ['music'] },
		// 	{ name: 'Jason', age: 26, hobbies: ['reading'] },
		// 	{ name: 'Jony', age: 19, hobbies: ['movie'] },
		// 	{ name: 'Durant', age: 33, },
		// 	{ name: 'Howard', age: 35, },
		// );
		const users = await UserModel.find({ age: { $gt: 30 }}).exec()
		console.log(users)
	} catch (e) {
		console.error(e)
	} finally {
		await disconnect()
	}
}

main()