'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface User {
  username: string;
  role: string;
}

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  status: 'Draft' | 'Published';
  featuredImage: string;
  createdAt: string;
}

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(true);

  // Login form state
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard state
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [postsError, setPostsError] = useState<string | null>(null);

  // Editor form state
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null); // null means creating new post
  const [editorTitle, setEditorTitle] = useState('');
  const [editorSummary, setEditorSummary] = useState('');
  const [editorStatus, setEditorStatus] = useState<'Draft' | 'Published'>('Draft');
  const [editorImage, setEditorImage] = useState('');
  const [imageError, setImageError] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSavingForm, setIsSavingForm] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Silent Refresh on mount to see if user is already logged in (via refresh token HTTP cookie)
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await fetch('/api/auth/refresh');
        if (res.ok) {
          const data = await res.json();
          setToken(data.accessToken);
          setUser(data.user);
        }
      } catch (err) {
        console.error('Auth refresh failed:', err);
      } finally {
        setIsRefreshing(false);
      }
    };
    checkAuthStatus();
  }, []);

  // 2. Fetch all posts (including drafts) when token is available
  const fetchAllPosts = async (accessToken: string) => {
    setIsLoadingPosts(true);
    setPostsError(null);
    try {
      const res = await fetch('/api/blogs?status=all', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch posts');
      setPosts(data.posts || []);
    } catch (err: any) {
      setPostsError(err.message);
    } finally {
      setIsLoadingPosts(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllPosts(token);
    }
  }, [token]);

  // 3. Handle login action
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput || !passwordInput) {
      setAuthError('Please fill in all fields');
      return;
    }

    setAuthError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput }),
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      setToken(data.accessToken);
      setUser(data.user);
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // 4. Handle logout action
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setToken(null);
      setUser(null);
      setPosts([]);
      setIsEditing(false);
      setEditingPost(null);
    }
  };

  // 5. Handle image upload (strictly below 1MB validation)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side size validation: strictly under 1MB (1,048,576 bytes)
    const ONE_MB = 1024 * 1024;
    if (file.size >= ONE_MB) {
      setImageError(`Image size too large (${(file.size / ONE_MB).toFixed(2)}MB). Must be strictly under 1MB.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    // Mime type validation
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setImageError('Only JPG, PNG, and WEBP image formats are allowed.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setImageError(null);
    setIsUploadingImage(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setEditorImage(data.url);
    } catch (err: any) {
      setImageError(err.message);
    } finally {
      setIsUploadingImage(false);
    }
  };

  // 6. Editor actions (execCommand for formatting)
  const executeCommand = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  // 7. Save blog post (create or update)
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const editorContent = editorRef.current?.innerHTML || '';

    // Validation
    if (!editorTitle.trim()) {
      setFormError('Title is required');
      return;
    }
    if (!editorSummary.trim()) {
      setFormError('SEO Summary is required');
      return;
    }
    if (editorSummary.length > 200) {
      setFormError('SEO Summary must be 200 characters or less');
      return;
    }
    if (!editorImage) {
      setFormError('Featured image is required');
      return;
    }
    if (!editorContent.replace(/<[^>]*>/g, '').trim()) {
      setFormError('Article content cannot be empty');
      return;
    }

    setFormError(null);
    setIsSavingForm(true);

    const postData = {
      title: editorTitle,
      summary: editorSummary,
      content: editorContent,
      status: editorStatus,
      featuredImage: editorImage,
    };

    try {
      const url = editingPost 
        ? `/api/blogs/${editingPost.slug}`
        : '/api/blogs';
      const method = editingPost ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save blog post');
      }

      // Close editor and reload list
      setIsEditing(false);
      setEditingPost(null);
      fetchAllPosts(token!);
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setIsSavingForm(false);
    }
  };

  // 8. Delete blog post
  const handleDeletePost = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const res = await fetch(`/api/blogs/${slug}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete blog post');
      }

      fetchAllPosts(token!);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // 9. Quick toggle blog status (Draft / Published) directly from the list
  const handleToggleStatus = async (slug: string, newStatus: 'Draft' | 'Published') => {
    try {
      const res = await fetch(`/api/blogs/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update status');
      }

      fetchAllPosts(token!);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Populate editor fields for editing
  const openEditForm = (post: BlogPost) => {
    setEditingPost(post);
    setEditorTitle(post.title);
    setEditorSummary(post.summary);
    setEditorStatus(post.status);
    setEditorImage(post.featuredImage);
    setFormError(null);
    setImageError(null);
    setIsEditing(true);
    
    // Set contentEditable content after rendering completes
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = post.content;
      }
    }, 50);
  };

  // Open empty editor for creating new post
  const openCreateForm = () => {
    setEditingPost(null);
    setEditorTitle('');
    setEditorSummary('');
    setEditorStatus('Draft');
    setEditorImage('');
    setFormError(null);
    setImageError(null);
    setIsEditing(true);

    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = '<p><br></p>';
      }
    }, 50);
  };

  // Render Auth Loader
  if (isRefreshing) {
    return (
      <div className="w-full flex-grow flex items-center justify-center py-20">
        <div className="glass-panel p-8 rounded-3xl border border-gold/30 text-center max-w-sm w-full mx-4 bg-surface-dark/90">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gold mx-auto mb-4" />
          <p className="text-text-primary/70 font-light text-sm">Securing administrative console...</p>
        </div>
      </div>
    );
  }

  // Render Login overlay if not logged in
  if (!token) {
    return (
      <div className="w-full flex-grow flex items-center justify-center py-12">
        <div className="glass-panel p-8 md:p-10 rounded-3xl border border-gold-border/40 shadow-2xl max-w-md w-full relative bg-surface-dark/80">
          
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-text-primary/40 hover:text-text-primary transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
          </button>

          <div className="text-center mb-8">
            <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Secure Access Only</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-text-primary mt-1">
              Kyochi Choolaimedu <span className="gold-shimmer-text">Admin</span>
            </h2>
            <p className="text-xs text-text-primary/50 font-light mt-2">
              Sign in to manage Kyochi Choolaimedu's foot reflexology blog.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-widest font-semibold text-text-primary/70 mb-2">Username</label>
              <input 
                type="text" 
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Enter admin username"
                className="w-full px-4 py-3 rounded-xl bg-surface-dark border border-gold-border/20 text-text-primary text-sm focus:border-gold focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-semibold text-text-primary/70 mb-2">Password</label>
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl bg-surface-dark border border-gold-border/20 text-text-primary text-sm focus:border-gold focus:outline-none transition-colors"
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-700 text-xs rounded-xl text-center">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 rounded-xl bg-gold text-black font-semibold text-sm hover:bg-gold-light hover:shadow-[0_4px_25px_rgba(201,168,76,0.3)] transition-all duration-300 disabled:opacity-50"
            >
              {isLoggingIn ? 'Verifying Identity...' : 'Access Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Render Admin Dashboard
  return (
    <div className="w-full min-h-screen bg-bg-dark flex flex-col">
        
        {/* Dashboard Header */}
        <header className="p-4 md:p-6 border-b border-gold-border/20 flex flex-wrap items-center justify-between gap-4 bg-surface-dark/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Administrative Mode</span>
            </div>
            <h2 className="font-display text-xl md:text-2xl font-bold text-text-primary">
              Blog Control Panel
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-text-primary/70 font-light hidden sm:inline">
              Welcome, <strong className="font-semibold text-gold">{user?.username}</strong> ({user?.role})
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg border border-gold-border/30 text-[11px] font-semibold text-text-primary/75 hover:bg-gold/10 hover:text-text-primary transition-all duration-300 uppercase tracking-wider cursor-pointer"
            >
              Sign Out
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-text-primary/5 hover:bg-text-primary/10 text-text-primary transition-colors cursor-pointer"
              title="Close Panel"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
            </button>
          </div>
        </header>

        {/* Content Container (List or Editor) */}
        <div className="flex-grow overflow-y-auto p-6 md:p-12 lg:p-20">
          
          {isEditing ? (
            /* ========================================================
               EDITOR VIEW
               ======================================================== */
            <form onSubmit={handleSavePost} className="space-y-8 max-w-6xl mx-auto">
              
              <div className="flex items-center justify-between border-b border-gold-border/10 pb-4">
                <h3 className="font-display text-2xl font-bold text-text-primary">
                  {editingPost ? 'Modify Article' : 'Compose New Article'}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingPost(null);
                  }}
                  className="text-sm text-text-primary/60 hover:text-text-primary uppercase tracking-widest font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" x2="5" y1="12" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                  <span>Discard</span>
                </button>
              </div>

              {formError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-700 text-xs rounded-xl text-center">
                  {formError}
                </div>
              )}

              {/* Title input */}
              <div>
                <label className="block text-sm uppercase tracking-widest font-semibold text-text-primary/80 mb-2">Title</label>
                <input
                  type="text"
                  value={editorTitle}
                  onChange={(e) => setEditorTitle(e.target.value)}
                  placeholder="e.g. 5 Benefits of Foot Reflexology for Sleep"
                  className="w-full px-5 py-4 rounded-xl bg-surface-dark border border-gold-border/20 text-text-primary text-base md:text-lg focus:border-gold focus:outline-none transition-colors"
                />
              </div>

              {/* SEO Summary */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm uppercase tracking-widest font-semibold text-text-primary/80">SEO Summary / Meta Description</label>
                  <span className={`text-xs ${editorSummary.length > 200 ? 'text-red-500' : 'text-text-primary/40'}`}>
                    {editorSummary.length} / 200 chars
                  </span>
                </div>
                <textarea
                  value={editorSummary}
                  onChange={(e) => setEditorSummary(e.target.value)}
                  placeholder="Write a concise SEO summary for browser snippets. Recommended under 160 characters."
                  rows={2}
                  className="w-full px-5 py-4 rounded-xl bg-surface-dark border border-gold-border/20 text-text-primary text-base focus:border-gold focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Image Upload Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                
                {/* File picker */}
                <div>
                  <label className="block text-sm uppercase tracking-widest font-semibold text-text-primary/80 mb-2">Featured Image</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/jpeg,image/jpg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
                    className="hidden"
                  />
                  
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploadingImage}
                      className="px-5 py-4 rounded-xl border border-gold-border/30 bg-surface-dark text-sm font-semibold text-text-primary hover:bg-gold/15 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                      <span>{isUploadingImage ? 'Uploading image...' : 'Choose Image File'}</span>
                    </button>
                    
                    {editorImage && (
                      <button
                        type="button"
                        onClick={() => setEditorImage('')}
                        className="px-3 py-3 rounded-xl border border-red-500/30 bg-red-500/5 text-xs font-semibold text-red-700 hover:bg-red-500/10 transition-all cursor-pointer"
                        title="Remove Image"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] text-text-primary/45 mt-2">
                    Supported: JPG, PNG, WEBP. File size must be **strictly below 1MB**.
                  </p>
                  
                  {imageError && (
                    <p className="text-xs text-red-600 font-semibold mt-2">{imageError}</p>
                  )}
                </div>

                {/* Image Preview */}
                <div>
                  <label className="block text-sm uppercase tracking-widest font-semibold text-text-primary/80 mb-2">Preview</label>
                  {editorImage ? (
                    <div className="relative h-40 w-72 rounded-xl overflow-hidden border border-gold-border/30 bg-surface-dark">
                      <Image 
                        src={editorImage} 
                        alt="Featured upload preview" 
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-40 w-72 rounded-xl border border-dashed border-gold-border/30 flex items-center justify-center bg-surface-dark/20 text-text-primary/30 text-sm font-light">
                      No image selected
                    </div>
                  )}
                </div>

              </div>

              {/* Status and Actions Row */}
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <label className="block text-sm uppercase tracking-widest font-semibold text-text-primary/80 mb-2">Publishing Status</label>
                  <select
                    value={editorStatus}
                    onChange={(e) => setEditorStatus(e.target.value as any)}
                    className="px-5 py-3 rounded-xl bg-surface-dark border border-gold-border/20 text-text-primary text-base focus:border-gold focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Draft">Draft (Hidden from readers)</option>
                    <option value="Published">Published (Publicly visible)</option>
                  </select>
                </div>
              </div>

              {/* Rich Text Editor */}
              <div>
                <label className="block text-sm uppercase tracking-widest font-semibold text-text-primary/80 mb-2">Article Body (Rich Text)</label>
                
                {/* WYSIWYG Styling Toolbar */}
                <div className="flex flex-wrap gap-1 bg-surface-dark border border-gold-border/20 p-2 rounded-t-xl border-b-0">
                  <button
                    type="button"
                    onClick={() => executeCommand('bold')}
                    className="p-2 hover:bg-gold/25 text-text-primary rounded text-xs font-bold w-8 h-8 flex items-center justify-center cursor-pointer"
                    title="Bold"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand('italic')}
                    className="p-2 hover:bg-gold/25 text-text-primary rounded text-xs italic w-8 h-8 flex items-center justify-center cursor-pointer"
                    title="Italic"
                  >
                    I
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand('underline')}
                    className="p-2 hover:bg-gold/25 text-text-primary rounded text-xs underline w-8 h-8 flex items-center justify-center cursor-pointer"
                    title="Underline"
                  >
                    U
                  </button>
                  <div className="w-px h-6 bg-gold-border/20 mx-1 self-center" />
                  
                  {/* Headings */}
                  <button
                    type="button"
                    onClick={() => executeCommand('formatBlock', 'H2')}
                    className="px-2 hover:bg-gold/25 text-text-primary rounded text-[11px] font-bold h-8 flex items-center justify-center cursor-pointer"
                    title="Heading 2"
                  >
                    Heading 2
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand('formatBlock', 'H3')}
                    className="px-2 hover:bg-gold/25 text-text-primary rounded text-[11px] font-bold h-8 flex items-center justify-center cursor-pointer"
                    title="Heading 3"
                  >
                    Heading 3
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand('formatBlock', 'P')}
                    className="px-2 hover:bg-gold/25 text-text-primary rounded text-[11px] h-8 flex items-center justify-center cursor-pointer"
                    title="Normal Paragraph"
                  >
                    Paragraph
                  </button>
                  <div className="w-px h-6 bg-gold-border/20 mx-1 self-center" />

                  {/* Lists */}
                  <button
                    type="button"
                    onClick={() => executeCommand('insertUnorderedList')}
                    className="p-1 hover:bg-gold/25 text-text-primary rounded text-xs h-8 w-8 flex items-center justify-center cursor-pointer"
                    title="Bullet List"
                  >
                    • List
                  </button>
                  <button
                    type="button"
                    onClick={() => executeCommand('insertOrderedList')}
                    className="p-1 hover:bg-gold/25 text-text-primary rounded text-xs h-8 w-8 flex items-center justify-center cursor-pointer"
                    title="Numbered List"
                  >
                    1. List
                  </button>

                  <div className="w-px h-6 bg-gold-border/20 mx-1 self-center" />
                  
                  <button
                    type="button"
                    onClick={() => executeCommand('removeFormat')}
                    className="p-2 hover:bg-gold/25 text-text-primary rounded text-[10px] h-8 flex items-center justify-center cursor-pointer"
                    title="Clear Formatting"
                  >
                    Clear Format
                  </button>
                </div>

                {/* Editor canvas */}
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  className="w-full min-h-[400px] max-h-[700px] overflow-y-auto px-6 py-5 rounded-b-xl border border-gold-border/20 bg-bg-dark text-text-primary/95 text-lg leading-relaxed focus:border-gold focus:outline-none focus:ring-0 prose-editor"
                />
              </div>

              {/* Actions Footer */}
              <div className="flex justify-end gap-3 border-t border-gold-border/10 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingPost(null);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-gold-border/30 text-xs font-semibold text-text-primary hover:bg-text-primary/5 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={isSavingForm}
                  className="px-6 py-2.5 rounded-xl bg-gold text-black font-semibold text-xs hover:bg-gold-light hover:shadow-[0_4px_20px_rgba(201,168,76,0.3)] transition-all duration-300 disabled:opacity-50 cursor-pointer"
                >
                  {isSavingForm ? 'Saving Changes...' : 'Save & Close'}
                </button>
              </div>

            </form>
          ) : (
            /* ========================================================
               DASHBOARD LIST VIEW
               ======================================================== */
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-text-primary">
                    Articles List
                  </h3>
                  <p className="text-xs text-text-primary/55 font-light mt-0.5">
                    Create, edit, delete, or change publish status of posts.
                  </p>
                </div>
                
                <button
                  onClick={openCreateForm}
                  className="px-5 py-2.5 rounded-xl bg-gold text-black font-semibold text-xs hover:bg-gold-light hover:shadow-[0_4px_20px_rgba(201,168,76,0.25)] transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
                  <span>Write New Blog</span>
                </button>
              </div>

              {postsError && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-700 text-xs rounded-xl text-center">
                  {postsError}
                </div>
              )}

              {isLoadingPosts ? (
                <div className="py-20 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold mx-auto mb-4" />
                  <p className="text-xs text-text-primary/50">Fetching articles...</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="py-20 text-center border border-dashed border-gold-border/20 rounded-2xl bg-surface-dark/10">
                  <svg className="mx-auto h-10 w-10 text-text-primary/30 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm font-semibold text-text-primary/70">No articles yet</p>
                  <p className="text-xs text-text-primary/50 font-light mt-1">Get started by creating your first reflexology post.</p>
                </div>
              ) : (
                <>
                  {/* MOBILE LIST VIEW */}
                  <div className="grid grid-cols-1 gap-4 md:hidden">
                    {posts.map((post) => (
                      <div key={post._id} className="p-4 rounded-2xl border border-gold-border/20 bg-surface-dark/15 flex flex-col gap-3 shadow-sm">
                        <div className="flex gap-3">
                          {post.featuredImage && (
                            <div className="relative h-14 w-20 rounded-lg overflow-hidden shrink-0 border border-gold-border/20 bg-surface-dark/10">
                              <Image src={post.featuredImage} alt="" fill className="object-cover" sizes="80px" />
                            </div>
                          )}
                          <div className="min-w-0 flex-grow">
                            <h4 className="font-semibold text-text-primary text-sm line-clamp-2 leading-snug">{post.title}</h4>
                            <span className="text-[9px] text-text-primary/50 font-mono block truncate mt-1">
                              /blog/{post.slug}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-gold-border/10 pt-3 mt-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-text-primary/50 font-light">Status:</span>
                            <select
                              value={post.status}
                              onChange={(e) => handleToggleStatus(post.slug, e.target.value as 'Draft' | 'Published')}
                              className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider cursor-pointer border focus:outline-none transition-all duration-300 ${
                                post.status === 'Published'
                                  ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-700'
                                  : 'bg-yellow-500/10 border-yellow-500/25 text-yellow-700'
                              }`}
                            >
                              <option value="Draft" className="bg-surface-dark text-text-primary">Draft</option>
                              <option value="Published" className="bg-surface-dark text-text-primary">Published</option>
                            </select>
                          </div>

                          <span className="text-[10px] text-text-primary/60 font-light">
                            {new Date(post.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>

                        <div className="flex gap-2 border-t border-gold-border/10 pt-3">
                          <button
                            onClick={() => openEditForm(post)}
                            className="flex-1 py-2 rounded-xl border border-gold-border/30 text-xs font-semibold text-text-primary hover:bg-gold/15 transition-all text-center cursor-pointer bg-surface-dark/10"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.slug)}
                            className="flex-1 py-2 rounded-xl border border-red-500/35 bg-red-500/5 text-xs font-semibold text-red-700 hover:bg-red-500/10 transition-all text-center cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* DESKTOP TABLE VIEW */}
                  <div className="hidden md:block overflow-x-auto border border-gold-border/25 rounded-2xl bg-surface-dark/15 shadow-[0_5px_15px_rgba(0,0,0,0.05)]">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface-dark/40 text-[10px] uppercase tracking-widest font-semibold text-text-primary/80 border-b border-gold-border/20">
                          <th className="p-4">Post Info</th>
                          <th className="p-4 text-center">Status</th>
                          <th className="p-4">Date Created</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gold-border/10 text-sm">
                        {posts.map((post) => (
                          <tr key={post._id} className="hover:bg-gold/5 transition-colors">
                              {/* Title & Slug */}
                            <td className="p-4 max-w-xs sm:max-w-md">
                              <div className="flex items-center gap-3">
                                {post.featuredImage && (
                                  <div className="relative h-10 w-14 rounded-lg overflow-hidden shrink-0 border border-gold-border/20">
                                    <Image src={post.featuredImage} alt="" fill className="object-cover" sizes="56px" />
                                  </div>
                                )}
                                <div>
                                  <h4 className="font-semibold text-text-primary line-clamp-2 whitespace-normal pr-4">{post.title}</h4>
                                  <span className="text-[10px] text-text-primary/50 font-mono tracking-tight block truncate mt-0.5">
                                    /blog/{post.slug}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Status Select Toggle */}
                            <td className="p-4 text-center shrink-0">
                              <select
                                value={post.status}
                                onChange={(e) => handleToggleStatus(post.slug, e.target.value as 'Draft' | 'Published')}
                                className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer border focus:outline-none transition-all duration-300 ${
                                  post.status === 'Published'
                                    ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-700 hover:bg-emerald-500/20'
                                    : 'bg-yellow-500/10 border-yellow-500/25 text-yellow-700 hover:bg-yellow-500/20'
                                }`}
                              >
                                <option value="Draft" className="bg-surface-dark text-text-primary">Draft</option>
                                <option value="Published" className="bg-surface-dark text-text-primary">Published</option>
                              </select>
                            </td>

                            {/* Created Date */}
                            <td className="p-4 text-xs text-text-primary/70 font-light shrink-0">
                              {new Date(post.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </td>

                            {/* Actions */}
                            <td className="p-4 text-right shrink-0">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => openEditForm(post)}
                                  className="px-2.5 py-1 rounded-lg border border-gold-border/30 text-xs font-semibold text-text-primary hover:bg-gold/15 transition-all cursor-pointer"
                                >
                                  Edit
                                </button>
                                
                                <button
                                  onClick={() => handleDeletePost(post.slug)}
                                  className="px-2.5 py-1 rounded-lg border border-red-500/35 bg-red-500/5 text-xs font-semibold text-red-700 hover:bg-red-500/10 transition-all cursor-pointer"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

            </div>
          )}

        </div>
      
      {/* Editor CSS overrides for contentEditable */}
      <style>{`
        .prose-editor, .prose-editor *, input, textarea {
          caret-color: #000000 !important;
        }
        .prose-editor h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          color: #2C1E0F;
        }
        .prose-editor h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.4rem;
          color: #2C1E0F;
        }
        .prose-editor p {
          margin-bottom: 1rem;
        }
        .prose-editor ul {
          list-style-type: disc;
          padding-left: 1.25rem;
          margin-bottom: 1rem;
        }
        .prose-editor ol {
          list-style-type: decimal;
          padding-left: 1.25rem;
          margin-bottom: 1rem;
        }
        .prose-editor li {
          margin-bottom: 0.25rem;
        }
      `}</style>
    </div>
  );
};
export default AdminPanel;
