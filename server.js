const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Import route handlers
const imageRoutes = require('./routes/image');
const videoRoutes = require('./routes/video');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure upload and output directories exist
const uploadDir = process.env.UPLOAD_DIR || './uploads';
const outputDir = process.env.OUTPUT_DIR || './outputs';

[uploadDir, outputDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|avi|mov/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only image and video files are allowed'));
    }
  }
});

// Make upload middleware available globally
app.use((req, res, next) => {
  req.upload = upload;
  next();
});

// Routes
app.use('/api/images', imageRoutes);
app.use('/api/videos', videoRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    message: 'AI Media Generation API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'AI Media Generation API',
    version: '1.0.0',
    description: 'API for generating images and videos using various AI models',
    endpoints: {
      images: '/api/images',
      videos: '/api/videos',
      health: '/api/health'
    },
    supportedModels: {
      images: ['stable-diffusion', 'dall-e', 'midjourney', 'sdxl'],
      videos: ['runwayml', 'pika', 'stable-video-diffusion']
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AI Media Generation API running on port ${PORT}`);
  console.log(`📁 Upload directory: ${path.resolve(uploadDir)}`);
  console.log(`📁 Output directory: ${path.resolve(outputDir)}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
