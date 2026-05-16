const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Create uploads directory if it doesn't exist
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads', { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'mwase-ai-secret-key-2024',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Mock database (in production, use a real database)
const users = [
    {
        id: 1,
        username: 'mwaseli',
        email: 'mwaserobison@gmail.com',
        password: bcrypt.hashSync('Mwaseli1', 10),
        role: 'admin'
    }
];

let generations = [];

// Authentication middleware
const requireAuth = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    }
    res.redirect('/login');
};

const requireAdmin = (req, res, next) => {
    if (req.session && req.session.userRole === 'admin') {
        return next();
    }
    res.status(403).send('Access denied');
};

// Routes
app.get('/', (req, res) => {
    res.render('index', { user: req.session.user });
});

app.get('/login', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/admin');
    }
    res.render('login', { error: null });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    const user = users.find(u => u.username === username || u.email === username);
    
    if (!user) {
        return res.render('login', { error: 'Invalid credentials' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
        return res.render('login', { error: 'Invalid credentials' });
    }
    
    req.session.userId = user.id;
    req.session.userRole = user.role;
    req.session.username = user.username;
    
    res.redirect('/admin');
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.redirect('/');
    });
});

app.get('/admin', requireAuth, requireAdmin, (req, res) => {
    const stats = {
        totalImages: generations.filter(g => g.type === 'image').length,
        totalVideos: generations.filter(g => g.type === 'video').length,
        totalVoices: generations.filter(g => g.type === 'voice').length,
        totalUsers: users.length
    };
    
    res.render('admin', { 
        user: { username: req.session.username },
        stats,
        recentGenerations: generations.slice(-10).reverse()
    });
});

// Image Generation Endpoint (Mock - integrate with actual AI API)
app.post('/api/generate/image', requireAuth, upload.single('image'), (req, res) => {
    const { prompt, quality, style } = req.body;
    
    // TODO: Integrate with Stable Diffusion or DALL-E API
    const generation = {
        id: Date.now(),
        type: 'image',
        prompt,
        quality,
        style,
        status: 'completed',
        createdAt: new Date().toISOString(),
        user: req.session.username
    };
    
    generations.push(generation);
    res.json({ success: true, data: generation });
});

// Video Generation Endpoint (Mock - integrate with actual AI API)
app.post('/api/generate/video', requireAuth, upload.single('video'), (req, res) => {
    const { prompt, quality, style, duration } = req.body;
    
    // TODO: Integrate with RunwayML or Pika Labs API
    const generation = {
        id: Date.now(),
        type: 'video',
        prompt,
        quality,
        style,
        duration,
        status: 'processing',
        createdAt: new Date().toISOString(),
        user: req.session.username
    };
    
    generations.push(generation);
    res.json({ success: true, data: generation, message: 'Video generation started' });
});

// Voice Generation Endpoint (Mock - integrate with actual AI API)
app.post('/api/generate/voice', requireAuth, (req, res) => {
    const { text, voice, language, quality } = req.body;
    
    // TODO: Integrate with ElevenLabs or Google Cloud TTS API
    const generation = {
        id: Date.now(),
        type: 'voice',
        text,
        voice,
        language,
        quality,
        status: 'completed',
        createdAt: new Date().toISOString(),
        user: req.session.username
    };
    
    generations.push(generation);
    res.json({ success: true, data: generation });
});

// Get all generations (Admin only)
app.get('/api/generations', requireAuth, requireAdmin, (req, res) => {
    res.json(generations);
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`MWASE AI Agent server running on port ${PORT}`);
    console.log(`Homepage: http://localhost:${PORT}`);
    console.log(`Admin Dashboard: http://localhost:${PORT}/admin`);
});
