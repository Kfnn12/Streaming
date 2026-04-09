import { createAnimeCard } from '../utils.js';

export function renderSearch(container, query, results, onCardClick) {
  container.innerHTML = `
    <div id="searchView" class="max-w-7xl mx-auto px-6 py-12">
      <button onclick="goHome()" class="flex items-center gap-2 text-blue-400 hover:text-blue-500 mb-4 font-medium">← Back to Home</button>
      <h1 class="text-3xl sm:text-4xl font-black mb-8">Results for "<span id="searchTerm">${query}</span>"</h1>
      <div id="searchResults" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"></div>
    </div>
  `;

  const grid = document.getElementById('searchResults');
  results.forEach(anime => grid.appendChild(createAnimeCard(anime, onCardClick)));
}
