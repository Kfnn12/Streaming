import { createEpisodeButton } from '../components/EpisodeButton.js';

export function renderDetails(container, anime, startWatching) {
  container.innerHTML = `
    <div id="detailsView" class="max-w-7xl mx-auto px-6 py-12">
      <button id="detailsBackBtn" class="flex items-center gap-2 text-blue-400 hover:text-blue-500 mb-8 font-medium">← Back to Home</button>
      <div class="flex flex-col lg:flex-row gap-10">
        <div class="lg:w-1/3"><img id="detailPoster" class="w-full rounded-3xl shadow-2xl" alt="Poster"></div>
        <div class="lg:w-2/3">
          <h1 id="detailTitle" class="text-4xl sm:text-5xl font-black mb-4"></h1>
          <p id="detailDesc" class="text-gray-400 text-lg leading-relaxed mb-8"></p>
          <div id="detailInfo" class="flex flex-wrap gap-4 mb-10"></div>
          <h3 class="text-2xl font-bold mb-6">Episodes</h3>
          <div id="episodeList" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-[520px] overflow-y-auto pr-4"></div>
        </div>
      </div>
    </div>
  `;

  // Populate data
  document.getElementById('detailPoster').src = anime.posterImage || anime.poster || anime.image || '';
  document.getElementById('detailTitle').textContent = anime.name || anime.title || 'Untitled';
  document.getElementById('detailDesc').textContent = anime.synopsis || anime.description || "No description available.";

  const totalEps = anime.providerEpisodes?.length || anime.totalEpisodes || "?";
  document.getElementById('detailInfo').innerHTML = `
    <span class="bg-zinc-800 text-gray-300 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"><i class="fa-solid fa-film text-xs"></i> ${totalEps} Episodes</span>
    <span class="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-blue-600/30">${anime.type || 'TV'}</span>
    <span class="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm font-medium border border-amber-500/30 flex items-center gap-2"><i class="fa-solid fa-star text-xs"></i> ${anime.rating || anime.score || 'N/A'}</span>
  `;

  // FIXED: Episode list rendering
  const epContainer = document.getElementById('episodeList');
  epContainer.innerHTML = '';
  if (!anime.providerEpisodes || !anime.providerEpisodes.length) {
    epContainer.innerHTML = '<div class="col-span-full text-center text-gray-400 py-4">No episodes available yet.</div>';
    return;
  }

  anime.providerEpisodes.forEach((ep, i) => {
    const btn = createEpisodeButton(ep, i, startWatching);
    epContainer.appendChild(btn);
  });

  // FIXED: Back button uses global function (no template string issue)
  document.getElementById('detailsBackBtn').onclick = () => window.goHome();
}
