// const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server')
	}
	console.log('Connected to MongoDB server')

	// deleteMany deletes all that match
	// db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
	// 	console.log(result)
	// })

	// db.collection('Users').deleteMany({name: 'Mohammed'}).then((result) => {
	// 	console.log(result)
	// })

	//deleteOne delete the first that matches
	// db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
	// 	console.log(result)
	// })

	//findOneAndDelete delete and also return values
	// db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
	// 	console.log(result)
	// })

	db.collection('Users').findOneAndDelete({_id : new ObjectID('5a181f92115dc7ae8c4b06a8')}).then((result) => {
		console.log(result)
	})

	// db.close()
})