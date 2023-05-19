import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import aiimagegeneratorRoutes from './routes/aiimagegeneratorRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/aiimagegenerator', aiimagegeneratorRoutes);

app.get('/', async (req, res) => {
    res.send('Hello from AI Image Generator!');
})
  
const startServer = async () => {
    try{
      connectDB(process.env.MONGOD_URL);
      app.listen(3000, () => console.log('Server started on port http://localhost:3000'))  
    } catch (error) {
        console.log(error);
    }    
}

startServer();