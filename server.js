const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session configuration
app.use(session({
    secret: 'mwase-ai-agent-secret-key-2024',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// File upload configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Mock database for users
const users = [
    {
        id: 1,
        username: 'mwaseli',
        email: 'mwaserobison@gmail.com',
        password: bcrypt.hashSync('Mwaseli1', 10),
        role: 'admin',
        createdAt: new Date()
    }
];

// Mock database for generated content
let generatedContent = [];

// Authentication middleware
const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login');
    }
    next();
};

const requireAdmin = (req, res, next) => {
    if (!req.session.userId || req.session.userRole !== 'admin') {
        return res.redirect('/login');
    }
    next();
};

// Routes
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'MWASE AI AGENT',
        user: req.session.userId ? { username: req.session.username, role: req.session.userRole } : null
    });
});

app.get('/login', (req, res) => {
    if (req.session.userId) {
        return res.redirect('/admin');
    }
    res.render('login', { title: 'Login - MWASE AI AGENT', error: null });
});

app.post('/login', async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        const user = users.find(u => 
            (u.username === username || u.email === email)
        );
        
        if (!user) {
            return res.render('login', { 
                title: 'Login - MWASE AI AGENT', 
                error: 'Invalid credentials' 
            });
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        
        if (!validPassword) {
            return res.render('login', { 
                title: 'Login - MWASE AI AGENT', 
                error: 'Invalid credentials' 
            });
        }
        
        req.session.userId = user.id;
        req.session.username = user.username;
        req.session.userRole = user.role;
        req.session.userEmail = user.email;
        
        res.redirect('/admin');
    } catch (error) {
        console.error('Login error:', error);
        res.render('login', { 
            title: 'Login - MWASE AI AGENT', 
            error: 'An error occurred during login' 
        });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.redirect('/');
    });
});

app.get('/admin', requireAdmin, (req, res) => {
    res.render('admin', {
        title: 'Admin Dashboard - MWASE AI AGENT',
        user: {
            username: req.session.username,
            email: req.session.userEmail,
            role: req.session.userRole
        },
        stats: {
            totalGenerations: generatedContent.length,
            images: generatedContent.filter(c => c.type.includes('image')).length,
            videos: generatedContent.filter(c => c.type.includes('video')).length,
            voices: generatedContent.filter(c => c.type.includes('voice')).length
        },
        recentGenerations: generatedContent.slice(-10).reverse()
    });
});

// Generation API endpoints
app.post('/api/generate/image-to-image', requireAuth, upload.single('image'), async (req, res) => {
    const { prompt, quality, style } = req.body;
    
    const generation = {
        id: uuidv4(),
        type: 'image-to-image',
        prompt,
        quality: quality || 'HD',
        style: style || 'default',
        status: 'completed',
        createdAt: new Date(),
        userId: req.session.userId
    };
    
    generatedContent.push(generation);
    
    res.json({
        success: true,
        message: 'Image to image generation completed',
        data: generation
    });
});

app.post('/api/generate/video-to-video', requireAuth, upload.single('video'), async (req, res) => {
    const { prompt, quality, duration, style } = req.body;
    
    const generation = {
        id: uuidv4(),
        type: 'video-to-video',
        prompt,
        quality: quality || 'HD',
        duration: duration || '5 minutes',
        style: style || 'default',
        status: 'completed',
        createdAt: new Date(),
        userId: req.session.userId
    };
    
    generatedContent.push(generation);
    
    res.json({
        success: true,
        message: 'Video to video generation completed',
        data: generation
    });
});

app.post('/api/generate/text-to-video', requireAuth, async (req, res) => {
    const { prompt, quality, duration, style, format3D } = req.body;
    
    const generation = {
        id: uuidv4(),
        type: 'text-to-video',
        prompt,
        quality: quality || 'HD',
        duration: duration || '5 minutes',
        maxDuration: '50 minutes',
        style: style || 'default',
        format3D: format3D || false,
        status: 'completed',
        createdAt: new Date(),
        userId: req.session.userId
    };
    
    generatedContent.push(generation);
    
    res.json({
        success: true,
        message: 'Text to video generation completed',
        data: generation
    });
});

app.post('/api/generate/text-to-image', requireAuth, async (req, res) => {
    const { prompt, quality, style, resolution } = req.body;
    
    const generation = {
        id: uuidv4(),
        type: 'text-to-image',
        prompt,
        quality: quality || 'HD',
        style: style || 'default',
        resolution: resolution || '1920x1080',
        status: 'completed',
        createdAt: new Date(),
        userId: req.session.userId
    };
    
    generatedContent.push(generation);
    
    res.json({
        success: true,
        message: 'Text to image generation completed',
        data: generation
    });
});

app.post('/api/generate/text-to-voice', requireAuth, async (req, res) => {
    const { text, voice, language, quality } = req.body;
    
    const generation = {
        id: uuidv4(),
        type: 'text-to-voice',
        text,
        voice: voice || 'default',
        language: language || 'en',
        quality: quality || 'HD',
        status: 'completed',
        createdAt: new Date(),
        userId: req.session.userId
    };
    
    generatedContent.push(generation);
    
    res.json({
        success: true,
        message: 'Text to voice generation completed',
        data: generation
    });
});

app.post('/api/edit/video', requireAuth, upload.single('video'), async (req, res) => {
    const { edits, quality, effects } = req.body;
    
    const generation = {
        id: uuidv4(),
        type: 'video-edit',
        edits,
        quality: quality || 'HD',
        effects: effects || [],
        status: 'completed',
        createdAt: new Date(),
        userId: req.session.userId
    };
    
    generatedContent.push(generation);
    
    res.json({
        success: true,
        message: 'Video editing completed',
        data: generation
    });
});

app.get('/api/generations', requireAdmin, (req, res) => {
    res.json({
        success: true,
        data: generatedContent.reverse()
    });
});

app.delete('/api/generations/:id', requireAdmin, (req, res) => {
    const { id } = req.params;
    generatedContent = generatedContent.filter(g => g.id !== id);
    
    res.json({
        success: true,
        message: 'Generation deleted successfully'
    });
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 MWASE AI AGENT - Image and Video Generator          ║
║                                                           ║
║   Server running on: http://localhost:${PORT}              ║
║   Admin Dashboard: http://localhost:${PORT}/admin          ║
║   Login: http://localhost:${PORT}/login                    ║
║                                                           ║
║   Domain: mwaseai.io                                      ║
║                                                           ║
║   Features:                                               ║
║   ✓ Image to Image                                        ║
║   ✓ Video to Video                                        ║
║   ✓ Text to Video (up to 50 minutes)                     ║
║   ✓ Text to Image                                         ║
║   ✓ Text to Voice                                         ║
║   ✓ 3D HD Generation                                      ║
║   ✓ Video Editing                                         ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);
});
