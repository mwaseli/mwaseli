# MWASE AI - Free Image & Video Generator

A modern, free-to-use AI content generation platform that leverages Replicate, OpenAI, and HuggingFace APIs to create stunning images, videos, and voice content.

## Features

✨ **Image Generation**
- Text-to-Image: Create images from text prompts
- Image-to-Image: Edit and transform existing images
- Multiple model options (HD, Genius, Super Genius)
- Various aspect ratios and styles

🎬 **Video Generation**
- Text-to-Video: Generate videos from text descriptions
- Video-to-Video: Transform existing videos
- Up to 50-minute video generation
- Multiple quality and resolution options

🎤 **Voice Generation**
- Text-to-Voice: Convert text to natural-sounding audio
- Multiple voice options and languages
- Professional audio quality

🎨 **Gallery & Management**
- Save all generated content
- Organize into galleries
- Download and export
- Fast retrieval and browsing

## Technology Stack

- **Frontend**: Next.js 16 + React 18 + TypeScript
- **Styling**: Tailwind CSS
- **APIs**:
  - Replicate: Image and video generation
  - OpenAI: Text-to-speech and advanced generation
  - HuggingFace: Additional AI models
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

1. Clone the repository
```bash
git clone <your-repo>
cd v0-project
```

2. Install dependencies
```bash
npm install
```

3. Set environment variables
Create a `.env.local` file:
```env
REPLICATE_API_TOKEN=your_replicate_api_key
OPENAI_API_KEY=your_openai_api_key
HUGGINGFACE_API_KEY=your_huggingface_api_key
```

Get your API keys:
- **Replicate**: https://replicate.com/account/api-tokens
- **OpenAI**: https://platform.openai.com/account/api-keys
- **HuggingFace**: https://huggingface.co/settings/tokens

4. Run development server
```bash
npm run dev
```

Visit http://localhost:3000

## Usage

### Home Page (`/`)
- Browse all AI generation tools
- Access trending models
- Quick access to each generator

### Text-to-Image (`/generate/text-to-image`)
- Enter a detailed prompt
- Select model (HD, Genius, Super Genius)
- Choose aspect ratio
- Generate stunning images

### Text-to-Video (`/generate/text-to-video`)
- Describe your video concept
- Select video model and quality
- Set duration
- Generate professional videos

### Image-to-Image (`/generate/image-to-image`)
- Upload an existing image
- Enter editing prompt
- Adjust strength parameter
- Create variations

### Text-to-Voice (`/generate/text-to-voice`)
- Enter text to convert
- Select voice personality
- Choose language
- Generate audio file

## Deployment

### Deploy to Vercel

1. Push code to GitHub
```bash
git add .
git commit -m "Deploy MWASE AI"
git push
```

2. Import project to Vercel
- Visit https://vercel.com/new
- Select your GitHub repository
- Add environment variables:
  - `REPLICATE_API_TOKEN`
  - `OPENAI_API_KEY`
  - `HUGGINGFACE_API_KEY`

3. Deploy
```bash
vercel deploy --prod
```

### Domain Setup

Suggested domain names:
- mwaseai.com
- mwaseagent.com
- mwasecreator.com

To connect custom domain:
1. Update DNS records at your registrar
2. Add domain in Vercel dashboard
3. Verify ownership

## API Routes

### POST `/api/generate-image`
Generate images from text prompts

**Request:**
```json
{
  "prompt": "A beautiful sunset over mountains",
  "model": "flux",
  "shape": "1:1"
}
```

**Response:**
```json
{
  "success": true,
  "imageUrl": "https://...",
  "prompt": "...",
  "model": "flux",
  "shape": "1:1"
}
```

### POST `/api/generate-video`
Generate videos from text prompts

**Request:**
```json
{
  "prompt": "A person dancing in a futuristic city",
  "duration": 15,
  "resolution": "720p"
}
```

### POST `/api/generate-voice`
Convert text to speech

**Request:**
```json
{
  "text": "Hello, welcome to MWASE AI",
  "voice": "nova",
  "language": "en"
}
```

### POST `/api/edit-image`
Edit images with AI

**Request:**
```json
{
  "imageUrl": "https://...",
  "prompt": "Make it more colorful",
  "strength": 0.7
}
```

## Features Showcase

### Dark Purple Theme
Modern dark interface with purple accents matching premium AI tools

### Fast Generation
Optimized API calls with caching and efficient queuing

### No Authentication Required
Complete free access - no signup needed

### Professional Results
High-quality outputs from industry-leading AI models

### Trending Models
Discover popular generation styles and effects

## Performance Tips

1. **Image Generation**: Keep prompts concise (max 1000 characters)
2. **Video Generation**: Longer videos take more time - be patient
3. **Batch Operations**: Generate multiple items in sequence
4. **Caching**: Results are cached for faster retrieval

## Troubleshooting

### API Key Errors
- Verify keys are correctly set in environment variables
- Check API key permissions at provider dashboard
- Ensure keys have sufficient credits/usage limits

### Generation Timeouts
- Video generation can take 1-5 minutes
- Check browser console for errors
- Verify network connection is stable

### Image Quality Issues
- Use more descriptive prompts
- Try different models
- Adjust quality/resolution settings

## File Structure

```
├── app/
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout
│   ├── generate/
│   │   ├── text-to-image/
│   │   ├── text-to-video/
│   │   ├── image-to-image/
│   │   └── text-to-voice/
│   └── api/
│       ├── generate-image/
│       ├── generate-video/
│       ├── generate-voice/
│       └── edit-image/
├── components/
│   └── header.tsx               # Shared components
├── lib/
│   └── utilities.ts
├── public/                       # Static assets
└── styles/
    └── globals.css
```

## License

Free to use - MIT License

## Support

For issues or feature requests:
1. Check GitHub Issues
2. Review API provider documentation
3. Check environment variables are set correctly

## Roadmap

- [ ] User gallery with cloud storage
- [ ] Advanced editing tools
- [ ] Batch generation queue
- [ ] Custom model training
- [ ] API for third-party integration
- [ ] Mobile app

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch
3. Submit pull request

---

**MWASE AI** - Free AI content generation for everyone 🚀
