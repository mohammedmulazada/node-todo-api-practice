const mongoose = require('mongoose')

var User = mongoose.model('User', {
	//name 
	email: {
		//accepted type
		type: String,
		required: true,
		minlength: 1,
		trim: true
	}
})

module.exports = {User}