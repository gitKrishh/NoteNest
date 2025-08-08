const Note = require('../models/noteModel.js');

// @desc    Get all notes for a user
// @route   GET /api/notes
// @access  Private
const getNotes = async (req, res) => {
    const notes = await Note.find({ user: req.user._id }).sort({ updatedAt: -1 });
    res.json(notes);
};

// @desc    Create a single note
// @route   POST /api/notes
// @access  Private
const createNote = async (req, res) => {
    const { title, content, tags } = req.body;

    if (!title || !content) {
        res.status(400);
        throw new Error('Please add a title and content');
    }

    const note = await Note.create({
        user: req.user._id,
        title,
        content,
        tags,
    });

    res.status(201).json(note);
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
        res.status(404);
        throw new Error('Note not found');
    }

    // Check if the note belongs to the logged-in user
    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Return the modified document
    });

    res.json(updatedNote);
};


// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (!note) {
        res.status(404);
        throw new Error('Note not found');
    }

    // Check for user ownership
    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await note.deleteOne();

    res.json({ id: req.params.id, message: 'Note removed' });
};


module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
};