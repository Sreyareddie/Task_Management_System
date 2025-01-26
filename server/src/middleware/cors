const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'https://task-management-system-b3e8.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
}));

app.use(express.json());

app.listen(5000, () => console.log('Server running on port 5000'));
