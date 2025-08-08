// src/components/NoteCard.jsx
import React from 'react';

const NoteCard = ({ note, onView, onEdit, onDelete }) => {
  const createSnippet = (htmlContent) => {
    if (!htmlContent) return '';
    const strippedHtml = htmlContent.replace(/<[^>]*>?/gm, ' ');
    return strippedHtml.length > 100
      ? strippedHtml.substring(0, 100) + '...'
      : strippedHtml;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="p-6 flex-grow cursor-pointer" onClick={() => onView(note)}>
        <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
          {note.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {createSnippet(note.content)}
        </p>
      </div>
      <div className="border-t border-gray-200 px-6 py-3 flex justify-end space-x-3">
        <button
          onClick={() => onEdit(note)}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
