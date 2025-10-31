import { Link } from 'react-router-dom';
import { imageUrl } from '../api/client';

export default function PostCard({ post, featured = false }) {
  const excerptLength = featured ? 240 : 140;
  const excerpt = (post.content || '').replace(/\n+/g, ' ').slice(0, excerptLength) + (post.content && post.content.length > excerptLength ? '…' : '');
  return (
    <article className={`card post-card ${featured ? 'featured-card' : ''}`}>
      {post.coverImageUrl && (
        <Link to={`/post/${post.slug}`} className="post-cover">
          <img src={imageUrl(post.coverImageUrl)} alt={post.title} />
        </Link>
      )}
      <div className="post-content">
        {post.category && <span className="badge">{post.category[0].toUpperCase() + post.category.slice(1)}</span>}
        <h3 className="post-title">
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h3>
        <div className="post-meta">
          {post.author?.name ? <span>by {post.author.name}</span> : null}
          <span>· {new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        {excerpt && <div className="post-excerpt">{excerpt}</div>}
        {post.tags?.length ? (
          <div className="tags">
            {post.tags.map((t) => (
              <span key={t} className="tag">#{t}</span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
