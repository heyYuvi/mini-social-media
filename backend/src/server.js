import express from 'express';
import dotenv from 'dotenv';
import mongoDB from './config/db.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import protect from './middlewares/authMiddleware.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


//Routes
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Social Media platform is running"
    });
});

app.use("/api", userRoutes);

//404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

const startServer = async () => {
    try {
        await mongoDB();

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        })
    } catch (error) {
        console.error(`Failed to start server: ${error.message}`);
        process.exit(1);
    }
}

startServer();