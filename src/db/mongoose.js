const mongoose = require('mongoose')
//using mongoose to connect to the mongodb
mongoose.connect('mongodb://127.0.0.1:27017/Bookmark-manager', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})