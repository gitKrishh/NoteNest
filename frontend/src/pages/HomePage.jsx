import React, { useState, useEffect } from 'react';
import { getNotes, createNote, deleteNote, updateNote } from '../services/api';
import {
    Container, Box, Typography, TextField, Button, Grid, Card, CardContent,
    CardActions, CircularProgress, Alert, Modal, Dialog, DialogTitle,
    DialogContent, DialogActions, Chip, Stack
} from '@mui/material';


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const HomePage = () => {
    // State for the list of notes
    const [notes, setNotes] = useState([]);
    // State for the new note form
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // State for loading and errors
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState(null); // The note being edited
    const [editText, setEditText] = useState({ title: '', content: '' });
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [noteToView, setNoteToView] = useState(null);


    // --- Fetch all notes when the component mounts ---
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await getNotes();
                setNotes(response.data);
            } catch (err) {
                setError('Failed to fetch notes.');
            } finally {
                setLoading(false);
            }
        };
        fetchNotes();
    }, []);

    // --- Handle creating a new note ---
    const handleCreateNote = async (e) => {
        e.preventDefault();
        try {
            const newNote = { title, content };
            const response = await createNote(newNote);
            // Add the new note to the top of the list for instant UI update
            setNotes([response.data, ...notes]);
            // Clear the form
            setTitle('');
            setContent('');
        } catch (err) {
            setError('Failed to create note.');
        }
    };

    const handleOpenModal = (note) => {
        setCurrentNote(note);
        setEditText({ title: note.title, content: note.content });
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentNote(null);
        setEditText({ title: '', content: '' });
    };

    // --- Handle deleting a note ---
    const handleDeleteNote = async (id) => {
        try {
            await deleteNote(id);
            // Filter out the deleted note for instant UI update
            setNotes(notes.filter((note) => note._id !== id));
        } catch (err) {
            setError('Failed to delete note.');
        }
    };

    const handleUpdateNote = async (e) => {
        e.preventDefault();
        try {
            const response = await updateNote(currentNote._id, editText);
            // Update the note in the state
            setNotes(notes.map(note => (note._id === currentNote._id ? response.data : note)));
            handleCloseModal();
        } catch (err) {
            setError('Failed to update note.');
        }
    };

    // --- New functions to handle the View modal ---
    const handleOpenViewModal = (note) => {
        setNoteToView(note);
        setIsViewModalOpen(true);
    };

    const handleCloseViewModal = () => {
        setIsViewModalOpen(false);
        setNoteToView(null);
    };

    if (loading) {
        return <CircularProgress sx={{ display: 'block', margin: '2rem auto' }} />;
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    My Notes
                </Typography>

                {/* --- Create Note Form --- */}
                <Box component="form" onSubmit={handleCreateNote} sx={{ mb: 4 }}>
                    <Typography variant="h6">Create a New Note</Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    <TextField
                        label="Title"
                        fullWidth
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Content"
                        fullWidth
                        required
                        multiline
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Add Note
                    </Button>
                </Box>

                {/* --- Display Notes --- */}
<Grid container spacing={3}>
    {notes.length > 0 ? (
        notes.map((note) => (
            <Grid item key={note._id} xs={12} sm={6} md={4}>
                <Card>
                    <CardContent>
                        {/* The onClick here will open the new view modal */}
                        <Typography
                            variant="h5"
                            component="div"
                            onClick={() => handleOpenViewModal(note)}
                            sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                        >
                            {note.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                            {/* noWrap will truncate long text with an ellipsis */}
                            {note.content}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {/* The new "View" button */}
                        <Button size="small" onClick={() => handleOpenViewModal(note)}>View</Button>
                        <Button size="small" onClick={() => handleOpenModal(note)}>Edit</Button>
                        <Button size="small" color="error" onClick={() => handleDeleteNote(note._id)}>Delete</Button>
                    </CardActions>
                </Card>
            </Grid>
        ))
                    ) : (
                        <Typography sx={{ ml: 2 }}>You have no notes yet. Create one above!</Typography>
                    )}
                </Grid>
                <Modal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    aria-labelledby="edit-note-modal-title"
                >
                    <Box sx={modalStyle} component="form" onSubmit={handleUpdateNote}>
                        <Typography id="edit-note-modal-title" variant="h6" component="h2">
                            Edit Note
                        </Typography>
                        <TextField
                            label="Title"
                            fullWidth
                            required
                            value={editText.title}
                            onChange={(e) => setEditText({ ...editText, title: e.target.value })}
                            margin="normal"
                        />
                        <TextField
                            label="Content"
                            fullWidth
                            required
                            multiline
                            rows={4}
                            value={editText.content}
                            onChange={(e) => setEditText({ ...editText, content: e.target.value })}
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Save Changes</Button>
                    </Box>
                </Modal>

               
            {/* --- Improved View Note Dialog (The New Part) --- */}
            <Dialog
                open={isViewModalOpen}
                onClose={handleCloseViewModal}
                fullWidth={true}
                maxWidth="md"
                aria-labelledby="view-note-dialog-title"
            >
                <DialogTitle id="view-note-dialog-title">
                    {noteToView?.title}
                </DialogTitle>
                <DialogContent dividers>
                    {/* This Box will correctly render the formatted HTML content */}
                    <Box
                        dangerouslySetInnerHTML={{ __html: noteToView?.content || '' }}
                        sx={{
                            // Add some basic styling for the content
                            '& p': { margin: 0 },
                            '& ol, & ul': { pl: 3 },
                            lineHeight: 1.75,
                            wordWrap: 'break-word',
                        }}
                    />

                    {/* Display tags if they exist */}
                    {noteToView?.tags && noteToView.tags.length > 0 && (
                        <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
                            {noteToView.tags.map((tag, index) => (
                                <Chip key={index} label={tag} />
                            ))}
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'space-between', px: 3 }}>
                    {/* Display the last updated date */}
                    <Typography variant="caption" color="text.secondary">
                        Last updated: {noteToView ? new Date(noteToView.updatedAt).toLocaleDateString() : ''}
                    </Typography>
                    <Button onClick={handleCloseViewModal}>Close</Button>
                </DialogActions>
            </Dialog>
            </Box>
        </Container>
    );
};

export default HomePage;