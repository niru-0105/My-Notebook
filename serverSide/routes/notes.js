const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

console.log("hello")

router.get('/fetchAllNotes', fetchUser, async (req, res) => {

    let allNotes = await Notes.find({ user: req.user.id })
    console.log("hello")
    res.json(allNotes)
})


router.post('/addNote', fetchUser,  async (req, res) => {

    console.log("hello addnote")
    try {
        
        //console.log(req.user.id,req.body.title,req.body.description,req.body.tag)

        let note = new Notes({
            user: req.user.id, title: req.body.title, description: req.body.description, tag: req.body.tag
        })

        let savedNote = await note.save()
        //console.log(savedNote)
        res.json(savedNote)

    }
    catch (error) {
        console.log("some error occured", error)
        res.json({ msg: "some error occured" })
    }
})



router.put('/updateNote/:id', fetchUser, body('title').isLength({ min: 3 }), body('description').isLength({ min: 5 }), async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let newNote={}
        const {title,description,tag}=req.body;

        newNote.title=title
        newNote.description=description
        newNote.tag=tag

        let note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(400).send("not found")
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json(note)

    }
    catch (error) {
        console.log("some error occured", error)
        res.json({ msg: "some error occured" })
    }
    console.log("hello")
})


router.delete('/deleteNote/:id', fetchUser,  async (req, res) => {

    try {
               
        let note = await Notes.findById(req.params.id)
        if(!note){
            return res.status(400).send("not found")
        }
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Sucess":"Deleted sucessfully"})

    }
    catch (error) {
        res.json({ msg: "some error occured" })
    }
    console.log("hello")
})










module.exports = router