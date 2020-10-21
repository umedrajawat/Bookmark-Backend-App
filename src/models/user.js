const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    Link: {
        type: String,
        unique:true,
        required: true,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error('url is invalid')
            }
        }
    },
    Title: {
        type: String,
        trim: true,
    },
    Publisher: {
       type: String,
       trim: true,
    },
    Tag:[]
}, {
    timestamps: true
})

// userSchema.virtual('tags', {
//     ref: 'Tags',
//     localField: '_id',
//     foreignField: 'owner'
// })



const User = mongoose.model('Users', userSchema)

module.exports = User