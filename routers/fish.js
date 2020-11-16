const express = require('express')
const Fish = require('../models/fishes')
const router = new express.Router()

router.get('/fishes', async (req, res) => {
    try {
        const fishes = await Fish.find({})

        if (!fishes) {
            return res.status(404).send()
        }

        return res.send(fishes)
    } catch (e) {
        return res.status(500).send()
    }
})

router.get('/fishes/:id', async (req, res) => {
    try {
        const fish = await Fish.findById(req.params.id)
        if (!fish) return res.status(404).send()
        return res.send(fish)
    } catch (e) {
        return res.status(500).send()
    }
})

router.post('/fishes', async (req, res) => {
	try {
		const oldFish = await Fish.find({"id":req.body['id']})
		console.log(oldFish)
		if(oldFish.length > 0)	return res.send('Fish already exists')
		const fish = new Fish(req.body)
		await fish.save()
		res.status(201).send('Fish Added')
	} catch (e){
		return res.status(400).send(e)
	}
	
})

router.patch('/fishes/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['author']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })
	try{
        const fish = await Fish.findByIdAndUpdate(req.params.id,req.body)
		if (!fish) return res.status(404).send()
        return res.send(fish)
	}catch{
		return res.status(500).send()
	}
})

router.delete('/fishes/:id', async (req, res) => {
    try {
        const fish = await Fish.findByIdAndDelete(req.params.id)
        if (!fish) return res.status(404).send()
        return res.send(fish)
    } catch (e) {
        return res.status(500).send()
    }
})

module.exports = router