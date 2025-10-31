import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import Container from '../components/Container';

export default function Profile() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalPosts: 2, totalComments: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await api('/api/stats');
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      } finally {
        setLoading(false);
      }
    }
    if (user) fetchStats();
  }, [user]);

  if (!user) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <h1 className="title">Please login to view your profile</h1>
          <Link to="/login" className="btn" style={{ marginTop: 20 }}>Login</Link>
        </div>
      </Container>
    );
  }

  const memberSince = user.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : 'Recently';

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-header-inner">
          <div className="profile-avatar-section">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="profile-avatar-large" />
            ) : (
              <div className="profile-avatar-large">
                {user.name?.[0]?.toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-email">{user.email}</p>
            {user.bio && <p className="profile-bio">{user.bio}</p>}
            <div className="profile-meta">
              <div className="profile-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>Joined {memberSince}</span>
              </div>
              {user.role === 'admin' && (
                <div className="profile-meta-item">
                  <span className="admin-badge">Admin</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <Container>
        <div className="profile-content">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <div className="stat-content">
                <div className="stat-value">{loading ? '...' : stats.totalPosts}</div>
                <div className="stat-label">Total Posts</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div className="stat-content">
                <div className="stat-value">{loading ? '...' : stats.totalComments}</div>
                <div className="stat-label">Total Comments</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <div className="stat-content">
                <div className="stat-value">{loading ? '...' : stats.totalPosts + stats.totalComments}</div>
                <div className="stat-label">Total Activity</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="profile-actions-section">
            <h2 className="section-title">Quick Actions</h2>
            <div className="action-cards">
              <Link to="/create" className="action-card">
                <div className="action-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </div>
                <div className="action-content">
                  <h3>Create New Post</h3>
                  <p>Share your thoughts with the community</p>
                </div>
              </Link>

              <Link to="/my-blogs" className="action-card">
                <div className="action-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                </div>
                <div className="action-content">
                  <h3>My Blogs</h3>
                  <p>Manage and edit your posts</p>
                </div>
              </Link>

              <Link to="/achievements" className="action-card">
                <div className="action-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="7"/>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                  </svg>
                </div>
                <div className="action-content">
                  <h3>Achievements</h3>
                  <p>View your accomplishments</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Account Information */}
          <div className="account-info-section">
            <h2 className="section-title">Account Information</h2>
            <div className="info-card">
              <div className="info-row">
                <span className="info-label">Full Name</span>
                <span className="info-value">{user.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email Address</span>
                <span className="info-value">{user.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Account Type</span>
                <span className="info-value">{user.role === 'admin' ? 'Administrator' : 'User'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Member Since</span>
                <span className="info-value">{memberSince}</span>
              </div>
              {user.bio && (
                <div className="info-row">
                  <span className="info-label">Bio</span>
                  <span className="info-value">{user.bio}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
