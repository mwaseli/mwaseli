const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const stabilityService = require('../services/stability');
const replicateService = require('../services/replicate');
const openaiService = require('../services/openai');
const huggingfaceService = require('../services/huggingface');

// Generate image using Stability AI
router.post('/generate/stability', async (req, res) => {
  try {
    const { prompt, width, height, samples, steps, cfg_scale, style_preset } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt is required' });
    }

    const result = await stabilityService.generateImage(prompt, {
      width,
      height,
      samples,
      steps,
      cfg_scale,
      style_preset
    });

    // Save generated images to output directory
    const outputDir = process.env.OUTPUT_DIR || './outputs';
    const savedImages = [];

    for (let i = 0; i < result.images.length; i++) {
      const img = result.images[i];
      const filename = `stability-${Date.now()}-${i}.png`;
      const filepath = path.join(outputDir, filename);
      
      const buffer = Buffer.from(img.base64, 'base64');
      fs.writeFileSync(filepath, buffer);
      
      savedImages.push({
        filename,
        filepath,
        finishReason: img.finishReason
      });
    }

    res.json({
      success: true,
      model: result.model,
      images: savedImages,
      message: `${savedImages.length} image(s) generated successfully`
    });
  } catch (error) {
    console.error('Stability AI generation error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Generate image using SDXL via Replicate
router.post('/generate/sdxl', async (req, res) => {
  try {
    const { prompt, negative_prompt, width, height, num_outputs, guidance_scale, num_inference_steps } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt is required' });
    }

    const result = await replicateService.generateSDXL(prompt, {
      negative_prompt,
      width,
      height,
      num_outputs,
      guidance_scale,
      num_inference_steps
    });

    res.json({
      success: true,
      model: 'sdxl',
      prediction: result.data,
      message: 'Image generation started'
    });
  } catch (error) {
    console.error('SDXL generation error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Generate image using DALL-E 3
router.post('/generate/dalle', async (req, res) => {
  try {
    const { prompt, size, quality, style, n } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt is required' });
    }

    const result = await openaiService.generateImage(prompt, {
      size,
      quality,
      style,
      n
    });

    res.json({
      success: true,
      model: result.model,
      images: result.images,
      message: `${result.images.length} image(s) generated successfully`
    });
  } catch (error) {
    console.error('DALL-E generation error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Generate image using Hugging Face
router.post('/generate/huggingface', async (req, res) => {
  try {
    const { prompt, model, negative_prompt, width, height, num_inference_steps } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt is required' });
    }

    const result = await huggingfaceService.generateImage(prompt, {
      model,
      negative_prompt,
      width,
      height,
      num_inference_steps
    });

    // Save generated image
    const outputDir = process.env.OUTPUT_DIR || './outputs';
    const filename = `hf-${Date.now()}.png`;
    const filepath = path.join(outputDir, filename);
    
    const buffer = Buffer.from(result.image.base64, 'base64');
    fs.writeFileSync(filepath, buffer);

    res.json({
      success: true,
      model: result.model,
      image: {
        filename,
        filepath,
        contentType: result.image.contentType
      },
      message: 'Image generated successfully'
    });
  } catch (error) {
    console.error('Hugging Face generation error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Image-to-Image transformation
router.post('/transform', async (req, res) => {
  try {
    const { imagePath, prompt, service, options } = req.body;

    if (!imagePath || !prompt) {
      return res.status(400).json({ success: false, error: 'Image path and prompt are required' });
    }

    let result;
    switch (service) {
      case 'stability':
        result = await stabilityService.imageToImage(imagePath, prompt, options);
        break;
      case 'huggingface':
        // Convert image to base64 first
        const imageBuffer = fs.readFileSync(imagePath);
        const base64 = imageBuffer.toString('base64');
        result = await huggingfaceService.imageToImage(base64, prompt, options);
        break;
      default:
        return res.status(400).json({ success: false, error: 'Unsupported service' });
    }

    res.json({
      success: true,
      result,
      message: 'Image transformed successfully'
    });
  } catch (error) {
    console.error('Image transformation error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Upscale image
router.post('/upscale', async (req, res) => {
  try {
    const { imageBase64, imageUrl, service } = req.body;

    if (!imageBase64 && !imageUrl) {
      return res.status(400).json({ success: false, error: 'Image data is required' });
    }

    let result;
    switch (service) {
      case 'stability':
        result = await stabilityService.upscaleImage(imageBase64);
        break;
      case 'replicate':
        result = await replicateService.upscaleImage(imageUrl);
        break;
      default:
        return res.status(400).json({ success: false, error: 'Unsupported service' });
    }

    res.json({
      success: true,
      result,
      message: 'Image upscaled successfully'
    });
  } catch (error) {
    console.error('Image upscaling error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get available models
router.get('/models', (req, res) => {
  res.json({
    success: true,
    models: {
      stability: {
        name: 'Stability AI',
        endpoints: [
          '/api/images/generate/stability',
          '/api/images/transform',
          '/api/images/upscale'
        ],
        features: ['text-to-image', 'image-to-image', 'upscaling']
      },
      sdxl: {
        name: 'SDXL (via Replicate)',
        endpoints: ['/api/images/generate/sdxl'],
        features: ['text-to-image', 'high-resolution']
      },
      dalle: {
        name: 'DALL-E 3 (via OpenAI)',
        endpoints: ['/api/images/generate/dalle'],
        features: ['text-to-image', 'editing', 'variations']
      },
      huggingface: {
        name: 'Hugging Face Models',
        endpoints: ['/api/images/generate/huggingface', '/api/images/transform'],
        features: ['text-to-image', 'image-to-image', 'multiple-models']
      }
    }
  });
});

module.exports = router;
