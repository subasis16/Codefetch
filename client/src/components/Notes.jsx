import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiSave, FiEdit3, FiArrowLeft, FiLink, FiFileText, FiExternalLink } from 'react-icons/fi';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/useAuth';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const parseContent = (contentRaw) => {
  if (!contentRaw) return { text: '', links: [], pdfUrl: '' };
  
  if (typeof contentRaw === 'object') {
    return {
      text: contentRaw.text || '',
      links: Array.isArray(contentRaw.links) ? contentRaw.links : [],
      pdfUrl: contentRaw.pdfUrl || ''
    };
  }

  try {
    const parsed = JSON.parse(contentRaw);
    if (parsed && typeof parsed === 'object' && ('text' in parsed || 'links' in parsed || 'pdfUrl' in parsed)) {
      return {
        text: parsed.text || '',
        links: Array.isArray(parsed.links) ? parsed.links : [],
        pdfUrl: parsed.pdfUrl || ''
      };
    }
  } catch (e) {
    // legacy text format
  }
  return { text: typeof contentRaw === 'string' ? contentRaw : '', links: [], pdfUrl: '' };
};

const Notes = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [activeNote, setActiveNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editLinks, setEditLinks] = useState([]);
  const [editPdfUrl, setEditPdfUrl] = useState('');
  const [saving, setSaving] = useState(false);
  
  // UI States
  const [activeTab, setActiveTab] = useState('text'); // 'text', 'preview', 'links', 'pdf'
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setFetchError(null);
        
        // Timeout mechanism to prevent infinite loading if Supabase network hangs
        const fetchPromise = supabase
          .from('notes')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Network timeout: Supabase took too long to respond.')), 8000)
        );

        const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);

        if (error) throw error;
        if (isMounted) setNotes(data || []);
      } catch (error) {
        console.error('Error fetching notes:', error.message);
        if (isMounted) setFetchError(error.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (user) {
      fetchNotes();
    }
    return () => { isMounted = false; };
  }, [user]);

  // Auto-save Effect
  useEffect(() => {
    if (!isEditing || !activeNote) return;

    const currentParsed = parseContent(activeNote.content);
    const contentChanged = 
      editContent !== currentParsed.text || 
      JSON.stringify(editLinks) !== JSON.stringify(currentParsed.links) ||
      editPdfUrl !== currentParsed.pdfUrl ||
      editTitle !== activeNote.title;

    if (!contentChanged) return;

    const timeoutId = setTimeout(() => {
      handleSaveNote();
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [editTitle, editContent, editLinks, editPdfUrl, isEditing, activeNote]);

  const handleCreateNote = async () => {
    try {
      const newNoteContent = JSON.stringify({ text: '', links: [], pdfUrl: '' });
      const newNote = {
        title: 'Untitled Note',
        content: newNoteContent,
        user_id: user.id
      };

      const { data, error } = await supabase
        .from('notes')
        .insert([newNote])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        setNotes([data[0], ...notes]);
        handleEditNote(data[0]);
      }
    } catch (error) {
      console.error('Error creating note:', error.message);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setNotes(notes.filter(note => note.id !== id));
      if (activeNote && activeNote.id === id) {
        setActiveNote(null);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error deleting note:', error.message);
    }
  };

  const handleEditNote = (note) => {
    setActiveNote(note);
    setEditTitle(note.title || '');
    const parsed = parseContent(note.content);
    setEditContent(parsed.text);
    setEditLinks(parsed.links);
    setEditPdfUrl(parsed.pdfUrl);
    setIsEditing(true);
    setActiveTab('text');
  };

  const handleSaveNote = async () => {
    if (!activeNote) return;

    try {
      setSaving(true);
      
      let finalLinks = [...editLinks];
      
      // Auto-add pending link if user typed but forgot to click "Add Link"
      if (newLinkTitle.trim() && newLinkUrl.trim()) {
        let finalUrl = newLinkUrl.trim();
        if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
          finalUrl = 'https://' + finalUrl;
        }
        finalLinks.push({ title: newLinkTitle.trim(), url: finalUrl });
        setEditLinks(finalLinks);
        setNewLinkTitle('');
        setNewLinkUrl('');
      }

      // Auto-fix Google Drive links for embedding properly
      let finalPdfUrl = editPdfUrl;
      if (finalPdfUrl && finalPdfUrl.includes('drive.google.com/file/d/')) {
        finalPdfUrl = finalPdfUrl.replace(/\/view.*$/, '/preview');
        setEditPdfUrl(finalPdfUrl);
      }

      const updatedContent = JSON.stringify({
        text: editContent,
        links: finalLinks,
        pdfUrl: finalPdfUrl
      });
      
      const updates = {
        title: editTitle,
        content: updatedContent,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('notes')
        .update(updates)
        .eq('id', activeNote.id);

      if (error) throw error;

      const updatedNotes = notes.map(note =>
        note.id === activeNote.id
          ? { ...note, ...updates }
          : note
      );
      setNotes(updatedNotes);
      setActiveNote({ ...activeNote, ...updates });
    } catch (error) {
      console.error('Error updating note:', error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddLink = () => {
    if (newLinkTitle.trim() && newLinkUrl.trim()) {
      // Basic URL validation/correction
      let finalUrl = newLinkUrl.trim();
      if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        finalUrl = 'https://' + finalUrl;
      }
      setEditLinks([...editLinks, { title: newLinkTitle.trim(), url: finalUrl }]);
      setNewLinkTitle('');
      setNewLinkUrl('');
    }
  };

  const handleRemoveLink = (index) => {
    setEditLinks(editLinks.filter((_, i) => i !== index));
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-6 relative min-h-[75vh] md:min-h-0">

      {/* Sidebar / List of Notes */}
      <div className={`w-full md:w-1/3 flex flex-col gap-4 ${activeNote ? 'hidden md:flex' : 'flex'} h-[75vh] min-h-[500px] md:h-[calc(100vh-140px)] md:min-h-0`}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">My Notes</h2>
          <button
            onClick={handleCreateNote}
            className="flex items-center gap-2 px-3 py-1.5 bg-ossium-accent/10 border border-ossium-accent/20 rounded-lg text-ossium-accent hover:bg-ossium-accent/20 transition-colors text-sm font-medium"
          >
            <FiPlus /> New Note
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {loading ? (
            <div className="text-center py-10 text-ossium-muted text-sm">Loading notes...</div>
          ) : fetchError ? (
            <div className="text-center py-10 text-red-400 text-sm border-2 border-dashed border-red-500/20 rounded-xl">
              Failed to load notes: {fetchError}. Try refreshing.
            </div>
          ) : notes.length === 0 ? (
            <div className="text-center py-10 text-ossium-muted text-sm border-2 border-dashed border-white/5 rounded-xl">
              No notes yet. Create one!
            </div>
          ) : (
            notes.map(note => {
              const parsed = parseContent(note.content);
              return (
                <div
                  key={note.id}
                  onClick={() => handleEditNote(note)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${activeNote?.id === note.id
                    ? 'bg-white/5 border-ossium-accent/50'
                    : 'bg-[#121212] border-white/5 hover:border-white/10'
                    }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-bold truncate ${activeNote?.id === note.id ? 'text-ossium-accent' : 'text-white'}`}>
                      {note.title || 'Untitled Note'}
                    </h3>
                    <span className="text-[10px] text-ossium-muted font-mono whitespace-nowrap ml-2">
                      {new Date(note.created_at || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-ossium-muted line-clamp-2 leading-relaxed">
                    {parsed.text || 'No text content...'}
                  </p>
                  
                  {/* Indicators for attachments */}
                  {(parsed.links?.length > 0 || parsed.pdfUrl) && (
                    <div className="flex gap-2 mt-2">
                      {parsed.links?.length > 0 && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-blue-500/10 text-blue-400 rounded flex items-center gap-1">
                          <FiLink size={10}/> {parsed.links.length}
                        </span>
                      )}
                      {parsed.pdfUrl && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-red-500/10 text-red-400 rounded flex items-center gap-1">
                          <FiFileText size={10}/> PDF
                        </span>
                      )}
                    </div>
                  )}

                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDeleteNote(note.id); }}
                      className="p-1.5 text-ossium-muted hover:text-red-400 transition-colors rounded-lg hover:bg-white/5"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Editor Area */}
      <div className={`flex-1 bg-[#121212] border border-white/5 rounded-xl p-4 md:p-6 flex-col h-[75vh] min-h-[500px] md:h-[calc(100vh-140px)] md:min-h-0 ${activeNote ? 'flex' : 'hidden md:flex'}`}>
        {isEditing ? (
          <>
            <div className="flex flex-col gap-4 mb-4 border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => {
                    setActiveNote(null);
                    setIsEditing(false);
                  }} 
                  className="md:hidden p-2 text-ossium-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <FiArrowLeft size={20} />
                </button>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Note Title"
                  className="bg-transparent text-xl md:text-2xl font-bold text-white focus:outline-none placeholder-white/20 w-full min-w-0"
                />
                <button
                  onClick={handleSaveNote}
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-ossium-accent text-ossium-darker rounded-lg font-bold hover:bg-ossium-accent-hover transition-colors disabled:opacity-50 ml-auto whitespace-nowrap"
                >
                  <FiSave /> <span className="hidden sm:inline">{saving ? 'Saving...' : 'Save'}</span>
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                <button 
                  onClick={() => setActiveTab('text')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'text' ? 'bg-ossium-accent/20 text-ossium-accent' : 'text-ossium-muted hover:text-white hover:bg-white/5'}`}
                >
                  <FiEdit3 /> Write
                </button>
                <button 
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'preview' ? 'bg-ossium-accent/20 text-ossium-accent' : 'text-ossium-muted hover:text-white hover:bg-white/5'}`}
                >
                  <FiFileText /> Preview
                </button>
                <button 
                  onClick={() => setActiveTab('links')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'links' ? 'bg-blue-500/20 text-blue-400' : 'text-ossium-muted hover:text-white hover:bg-white/5'}`}
                >
                  <FiLink /> Links {editLinks.length > 0 && <span className="bg-blue-500/20 px-1.5 rounded-full text-xs">{editLinks.length}</span>}
                </button>
                <button 
                  onClick={() => setActiveTab('pdf')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${activeTab === 'pdf' ? 'bg-red-500/20 text-red-400' : 'text-ossium-muted hover:text-white hover:bg-white/5'}`}
                >
                  <FiFileText /> PDF {editPdfUrl && <span className="bg-red-500/20 w-2 h-2 rounded-full"></span>}
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto min-h-0 scrollbar-thin scrollbar-thumb-white/10 pr-2 flex flex-col">
              {activeTab === 'text' && (
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  placeholder="Write something... Use Markdown, paste commands, or generic text."
                  className="flex-1 w-full h-full min-h-[300px] bg-transparent text-gray-300 font-mono text-sm leading-relaxed resize-none focus:outline-none"
                />
              )}

              {activeTab === 'preview' && (
                <div className="flex-1 bg-transparent text-gray-300 text-sm leading-relaxed overflow-y-auto pr-2 prose prose-invert prose-p:my-2 prose-pre:bg-[#1e1e1e] max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className="bg-white/10 rounded px-1.5 py-0.5 font-mono text-ossium-accent" {...props}>
                            {children}
                          </code>
                        )
                      }
                    }}
                  >
                    {editContent || '*Nothing to preview.*'}
                  </ReactMarkdown>
                </div>
              )}

              {activeTab === 'links' && (
                <div className="flex flex-col gap-4 h-full">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col sm:flex-row gap-3">
                    <input 
                      type="text" 
                      placeholder="Title (e.g. React Docs)" 
                      value={newLinkTitle}
                      onChange={(e) => setNewLinkTitle(e.target.value)}
                      className="flex-1 bg-[#121212] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-ossium-accent/50"
                    />
                    <input 
                      type="url" 
                      placeholder="https://..." 
                      value={newLinkUrl}
                      onChange={(e) => setNewLinkUrl(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddLink()}
                      className="flex-1 bg-[#121212] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-ossium-accent/50"
                    />
                    <button 
                      onClick={handleAddLink}
                      disabled={!newLinkTitle.trim() || !newLinkUrl.trim()}
                      className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-bold hover:bg-blue-500/30 transition-colors disabled:opacity-50 whitespace-nowrap"
                    >
                      Add Link
                    </button>
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    {editLinks.length === 0 ? (
                      <div className="text-center py-10 text-ossium-muted text-sm border-2 border-dashed border-white/5 rounded-xl">
                        No links added yet. Attach relevant URLs here.
                      </div>
                    ) : (
                      editLinks.map((link, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-white/5 border border-white/5 rounded-lg group hover:border-blue-500/30 transition-colors gap-3">
                          <div className="flex flex-col overflow-hidden w-full sm:w-auto">
                            <span className="font-medium text-white text-sm truncate">{link.title}</span>
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline truncate flex items-center gap-1 mt-0.5">
                              {link.url} <FiExternalLink size={10} className="shrink-0" />
                            </a>
                          </div>
                          <button 
                            onClick={() => handleRemoveLink(idx)}
                            className="p-2 text-ossium-muted hover:text-red-400 hover:bg-white/10 rounded-lg transition-colors self-end sm:self-auto"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'pdf' && (
                <div className="flex flex-col gap-4 h-[400px] md:h-full">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col sm:flex-row gap-3">
                    <input 
                      type="url" 
                      placeholder="Paste PDF Link (e.g. from Google Drive or Direct Link)" 
                      value={editPdfUrl}
                      onChange={(e) => setEditPdfUrl(e.target.value)}
                      className="flex-1 bg-[#121212] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-ossium-accent/50 min-w-0"
                    />
                    {editPdfUrl && (
                      <button 
                         onClick={() => setEditPdfUrl('')}
                         className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-bold hover:bg-red-500/30 transition-colors whitespace-nowrap"
                       >
                         Clear
                       </button>
                    )}
                  </div>

                  <div className="flex-1 bg-black/40 rounded-xl border border-white/5 overflow-hidden flex flex-col relative min-h-[300px]">
                    {editPdfUrl ? (
                      <iframe 
                        src={editPdfUrl} 
                        className="w-full h-full min-h-[300px]"
                        title={editTitle || 'PDF Viewer'}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-ossium-muted p-6 text-center">
                        <FiFileText size={48} className="mb-4 opacity-30" />
                        <p className="text-sm font-medium text-white">No PDF Linked</p>
                        <p className="text-xs mt-2 max-w-xs">Provide a valid URL to a PDF file to preview it directly within this note.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-ossium-muted opacity-50">
            <FiEdit3 size={48} className="mb-4" />
            <p className="text-lg text-center px-4">Select a note to view or edit</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Notes;
