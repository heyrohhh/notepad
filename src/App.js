import React, { useState } from 'react';
import './App.css';

function App() {
  const [note, setNote] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleSaveNote = () => {
    if (note.trim() !== '') {
      setSavedNotes([...savedNotes, note]);
      setNote('');
    }
  };

  const handleDeleteNote = (index) => {
    const newNotes = savedNotes.filter((_, i) => i !== index);
    setSavedNotes(newNotes);
  };

  const handleDownloadNote = (index) => {
    const noteToDownload = savedNotes[index];
    const blob = new Blob([noteToDownload], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Rohit_${index + 1}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadNotes = () => {
    const notesToDownload = JSON.stringify(savedNotes);
    const blob = new Blob([notesToDownload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'saved_notes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app">
      <div className="notepad-container">
        <h1>Your Daily Notes</h1>
        <textarea
          className="notepad"
          placeholder="Type your notes here..."
          value={note}
          onChange={handleChange}
        />
        <div className="button-container">
          <button onClick={handleSaveNote}>Save Note</button>
        </div>
      </div>
      
      <div className="saved-notes-container">
        <h2>Saved Notes</h2>
        <ul>
          {savedNotes.map((savedNote, index) => (
            <li key={index}>
              {savedNote}
              <div className="note-buttons">
                <button onClick={() => handleDeleteNote(index)}>Delete</button>
                <button onClick={() => handleDownloadNote(index)}>Download</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
