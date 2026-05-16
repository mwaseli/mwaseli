// MWASE AI AGENT - Admin Dashboard JavaScript

// Show/hide sections
function showSection(sectionId) {
    // Hide all generation sections
    document.querySelectorAll('.generation-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Initialize - hide all generation sections by default
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.generation-section').forEach(section => {
        section.style.display = 'none';
    });
});

// Image Generation Form
const imageForm = document.getElementById('imageForm');
if (imageForm) {
    imageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const prompt = document.getElementById('imagePrompt').value;
        const quality = document.getElementById('imageQuality').value;
        const style = document.getElementById('imageStyle').value;
        const resultDiv = document.getElementById('imageResult');
        
        resultDiv.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Generating image...</div>';
        
        try {
            const response = await fetch('/api/generate/image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt, quality, style })
            });
            
            const data = await response.json();
            
            if (data.success) {
                resultDiv.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Image Generated Successfully!</h3>
                        <p>Prompt: ${data.data.prompt}</p>
                        <p>Quality: ${data.data.quality} | Style: ${data.data.style}</p>
                    </div>
                `;
            } else {
                resultDiv.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-circle"></i> Generation failed</div>';
            }
        } catch (error) {
            resultDiv.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-circle"></i> Error: ' + error.message + '</div>';
        }
    });
}

// Video Generation Form
const videoForm = document.getElementById('videoForm');
if (videoForm) {
    videoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const prompt = document.getElementById('videoPrompt').value;
        const quality = document.getElementById('videoQuality').value;
        const style = document.getElementById('videoStyle').value;
        const duration = document.getElementById('videoDuration').value;
        const resultDiv = document.getElementById('videoResult');
        
        resultDiv.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Starting video generation...</div>';
        
        try {
            const response = await fetch('/api/generate/video', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt, quality, style, duration })
            });
            
            const data = await response.json();
            
            if (data.success) {
                resultDiv.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Video Generation Started!</h3>
                        <p>Prompt: ${data.data.prompt}</p>
                        <p>Quality: ${data.data.quality} | Duration: ${data.data.duration} min</p>
                        <p>Status: ${data.data.status}</p>
                    </div>
                `;
            } else {
                resultDiv.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-circle"></i> Generation failed</div>';
            }
        } catch (error) {
            resultDiv.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-circle"></i> Error: ' + error.message + '</div>';
        }
    });
}

// Voice Generation Form
const voiceForm = document.getElementById('voiceForm');
if (voiceForm) {
    voiceForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const text = document.getElementById('voiceText').value;
        const voice = document.getElementById('voiceType').value;
        const language = document.getElementById('voiceLanguage').value;
        const quality = document.getElementById('voiceQuality').value;
        const resultDiv = document.getElementById('voiceResult');
        
        resultDiv.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Generating voice...</div>';
        
        try {
            const response = await fetch('/api/generate/voice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text, voice, language, quality })
            });
            
            const data = await response.json();
            
            if (data.success) {
                resultDiv.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle"></i>
                        <h3>Voice Generated Successfully!</h3>
                        <p>Voice: ${data.data.voice} | Language: ${data.data.language}</p>
                        <p>Quality: ${data.data.quality}</p>
                    </div>
                `;
            } else {
                resultDiv.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-circle"></i> Generation failed</div>';
            }
        } catch (error) {
            resultDiv.innerHTML = '<div class="error-message"><i class="fas fa-exclamation-circle"></i> Error: ' + error.message + '</div>';
        }
    });
}

// Sidebar navigation active state
document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.sidebar-nav .nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// Stats animation
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate stats on page load
document.addEventListener('DOMContentLoaded', () => {
    const statValues = document.querySelectorAll('.stat-details h3');
    statValues.forEach(stat => {
        const endValue = parseInt(stat.textContent);
        if (!isNaN(endValue)) {
            animateValue(stat, 0, endValue, 2000);
        }
    });
});

// Console welcome message
console.log('%c MWASE AI ADMIN ', 'background: linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4); color: white; font-size: 20px; padding: 10px 20px; border-radius: 5px;');
console.log('%c Admin Dashboard Ready ', 'color: #94a3b8; font-size: 14px;');
