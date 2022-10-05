const mongoose = require('mongoose');

// schema ==> model ==> query
//Schema
const tourSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must have a name'],
        trim: true,
        unique: [true, 'name must be unique'],
        minLength: [10, 'minimum length is 10'],
        maxLength: [50, 'maximum length is 50']
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price can't be negative"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true;
                }
                else {
                    return false;
                }
            },
            message: "price value can't be non Integer"
        }
    },
    helpLine: {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
        required: true,
        min: [0, "Quantity can't be negative"],
    },
    peopleNeed: {
        type: Number,
        required: true,
        min: [0, "Quantity can't be negative"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true;
                }
                else {
                    return false;
                }
            },
            message: "People Need value can't be non Integer"
        }
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ['unavailable', 'pending', 'ready-to-fly', 'finished'],
            message: "Status can't be {value}"
        }
    },
    viewCount: {
        type: Number,
        default: 0,
    }
},
    {
        timestamps: true,
    })

//mongoose middlewares for saving data: pre/ post
tourSchema.pre('save', function (next) {
    console.log('Before saving data');
    if (this.peopleNeed === 0) {
        this.status = 'ready-to-fly'
    }
    else {
        this.status = 'pending'
    }
    next();
})
tourSchema.post('save', function (doc, next) {
    console.log('After saving data');
    next()
})

tourSchema.methods.logger = function () {
    console.log(`Data saved for ${this.name}`)
}


//model
const Tour = mongoose.model('tour', tourSchema)

module.exports = Tour;