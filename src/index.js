const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/bookmark')
const taskRouter = require('./routers/tag')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})