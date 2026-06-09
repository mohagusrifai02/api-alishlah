import express from 'express';
import { register, getUser, login } from '../controllers/authControllers.js';
import { tambahBlog, getBlogs, hapusBlogs, detailBlog, updateBlog } from '../controllers/blogControllers.js';
import { tambahLaporan, getLaporan, hapusLaporan, updateLaporan, detailLaporan } from '../controllers/laporanControllers.js';
import { upload } from '../middleware/upload.js';
import {
  createPost,
  getPosts,
  getPostBySlug,
  updatePost,
  deletePost
} from '../controllers/postControllers.js';
import {
  createBmy,
  getBmys,
  detailBmy,
  deleteBmy,
  updateBmy
} from '../controllers/bmyControllers.js';
import { createTransaction, handleNotification } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/register', register);
router.get('/users', getUser);
router.post('/login', login);
router.post('/dashboard', upload.single('gambar'), tambahBlog);
router.put('/dashboard/:id', upload.single('gambar'), updateBlog);
router.get('/dashboard', getBlogs);
router.get('/dashboard/:slug', detailBlog);
router.delete('/dashboard/:id', hapusBlogs);
router.post('/bmy',upload.none(), tambahLaporan);
router.get('/bmy', getLaporan);
router.delete('/bmy/:id', hapusLaporan);
router.put('/bmy/:id', upload.none(), updateLaporan);
router.get('/bmy/:slug', detailLaporan);
router.post('/post', upload.single('image'), createPost);
router.get('/post', getPosts);
router.get('/post/:slug', getPostBySlug);
router.put('/post/:id', upload.single('image'), updatePost);
router.delete('/post/:id', deletePost);
router.post('/bmy-entry', upload.none(), createBmy);
router.get('/bmy-entry', getBmys);
router.get('/bmy-entry/:slug', detailBmy);
router.delete('/bmy-entry/:id', deleteBmy);
router.put('/bmy-entry/:id', upload.none(), updateBmy);
router.post('/checkout', createTransaction);
router.post('/notification', handleNotification);

export default router;