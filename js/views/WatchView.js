import { renderSimilarGrid } from '../components/SimilarGrid.js';

export function renderWatch(container, title, similarAnimes, onCardClick) {
  container.innerHTML = `
    <div id="watchView" class="max-w-7xl mx-auto px-6 py-8">
      <div class="flex items-center justify-between mb-6">
        <button id="watchBackBtn" class="flex items-center gap-3 text-blue-400 hover:text-white font-medium">← Back to Details</button>
        <h2 id="watchTitle" class="text-xl sm:text-2xl font-bold truncate ml-4">${title}</h2>
      </div>
      <div class="video-container mb-8">
        <video id="videoPlayer" controls crossorigin="anonymous" class="w-full aspect-video" playsinline></video>
      </div>
      <div class="flex flex-wrap justify-center gap-4">
        <button id="prevEpBtn" class="hidden items-center gap-3 bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-2xl font-medium transition text-sm sm:text-base"><i class="fa-solid fa-backward-step"></i> Prev Ep</button>
        <button onclick="window.toggleFullScreen()" class="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-2xl font-medium transition text-sm sm:text-base"><i class="fa-solid fa-expand"></i> Full Screen</button>
        <button onclick="window.switchProxy()" class="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-2xl font-medium transition text-sm sm:text-base"><i class="fa-solid fa-rotate"></i> Switch Streaming Node</button>
        <button id="nextEpBtn" class="hidden items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-medium transition text-sm sm:text-base">Next Ep <i class="fa-solid fa-forward-step"></i></button>
      </div>
      <div id="similarSection" class="mt-12 pt-8 border-t border-zinc-900">
        <h3 class="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2"><i class="fa-solid fa-layer-group text-blue-500"></i> Similar Anime</h3>
        <div id="similarGrid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"></div>
      </div>
    </div>
  `;

  renderSimilarGrid(document.getElementById('similarGrid'), similarAnimes, onCardClick);

  // FIXED: Back button
  document.getElementById('watchBackBtn').onclick = () => window.showDetails();
}
