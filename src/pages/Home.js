import { useEffect, useState } from 'react';
import Container from '../components/Container';
import PostCard from '../components/PostCard';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (category) params.set('category', category);
        if (search) params.set('q', search);
        const qs = params.toString() ? `?${params.toString()}` : '';
        const data = await api(`/api/posts${qs}`);
        setPosts(data.items || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [category, search]);

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <h1>Discover and share ideas</h1>
            <p className="muted">Write about lifestyle, education, technology, food, personal and more. Keep your streak going!</p>
          </div>
          <div className="hero-art" aria-hidden>
            <div className="blob a" />
            <div className="blob b" />
            <div className="blob c" />
          </div>
        </div>
      </section>
      <Container>
        <div id="feed" className="page-header" style={{paddingTop: '32px'}}>
          <h1 className="title">Latest Posts</h1>
        </div>
        <div className="search-filter-bar">
          <input 
            type="search" 
            className="search-input" 
            placeholder="Search posts..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="chips">
            {['','lifestyle','education','technology','food','personal','others'].map((c) => (
              <button
                key={c || 'all'}
                className={`chip ${category === c ? 'active' : ''}`}
                onClick={() => setCategory(c)}
              >{c ? c[0].toUpperCase() + c.slice(1) : 'All'}</button>
            ))}
          </div>
        </div>
        {loading && <p className="muted">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {posts.length > 0 && (
          <div className="featured-post">
            <PostCard key={posts[0]._id} post={posts[0]} featured />
          </div>
        )}
        <div className="grid">
          {posts.slice(1).map((p) => (
            <PostCard key={p._id} post={p} />
          ))}
        </div>
      </Container>
    </>
  );
}
