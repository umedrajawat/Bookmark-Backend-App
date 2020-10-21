const express = require("express");
const Bookmark = require("../models/Bookmark");
var url = require("url");
var Meta = require("html-metadata-parser");
const router = new express.Router();

/**
 * This API is used to create a new Bookmark by adding the link wof the Bookmark with the requext body as JSON
 * Title and Publisher are fetched from the link using url and html-metadata-parser
 */

router.post("/bookmark", async (req, res) => {
  const bookmark = new Bookmark(req.body);
  console.log("body", req.body);
  let link = url.parse(req.body.Link, true);
  let publisher = link.host;
  bookmark.Publisher = publisher;
  Meta.parser(req.body.Link)
    .then((res) => {
      console.log("res", res.meta.title);
      console.log(req.body);
      bookmark.Title = res.meta.title;

      bookmark.save();
    })
    .then((res1) => res.status(201).send(bookmark))
    .catch((e) => {
      res.status(400).send(e);
    });
});

/**
 * This API is used to retrieve all the bookmarks stored in the collection
 */

router.get("/bookmarks", async (req, res) => {
  try {
    const bookmark = await Bookmark.find({});
    res.send(bookmark);
  } catch (e) {
    res.status(500).send();
  }
});

/**
 * This will reetrive only particular bookmark with id provided
 */

router.get("/bookmarks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const bookmark = await Bookmark.findById(_id);

    if (!bookmark) {
      return res.status(404).send();
    }

    res.send(bookmark);
  } catch (e) {
    res.status(500).send();
  }
});

/**
 * This will delete only particular bookmark with id provided
 */

router.delete("/bookmarks/:id", async (req, res) => {
  try {
    const bookmark = await Bookmark.findByIdAndDelete(req.params.id);

    if (!bookmark) {
      return res.status(404).send();
    }

    res.send(bookmark);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
