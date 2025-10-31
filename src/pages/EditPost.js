import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../components/Container';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function EditPost() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('others');
  const [cover, setCover] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const p = await api(`/api/posts/${slug}`);
        setTitle(p.title);
        setContent(p.content);
        setCategory(p.category || 'others');
        setTags((p.tags || []).join(', '));
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  async function handleSave(e) {
    e.preventDefault();
    setError('');
    try {
      setSaving(true);
      const form = new FormData();
      if (title) form.append('title', title);
      form.append('content', content);
      form.append('category', category);
      if (tags.trim()) {
        try {
          const arr = tags.split(',').map((t) => t.trim()).filter(Boolean);
          arr.forEach((t) => form.append('tags[]', t));
        } catch {}
      } else {
        form.append('tags', JSON.stringify([]));
      }
      if (cover) form.append('cover', cover);
      const res = await fetch(`${process.env.REACT_APP_API_BASE || 'http://localhost:5000'}/api/posts/${slug}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to update');
      navigate(`/post/${data.slug}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm('Delete this post?')) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE || 'http://localhost:5000'}/api/posts/${slug}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d?.message || 'Failed to delete');
      }
      navigate('/my-blogs');
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <Container>
      <div className="page-header">
        <h1 className="title">Edit Post</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-light" onClick={() => navigate(-1)}>Back</button>
          <button className="btn btn-light" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      {loading && <p className="muted">Loading...</p>}
      {error && <div className="alert error">{error}</div>}
      {!loading && (
        <form className="form" onSubmit={handleSave} style={{ maxWidth:720 }}>
          <div className="form-row">
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-row">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="lifestyle">Lifestyle</option>
              <option value="education">Education</option>
              <option value="technology">Technology</option>
              <option value="food">Food</option>
              <option value="personal">Personal</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="form-row">
            <label>Cover Image</label>
            <input type="file" accept="image/*" onChange={(e) => setCover(e.target.files?.[0] || null)} />
          </div>
          <div className="form-row">
            <label>Tags (comma separated)</label>
            <input value={tags} onChange={(e) => setTags(e.target.value)} />
          </div>
          <div className="form-row">
            <label>Content</label>
            <textarea rows={10} value={content} onChange={(e) => setContent(e.target.value)} required />
          </div>
          <div className="form-actions">
            <button className="btn" disabled={saving}>{saving ? 'Saving...' : 'Save changes'}</button>
          </div>
        </form>
      )}
    </Container>
  );
}
