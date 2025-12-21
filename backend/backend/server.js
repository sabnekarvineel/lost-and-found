const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables as early as possible
dotenv.config();

app.use(cors());
app.use(express.json());

const user = require("./routes/UserRoute");

// Prefer MONGO_URI but fall back to URI for compatibility with existing .env
const MONGO_URI = process.env.MONGO_URI || process.env.URI;
if (!MONGO_URI) {
  console.error('MongoDB connection string is not defined. Set MONGO_URI or URI in your .env');
  process.exit(1);
}

// Connect to MongoDB (mongoose v8+ doesn't require legacy options)
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB Error:', err);
    process.exit(1);
  });

// Register routes / middleware before starting the server
app.use(user);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
