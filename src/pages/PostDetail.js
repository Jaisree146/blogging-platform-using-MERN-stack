import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from '../components/Container';
import { api, imageUrl } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function PostDetail() {
  const { slug } = useParams();
  const { token, user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentText, setCommentText] = useState('');
  const [sending, setSending] = useState(false);

  async function load() {
    try {
      setLoading(true);
      const [p, c] = await Promise.all([
        api(`/api/posts/${slug}`),
        api(`/api/comments/${slug}`),
      ]);
      setPost(p);
      setComments(c);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function toggleLike() {
    if (!token) {
      setError('Please login to like');
      return;
    }
    try {
      await api(`/api/posts/${slug}/like`, { method: 'POST', token });
      await load();
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  async function submitComment(e) {
    e.preventDefault();
    if (!token) {
      setError('Please login to comment');
      return;
    }
    try {
      setSending(true);
      await api(`/api/comments/${slug}`, { method: 'POST', token, body: { content: commentText } });
      setCommentText('');
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <Container>
      {loading && <p className="muted">Loading...</p>}
      {error && <div className="alert error">{error}</div>}
      {post && (
        <article className="post-detail">
          {post.coverImageUrl && (
            <img className="post-detail-cover" src={imageUrl(post.coverImageUrl)} alt={post.title} />
          )}
          <h1 className="title">{post.title}</h1>
          <div className="post-meta" style={{ fontSize:14, marginBottom:12 }}>
            {post.author?.name ? <span>by <strong>{post.author.name}</strong></span> : null}
            <span>· {new Date(post.createdAt).toLocaleDateString()}</span>
            {post.category && <span>· <span className="badge" style={{ margin:0, marginLeft:4 }}>{post.category[0].toUpperCase() + post.category.slice(1)}</span></span>}
          </div>
          <div style={{ display:'flex', gap:10, alignItems:'center', marginTop:16, paddingTop:16, borderTop:'1px solid var(--border)' }}>
            <button className="btn btn-light" onClick={toggleLike} style={{ display:'flex', alignItems:'center', gap:6 }}>
              <span style={{ fontSize:18 }}>♥</span> {post.likes?.length || 0}
            </button>
            {user && post.author?._id === user.id && (
              <Link className="btn" to={`/edit/${post.slug}`}>Edit Post</Link>
            )}
          </div>
          {post.tags?.length ? (
            <div className="tags">
              {post.tags.map((t) => (
                <span key={t} className="tag">#{t}</span>
              ))}
            </div>
          ) : null}
          <div className="post-body">
            <pre className="pre-wrap">{post.content}</pre>
          </div>
        </article>
      )}

      <section className="comments">
        <h2 className="subtitle">Comments</h2>
        <form className="form" onSubmit={submitComment}>
          <div className="form-row">
            <label>Your comment</label>
            <textarea rows={4} value={commentText} onChange={(e) => setCommentText(e.target.value)} />
          </div>
          <div className="form-actions">
            <button className="btn" disabled={sending}>{sending ? 'Posting...' : 'Post Comment'}</button>
          </div>
        </form>
        <div className="comment-list">
          {comments.map((c) => (
            <div key={c._id} className="comment">
              <div className="comment-meta">
                <span className="avatar small" aria-hidden>{c.author?.name?.[0]?.toUpperCase() || 'U'}</span>
                <strong>{c.author?.name || 'User'}</strong>
                <span className="muted">· {new Date(c.createdAt).toLocaleString()}</span>
              </div>
              <div className="comment-body">{c.content}</div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
