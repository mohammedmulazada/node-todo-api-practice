const express = require('express')
const router = express.Router()
var bodyParser = require('body-parser')

const {mongoose} = require('./../db/mongoose')
const {Todo} = require('./../models/todo')
const {ObjectID} = require('mongodb')
const _ = require('lodash')

router.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos})
	}).catch((e) => {
		res.status(400).send(e)
	})
})

router.get('/todos/:id', (req, res) => {
	let id = req.params.id

	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Todo.findById(id).then((todo) => {
		if (!todo) {
			return res.status(404).send()
		} 

		res.status(200).send({todo})
	}).catch((e) => {
		res.status(404).send()
	})

})

router.delete('/todos/:id', (req, res) => {
	var id = req.params.id

	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	Todo.findByIdAndRemove(id).then((todo) => {
		if (!todo) {
			return res.status(404).send()
		}
		res.send({todo})
	}).catch((e) => {
		res.status(404).send()
	})
})

router.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	})

	todo.save().then((doc) => {
		res.send(doc)
	}).catch((e) => {
		res.status(400).send(e)
	})
})

router.patch('/todos/:id', (req, res) => {
	var id = req.params.id
	var body = _.pick(req.body, ['text', 'completed'])

	if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime()
	} else {
		body.completed = false
		body.completedAt = null
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if (!todo) {
			return res.status(400).send()
		}
		res.send({todo})
	}).catch((e) => {
		res.status(400).send()
	})
})

module.exports = router