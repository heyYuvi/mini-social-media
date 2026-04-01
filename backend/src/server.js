import express from 'express';
import dotenv from 'dotenv';
import mongoDB from './config/db.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

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
app.use("/api", postRoutes);
app.use("/api", commentRoutes);

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