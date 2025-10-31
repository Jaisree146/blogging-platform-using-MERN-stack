import { useEffect, useState } from 'react';
import Container from '../components/Container';
import { api } from '../api/client';

export default function Achievements() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await api('/api/stats/achievements');
        setLeaders(data.leaders || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <Container>
      <div className="page-header">
        <h1 className="title" style={{background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>🏆 Achievements</h1>
      </div>
      
      {loading && <p className="muted">Loading...</p>}
      {error && <div className="alert error">{error}</div>}
      
      <div style={{ maxWidth:900, margin:'0 auto' }}>
        <div className="card" style={{ padding:40, marginBottom:32, background:'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border:'none', textAlign:'center', boxShadow: '0 10px 40px rgba(245, 158, 11, 0.15)' }}>
          <div style={{ fontSize:64, marginBottom:16 }}>🏆</div>
          <h2 style={{ fontSize:28, fontWeight:800, marginBottom:12, color: '#92400e' }}>Leaderboard</h2>
          <p style={{ color:'#78350f', fontSize:16, maxWidth:600, margin:'0 auto' }}>
            Top contributors with the highest posting streaks over the last 90 days. 
            Keep posting daily to climb the ranks!
          </p>
        </div>

        {leaders.length === 0 && (
          <div className="card" style={{ padding:40, textAlign:'center' }}>
            <div style={{ fontSize:48, marginBottom:16 }}>📝</div>
            <p className="muted" style={{ fontSize:16 }}>No streaks yet. Start posting to appear on the leaderboard!</p>
          </div>
        )}

        {leaders.length > 0 && (
          <div className="card" style={{ padding:0, overflow:'hidden' }}>
            <div style={{ 
              background:'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', 
              color:'white', 
              padding:'20px 32px',
              display:'grid',
              gridTemplateColumns:'50px 2fr 1fr 1fr',
              gap:20,
              fontWeight:600,
              fontSize:14
            }}>
              <div>Rank</div>
              <div>Author</div>
              <div>Streak</div>
              <div>Posts</div>
            </div>
            
            {leaders.map((x, i) => (
              <div 
                key={x.user._id} 
                style={{ 
                  display:'grid', 
                  gridTemplateColumns:'50px 2fr 1fr 1fr', 
                  gap:20, 
                  padding:'20px 32px',
                  alignItems:'center',
                  borderBottom: i < leaders.length - 1 ? '1px solid var(--border)' : 'none',
                  background: i < 3 ? 'rgba(245,158,11,0.08)' : 'transparent',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(245,158,11,0.12)'}
                onMouseLeave={(e) => e.currentTarget.style.background = i < 3 ? 'rgba(245,158,11,0.08)' : 'transparent'}
              >
                <div style={{ 
                  fontSize:20, 
                  fontWeight:800,
                  color: i === 0 ? '#fbbf24' : i === 1 ? '#94a3b8' : i === 2 ? '#d97706' : 'var(--muted)'
                }}>
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                </div>
                
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div className="avatar" style={{ width:40, height:40, fontSize:16 }}>
                    {x.user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:16 }}>{x.user?.name || 'User'}</div>
                    <div className="muted" style={{ fontSize:13 }}>Contributor</div>
                  </div>
                </div>
                
                <div>
                  <div style={{ 
                    fontSize:24, 
                    fontWeight:800, 
                    background:'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    WebkitBackgroundClip:'text',
                    WebkitTextFillColor:'transparent',
                    backgroundClip:'text'
                  }}>
                    {x.streak}
                  </div>
                  <div className="muted" style={{ fontSize:12 }}>days</div>
                </div>
                
                <div>
                  <div style={{ fontSize:20, fontWeight:700 }}>{x.posts}</div>
                  <div className="muted" style={{ fontSize:12 }}>posts</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display:'flex', gap:24, marginTop:32, justifyContent: 'space-between' }}>
          <div className="card" style={{ flex: 1, padding:'32px 40px', display: 'flex', alignItems: 'center', gap: 20, background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: 'none' }}>
            <div style={{ fontSize:48 }}>🔥</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize:32, fontWeight:800, color:'#d97706', marginBottom:4 }}>
                {leaders.length > 0 ? leaders[0]?.streak || 0 : 0}
              </div>
              <div style={{ fontSize:14, color: '#92400e', fontWeight: 600 }}>Longest Streak</div>
            </div>
          </div>
          
          <div className="card" style={{ flex: 1, padding:'32px 40px', display: 'flex', alignItems: 'center', gap: 20, background: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)', border: 'none' }}>
            <div style={{ fontSize:48 }}>📝</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize:32, fontWeight:800, color:'#9a3412', marginBottom:4 }}>
                {leaders.reduce((sum, x) => sum + x.posts, 0)}
              </div>
              <div style={{ fontSize:14, color: '#7c2d12', fontWeight: 600 }}>Total Posts</div>
            </div>
          </div>
          
          <div className="card" style={{ flex: 1, padding:'32px 40px', display: 'flex', alignItems: 'center', gap: 20, background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', border: 'none' }}>
            <div style={{ fontSize:48 }}>👥</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize:32, fontWeight:800, color:'#ffffff', marginBottom:4 }}>
                {leaders.length}
              </div>
              <div style={{ fontSize:14, color: '#fffbeb', fontWeight: 600 }}>Contributors</div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
