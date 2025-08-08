import React, { useState, useEffect } from 'react';
import { getNotes, createNote, deleteNote } from '../services/api';
import { Container, Box, Typography, TextField, Button, Grid, Card, CardContent, CardActions, CircularProgress, Alert } from '@mui/material';

const HomePage = () => {
    // State for the list of notes
    const [notes, setNotes] = useState([]);
    // State for the new note form
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // State for loading and errors
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
                                        <Typography variant="h5" component="div">
                                            {note.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {note.content}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" disabled>Edit</Button> {/* Edit is a challenge for you! */}
                                        <Button size="small" color="error" onClick={() => handleDeleteNote(note._id)}>
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography sx={{ ml: 2 }}>You have no notes yet. Create one above!</Typography>
                    )}
                </Grid>
            </Box>
        </Container>
    );
};

export default HomePage;