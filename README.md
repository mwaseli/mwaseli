# AI Media Generation API

A comprehensive API for generating images and videos using various AI models including Stability AI, OpenAI DALL-E, Replicate (SDXL, RunwayML, Stable Video Diffusion), and Hugging Face.

## Features

### Image Generation
- **Stability AI**: Text-to-image, image-to-image, upscaling
- **SDXL**: High-resolution text-to-image via Replicate
- **DALL-E 3**: Advanced text-to-image with editing and variations
- **Hugging Face**: Multiple open-source models

### Video Generation
- **Runway Gen-2**: Text-to-video and image-to-video
- **Stable Video Diffusion**: Image-to-video conversion
- **Hugging Face**: Various text-to-video models

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```env
STABILITY_API_KEY=your_stability_api_key_here
REPLICATE_API_TOKEN=your_replicate_token_here
HUGGINGFACE_API_TOKEN=your_huggingface_token_here
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
NODE_ENV=development
```

4. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Health Check
```
GET /api/health
```

### Image Endpoints

#### Generate Image (Stability AI)
```
POST /api/images/generate/stability
Content-Type: application/json

{
  "prompt": "A beautiful sunset over mountains",
  "width": 512,
  "height": 512,
  "samples": 1,
  "steps": 30,
  "cfg_scale": 7,
  "style_preset": "landscape"
}
```

#### Generate Image (SDXL)
```
POST /api/images/generate/sdxl
Content-Type: application/json

{
  "prompt": "A cyberpunk city at night",
  "negative_prompt": "blurry, low quality",
  "width": 1024,
  "height": 1024,
  "num_outputs": 1,
  "guidance_scale": 7.5,
  "num_inference_steps": 50
}
```

#### Generate Image (DALL-E 3)
```
POST /api/images/generate/dalle
Content-Type: application/json

{
  "prompt": "A futuristic robot in a garden",
  "size": "1024x1024",
  "quality": "hd",
  "style": "vivid",
  "n": 1
}
```

#### Generate Image (Hugging Face)
```
POST /api/images/generate/huggingface
Content-Type: application/json

{
  "prompt": "An astronaut on Mars",
  "model": "stabilityai/stable-diffusion-xl-base-1.0",
  "negative_prompt": "distorted, ugly",
  "width": 512,
  "height": 512
}
```

### Video Endpoints

#### Generate Video from Text
```
POST /api/videos/generate/text-to-video
Content-Type: application/json

{
  "prompt": "A drone flying over a mountain range",
  "model": "runway",
  "options": {
    "seconds": 4,
    "resolution": "768x768"
  }
}
```

#### Generate Video from Image
```
POST /api/videos/generate/image-to-video
Content-Type: application/json

{
  "imageUrl": "https://example.com/image.jpg",
  "model": "svd",
  "options": {
    "video_length": "14_frames_with_sv3d",
    "motion_bucket_id": 127,
    "frames_per_second": 6
  }
}
```

## Project Structure

```
├── server.js              # Main server file
├── routes/
│   ├── image.js          # Image generation routes
│   └── video.js          # Video generation routes
├── services/
│   ├── stability.js      # Stability AI service
│   ├── replicate.js      # Replicate service
│   ├── openai.js         # OpenAI DALL-E service
│   └── huggingface.js    # Hugging Face service
├── utils/                # Utility functions
├── uploads/              # Uploaded files
├── outputs/              # Generated media
├── .env                  # Environment variables
├── .env.example          # Example environment file
└── package.json          # Dependencies
```

## Getting API Keys

### Stability AI
1. Visit https://platform.stability.ai/
2. Sign up or log in
3. Go to Account Settings → API Keys
4. Generate a new API key

### Replicate
1. Visit https://replicate.com/
2. Sign up or log in
3. Go to Account Settings → API Tokens
4. Copy your API token

### Hugging Face
1. Visit https://huggingface.co/
2. Sign up or log in
3. Go to Settings → Access Tokens
4. Create a new token with write permissions

### OpenAI
1. Visit https://platform.openai.com/
2. Sign up or log in
3. Go to API Keys section
4. Create a new secret key

## Deployment

### Docker

Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t ai-media-api .
docker run -p 3000:3000 --env-file .env ai-media-api
```

### Heroku

1. Create a Heroku app:
```bash
heroku create your-app-name
```

2. Set environment variables:
```bash
heroku config:set STABILITY_API_KEY=your_key
heroku config:set REPLICATE_API_TOKEN=your_token
heroku config:set HUGGINGFACE_API_TOKEN=your_token
heroku config:set OPENAI_API_KEY=your_key
```

3. Deploy:
```bash
git push heroku main
```

## License

ISC
