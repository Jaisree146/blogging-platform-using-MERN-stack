import Post from '../models/Post.js';
import User from '../models/User.js';

function calcStreak(datesSet) {
  // datesSet: Set of yyyy-mm-dd strings when user posted
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    if (datesSet.has(key)) streak++;
    else break;
  }
  return streak;
}

export async function achievements(_req, res, next) {
  try {
    // Fetch last 90 days posts
    const since = new Date();
    since.setDate(since.getDate() - 90);
    const posts = await Post.find({ createdAt: { $gte: since }, published: true })
      .select('author createdAt')
      .populate('author', 'name avatarUrl')
      .lean();

    const byUser = new Map();
    for (const p of posts) {
      const uid = p.author?._id?.toString();
      if (!uid) continue;
      if (!byUser.has(uid)) byUser.set(uid, { user: p.author, dates: new Set(), count: 0 });
      const entry = byUser.get(uid);
      entry.count += 1;
      const key = new Date(p.createdAt).toISOString().slice(0, 10);
      entry.dates.add(key);
    }

    const list = Array.from(byUser.values()).map((v) => ({
      user: v.user,
      posts: v.count,
      streak: calcStreak(v.dates),
    }));

    list.sort((a, b) => b.streak - a.streak || b.posts - a.posts);

    res.json({ since, leaders: list.slice(0, 20) });
  } catch (e) {
    next(e);
  }
}
