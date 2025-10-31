
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('✗ MONGODB_URI is not set in environment variables');
  console.log('Please set your MongoDB URI in Replit Secrets');
  process.exit(1);
}

// Review Schema
const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: () => new Date().toLocaleString()
  }
}, {
  timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log('✓ Connected to MongoDB successfully');
  } catch (error) {
    console.error('✗ MongoDB connection error:', error.message);
    
    if (error.message.includes('ENOTFOUND')) {
      console.log('\n🔧 Connection troubleshooting tips:');
      console.log('1. Whitelist your IP in MongoDB Atlas (Network Access → Add IP → Use 0.0.0.0/0 for testing)');
      console.log('2. Check if your password has special characters (@, #, $) - they need URL encoding');
      console.log('3. Verify your cluster is active (not paused)');
      console.log('4. Ensure connection string format is: mongodb+srv://username:password@cluster.mongodb.net/database');
    }
    
    process.exit(1);
  }
}

// Get all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Add a new review
app.post('/api/reviews', async (req, res) => {
  try {
    const { name, rating, review } = req.body;
    
    const newReview = new Review({
      name,
      rating,
      review,
      date: new Date().toLocaleString()
    });
    
    await newReview.save();
    res.json(newReview);
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ error: 'Failed to save review' });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Start server after DB connection
connectDB().then(() => {
  const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
  app.listen(PORT, host, () => {
    console.log(`✓ Server running on http://${host}:${PORT}`);
  });
});
