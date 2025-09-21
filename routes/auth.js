import express from 'express';
import { register, getUser, login } from '../controllers/authControllers.js';
import { tambahBlog, getBlogs, hapusBlogs, detailBlog, updateBlog } from '../controllers/blogControllers.js';
import { tambahLaporan, getLaporan, hapusLaporan, updateLaporan, detailLaporan } from '../controllers/laporanControllers.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/register', register);
router.get('/users', getUser);
router.post('/login', login);
router.post('/dashboard', upload.single('gambar'), tambahBlog);
router.put('/dashboard/:id', upload.single('gambar', updateBlog));
router.get('/dashboard', getBlogs);
router.get('/dashboard/:slug', detailBlog);
router.delete('/dashboard/:id', hapusBlogs);
router.put('/dashboard/:id', updateBlog);
router.post('/bmy',upload.none(), tambahLaporan);
router.get('/bmy', getLaporan);
router.delete('/bmy/:id', hapusLaporan);
router.put('/bmy/:id', upload.none(), updateLaporan);
router.get('/bmy/:slug', detailLaporan);

export default router;