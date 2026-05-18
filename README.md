# MWASE AI Agent - Image & Video Generator

A comprehensive AI-powered platform for generating images, videos, 3D models, and voice content using Replicate, HuggingFace, and OpenAI APIs.

## Features

### User Features
- **Text to Image**: Generate stunning images from text descriptions (Flux Pro, Anime, Realism)
- **Text to Video**: Create videos up to 50 minutes long
- **Image to Image**: Transform and edit existing images
- **Text to Voice**: Convert text to natural-sounding speech
- **3D Model Generation**: Create 3D models from prompts
- **Gallery**: Save and manage all generated content
- **Credits System**: Track and manage usage with a credit-based system

### Admin Features
- **User Management**: Create, edit, and manage user accounts
- **Credits Management**: Adjust user credits and set pricing
- **Analytics Dashboard**: Monitor platform usage and statistics
- **API Keys Management**: Configure AI provider API keys
- **System Settings**: Control platform configuration

## Tech Stack

- **Frontend**: Next.js 16, React 18, TypeScript
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage + Vercel Blob
- **AI Providers**: Replicate, HuggingFace, OpenAI
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 16+
- npm/yarn/pnpm
- Supabase account
- API keys for: Replicate, HuggingFace, OpenAI

### Installation

1. Clone and install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

REPLICATE_API_TOKEN=your_replicate_token
HUGGINGFACE_API_KEY=your_huggingface_key
OPENAI_API_KEY=your_openai_key
```

3. Run database migrations:
The database schema is automatically initialized with Row Level Security policies.

4. Create admin user:
```bash
NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npx ts-node scripts/create-admin.ts
```

5. Start development server:
```bash
npm run dev
```

Visit `http://localhost:3000` to access the application.

## Default Admin Account

- **Email**: mwaserobison@gmail.com
- **Password**: Mwaseli1
- **Access**: Go to `/admin` after login

## Project Structure

```
├── app/
│   ├── auth/                 # Authentication pages
│   ├── dashboard/            # User dashboard
│   │   ├── image-generator/
│   │   ├── video-generator/
│   │   ├── image-to-image/
│   │   ├── text-to-voice/
│   │   ├── gallery/
│   │   └── settings/
│   ├── admin/                # Admin panel
│   │   ├── users/
│   │   ├── analytics/
│   │   ├── credits/
│   │   ├── api-keys/
│   │   └── settings/
│   └── api/                  # API routes
├── components/
│   ├── dashboard/
│   └── admin/
├── lib/
│   ├── supabase/            # Supabase clients
│   ├── auth.ts              # Auth utilities
│   ├── ai-providers.ts      # AI provider integrations
│   └── store.ts             # Zustand stores
└── public/                  # Static assets
```

## Database Schema

### Core Tables
- `profiles`: User profiles with credits and subscription info
- `api_keys`: Stored API keys for AI providers
- `generation_jobs`: Tracks all image/video generations
- `galleries`: User-created galleries
- `gallery_items`: Items within galleries
- `storage_usage`: Tracks storage consumption
- `admin_logs`: Admin action logs
- `credits_log`: Credit transaction history

All tables have Row Level Security (RLS) policies enabled.

## API Endpoints

### Image Generation
```
POST /api/generate-image
Body: { prompt, model, quality }
Returns: { success, jobId }
```

### Video Generation (Coming Soon)
```
POST /api/generate-video
Body: { prompt, duration }
```

### Text to Speech (Coming Soon)
```
POST /api/generate-speech
Body: { text, voice }
```

## Deployment

### Deploy to Vercel

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel settings
4. Deploy

```bash
npm run build
npm start
```

## Environment Variables Reference

| Variable | Description |
|----------|-------------|
| NEXT_PUBLIC_SUPABASE_URL | Supabase project URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase anonymous key |
| SUPABASE_SERVICE_ROLE_KEY | Supabase service role key |
| REPLICATE_API_TOKEN | Replicate API token |
| HUGGINGFACE_API_KEY | HuggingFace API key |
| OPENAI_API_KEY | OpenAI API key |

## Features Roadmap

### Phase 4: Image Generator Enhancement
- [ ] Advanced image editing tools
- [ ] Batch generation
- [ ] Image history and versioning

### Phase 5: Video Features
- [ ] Extended video duration support (up to 50 min)
- [ ] Video effects and transitions
- [ ] Webhook integration for job callbacks

### Phase 6: Advanced Generation
- [ ] 3D model generation and viewer
- [ ] Advanced voice synthesis options
- [ ] Custom model training

### Phase 7: Monetization
- [ ] Stripe integration for subscriptions
- [ ] Credit purchasing system
- [ ] Advanced billing analytics

### Phase 8: Production Ready
- [ ] Performance optimization
- [ ] Comprehensive error handling
- [ ] Full test coverage
- [ ] Production deployment

## Security

- All data protected with Row Level Security (RLS)
- Passwords hashed with bcrypt
- Secure session management with HTTP-only cookies
- CSRF protection
- API rate limiting (planned)

## Support

For support, email: support@mwaseai.com

## License

MWASE AI Agent © 2026. All rights reserved.
