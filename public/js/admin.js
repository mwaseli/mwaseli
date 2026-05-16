// Admin Dashboard JavaScript for MWASE AI AGENT

let currentGenerationType = '';

// Modal functions
function showGenerationForm(type) {
    currentGenerationType = type;
    const modal = document.getElementById('generationModal');
    const modalTitle = document.getElementById('modalTitle');
    const formFields = document.getElementById('formFields');
    
    let fields = '';
    let title = '';
    
    switch(type) {
        case 'text-to-image':
            title = 'Text to Image Generation';
            fields = `
                <div class="form-group">
                    <label>Prompt</label>
                    <textarea name="prompt" placeholder="Describe the image you want to generate..." required></textarea>
                </div>
                <div class="form-group">
                    <label>Quality</label>
                    <select name="quality" class="quality-select">
                        <option value="HD">HD</option>
                        <option value="4K">4K Ultra HD</option>
                        <option value="8K">8K Resolution</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Style</label>
                    <select name="style" class="quality-select">
                        <option value="realistic">Realistic</option>
                        <option value="artistic">Artistic</option>
                        <option value="anime">Anime</option>
                        <option value="3d">3D Render</option>
                        <option value="painting">Painting</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Resolution</label>
                    <select name="resolution" class="quality-select">
                        <option value="1920x1080">1920x1080 (Full HD)</option>
                        <option value="3840x2160">3840x2160 (4K)</option>
                        <option value="7680x4320">7680x4320 (8K)</option>
                    </select>
                </div>
            `;
            break;
            
        case 'text-to-video':
            title = 'Text to Video Generation';
            fields = `
                <div class="form-group">
                    <label>Prompt</label>
                    <textarea name="prompt" placeholder="Describe the video you want to generate..." required></textarea>
                </div>
                <div class="form-group">
                    <label>Quality</label>
                    <select name="quality" class="quality-select">
                        <option value="HD">HD (720p)</option>
                        <option value="FHD">Full HD (1080p)</option>
                        <option value="4K">4K Ultra HD</option>
                        <option value="8K">8K Resolution</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Duration (up to 50 minutes)</label>
                    <select name="duration" class="quality-select">
                        <option value="1">1 minute</option>
                        <option value="5">5 minutes</option>
                        <option value="10">10 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="50">50 minutes</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Style</label>
                    <select name="style" class="quality-select">
                        <option value="cinematic">Cinematic</option>
                        <option value="documentary">Documentary</option>
                        <option value="animation">Animation</option>
                        <option value="3d">3D Animation</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" name="format3D" value="true">
                        Enable 3D Mode
                    </label>
                </div>
            `;
            break;
            
        case 'image-to-image':
            title = 'Image to Image Transformation';
            fields = `
                <div class="form-group">
                    <label>Upload Image</label>
                    <input type="file" name="image" accept="image/*" required style="width: 100%; padding: 1rem; background: var(--dark-bg); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: var(--text-primary);">
                </div>
                <div class="form-group">
                    <label>Prompt</label>
                    <textarea name="prompt" placeholder="Describe how you want to transform the image..." required></textarea>
                </div>
                <div class="form-group">
                    <label>Quality</label>
                    <select name="quality" class="quality-select">
                        <option value="HD">HD</option>
                        <option value="4K">4K Ultra HD</option>
                        <option value="8K">8K Resolution</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Style</label>
                    <select name="style" class="quality-select">
                        <option value="enhance">Enhance</option>
                        <option value="stylize">Stylize</option>
                        <option value="transform">Transform</option>
                        <option value="restore">Restore</option>
                    </select>
                </div>
            `;
            break;
            
        case 'video-to-video':
            title = 'Video to Video Transformation';
            fields = `
                <div class="form-group">
                    <label>Upload Video</label>
                    <input type="file" name="video" accept="video/*" required style="width: 100%; padding: 1rem; background: var(--dark-bg); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: var(--text-primary);">
                </div>
                <div class="form-group">
                    <label>Prompt</label>
                    <textarea name="prompt" placeholder="Describe how you want to transform the video..." required></textarea>
                </div>
                <div class="form-group">
                    <label>Quality</label>
                    <select name="quality" class="quality-select">
                        <option value="HD">HD (720p)</option>
                        <option value="FHD">Full HD (1080p)</option>
                        <option value="4K">4K Ultra HD</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Style</label>
                    <select name="style" class="quality-select">
                        <option value="filter">Filter</option>
                        <option value="enhance">Enhance</option>
                        <option value="stylize">Stylize</option>
                        <option value="effects">Special Effects</option>
                    </select>
                </div>
            `;
            break;
            
        case 'text-to-voice':
            title = 'Text to Voice Synthesis';
            fields = `
                <div class="form-group">
                    <label>Text</label>
                    <textarea name="text" placeholder="Enter the text you want to convert to speech..." required></textarea>
                </div>
                <div class="form-group">
                    <label>Voice</label>
                    <select name="voice" class="quality-select">
                        <option value="male1">Male Voice 1</option>
                        <option value="male2">Male Voice 2</option>
                        <option value="female1">Female Voice 1</option>
                        <option value="female2">Female Voice 2</option>
                        <option value="child">Child Voice</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Language</label>
                    <select name="language" class="quality-select">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="it">Italian</option>
                        <option value="pt">Portuguese</option>
                        <option value="zh">Chinese</option>
                        <option value="ja">Japanese</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Quality</label>
                    <select name="quality" class="quality-select">
                        <option value="standard">Standard</option>
                        <option value="HD">HD Quality</option>
                        <option value="ultra">Ultra HD</option>
                    </select>
                </div>
            `;
            break;
            
        case 'video-edit':
            title = 'Video Editing';
            fields = `
                <div class="form-group">
                    <label>Upload Video</label>
                    <input type="file" name="video" accept="video/*" required style="width: 100%; padding: 1rem; background: var(--dark-bg); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: var(--text-primary);">
                </div>
                <div class="form-group">
                    <label>Edit Instructions</label>
                    <textarea name="edits" placeholder="Describe the edits you want to make..." required></textarea>
                </div>
                <div class="form-group">
                    <label>Quality</label>
                    <select name="quality" class="quality-select">
                        <option value="HD">HD (720p)</option>
                        <option value="FHD">Full HD (1080p)</option>
                        <option value="4K">4K Ultra HD</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Effects (hold Ctrl/Cmd to select multiple)</label>
                    <select name="effects" class="quality-select" multiple>
                        <option value="color-grade">Color Grading</option>
                        <option value="stabilize">Stabilization</option>
                        <option value="noise-reduction">Noise Reduction</option>
                        <option value="sharpen">Sharpening</option>
                        <option value="blur">Blur Effects</option>
                        <option value="transitions">Transitions</option>
                    </select>
                </div>
            `;
            break;
    }
    
    modalTitle.textContent = title;
    formFields.innerHTML = fields;
    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('generationModal');
    modal.classList.remove('show');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('generationModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Handle form submission
document.getElementById('generationForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch(`/api/generate/${currentGenerationType}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Generation started successfully! Check the recent generations table.');
            closeModal();
            location.reload();
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});

// Delete generation
document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', async function() {
        const row = this.closest('tr');
        const id = row.dataset.id;
        
        if (confirm('Are you sure you want to delete this generation?')) {
            try {
                const response = await fetch(`/api/generations/${id}`, {
                    method: 'DELETE'
                });
                
                const result = await response.json();
                
                if (result.success) {
                    row.remove();
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });
});

console.log('Admin Dashboard loaded successfully!');
