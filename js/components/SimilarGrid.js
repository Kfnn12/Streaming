import { createAnimeCard } from '../utils.js';

export function renderSimilarGrid(container, related, onClick) {
  container.innerHTML = '';
  if (!related || related.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center text-zinc-600 py-10 font-medium bg-zinc-900/30 rounded-2xl border border-zinc-800">
        <i class="fa-solid fa-ghost text-3xl mb-3 block opacity-50"></i>
        No similar anime found for this title in the database.
      </div>`;
    return;
  }
  related.forEach(anime => {
    const card = createAnimeCard(anime, onClick);
    container.appendChild(card);
  });
}
