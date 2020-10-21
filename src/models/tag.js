const mongoose = require('mongoose')

//schema for Tags collection
//Each Tag will contain a Title and timstamp
const userSchema = new mongoose.Schema({
   Title: {
        type: String,
        required: true,
        unique:true,

    },

},{
    timestamps: true
})

const Tags = mongoose.model('Tags', userSchema)

module.exports = Tags