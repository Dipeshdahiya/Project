// backend/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

connectDB();

app.use('/api/auth', require('./routes/auth'));
app.use('/api/summaries', require('./routes/summaries'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
