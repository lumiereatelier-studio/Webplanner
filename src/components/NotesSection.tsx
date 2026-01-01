import React, { useState } from 'react';
import { Plus, Trash2, Search } from 'lucide-react';
import { Theme, Note } from '../App';

interface NotesSectionProps {
  theme: Theme;
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

export function NotesSection({ theme, notes, setNotes }: NotesSectionProps) {
  const isDark = theme === 'noir';
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(notes[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedNote = notes.find(n => n.id === selectedNoteId);

  const addNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      category: 'General',
      createdAt: new Date().toISOString()
    };
    setNotes([newNote, ...notes]);
    setSelectedNoteId(newNote.id);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map(note => note.id === id ? { ...note, ...updates } : note));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    if (selectedNoteId === id) {
      setSelectedNoteId(notes[0]?.id || null);
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const inputClass = isDark
    ? 'bg-[#0a0a0a] border border-[#2a2a2a] rounded px-3 py-2 text-[#e0e0e0] outline-none focus:border-[#3a3a3a] transition-colors'
    : 'bg-[#faf8f6] border border-[#e8e3dd] rounded px-3 py-2 text-[#5a4f45] outline-none focus:border-[#c9bfb5] transition-colors';

  return (
    <div className="h-screen flex pb-20 lg:pb-0">
      {/* Notes List Sidebar */}
      <div className={`w-80 border-r flex flex-col ${
        isDark ? 'bg-[#1a1a1a] border-[#2a2a2a]' : 'bg-white border-[#e8e3dd]'
      } hidden md:flex`}>
        <div className="p-4 border-b border-inherit">
          <div className="relative mb-4">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
              isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
            }`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
              className={`w-full pl-10 ${inputClass} text-sm`}
            />
          </div>
          <button
            onClick={addNote}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded transition-colors ${
              isDark
                ? 'bg-[#0a0a0a] text-[#a0a0a0] hover:bg-[#2a2a2a]'
                : 'bg-[#f5f1ed] text-[#8b7e74] hover:bg-[#e8e3dd]'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">New Note</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredNotes.map(note => (
            <div
              key={note.id}
              onClick={() => setSelectedNoteId(note.id)}
              className={`p-4 border-b cursor-pointer transition-colors ${
                selectedNoteId === note.id
                  ? isDark
                    ? 'bg-[#0a0a0a] border-[#3a3a3a]'
                    : 'bg-[#faf8f6] border-[#c9bfb5]'
                  : isDark
                  ? 'border-[#2a2a2a] hover:bg-[#0a0a0a]'
                  : 'border-[#e8e3dd] hover:bg-[#faf8f6]'
              }`}
            >
              <h3 className={`text-sm mb-1 truncate ${
                isDark ? 'text-[#e0e0e0]' : 'text-[#5a4f45]'
              }`}>
                {note.title}
              </h3>
              <p className={`text-xs mb-1 line-clamp-2 ${
                isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
              }`}>
                {note.content || 'No content'}
              </p>
              <span className={`text-xs ${isDark ? 'text-[#4a4a4a]' : 'text-[#c9bfb5]'}`}>
                {note.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Note Editor */}
      <div className="flex-1 flex flex-col">
        {selectedNote ? (
          <>
            <div className={`p-6 border-b flex items-center justify-between ${
              isDark ? 'border-[#2a2a2a]' : 'border-[#e8e3dd]'
            }`}>
              <input
                type="text"
                value={selectedNote.title}
                onChange={(e) => updateNote(selectedNote.id, { title: e.target.value })}
                className={`flex-1 mr-4 ${inputClass}`}
                placeholder="Note title"
              />
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={selectedNote.category}
                  onChange={(e) => updateNote(selectedNote.id, { category: e.target.value })}
                  className={`w-32 ${inputClass} text-sm`}
                  placeholder="Category"
                />
                <button
                  onClick={() => {
                    if (confirm('Delete this note?')) {
                      deleteNote(selectedNote.id);
                    }
                  }}
                  className={isDark ? 'text-[#6a6a6a] hover:text-[#a0a0a0]' : 'text-[#a89a8f] hover:text-[#8b7e74]'}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 p-6">
              <textarea
                value={selectedNote.content}
                onChange={(e) => updateNote(selectedNote.id, { content: e.target.value })}
                className={`w-full h-full resize-none outline-none ${
                  isDark ? 'bg-transparent text-[#e0e0e0]' : 'bg-transparent text-[#5a4f45]'
                }`}
                placeholder="Start writing..."
              />
            </div>
          </>
        ) : (
          <div className={`flex-1 flex items-center justify-center ${
            isDark ? 'text-[#6a6a6a]' : 'text-[#a89a8f]'
          }`}>
            <div className="text-center">
              <p className="mb-4">No note selected</p>
              <button
                onClick={addNote}
                className={`px-4 py-2 rounded transition-colors ${
                  isDark
                    ? 'bg-[#1a1a1a] text-[#a0a0a0] hover:bg-[#2a2a2a]'
                    : 'bg-white text-[#8b7e74] hover:bg-[#faf8f6]'
                }`}
              >
                Create your first note
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
