require('./config/config')
const express = require('express')
var bodyParser = require('body-parser')

const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')
const {ObjectID} = require('mongodb')
const _ = require('lodash')
const todos = require('./routers/todos')
const {authenticate} = require('./middleware/authenticate')

const port = process.env.PORT

const app = express()

app.use(bodyParser.json())

app.use('/', todos)

app.post('/users', (req, res) => {
	var body = _.pick(req.body, ['email', 'password'])
	var user = new User(body)
  
	user.save().then(() => {
	  return user.generateAuthToken()
	}).then((token) => {
	  res.header('x-auth', token).send(user)
	}).catch((e) => {
		res.status(400).send(e)
	})
})


app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user)
})

app.post('/users/login', (req, res) => {
	var body = _.pick(req.body, ['email', 'password'])

	User.findByCredentials(body.email, body.password).then((user) => {
		return user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user)
		})
	}).catch((e) => {
		res.status(400).send()
	})
})

app.delete('/users/me/token', authenticate, (req, res) => {
	req.user.removeToken(req.token).then(() => {
		res.status(200).send()
	}), () => {
		res.status(400).send(e)
	}
})

app.listen(port, () => {
	console.log(`Started on port ${port}`)
})



module.exports = {app}