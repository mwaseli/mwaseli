const axios = require('axios');

class HuggingFaceService {
  constructor() {
    this.apiToken = process.env.HUGGINGFACE_TOKEN;
    this.baseURL = 'https://api-inference.huggingface.co/models';
  }

  async queryModel(modelId, inputs, parameters = {}) {
    if (!this.apiToken) {
      throw new Error('Hugging Face API token not configured');
    }

    try {
      const response = await axios.post(
        `${this.baseURL}/${modelId}`,
        {
          inputs,
          parameters
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        data: response.data,
        model: modelId
      };
    } catch (error) {
      console.error('Hugging Face Error:', error.response?.data || error.message);
      throw new Error(`Failed to query model: ${error.response?.data?.error || error.message}`);
    }
  }

  // Text-to-Image using various models
  async generateImage(prompt, options = {}) {
    const {
      model = 'stabilityai/stable-diffusion-xl-base-1.0',
      negative_prompt = '',
      width = 512,
      height = 512,
      num_inference_steps = 30
    } = options;

    const parameters = {
      negative_prompt,
      width,
      height,
      num_inference_steps
    };

    // Remove undefined parameters
    Object.keys(parameters).forEach(key => 
      parameters[key] === undefined && delete parameters[key]
    );

    try {
      const response = await axios.post(
        `${this.baseURL}/${model}`,
        {
          inputs: prompt,
          parameters
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiToken}`,
            'Content-Type': 'application/json'
          },
          responseType: 'blob'
        }
      );

      // Convert blob to base64
      const buffer = Buffer.from(await response.data.arrayBuffer());
      const base64 = buffer.toString('base64');

      return {
        success: true,
        image: {
          base64,
          contentType: response.headers['content-type']
        },
        model
      };
    } catch (error) {
      console.error('Hugging Face Image Generation Error:', error.response?.data || error.message);
      throw new Error(`Failed to generate image: ${error.response?.data?.error || error.message}`);
    }
  }

  // Image-to-Image
  async imageToImage(imageBase64, prompt, options = {}) {
    const {
      model = 'timbrooks/instruct-pix2pix',
      strength = 0.75
    } = options;

    try {
      const response = await axios.post(
        `${this.baseURL}/${model}`,
        {
          inputs: prompt,
          image: imageBase64,
          parameters: { strength }
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiToken}`,
            'Content-Type': 'application/json'
          },
          responseType: 'blob'
        }
      );

      const buffer = Buffer.from(await response.data.arrayBuffer());
      const base64 = buffer.toString('base64');

      return {
        success: true,
        image: {
          base64,
          contentType: response.headers['content-type']
        },
        model
      };
    } catch (error) {
      console.error('Hugging Face Image-to-Image Error:', error.response?.data || error.message);
      throw new Error(`Failed to transform image: ${error.response?.data?.error || error.message}`);
    }
  }

  // Text-to-Video (using available models)
  async generateVideo(prompt, options = {}) {
    const {
      model = 'damo-vilab/text-to-video-ms-1.7b'
    } = options;

    try {
      const response = await axios.post(
        `${this.baseURL}/${model}`,
        {
          inputs: prompt
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiToken}`,
            'Content-Type': 'application/json'
          },
          responseType: 'blob'
        }
      );

      const buffer = Buffer.from(await response.data.arrayBuffer());
      const base64 = buffer.toString('base64');

      return {
        success: true,
        video: {
          base64,
          contentType: response.headers['content-type']
        },
        model
      };
    } catch (error) {
      console.error('Hugging Face Video Generation Error:', error.response?.data || error.message);
      throw new Error(`Failed to generate video: ${error.response?.data?.error || error.message}`);
    }
  }

  // Get model info
  async getModelInfo(modelId) {
    if (!this.apiToken) {
      throw new Error('Hugging Face API token not configured');
    }

    try {
      const response = await axios.get(
        `https://huggingface.co/api/models/${modelId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiToken}`
          }
        }
      );

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Hugging Face Model Info Error:', error.response?.data || error.message);
      throw new Error(`Failed to get model info: ${error.response?.data?.error || error.message}`);
    }
  }
}

module.exports = new HuggingFaceService();
