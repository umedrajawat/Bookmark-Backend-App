const express = require('express')
const Tags = require('../models/task')
const User=require('../models/user')
const router = new express.Router()

router.post('/tags', async (req, res) => {
    const tag = new Tags(req.body)
    const user=await User.findByIdAndUpdate(req.body.owner,{
         $push:{Tag:tag._id}
     },{
         new:true,useFindAndModify:false
     });
     console.log('user after update',user)
    try {
        await tag.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tags', async (req, res) => {
    try {
        const tags = await Tags.find({})
        res.send(tags)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/tags/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const tags = await Tags.findById(_id)

        if (!tags) {
            return res.status(404).send()
        }

        res.send(tags)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/tags/:id', async (req, res) => {
    try {
        const tag = await Tags.findByIdAndDelete(req.params.id)

        if (!tag) {
            res.status(404).send()
        }

        res.send(tag)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tags/add/:id',async(req,res)=>{
    const tag = await Tags.findById(req.params.id)
    const user=await User.findByIdAndUpdate(req.body.Bookmark,{
        $push:{Tag:tag._id}
    },{
        new:true,useFindAndModify:false
    });
    console.log('user after update',user)
   try {
       await user.save()
       res.status(201).send(user)
   } catch (e) {
       res.status(400).send(e)
   }
})


module.exports = router