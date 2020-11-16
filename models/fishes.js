const mongoose = require('mongoose')

const Fish = mongoose.model('Fishes', {
    id: {
        type: Number,
        required: true
    },
    specie: {
        type: String,
        required: true
	},
    author: {
        type: String,
		required: true,
		trim: true
		//TODO VALIDATE
		/* 
		validate(value){
			if(value !== 0) throw new Error('Value doesnt match)
		}
		*/
    },
    description: {
        type: String,
        required: true,
		trim: true
	},
	image: {
        type: String,
        required: false,
		trim: true
    }
})

module.exports = Fish