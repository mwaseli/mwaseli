const axios = require('axios');
const fs = require('fs');
const path = require('path');

class StabilityAIService {
  constructor() {
    this.apiKey = process.env.STABILITY_API_KEY;
    this.baseURL = 'https://api.stability.ai/v1';
  }

  async generateImage(prompt, options = {}) {
    if (!this.apiKey) {
      throw new Error('Stability AI API key not configured');
    }

    const FormData = require('form-data');
    const formData = new FormData();
    formData.append('prompt', prompt);
    formData.append('output_format', 'png');

    try {
      const response = await axios.post(
        'https://api.stability.ai/v2beta/stable-image/generate/core',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            ...formData.getHeaders(),
            'Accept': 'image/*'
          },
          responseType: 'arraybuffer'
        }
      );

      const base64Image = Buffer.from(response.data).toString('base64');
      return {
        success: true,
        images: [{ base64: base64Image, finishReason: 'SUCCESS' }],
        model: 'stable-image-core'
      };
    } catch (error) {
      console.error('Stability AI Error:', error.response?.data?.toString() || error.message);
      const errorMsg = error.response?.data ? error.response.data.toString() : error.message;
      throw new Error(`Failed to generate image: ${errorMsg}`);
    }
  }

  async imageToImage(imagePath, prompt, options = {}) {
    if (!this.apiKey) {
      throw new Error('Stability AI API key not configured');
    }

    const {
      width = 512,
      height = 512,
      strength = 0.35,
      steps = 30
    } = options;

    try {
      const imageBuffer = fs.readFileSync(imagePath);
      const formData = new FormData();
      
      // Note: In Node.js, you'd need to use a FormData implementation
      // This is a simplified version - in production, use 'form-data' package
      formData.append('init_image', imageBuffer);
      formData.append('text_prompts[0][text]', prompt);
      formData.append('width', width);
      formData.append('height', height);
      formData.append('strength', strength);
      formData.append('steps', steps);

      const response = await axios.post(
        `${this.baseURL}/generation/stable-diffusion-v1-6/image-to-image`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Accept': 'application/json',
            ...formData.getHeaders()
          }
        }
      );

      return {
        success: true,
        images: response.data.artifacts.map(artifact => ({
          base64: artifact.base64,
          finishReason: artifact.finishReason
        })),
        model: 'stable-diffusion-v1-6-img2img'
      };
    } catch (error) {
      console.error('Stability AI Image-to-Image Error:', error.response?.data || error.message);
      throw new Error(`Failed to transform image: ${error.response?.data?.message || error.message}`);
    }
  }

  async upscaleImage(imageBase64) {
    if (!this.apiKey) {
      throw new Error('Stability AI API key not configured');
    }

    try {
      const response = await axios.post(
        `${this.baseURL}/generation/esrgan-v1-x2plus/upscale`,
        {
          image: imageBase64
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );

      return {
        success: true,
        image: response.data.image,
        model: 'esrgan-v1-x2plus'
      };
    } catch (error) {
      console.error('Stability AI Upscale Error:', error.response?.data || error.message);
      throw new Error(`Failed to upscale image: ${error.response?.data?.message || error.message}`);
    }
  }
}

module.exports = new StabilityAIService();
