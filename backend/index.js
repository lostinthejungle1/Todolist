const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');  // Import the connection function
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

app.use(express.json()); // for parsing application/json
app.use(cors());

connectDB();  // Connect to the database


app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
