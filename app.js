const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Import the path module

const app = express();
const port = 4000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/client') // Replace with your MongoDB connection string if needed
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define a schema for storing data
const DataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true }, // Include message field
});

// Create a model based on the schema
const DataModel = mongoose.model('Data', DataSchema);

// API endpoint to handle POST requests and store data in the database
app.post('/api/data', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newData = new DataModel({ name, email, message });
    await newData.save(); // Save data to the database
    res.status(201).send('Data stored successfully');
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Error saving data');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
