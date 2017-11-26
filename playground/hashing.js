const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

var password = '123abc!'

bcrypt.genSalt(10, (err, salt) => {
	bcrypt.hash(password, salt, (err, hash) => {
		console.log(hash)
	})
})

var hashedPassword = '$2a$10$lbk8d.UT8wKG1BC8zc/jP.GVV1Wpp.jtLQU49/w2PfFf3CxU3Nei2'

bcrypt.compare(password, hashedPassword, (err, res) => {
	console.log(res)
})

// var data = {
// 	id: 10
// }

// var token = jwt.sign(data, '123abc')
// console.log(token)

// var decoded = jwt.verify(token, '123abc')
// console.log(decoded)

// var message = 'I am user number 3'
// var hash = SHA256(message).toString()

// console.log(message)
// console.log(hash)

// var data = {
// 	id: 4
// }
// var token = {
// 	data,
// 	hash: SHA256(JSON.stringify(data) + 'somesalt').toString()
// }

// // token.data.id = 5
// // token.hash = SHA256(JSON.stringify(token.data)).toString()

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesalt').toString()

// if (resultHash === token.hash) {
// 	console.log('Data is secure')
// } else {
// 	console.log('Data has been changed')
// }