import slugify from 'slugify';
import Post from '../models/Post.js';

export async function createPost(req, res, next) {
  try {
    const { title, content, tags = [], published = true, category = 'others' } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Missing fields' });
    const slug = slugify(title, { lower: true, strict: true });
    const exists = await Post.findOne({ slug });
    if (exists) return res.status(409).json({ message: 'Title already used' });
    const post = await Post.create({
      title,
      slug,
      content,
      tags,
      published,
      category,
      author: req.userId,
      coverImageUrl: req.file ? `/uploads/${req.file.filename}` : '',
    });
    res.status(201).json(post);
  } catch (e) {
    next(e);
  }
}

export async function listPosts(req, res, next) {
  try {
    const { q, tag, category, author, page = 1, limit = 10 } = req.query;
    const filter = { published: true };
    if (tag) filter.tags = tag;
    if (category) filter.category = category;
    if (author) filter.author = author;
    if (q) filter.$text = { $search: q };
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Post.find(filter)
        .populate('author', 'name avatarUrl')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Post.countDocuments(filter),
    ]);
    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (e) {
    next(e);
  }
}

export async function getPost(req, res, next) {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate('author', 'name avatarUrl');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (e) {
    next(e);
  }
}

export async function updatePost(req, res, next) {
  try {
    const { title, content, tags, published, category } = req.body;
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author.toString() !== req.userId) return res.status(403).json({ message: 'Forbidden' });

    if (title) {
      post.title = title;
      post.slug = slugify(title, { lower: true, strict: true });
    }
    if (content !== undefined) post.content = content;
    if (tags !== undefined) post.tags = tags;
    if (published !== undefined) post.published = published;
    if (category !== undefined) post.category = category;
    if (req.file) post.coverImageUrl = `/uploads/${req.file.filename}`;

    await post.save();
    res.json(post);
  } catch (e) {
    next(e);
  }
}

export async function deletePost(req, res, next) {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.author.toString() !== req.userId) return res.status(403).json({ message: 'Forbidden' });
    await post.deleteOne();
    res.json({ ok: true });
  } catch (e) {
    next(e);
  }
}

export async function toggleLike(req, res, next) {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const uid = req.userId;
    const idx = post.likes.findIndex((id) => id.toString() === uid);
    if (idx >= 0) post.likes.splice(idx, 1);
    else post.likes.push(uid);
    await post.save();
    res.json({ likes: post.likes.length, liked: idx < 0 });
  } catch (e) {
    next(e);
  }
}
