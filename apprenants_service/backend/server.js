import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import apprenantRoutes from './routes/apprenant.routes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/apprenants', apprenantRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Apprenant-Service running on port ${PORT}`));

export default app;
