export function normalizeAnime(a) {
  return {
    id: a.id,
    name: a.name || a.title || "Unknown Title",
    poster: a.posterImage || a.poster || a.image || "",
    rating: a.rating || a.score || "N/A",
    type: a.type || 'TV',
    episodes: a.episodes || a.episode || null
  };
}

export function createAnimeCard(anime, onClick) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="relative rounded-2xl overflow-hidden shadow-xl bg-zinc-900 aspect-[2/3]">
      <img src="\( {anime.poster}" class="w-full h-full object-cover" loading="lazy" alt=" \){anime.name}">
      <div class="absolute top-2 right-2 flex flex-col items-end">
        <div class="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg">${anime.type}</div>
        ${anime.episodes ? `<div class="bg-zinc-900/90 text-gray-300 text-[10px] font-bold px-2 py-0.5 rounded border border-zinc-700 shadow-lg mt-1">EP ${anime.episodes}</div>` : ''}
      </div>
    </div>
    <h3 class="mt-3 text-sm sm:text-base font-semibold line-clamp-2 text-gray-200">${anime.name}</h3>
  `;
  card.onclick = () => onClick(anime.id);
  return card;
}
