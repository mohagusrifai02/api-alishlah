import mongoose from 'mongoose';
import slugify from 'slugify';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});
// Generate slug before saving
postSchema.pre('save', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});


const Post = mongoose.model('Post', postSchema);

export default Post;