import Container from '../components/Container';

export default function About() {
  return (
    <Container>
      <div className="page-header">
        <h1 className="title" style={{background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>About BlogNest</h1>
      </div>
      
      <div style={{ maxWidth:900, margin:'0 auto' }}>
        <div className="card" style={{ padding: 40, marginBottom:24, background: 'linear-gradient(135deg, #f3e8ff 0%, #e0e7ff 100%)', border: 'none' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'center' }}>
            <div>
              <div className="badge" style={{ marginBottom:16, background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)', color: '#ffffff' }}>OUR MISSION</div>
              <h2 className="subtitle" style={{ marginTop:0, fontSize:28, color: '#6366f1' }}>A Platform for Students</h2>
              <p style={{ lineHeight:1.8, color:'#64748b', fontSize:16 }}>
                BlogNest is a modern MERN stack blogging platform designed for students and creators to share ideas, 
                experiences, and knowledge. Create beautiful posts, engage with others, and track your progress.
              </p>
            </div>
            <div style={{ 
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)', 
              borderRadius:16, 
              height:240, 
              display:'flex', 
              alignItems:'center', 
              justifyContent:'center',
              color:'white',
              fontSize:48,
              fontWeight:900,
              boxShadow: '0 20px 60px rgba(139, 92, 246, 0.3)'
            }}>
              📝
            </div>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, marginBottom:24 }}>
          <div className="card" style={{ padding:32, textAlign:'center', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: 'none' }}>
            <div style={{ fontSize:48, marginBottom:12 }}>🎯</div>
            <h3 style={{ fontSize:20, fontWeight:700, marginBottom:8, color: '#92400e' }}>Multiple Categories</h3>
            <p style={{ color:'#78350f', fontSize:14, lineHeight:1.6 }}>
              Lifestyle, Education, Technology, Food, Personal, and more
            </p>
          </div>
          
          <div className="card" style={{ padding:32, textAlign:'center', background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', border: 'none' }}>
            <div style={{ fontSize:48, marginBottom:12 }}>🔐</div>
            <h3 style={{ fontSize:20, fontWeight:700, marginBottom:8, color: '#1e40af' }}>Secure Authentication</h3>
            <p style={{ color:'#1e3a8a', fontSize:14, lineHeight:1.6 }}>
              Email-based login with JWT tokens
            </p>
          </div>
          
          <div className="card" style={{ padding:32, textAlign:'center', background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)', border: 'none' }}>
            <div style={{ fontSize:48, marginBottom:12 }}>📸</div>
            <h3 style={{ fontSize:20, fontWeight:700, marginBottom:8, color: '#9f1239' }}>Media Upload</h3>
            <p style={{ color:'#881337', fontSize:14, lineHeight:1.6 }}>
              Upload and manage cover images locally
            </p>
          </div>
          
          <div className="card" style={{ padding:32, textAlign:'center', background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', border: 'none' }}>
            <div style={{ fontSize:48, marginBottom:12 }}>💬</div>
            <h3 style={{ fontSize:20, fontWeight:700, marginBottom:8, color: '#065f46' }}>Engagement</h3>
            <p style={{ color:'#064e3b', fontSize:14, lineHeight:1.6 }}>
              Like posts and leave comments
            </p>
          </div>
          
          <div className="card" style={{ padding:32, textAlign:'center', background: 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)', border: 'none' }}>
            <div style={{ fontSize:48, marginBottom:12 }}>🏆</div>
            <h3 style={{ fontSize:20, fontWeight:700, marginBottom:8, color: '#9a3412' }}>Achievements</h3>
            <p style={{ color:'#7c2d12', fontSize:14, lineHeight:1.6 }}>
              Track posting streaks and leaderboards
            </p>
          </div>
          
          <div className="card" style={{ padding:32, textAlign:'center', background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', border: 'none' }}>
            <div style={{ fontSize:48, marginBottom:12 }}>📊</div>
            <h3 style={{ fontSize:20, fontWeight:700, marginBottom:8, color: '#4338ca' }}>Dashboard</h3>
            <p style={{ color:'#3730a3', fontSize:14, lineHeight:1.6 }}>
              Manage all your posts in one place
            </p>
          </div>
        </div>

        <div className="card" style={{ padding:40, background:'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border:'none', color: '#ffffff' }}>
          <div className="badge" style={{ marginBottom:16, background: 'rgba(255,255,255,0.15)', color: '#ffffff' }}>TECH STACK</div>
          <h3 style={{ fontSize:24, fontWeight:700, marginBottom:16, color: '#ffffff' }}>Built with Modern Technologies</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:16 }}>
            <div style={{ textAlign:'center', padding:16, background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <div style={{ fontSize:32, marginBottom:8 }}>🍃</div>
              <div style={{ fontWeight:600, fontSize:14, color: '#a7f3d0' }}>MongoDB</div>
            </div>
            <div style={{ textAlign:'center', padding:16, background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <div style={{ fontSize:32, marginBottom:8 }}>⚡</div>
              <div style={{ fontWeight:600, fontSize:14, color: '#fcd34d' }}>Express.js</div>
            </div>
            <div style={{ textAlign:'center', padding:16, background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <div style={{ fontSize:32, marginBottom:8 }}>⚛️</div>
              <div style={{ fontWeight:600, fontSize:14, color: '#60a5fa' }}>React</div>
            </div>
            <div style={{ textAlign:'center', padding:16, background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <div style={{ fontSize:32, marginBottom:8 }}>🟢</div>
              <div style={{ fontWeight:600, fontSize:14, color: '#86efac' }}>Node.js</div>
            </div>
          </div>
          <p style={{ textAlign:'center', marginTop:20, color:'rgba(255,255,255,0.7)', fontSize:15 }}>
            Designed with clean, student-friendly code and a CSS-only UI approach
          </p>
        </div>
      </div>
    </Container>
  );
}
