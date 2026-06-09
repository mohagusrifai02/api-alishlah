import Post from '../models/Post.js';

// Create new post
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const imageUrl = req.file ? `/gmb/${req.file.filename}` : null;

    const newPost = new Post({ title, content, imageUrl });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const offset = (page - 1) * limit;

  try {
     const totalPosts = await Post.countDocuments(); // total data
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    res.json({
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
      posts,
    });

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Get single post by ID
export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch post by slug' });
  }
};

// Update post
export const updatePost = async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update post' });
  }
};

// Delete post
export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};