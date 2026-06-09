import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Atlas connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
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