import express from 'express';  
import connectDB from './db.js';  
import userRoutes from './routes/users.js';  
import cors from 'cors';

const app = express();  

connectDB();  

// CORS Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());  
app.use('/api/users', userRoutes);  

app.get('/', (req, res) => {  
    res.send('API en cours d\'exécution...');  
});  

const PORT = process.env.PORT || 5001;  
app.listen(PORT, () => console.log(`Serveur en cours d'exécution sur le port ${PORT}`));