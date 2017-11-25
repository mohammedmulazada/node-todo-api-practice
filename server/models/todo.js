const mongoose = require('mongoose')

//mongoose schema
var Todo = mongoose.model('Todo', {
	//name 
	text: {
		//accepted type
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	completedAt: {
		type: Number,
		default: null
	}
})

module.exports = {Todo}