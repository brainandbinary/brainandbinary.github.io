

async function renderPlaylist() {
    console.log('ednet ui js is loaded')
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title'); 
    const topic = urlParams.get('topic'); 
    let tutorials = [];
    
    if(title) {
        $('#title').text(title);
    }

    const topicFiles = {
        'listening': 'listening.json',
        'reading': 'reading.json',
        'writing': 'writing.json',
        'speaking': 'speaking.json',
        'basic-speaking': 'basic-speaking.json',
        'basic-english': 'basic-english.json'
    };

    const fileName = topicFiles[topic];
    if (!fileName) {
        console.error("Topic not found");
        return; 
    }

    const version = new Date().getTime();
    const url = `https://brainandbinary.github.io/1991/javascripts/${fileName}?v=${version}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Network response was not ok");
        tutorials = await response.json(); 
    } catch(e) {
        console.log("Fetch Error: ", e);
    }
    
    const container = document.getElementById('list-wrapper');
    if (!container) return;
    
    container.innerHTML = '';
    
    tutorials.forEach((item, index) => {
        // --- LOGIC TO EXTRACT THUMBNAIL ---
        // Extracts the ID from strings like "https://www.youtube.com/embed/K5foblC0q70?si=..."
        const videoIdMatch = item.youtubeIframe.match(/\/embed\/([^?"]+)/);
        const videoId = videoIdMatch ? videoIdMatch[1] : "";
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

        const bar = document.createElement('div');
        bar.className = 'playlist-bar';
        
        // Updated CSS to accommodate the image
        bar.style.cssText = `
            display: flex;
            align-items: center;
            padding: 10px;
            margin-bottom: 12px;
            background-color: #2a2a2a;
            color: white;
            border-radius: 12px;
            cursor: pointer;
            transition: transform 0.2s, background 0.2s;
            font-family: sans-serif;
            border: 1px solid #3d3d3d;
        `;

        // Updated HTML with the Thumbnail Cover
        bar.innerHTML = `
            <div style="position: relative; margin-right: 15px; flex-shrink: 0;">
                <img src="${thumbnailUrl}" alt="cover" style="width: 120px; height: 68px; border-radius: 8px; object-fit: cover; display: block;">
                <div style="position: absolute; bottom: 5px; right: 5px; background: rgba(0,0,0,0.8); color: white; font-size: 10px; padding: 2px 5px; border-radius: 4px;">▶</div>
            </div>
            <div style="flex-grow: 1;">
                <div style="font-size: 0.85em; opacity: 0.6; margin-bottom: 4px;">Lesson ${index + 1}</div>
                <div style="font-weight: 500; line-height: 1.3;">${item.className}</div>
            </div>
        `;

        // Hover effect logic
        bar.onmouseenter = () => { bar.style.background = '#383838'; bar.style.transform = 'scale(1.01)'; };
        bar.onmouseleave = () => { bar.style.background = '#2a2a2a'; bar.style.transform = 'scale(1)'; };

        bar.onclick = () => {
            openVideoModal(item.className, item.youtubeIframe);
        };

        container.appendChild(bar);
        
        function openVideoModal(title, iframeMarkup) {
            const modalId = 'videoModal-' + Date.now();
            const modalHTML = `
            <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content bg-dark text-white">
                        <div class="modal-header border-secondary">
                            <h5 class="modal-title">${title}</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-0">
                            <div class="ratio ratio-16x9">
                                ${iframeMarkup}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

            document.body.insertAdjacentHTML('beforeend', modalHTML);
            const modalElement = document.getElementById(modalId);
            const bsModal = new bootstrap.Modal(modalElement);
            bsModal.show();
            modalElement.addEventListener('hidden.bs.modal', function () {
                modalElement.remove();
            });
        }
    });
}

renderPlaylist();
