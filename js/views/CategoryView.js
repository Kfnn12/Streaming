import { createAnimeCard } from '../utils.js';

export function renderCategory(container, title, results, onCardClick, onLoadMore) {
  container.innerHTML = `
    <div id="categoryView" class="hidden max-w-7xl mx-auto px-6 py-12">
      <button onclick="goHome()" class="flex items-center gap-2 text-blue-400 hover:text-blue-500 mb-4 font-medium">← Back to Home</button>
      <h1 id="categoryTitle" class="text-3xl sm:text-4xl font-black mb-8">${title}</h1>
      <div id="categoryResults" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"></div>
      <div class="mt-12 flex justify-center">
        <button id="loadMoreBtn" onclick="${onLoadMore}" class="hidden bg-zinc-800 hover:bg-zinc-700 px-8 py-3 rounded-2xl font-bold transition text-sm sm:text-base">
          Load Next Page <i class="fa-solid fa-arrow-down ml-2"></i>
        </button>
      </div>
    </div>
  `;

  const grid = document.getElementById('categoryResults');
  results.forEach(anime => grid.appendChild(createAnimeCard(anime, onCardClick)));
}
