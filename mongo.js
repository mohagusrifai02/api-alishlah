import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectMongo = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing from environment variables');
    }
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000 // Timeout setelah 5 detik jika gagal
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    // Jangan hentikan proses di sini agar app.listen tetap bisa jalan untuk health check
  }
};

// const connectBMY = async () =>{
//   try {
//     const bmyConnection = mongoose.createConnection(process.env.BMY_URI);

//     bmyConnection.on('connected', () => {
//       console.log('✅ BMY connected');
//     });

//     bmyConnection.on('error', (err) => {
//       console.error('BMY connection error:', err);
//     });
    
//     return bmyConnection;
//   } catch (error) {
//     console.error('BMY connection error:', error);
//   }
// }

export default { connectMongo };