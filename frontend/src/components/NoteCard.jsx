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
    <div className="bg-[--color-card] rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <div className="p-6 flex-grow cursor-pointer" onClick={() => onView(note)}>
        <h3 className="text-lg font-bold text-[--color-text-dark] mb-2 truncate">
          {note.title}
        </h3>
        <p className="text-sm text-[--color-text-light] leading-relaxed">
          {createSnippet(note.content)}
        </p>
      </div>
      <div className="border-t border-[--color-border] px-6 py-3 flex justify-end space-x-2">
        <button
          onClick={() => onEdit(note)}
          className="text-sm font-medium text-[--color-primary] hover:text-[--color-primary-dark] transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="text-sm font-medium text-[--color-error] hover:opacity-80 transition-opacity"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
