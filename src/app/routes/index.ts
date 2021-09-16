import express from 'express'
import PingController from '../controllers/ping'
import SchemaController from '../controllers/schema'
import ExpressionController from '../controllers/expression'
import { Schema } from './../../orm/model/schema'
import CompileRequest from '../model/compileRequest'
import RunRequest from '../model/runRequest'

const router = express.Router()

router.get('/ping', async (_req, res) => {
	const controller = new PingController()
	const response = await controller.getMessage()
	return res.send(response)
})
router.post('/schema', async (req, res) => {
	const controller = new SchemaController()
	await controller.load(req.body as Schema)
	return res.send()
})
router.get('/schema', async (req, res) => {
	const controller = new SchemaController()
	const response = await controller.list()
	return res.send(response)
})
router.get('/schema/:name', async (req, res) => {
	const controller = new SchemaController()
	const response = await controller.get(req.params.name)
	return res.send(response)
})
router.delete('/schema/:name', async (req, res) => {
	const controller = new SchemaController()
	await controller.delete(req.params.name)
	return res.send()
})
router.post('/expression/compile', async (req, res) => {
	const controller = new ExpressionController()
	const response = await controller.compile(req.body as CompileRequest)
	return res.send(response)
})
router.post('/expression/sentence', async (req, res) => {
	const controller = new ExpressionController()
	const response = await controller.sentence(req.body as CompileRequest)
	return res.send(response)
})
router.post('/expression/model', async (req, res) => {
	const controller = new ExpressionController()
	const response = await controller.model(req.body as CompileRequest)
	return res.send(response)
})
router.post('/expression/run/:connection', async (req, res) => {
	const controller = new ExpressionController()
	const response = await controller.run(req.body as RunRequest)
	return res.send(response)
})

export default router
