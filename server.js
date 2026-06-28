require('dotenv').config();
const express = require('express');
const connectDB = require('./Database/DB');
const authRoutes = require('./routes/auth-routes');

connectDB();

const app = express();

// middlewares
app.use(express.json());

app.use('/api/auth', authRoutes);


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
})