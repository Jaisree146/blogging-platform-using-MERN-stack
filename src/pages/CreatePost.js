import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function CreatePost() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('others');
  const [cover, setCover] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!token) {
      setError('Please login to create posts');
      return;
    }
    try {
      setLoading(true);
      const form = new FormData();
      form.append('title', title);
      form.append('content', content);
      form.append('published', 'true');
      if (tags.trim()) {
        const arr = tags.split(',').map((t) => t.trim()).filter(Boolean);
        arr.forEach((t) => form.append('tags[]', t));
      }
      form.append('category', category);
      if (cover) form.append('cover', cover);
      const res = await fetch(`${process.env.REACT_APP_API_BASE || 'http://localhost:5000'}/api/posts`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Failed to create');
      navigate(`/post/${data.slug}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    fontSize: '15px',
    padding: '16px 18px',
    borderRadius: '12px',
    border: '2px solid #e2e8f0',
    width: '100%',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: 'inherit',
    background: '#ffffff',
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '10px',
    letterSpacing: '0.01em',
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom, #f8fafc 0%, #f1f5f9 100%)',
      paddingTop: '40px',
      paddingBottom: '80px'
    }}>
      <Container>
        {/* Header Section */}
        <div style={{
          textAlign: 'center', 
          marginBottom: '50px',
          animation: 'fadeIn 0.6s ease-out'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px',
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            borderRadius: '50px',
            border: '1px solid #bfdbfe'
          }}>
            <span style={{fontSize: '28px'}}>✍️</span>
            <h1 style={{
              margin: 0,
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent', 
              backgroundClip: 'text', 
              fontSize: '32px',
              fontWeight: '700',
              letterSpacing: '-0.02em'
            }}>
              Create New Post
            </h1>
          </div>
          <p style={{
            color: '#64748b', 
            fontSize: '17px', 
            marginTop: '12px',
            fontWeight: '400',
            maxWidth: '600px',
            margin: '12px auto 0'
          }}>
            Share your thoughts and ideas with the community
          </p>
        </div>

        {/* Main Form Card */}
        <form 
          onSubmit={handleSubmit} 
          style={{ 
            maxWidth: '900px', 
            margin: '0 auto', 
            background: '#ffffff', 
            padding: '48px', 
            borderRadius: '20px', 
            boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.05)', 
            border: '1px solid #e2e8f0',
            animation: 'slideUp 0.5s ease-out'
          }}
        >
          {/* Error Alert */}
          {error && (
            <div style={{
              padding: '16px 20px',
              background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
              border: '1px solid #fca5a5',
              borderRadius: '12px',
              color: '#dc2626',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '15px',
              fontWeight: '500'
            }}>
              <span style={{fontSize: '20px'}}>⚠️</span>
              {error}
            </div>
          )}
          
          {/* Title Field */}
          <div style={{marginBottom: '32px'}}>
            <label style={labelStyle}>
              <span style={{
                fontSize: '22px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                borderRadius: '8px'
              }}>📝</span>
              <span>Post Title</span>
            </label>
            <input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              placeholder="Enter an engaging and descriptive title..."
              style={{
                ...inputStyle,
                fontSize: '17px',
                fontWeight: '500'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Category and Tags Grid */}
          <div style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '28px', 
            marginBottom: '32px'
          }}>
            {/* Category Field */}
            <div>
              <label style={labelStyle}>
                <span style={{
                  fontSize: '22px',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderRadius: '8px'
                }}>🏷️</span>
                <span>Category</span>
              </label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  ...inputStyle,
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%233b82f6\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                  paddingRight: '48px'
                }}
              >
                <option value="lifestyle">🌟 Lifestyle</option>
                <option value="education">📚 Education</option>
                <option value="technology">💻 Technology</option>
                <option value="food">🍔 Food</option>
                <option value="personal">✨ Personal</option>
                <option value="others">📌 Others</option>
              </select>
            </div>

            {/* Tags Field */}
            <div>
              <label style={labelStyle}>
                <span style={{
                  fontSize: '22px',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
                  borderRadius: '8px'
                }}>🔖</span>
                <span>Tags</span>
              </label>
              <input 
                value={tags} 
                onChange={(e) => setTags(e.target.value)} 
                placeholder="e.g., news, campus, tips (comma-separated)"
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <p style={{
                fontSize: '13px',
                color: '#64748b',
                marginTop: '8px',
                marginLeft: '4px'
              }}>
                Separate multiple tags with commas
              </p>
            </div>
          </div>

          {/* Cover Image Field */}
          <div style={{marginBottom: '32px'}}>
            <label style={labelStyle}>
              <span style={{
                fontSize: '22px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
                borderRadius: '8px'
              }}>📸</span>
              <span>Cover Image</span>
              <span style={{
                fontSize: '12px',
                color: '#94a3b8',
                fontWeight: '400',
                marginLeft: 'auto'
              }}>Optional</span>
            </label>
            <div style={{
              position: 'relative',
              border: '2px dashed #cbd5e1',
              borderRadius: '12px',
              padding: '32px 24px',
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#3b82f6';
              e.currentTarget.style.background = 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#cbd5e1';
              e.currentTarget.style.background = 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)';
            }}
            >
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setCover(e.target.files?.[0] || null)}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer'
                }}
              />
              <div style={{pointerEvents: 'none'}}>
                <span style={{fontSize: '48px', display: 'block', marginBottom: '12px'}}>📤</span>
                <p style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '4px'
                }}>
                  {cover ? cover.name : 'Click to upload or drag and drop'}
                </p>
                <p style={{fontSize: '13px', color: '#64748b'}}>
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            {cover && (
              <div style={{
                marginTop: '12px',
                padding: '10px 16px',
                background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '14px',
                color: '#065f46',
                fontWeight: '500'
              }}>
                <span style={{fontSize: '18px'}}>✓</span>
                File selected: {cover.name}
              </div>
            )}
          </div>

          {/* Content Field */}
          <div style={{marginBottom: '32px'}}>
            <label style={labelStyle}>
              <span style={{
                fontSize: '22px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                borderRadius: '8px'
              }}>✍️</span>
              <span>Content</span>
            </label>
            <textarea 
              rows={14} 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              required 
              placeholder="Write your post content here... 

You can use Markdown formatting for better readability:
- **Bold text**
- *Italic text*
- [Links](url)
- Lists and more..."
              style={{
                ...inputStyle,
                lineHeight: '1.8',
                resize: 'vertical',
                minHeight: '300px'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
            <div style={{
              marginTop: '10px',
              padding: '12px 16px',
              background: '#f8fafc',
              borderRadius: '8px',
              fontSize: '13px',
              color: '#475569',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <span style={{fontSize: '16px'}}>💡</span>
              <span>Markdown formatting is supported for rich text content</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'flex-end',
            marginTop: '40px',
            paddingTop: '32px',
            borderTop: '2px solid #f1f5f9'
          }}>
            <button 
              type="button" 
              onClick={() => navigate('/')} 
              style={{
                padding: '16px 32px',
                borderRadius: '12px',
                border: '2px solid #e2e8f0',
                background: '#ffffff',
                color: '#64748b',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '15px',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f8fafc';
                e.target.style.borderColor = '#cbd5e1';
                e.target.style.color = '#475569';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#ffffff';
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.color = '#64748b';
              }}
            >
              ← Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              style={{
                padding: '16px 40px',
                fontSize: '15px',
                fontWeight: '600',
                borderRadius: '12px',
                background: loading 
                  ? 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)' 
                  : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                border: 'none',
                color: '#ffffff',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: loading 
                  ? 'none' 
                  : '0 10px 30px rgba(59, 130, 246, 0.4), 0 0 1px rgba(59, 130, 246, 0.5)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transform: loading ? 'scale(1)' : 'scale(1)',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px) scale(1.02)';
                  e.target.style.boxShadow = '0 15px 40px rgba(59, 130, 246, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.4)';
                }
              }}
            >
              {loading ? (
                <>
                  <span>⏳</span> Publishing...
                </>
              ) : (
                <>
                  <span>🚀</span> Publish Post
                </>
              )}
            </button>
          </div>
        </form>
      </Container>

      {/* Add keyframe animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
