import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  function handleLogout() {
    logout();
    if (pathname.startsWith('/create') || pathname.startsWith('/edit') || pathname.startsWith('/my-blogs')) navigate('/');
  }

  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="left">
          <button className="btn-light icon" onClick={() => setOpen(true)} aria-label="Open menu">☰</button>
          <Link to="/" className="brand">BlogNest</Link>
        </div>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/achievements" className="nav-link">Achievements</Link>
          {user && <Link to="/create" className="nav-link">Create</Link>}
          {user && <Link to="/my-blogs" className="nav-link">My Blogs</Link>}
          {user && <Link to="/profile" className="nav-link">Profile</Link>}
        </nav>
        <div className="nav-auth">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-light">Login</Link>
              <Link to="/register" className="btn">Register</Link>
            </>
          ) : (
            <div className="user-area">
              <Link to="/profile" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="avatar" aria-hidden>{user.name?.[0]?.toUpperCase() || 'U'}</span>
                <span className="user-name">{user.name}</span>
              </Link>
              <button className="btn btn-light" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
      {/* Offcanvas */}
      <div className={`offcanvas ${open ? 'show' : ''}`} onClick={() => setOpen(false)} style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)', zIndex: 1000}}>
        <div onClick={(e) => e.stopPropagation()} style={{position: 'absolute', top: 0, left: 0, width: '320px', height: '100%', background: '#1e293b', borderRight: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', zIndex: 1001}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', color: '#ffffff', borderBottom: '1px solid rgba(255,255,255,0.1)', fontSize: '18px', fontWeight: 700}}>
            <strong style={{color: '#ffffff'}}>Menu</strong>
            <button onClick={() => setOpen(false)} aria-label="Close menu" style={{background: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 10px', borderRadius: '10px', cursor: 'pointer'}}>✕</button>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', padding: '16px', gap: '6px'}}>
            <a href="#feed" onClick={() => setOpen(false)} style={{color: 'rgba(255,255,255,0.9)', textDecoration: 'none', padding: '12px 16px', borderRadius: '10px', fontWeight: 500, fontSize: '15px', display: 'block'}}>Browse Posts</a>
            <Link to="/" onClick={() => setOpen(false)} style={{color: 'rgba(255,255,255,0.9)', textDecoration: 'none', padding: '12px 16px', borderRadius: '10px', fontWeight: 500, fontSize: '15px', display: 'block'}}>Home</Link>
            <Link to="/about" onClick={() => setOpen(false)} style={{color: 'rgba(255,255,255,0.9)', textDecoration: 'none', padding: '12px 16px', borderRadius: '10px', fontWeight: 500, fontSize: '15px', display: 'block'}}>About</Link>
            <Link to="/achievements" onClick={() => setOpen(false)} style={{color: 'rgba(255,255,255,0.9)', textDecoration: 'none', padding: '12px 16px', borderRadius: '10px', fontWeight: 500, fontSize: '15px', display: 'block'}}>Achievements</Link>
            {user && <Link to="/create" onClick={() => setOpen(false)} style={{color: 'rgba(255,255,255,0.9)', textDecoration: 'none', padding: '12px 16px', borderRadius: '10px', fontWeight: 500, fontSize: '15px', display: 'block'}}>Create</Link>}
            {user && <Link to="/my-blogs" onClick={() => setOpen(false)} style={{color: 'rgba(255,255,255,0.9)', textDecoration: 'none', padding: '12px 16px', borderRadius: '10px', fontWeight: 500, fontSize: '15px', display: 'block'}}>My Blogs</Link>}
            {user && <Link to="/profile" onClick={() => setOpen(false)} style={{color: 'rgba(255,255,255,0.9)', textDecoration: 'none', padding: '12px 16px', borderRadius: '10px', fontWeight: 500, fontSize: '15px', display: 'block'}}>Profile</Link>}
            {!user && <Link to="/login" onClick={() => setOpen(false)} style={{color: 'rgba(255,255,255,0.9)', textDecoration: 'none', padding: '12px 16px', borderRadius: '10px', fontWeight: 500, fontSize: '15px', display: 'block'}}>Login</Link>}
            {!user && <Link to="/register" onClick={() => setOpen(false)} style={{color: 'rgba(255,255,255,0.9)', textDecoration: 'none', padding: '12px 16px', borderRadius: '10px', fontWeight: 500, fontSize: '15px', display: 'block'}}>Register</Link>}
            <div style={{height:1, background:'rgba(255,255,255,0.1)', margin:'8px 0'}} />
            {!user ? (
              <Link to="/login" onClick={() => setOpen(false)} className="btn" style={{background: '#ffffff', color: '#1e293b'}}>Start Writing</Link>
            ) : (
              <Link to="/create" onClick={() => setOpen(false)} className="btn" style={{background: '#ffffff', color: '#1e293b'}}>Create Post</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
