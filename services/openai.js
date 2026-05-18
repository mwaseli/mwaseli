const axios = require('axios');

class OpenAIService {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.baseURL = 'https://api.openai.com/v1';
  }

  async generateImage(prompt, options = {}) {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const {
      size = '1024x1024',
      quality = 'standard',
      n = 1
    } = options;

    try {
      const response = await axios.post(
        `${this.baseURL}/images/generations`,
        {
          model: 'dall-e-3',
          prompt,
          size,
          quality,
          n
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        images: response.data.data.map(img => ({
          url: img.url,
          revised_prompt: img.revised_prompt
        })),
        model: 'dall-e-3'
      };
    } catch (error) {
      console.error('OpenAI DALL-E Error:', error.response?.data || error.message);
      throw new Error(`Failed to generate image: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  async editImage(imagePath, prompt, options = {}) {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const {
      maskPath = null,
      size = '1024x1024',
      n = 1
    } = options;

    try {
      const formData = new FormData();
      formData.append('model', 'dall-e-2'); // Only DALL-E 2 supports editing
      formData.append('prompt', prompt);
      formData.append('image', fs.createReadStream(imagePath));
      formData.append('size', size);
      formData.append('n', n);

      if (maskPath) {
        formData.append('mask', fs.createReadStream(maskPath));
      }

      const response = await axios.post(
        `${this.baseURL}/images/edits`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            ...formData.getHeaders()
          }
        }
      );

      return {
        success: true,
        images: response.data.data.map(img => ({
          url: img.url
        })),
        model: 'dall-e-2'
      };
    } catch (error) {
      console.error('OpenAI Edit Image Error:', error.response?.data || error.message);
      throw new Error(`Failed to edit image: ${error.response?.data?.error?.message || error.message}`);
    }
  }

  async createVariation(imagePath, options = {}) {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const {
      size = '1024x1024',
      n = 1
    } = options;

    try {
      const formData = new FormData();
      formData.append('model', 'dall-e-2'); // Only DALL-E 2 supports variations
      formData.append('image', fs.createReadStream(imagePath));
      formData.append('size', size);
      formData.append('n', n);

      const response = await axios.post(
        `${this.baseURL}/images/variations`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            ...formData.getHeaders()
          }
        }
      );

      return {
        success: true,
        images: response.data.data.map(img => ({
          url: img.url
        })),
        model: 'dall-e-2'
      };
    } catch (error) {
      console.error('OpenAI Variation Error:', error.response?.data || error.message);
      throw new Error(`Failed to create variation: ${error.response?.data?.error?.message || error.message}`);
    }
  }
}

module.exports = new OpenAIService();
