export function createHero(spotlight, onWatch) {
  const div = document.createElement('div');
  div.className = 'hero';
  div.innerHTML = `
    <img src="${spotlight.poster}" alt="Spotlight">
    <div class="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
    <div class="spotlight-content">
      <div class="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full mb-4">Spotlight</div>
      <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">${spotlight.name}</h1>
      <p class="text-gray-300 text-lg line-clamp-3 mb-8 max-w-lg">${spotlight.description || "Popular anime right now"}</p>
      <button onclick="${onWatch}" class="bg-white text-black px-10 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 hover:bg-gray-200 transition">
        <i class="fa-solid fa-play"></i> Watch Now
      </button>
    </div>
  `;
  return div;
}
