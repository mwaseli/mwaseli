const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const replicateService = require('../services/replicate');
const huggingfaceService = require('../services/huggingface');

// Generate video from text using Replicate (various models)
router.post('/generate/text-to-video', async (req, res) => {
  try {
    const { prompt, model, options } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt is required' });
    }

    let result;
    
    switch (model) {
      case 'runway':
        result = await replicateService.generateRunwayVideo(prompt, options);
        break;
      case 'svd':
        // Stable Video Diffusion requires an image, so this would need image upload first
        return res.status(400).json({ 
          success: false, 
          error: 'Stable Video Diffusion requires an image. Use /api/videos/generate/image-to-video instead.' 
        });
      default:
        // Default to Runway Gen-2
        result = await replicateService.generateRunwayVideo(prompt, options);
    }

    res.json({
      success: true,
      model: model || 'runway',
      prediction: result.data,
      message: 'Video generation started. Check status using prediction ID.',
      predictionId: result.data?.id
    });
  } catch (error) {
    console.error('Text-to-Video generation error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Generate video from image using Stable Video Diffusion
router.post('/generate/image-to-video', async (req, res) => {
  try {
    const { imageUrl, model, options } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ success: false, error: 'Image URL is required' });
    }

    let result;
    
    switch (model) {
      case 'svd':
        result = await replicateService.generateVideo(imageUrl, options);
        break;
      default:
        // Default to Stable Video Diffusion
        result = await replicateService.generateVideo(imageUrl, options);
    }

    res.json({
      success: true,
      model: model || 'svd',
      prediction: result.data,
      message: 'Video generation started. Check status using prediction ID.',
      predictionId: result.data?.id
    });
  } catch (error) {
    console.error('Image-to-Video generation error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Generate video using Hugging Face models
router.post('/generate/huggingface', async (req, res) => {
  try {
    const { prompt, model } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt is required' });
    }

    const result = await huggingfaceService.generateVideo(prompt, { model });

    // Save generated video
    const outputDir = process.env.OUTPUT_DIR || './outputs';
    const filename = `hf-video-${Date.now()}.mp4`;
    const filepath = path.join(outputDir, filename);
    
    const buffer = Buffer.from(result.video.base64, 'base64');
    fs.writeFileSync(filepath, buffer);

    res.json({
      success: true,
      model: result.model,
      video: {
        filename,
        filepath,
        contentType: result.video.contentType
      },
      message: 'Video generated successfully'
    });
  } catch (error) {
    console.error('Hugging Face video generation error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get prediction status (for async operations)
router.get('/prediction/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, error: 'Prediction ID is required' });
    }

    const result = await replicateService.getPrediction(id);

    res.json({
      success: true,
      prediction: result.data
    });
  } catch (error) {
    console.error('Get prediction error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Upload file for video generation
router.post('/upload', async (req, res) => {
  try {
    // This endpoint expects a file upload via multipart/form-data
    // The actual upload handling is done by multer middleware in server.js
    
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    
    res.json({
      success: true,
      file: {
        filename: req.file.filename,
        path: req.file.path,
        url: fileUrl,
        size: req.file.size,
        mimetype: req.file.mimetype
      },
      message: 'File uploaded successfully'
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get available video models
router.get('/models', (req, res) => {
  res.json({
    success: true,
    models: {
      runway: {
        name: 'Runway Gen-2',
        provider: 'Replicate',
        type: 'text-to-video',
        features: ['text-to-video', 'image-to-video', 'high-quality'],
        maxDuration: '4 seconds',
        resolutions: ['768x768', '1280x768', '768x1280']
      },
      svd: {
        name: 'Stable Video Diffusion',
        provider: 'Replicate',
        type: 'image-to-video',
        features: ['image-to-video', 'customizable-motion'],
        frameLengths: ['14_frames', '25_frames']
      },
      huggingface: {
        name: 'Hugging Face Models',
        provider: 'Hugging Face',
        type: 'text-to-video',
        models: [
          'damo-vilab/text-to-video-ms-1.7b',
          'ali-vilab/text-to-video-attentions'
        ],
        features: ['text-to-video', 'free-tier-available']
      }
    },
    endpoints: {
      textToVideo: '/api/videos/generate/text-to-video',
      imageToVideo: '/api/videos/generate/image-to-video',
      huggingface: '/api/videos/generate/huggingface',
      predictionStatus: '/api/videos/prediction/:id',
      upload: '/api/videos/upload'
    }
  });
});

module.exports = router;
