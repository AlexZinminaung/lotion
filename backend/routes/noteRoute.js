const { createNote, modifyNote, deleteNote, getAllNotes, getNote } = require('../controllers/noteController')
const express = require("express")
const protected = require("../middlewares/protected")
const router = express.Router()


router.post('/create_note', protected, createNote)
router.put('/modify_note/:id', protected, modifyNote)
router.delete('/delete_note/:id', protected, deleteNote)
router.get('/get_all_notes', protected, getAllNotes)
router.get('/get_note/:id', protected, getNote)

module.exports = router