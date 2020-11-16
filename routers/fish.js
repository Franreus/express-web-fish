const express = require('express')
const Fish = require('../models/fishes')
const router = new express.Router()

router.get('/fishes', async (req, res) => {
    try {
        const fishes = await Fish.find({})

        if (!fishes) {
            return res.status(404).send()
        }

        res.send(fishes)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/fishes/:id', async (req, res) => {
    try {
        const fish = await Fish.find({"id":req.params.id})
        if (!fish) return res.status(404).send()
        res.send(fish)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/fishes', async (req, res) => {
	const oldFish = await Fish.find({"id":req.body['id']})
	if(oldFish.length > 0) res.send('Fish already exists')
	const fish = new Fish(req.body)
    try {
        await fish.save()
        res.status(201).send('Fish Added')
    } catch (e){
        res.status(400).send(e)
    }
})

router.patch('/fishes/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['author']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })
	try{
        const fish = await Fish.findOneAndUpdate({"id":req.params.id},req.body)
		if (!fish) res.status(404).send()
        res.send(fish)
	}catch{
		res.status(500).send()
	}
})

router.delete('/fishes/:id', async (req, res) => {
    try {
        const fish = await Fish.findOneAndDelete({"id":req.params.id})
        if (!fish) res.status(404).send()
        res.send(fish)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router