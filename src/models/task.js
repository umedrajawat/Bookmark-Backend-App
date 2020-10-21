const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   Title: {
        type: String,
        required: true,
        unique:true,

    },
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'
    // }

},{
    timestamps: true
})

const Tags = mongoose.model('Tags', userSchema)

module.exports = Tags