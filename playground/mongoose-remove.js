const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

// Todo.remove({}).then((result) => {
// 	console.log(result)
// } )

//both return the obj
// Todo.findOneAndRemove()
// Todo.findByIdAndRemove()

Todo.findOneAndRemove({_id: '5a196218115dc7ae8c4b2433'}).then((todo) => {
	console.log(todo)
})

Todo.findByIdAndRemove('5a196218115dc7ae8c4b2433').then((todo) => {
	console.log(todo)
})