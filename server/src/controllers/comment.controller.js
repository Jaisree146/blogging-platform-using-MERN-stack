import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

export async function addComment(req, res, next) {
  try {
    const { content } = req.body;
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const comment = await Comment.create({ post: post._id, author: req.userId, content });
    res.status(201).json(comment);
  } catch (e) {
    next(e);
  }
}

export async function listComments(req, res, next) {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const comments = await Comment.find({ post: post._id }).populate('author', 'name avatarUrl').sort({ createdAt: -1 });
    res.json(comments);
  } catch (e) {
    next(e);
  }
}
