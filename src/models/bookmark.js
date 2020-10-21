const mongoose = require('mongoose')
const validator = require('validator')

/**
 * schema for Bookmark
 * Each Bookmark will conatin
 * Title
 * Link
 * Publisher
 * Timestamps
 */

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
    Tag:[
        {
            type:String,
            unique:true
        }
    ]
}, {
    timestamps: true
})


const Bookmark = mongoose.model('Bookmark', userSchema)

module.exports = Bookmark