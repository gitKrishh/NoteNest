// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { getNotes, createNote, deleteNote, updateNote } from '../services/api';
import NoteCard from '../components/NoteCard.jsx';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

const HomePage = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);

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

    const handleCreateNote = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const newNote = { title, content };
            const response = await createNote(newNote);
            setNotes([response.data, ...notes]);
            setTitle('');
            setContent('');
        } catch (err) {
            setError('Failed to create note.');
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            await deleteNote(id);
            setNotes(notes.filter((note) => note._id !== id));
        } catch (err) {
            setError('Failed to delete note.');
        }
    };

    const handleUpdateNote = async (e) => {
        e.preventDefault();
        if (!currentNote) return;
        try {
            const response = await updateNote(currentNote._id, { title: currentNote.title, content: currentNote.content });
            setNotes(notes.map(note => (note._id === currentNote._id ? response.data : note)));
            closeEditModal();
        } catch (err) {
            setError('Failed to update note.');
        }
    };

    const openEditModal = (note) => {
        setCurrentNote({ ...note });
        setIsEditModalOpen(true);
    };
    const closeEditModal = () => setIsEditModalOpen(false);

    const openViewModal = (note) => {
        setCurrentNote(note);
        setIsViewModalOpen(true);
    };
    const closeViewModal = () => setIsViewModalOpen(false);

    if (loading) {
        return <div className="text-center p-10 text-gray-500">Loading notes...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Create a New Note</h2>
                {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
                <form onSubmit={handleCreateNote} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Add Note
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.length > 0 ? (
                    notes.map((note) => (
                        <NoteCard
                            key={note._id}
                            note={note}
                            onView={openViewModal}
                            onEdit={openEditModal}
                            onDelete={handleDeleteNote}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full text-center py-10">You have no notes yet. Create one above!</p>
                )}
            </div>

            <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Edit Note</h3>
                <form onSubmit={handleUpdateNote} className="space-y-4">
                    <input
                        type="text"
                        value={currentNote?.title || ''}
                        onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <textarea
                        rows="6"
                        value={currentNote?.content || ''}
                        onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <div className="flex justify-end space-x-3 mt-4">
                        <button type="button" onClick={closeEditModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Changes</button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={isViewModalOpen} onClose={closeViewModal}>
                <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 pb-2 text-gray-900">{currentNote?.title}</h2>
                <div
                    className="prose max-w-none text-gray-800"
                    dangerouslySetInnerHTML={{ __html: currentNote?.content || '' }}
                />
                <div className="mt-6 flex justify-end">
                    <button onClick={closeViewModal} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Close</button>
                </div>
            </Modal>
        </div>
    );
};

export default HomePage;
