import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import myUserRoute from './Routes/myUserRoute';
import myRestaurantRoute from './Routes/myRestaurantRoute';
import { v2 as cloudinary } from 'cloudinary';
import RestaurantRoute from './Routes/RestaurantRoute';
import orderRoute from './Routes/orderRoute';

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log('Connected to DB'));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/health', async (req: Request, res: Response) => {
  res.send({ message: 'health OK!' });
});

app.use('/api/my/user', myUserRoute);
app.use('/api/my/restaurant', myRestaurantRoute);
app.use('/api/restaurant', RestaurantRoute);
app.use('/api/order', orderRoute);

app.listen(7000, () => {
  console.log('Server started on port:7000');
});
