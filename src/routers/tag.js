const express = require('express')
const Tags = require('../models/tag')
const Bookmark=require('../models/bookmark')
const router = new express.Router()

/**
 * This will create a new Tag . We need to provide Title of the Tag with the body in JSON format
 */

router.post('/tags', async (req, res) => {
    const tag = new Tags(req.body)
    try {
        await tag.save()
        res.status(201).send(tag)
    } catch (e) {
        res.status(400).send(e)
    }
})




/**
 * This will retrieve all the Tags stored in the Tags collection
 */
router.get('/tags', async (req, res) => {
    try {
        const tags = await Tags.find({})
        res.send(tags)
    } catch (e) {
        res.status(500).send()
    }
})



/**
 * This API will retrieve only particular tag using the id passed as req param
 *  eg: httl://localhost/tags/89987346874egf 
 */

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


/**
 * This will delete the particular Tag matching with the id of req.params
 * 
 */

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



/**
 * This API will add the tag with the id passed in body as tag to bookmark having id passed in Bookmark in body as JSON format
 */
router.patch('/addTag',async(req,res)=>{
    const tag = await Tags.findById(req.body.tag)
    if(!tag){
        res.status(400).send('Tag NOT FOUND')
    }

    const bookmark=await Bookmark.findByIdAndUpdate(req.body.Bookmark,{
        $push:{Tag:tag._id}
    },{
        new:true,useFindAndModify:false
    });
    console.log('Bookmark after update',bookmark)
   try {
       await bookmark.save()
       res.status(201).send(bookmark)
   } catch (e) {
       res.status(400).send(e)
   }
})


module.exports = router