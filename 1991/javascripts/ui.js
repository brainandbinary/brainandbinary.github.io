// 1. Mark the function as ASYNC
async function renderPlaylist() {
	console.log('ednet ui js is loaded')
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title'); 
    const topic = urlParams.get('topic'); 
    
    if(title) {
        $('#title').text(title);
    }

    // 2. Map topics to their JSON files
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

    // 3. Add cache busting version
    const version = new Date().getTime();
    const url = `https://brainandbinary.github.io/1991/javascripts/${fileName}?v=${version}`;
    
    let tutorials = [];

    try {
        // Now 'await' will work because the function is 'async'
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
        const bar = document.createElement('div');
        bar.className = 'playlist-bar';
        bar.style.cssText = `
            display: flex;
            align-items: center;
            padding: 15px;
            margin-bottom: 10px;
            background-color: #2a2a2a;
            color: white;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.2s;
            font-family: sans-serif;
        `;

        bar.innerHTML = `
            <span style="margin-right: 15px; opacity: 0.5;">${index + 1}</span>
            <span style="flex-grow: 1; font-weight: 500;">${item.className}</span>
            <span style="font-size: 0.8em; color: #4CAF50;">▶ Play</span>
        `;

        bar.onclick = () => {
			openVideoModal(item.className, item.youtubeIframe);
	    };

        container.appendChild(bar);
		
		
		
		
		
		/// modal for displaying youtube video
		function openVideoModal(title, iframeMarkup) {
			// 1. Create a unique ID for this modal instance
			const modalId = 'videoModal-' + Date.now();

			// 2. The Modal HTML String
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

			// 3. Append to body
			document.body.insertAdjacentHTML('beforeend', modalHTML);

			// 4. Initialize and Show Bootstrap Modal
			const modalElement = document.getElementById(modalId);
			const bsModal = new bootstrap.Modal(modalElement);
			bsModal.show();

			// 5. Cleanup: Remove from DOM after it's hidden to save memory
			modalElement.addEventListener('hidden.bs.modal', function () {
				modalElement.remove();
			});
		}
		
		////
		
		
		
		
    });
}

renderPlaylist();