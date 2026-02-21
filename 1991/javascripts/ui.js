
// 2. The function to render the list
function renderPlaylist() {
	
	

	// 1. Get the query string (e.g., "?product=vanilla&id=42")
	const queryString = window.location.search;

	// 2. Create the URLSearchParams object
	const urlParams = new URLSearchParams(queryString);

	// 3. Get specific values
	const title = urlParams.get('title'); 
	const topic = urlParams.get('topic'); 
	const country = urlParams.get('cn');           
	
	
	if(title){
		$('#title').text(title);
	}
	
	let url;
	let tutorials=[];
 
   if(topic=='listening'){
	   url = 'https://brainandbinary.github.io/1991/javascripts/listening.json';
   }
   
   if(topic=='reading'){
	   url = 'https://brainandbinary.github.io/1991/javascripts/reading.json';
   }
   
   if(topic=='writing'){
	   url = 'https://brainandbinary.github.io/1991/javascripts/writing.json';
   }
   
   if(topic=='speaking'){
	   url = 'https://brainandbinary.github.io/1991/javascripts/speaking.json';
   }
   
   if(topic=='basic-speaking'){
	   url = 'https://brainandbinary.github.io/1991/javascripts/basic-speaking.json';
   }
 
   if(topic=='basic-english'){
	   url = 'https://brainandbinary.github.io/1991/javascripts/basic-english.json';
   }
 
   try{
	    const response = await fetch(url);
		// 1. 'data' will be the array [ {className: ...}, {className: ...} ]
		tutorials = await response.json(); 
   }catch(e){
	   console.log(e)
   }
	
	
  const container = document.getElementById('list-wrapper');
  
  // Clear existing content (optional)
  container.innerHTML = '';

  tutorials.forEach((item, index) => {
    // Create the bar element
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

    // Inner HTML for the bar (Icon + Title)
    bar.innerHTML = `
      <span style="margin-right: 15px; opacity: 0.5;">${index + 1}</span>
      <span style="flex-grow: 1; font-weight: 500;">${item.className}</span>
      <span style="font-size: 0.8em; color: #4CAF50;">▶ Play</span>
    `;

    // Hover effect
    bar.onmouseenter = () => bar.style.backgroundColor = '#383838';
    bar.onmouseleave = () => bar.style.backgroundColor = '#2a2a2a';

    // Click event to load the video (e.g., into a main player area)
    bar.onclick = () => {
      console.log(`Loading: ${item.className}`);
      // You could append item.youtubeIframe to a #video-display div here
    };

    container.appendChild(bar);
  });
}


document.addEventListener('DOMContentLoaded', renderPlaylist);
	
	

