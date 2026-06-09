import express from 'express';
import db from './db.js';
import authRoutes from './routes/auth.js'
import cors from 'cors';
import mongo from './mongo.js';

const app = express();
mongo.connectMongo();
//mongo.connectBMY();

const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: ['http://localhost:3000', 'https://mohagusrifai02.github.io', 'https://alishlahtegal.vercel.app', "http://192.168.43.71:3000", "https://www.alishlahtegal.net"],
  methods: ['GET', 'POST', 'OPTIONS', 'PUT','DELETE'],
  credentials: true
}));

app.options('/{*splat}', cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/gmb', express.static('public/gmb'));

app.get('/',(req,res)=>{
    res.send('express API is running');
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`server running on port ${PORT}`);
});