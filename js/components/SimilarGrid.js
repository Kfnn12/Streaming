import { createAnimeCard } from '../utils.js';

export function renderSimilarGrid(container, relatedAnimes, onClick) {
  container.innerHTML = '';
  if (!relatedAnimes || relatedAnimes.length === 0) {
    container.innerHTML = `<div class="col-span-full ...">No similar anime found.</div>`;
    return;
  }
  relatedAnimes.forEach(anime => {
    const card = createAnimeCard(anime, onClick);
    container.appendChild(card);
  });
}
