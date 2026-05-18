const axios = require('axios');
const FormData = require('form-data');

class ReplicateService {
  constructor() {
    this.apiToken = process.env.REPLICATE_API_TOKEN;
    this.baseURL = 'https://api.replicate.com/v1';
  }

  async createPrediction(model, input) {
    if (!this.apiToken) {
      throw new Error('Replicate API token not configured');
    }

    try {
      const response = await axios.post(
        `${this.baseURL}/predictions`,
        {
          version: model,
          input: input
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiToken}`,
            'Content-Type': 'application/json',
            'Prefer': 'wait' // Wait for completion
          }
        }
      );

      return {
        success: true,
        data: response.data,
        model: model
      };
    } catch (error) {
      console.error('Replicate Error:', error.response?.data || error.message);
      throw new Error(`Failed to create prediction: ${error.response?.data?.detail || error.message}`);
    }
  }

  async getPrediction(predictionId) {
    if (!this.apiToken) {
      throw new Error('Replicate API token not configured');
    }

    try {
      const response = await axios.get(
        `${this.baseURL}/predictions/${predictionId}`,
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
      console.error('Replicate Get Prediction Error:', error.response?.data || error.message);
      throw new Error(`Failed to get prediction: ${error.response?.data?.detail || error.message}`);
    }
  }

  // SDXL Text-to-Image
  async generateSDXL(prompt, options = {}) {
    const {
      negative_prompt = '',
      width = 1024,
      height = 1024,
      num_outputs = 1,
      guidance_scale = 7.5,
      num_inference_steps = 50
    } = options;

    // SDXL model version ID (you should update this with the latest version)
    const sdxlVersion = '39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea351df4979778f7e9332fd5ab';

    return await this.createPrediction(sdxlVersion, {
      prompt,
      negative_prompt,
      width,
      height,
      num_outputs,
      guidance_scale,
      num_inference_steps
    });
  }

  // Stable Video Diffusion
  async generateVideo(imageUrl, options = {}) {
    const {
      video_length = '14_frames_with_sv3d',
      sizing_strategy = 'maintain_aspect_ratio',
      motion_bucket_id = 127,
      frames_per_second = 6
    } = options;

    // Stable Video Diffusion model version
    const svdVersion = '3f0457e4619daac51203dedb4726012b64fd31c9f0c60170f9e066bba85706ee';

    return await this.createPrediction(svdVersion, {
      input_image: imageUrl,
      video_length,
      sizing_strategy,
      motion_bucket_id,
      frames_per_second
    });
  }

  // Runway Gen-2 (Text to Video)
  async generateRunwayVideo(prompt, options = {}) {
    const {
      image_url = null,
      seconds = 4,
      resolution = '768x768'
    } = options;

    // Runway Gen-2 model version
    const runwayVersion = 'gen-2-latest';

    const input = {
      prompt,
      seconds,
      resolution
    };

    if (image_url) {
      input.image_url = image_url;
    }

    return await this.createPrediction(runwayVersion, input);
  }

  // Image Upscaling
  async upscaleImage(imageUrl) {
    // Real-ESRGAN upscaler
    const esrganVersion = '42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b';

    return await this.createPrediction(esrganVersion, {
      image: imageUrl
    });
  }
}

module.exports = new ReplicateService();
