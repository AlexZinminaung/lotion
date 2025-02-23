const handler = require('express-async-handler')
const Note = require('../models/noteModel')

const createNote = handler(async (req, res) => {
    let {title, text} = req.body
    if (!text)
    {
        text = ''
    }

    if (!title)
    {
        res.status(400)
        throw new Error('Put title')
    }

    const existedNote = await Note.findOne({title})
    if (existedNote)
    {
        res.status(400)
        throw new Error('Title is taken')
    }

    const note = await Note.create({user: req.user._id, title, text})
    res.status(201).json({note})
    
})

const modifyNote = handler(async (req, res) => {
    const id = req.params.id
    const {title, text} = req.body

    if (!title)
    {
        res.status(400)
        throw new Error('need title to modify')
    }

    const note = await Note.findById(id)

    if (!note)
    {
        res.status(404)
        throw new Error('note not found')
    }

    if (note.user.toString() !== req.user._id.toString())
    {
        res.status(401)
        throw new Error('Not authorized')
    }

    const newNote = await Note.findByIdAndUpdate(id, {title, text}, {new: true})

    res.status(200).json(newNote)
})

const deleteNote = handler(async (req, res) => {
    const id = req.params.id
    const note = await Note.findOne({_id: id})

    if (!note)
    {
        res.status(404)
        throw new Error('Note not found')
    }

    if (note.user.toString() !== req.user._id.toString())
        {
            res.status(401)
            throw new Error('Not authorized')
        }

    await Note.findByIdAndDelete(id)
    res.status(200).json({message: `delete note ${id}`})
})

const getNote = handler(async (req, res) => {
    const id = req.params.id
    const note = await Note.findById(id)
    if (!note)
    {
        res.status(404)
        throw new Error('Note not found')
    }

    if (note.user.toString() !== req.user._id.toString())
        {
            res.status(401)
            throw new Error('Not authorized')
        }

    res.status(200).json(note)
})


const getAllNotes = handler(async (req, res) => {
    const note = await Note.find({user: req.user._id}).sort({ createdAt: -1 })
    res.status(200).json(note)
})




module.exports = {createNote, modifyNote, deleteNote, getAllNotes, getNote}