let tutorials = [];

async function renderPlaylist() {
    console.log('ednet ui js is loaded')
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title'); 
    const topic = urlParams.get('topic'); 
    
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
    
    // --- 1. SET CONTAINER TO GRID ---
    container.innerHTML = '';
    container.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 20px;
        padding: 20px;
    `;

    tutorials.forEach((item, index) => {
        // Extract Video ID for Thumbnail
        const videoIdMatch = item.youtubeIframe.match(/\/embed\/([^?"]+)/);
        const videoId = videoIdMatch ? videoIdMatch[1] : "";
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

        const bar = document.createElement('div');
        bar.className = 'playlist-card'; // Changed name for clarity
        
        // --- 2. UPDATED CARD STYLING (Vertical Layout) ---
        bar.style.cssText = `
            display: flex;
            flex-direction: column;
            cursor: pointer;
            transition: transform 0.2s;
            font-family: sans-serif;
            color: white;
        `;

        // --- 3. UPDATED HTML (Image on top, Title below) ---
        bar.innerHTML = `
            <div style="position: relative; width: 100%; aspect-ratio: 16/9; margin-bottom: 12px; overflow: hidden; border-radius: 12px;">
                <img src="${thumbnailUrl}" alt="cover" style="width: 100%; height: 100%; object-fit: cover; background-color: #333;">
                <div style="position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.8); color: white; font-size: 12px; padding: 2px 6px; border-radius: 4px; font-weight: bold;">
                    Play
                </div>
            </div>
            <div style="display: flex; gap: 12px;">
                <div style="width: 36px; height: 36px; border-radius: 50%; background: #444; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 0.8em; font-weight: bold; color: #aaa;">
                    ${index + 1}
                </div>
                <div style="flex-grow: 1;">
                    <div style="font-weight: 600; font-size: 1rem; line-height: 1.4; color: #f1f1f1; margin-bottom: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                        ${item.className}
                    </div>
                    <div style="font-size: 0.85rem; color: #aaa;">Educational Series</div>
                </div>
            </div>
        `;

        bar.onmouseenter = () => { bar.style.transform = 'scale(1.03)'; };
        bar.onmouseleave = () => { bar.style.transform = 'scale(1)'; };

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
