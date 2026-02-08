// 1. The data array
const tutorials = [
  {
    className: "Academic Reading: Mastering True/False/Not Given",
    youtubeIframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
  },
  {
    className: "Speed Reading Techniques for Section 3",
    youtubeIframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/example2" title="YouTube video player" frameborder="0" allowfullscreen></iframe>'
  },
  {
    className: "Matching Headings: The 'Elimination' Method",
    youtubeIframe: '<iframe width="560" height="315" src="https://www.youtube.com/embed/example3" title="YouTube video player" frameborder="0" allowfullscreen></iframe>'
  }
];

// 2. The function to render the list
function renderPlaylist() {
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

// Run the function
document.addEventListener('DOMContentLoaded', renderPlaylist);