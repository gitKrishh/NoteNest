const express = require('express');
const router = express.Router();
const {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
} = require('../controllers/noteController.js');
const { protect } = require('../middleware/authMiddleware.js');

// All these routes are protected by the 'protect' middleware
router.route('/').get(protect, getNotes).post(protect, createNote);
router.route('/:id').put(protect, updateNote).delete(protect, deleteNote);

module.exports = router;