import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from '../components/Container';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser, setToken } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      const data = await api('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      });
      setUser(data.user);
      setToken(data.token);
      navigate('/');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <div style={{ display:'flex', justifyContent:'center', paddingTop:40 }}>
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="title" style={{ marginBottom:8 }}>Welcome back</h1>
          <p className="muted" style={{ marginBottom:20 }}>Sign in to continue writing</p>
        {error && <div className="alert error">{error}</div>}
        <div className="form-row">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-row">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
          <div className="form-actions">
            <button className="btn" disabled={loading} style={{ width:'100%' }}>{loading ? 'Signing in...' : 'Sign in'}</button>
          </div>
          <div style={{ textAlign:'center', marginTop:12 }}>
            <span className="muted">No account? <Link to="/register" style={{ color:'var(--accent)', fontWeight:600 }}>Create one</Link></span>
          </div>
        </form>
      </div>
    </Container>
  );
}
