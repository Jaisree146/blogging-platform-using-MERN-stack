import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { api, imageUrl } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function MyBlogs() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        setLoading(true);
        const data = await api(`/api/posts?author=${user.id}`);
        setPosts(data.items || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  if (!user) {
    return (
      <Container>
        <p className="muted">Please login to view your blogs.</p>
      </Container>
    );
  }

  return (
    <Container>
      <div className="page-header">
        <h1 className="title">My Blogs</h1>
        <Link to="/create" className="btn">+ New Post</Link>
      </div>
      {loading && <p className="muted">Loading...</p>}
      {error && <div className="alert error">{error}</div>}
      
      {posts.length === 0 && !loading && (
        <div className="card" style={{ padding:60, textAlign:'center' }}>
          <div style={{ fontSize:64, marginBottom:16 }}>📝</div>
          <h2 style={{ fontSize:24, fontWeight:700, marginBottom:12 }}>No posts yet</h2>
          <p className="muted" style={{ marginBottom:24, fontSize:16 }}>Start creating your first blog post</p>
          <Link to="/create" className="btn">Create Your First Post</Link>
        </div>
      )}
      
      <div className="grid">
        {posts.map((p) => (
          <div key={p._id} className="card" style={{ padding:0, display:'flex', flexDirection:'column' }}>
            {p.coverImageUrl && (
              <div style={{ height:160, overflow:'hidden', background:'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
                <img 
                  src={imageUrl(p.coverImageUrl)}
                  alt={p.title}
                  style={{ width:'100%', height:'100%', objectFit:'cover' }}
                />
              </div>
            )}
            <div style={{ padding:20, flex:1, display:'flex', flexDirection:'column' }}>
              {p.category && (
                <div className="badge" style={{ marginBottom:12, alignSelf:'flex-start' }}>
                  {p.category.toUpperCase()}
                </div>
              )}
              <h3 style={{ marginTop:0, marginBottom:8, fontSize:18, fontWeight:700, lineHeight:1.3 }}>
                {p.title}
              </h3>
              <div className="muted" style={{ fontSize:13, marginBottom:16 }}>
                {new Date(p.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div style={{ marginTop:'auto', display:'flex', gap:8 }}>
                <Link className="btn btn-light" to={`/post/${p.slug}`} style={{ flex:1, textAlign:'center' }}>
                  View
                </Link>
                <Link className="btn" to={`/edit/${p.slug}`} style={{ flex:1, textAlign:'center' }}>
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
