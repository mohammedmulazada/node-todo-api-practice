const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

var UserSchema = new mongoose.Schema({
	email: {
		//accepted type
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: (value) => {
				return validator.isEmail(value)
			},
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		require: true,
		minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			require: true
		},
		token: {
			type: String,
			require: true
		}
	}]
})

UserSchema.methods.toJSON = function () {
	var user = this
	var userObject = user.toObject()

	return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function () {
	var user = this
	var access = 'auth'
	var token = jwt.sign({_id: user._id.toHexString(), access}, 'somesalt').toString()

	user.tokens.push({access, token})

	return user.save().then(() => {
		return token
	})
}

UserSchema.statics.findByToken = function (token) {
	var User = this
	var decoded
  
	try {
		decoded = jwt.verify(token, 'somesalt')
	} catch (e) {
		return Promise.reject()
	}
  
	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	})
}

UserSchema.pre('save', function (next) {
	var user = this
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(user.password, salt, (err, hash) => {
			user.password = hash
			next()
		})
	})
	if (user.isModified()) {

	} else {
		next()
	}
})
  
var User = mongoose.model('User', UserSchema)
  
module.exports = {User}