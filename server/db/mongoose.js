const mongoose = require('mongoose')

mongoose.Promise = global.Promise
var options = {
	useMongoClient: true
}
mongoose.connect('mongodb://localhost:27017/TodoApp', options)

module.exports = {
	mongoose
}