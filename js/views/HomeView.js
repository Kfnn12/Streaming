import { createHero } from '../components/Hero.js';
import { createAnimeCard } from '../utils.js';

export function renderHome(container, homeData, showDetails, showCategory) {
  container.innerHTML = `
    <div id="homeView">
      <div id="heroContainer"></div>
      <div class="max-w-7xl mx-auto px-6 py-12" id="sectionsContainer"></div>
    </div>
  `;

  // Hero
  const heroContainer = document.getElementById('heroContainer');
  if (homeData.spotlightAnimes?.length) {
    const hero = createHero(homeData.spotlightAnimes[0], 'window.watchCurrentSpotlight()');
    heroContainer.appendChild(hero);
  }

  // Sections
  const sectionsContainer = document.getElementById('sectionsContainer');
  const sections = [
    { title: "Trending Now", items: homeData.trendingAnimes, icon: "🔥", endpoint: "/api/kaido/trending" },
    { title: "Latest Episodes", items: homeData.latestEpisodeAnimes, icon: "⏱️", endpoint: "/api/kaido/recently-updated" },
    { title: "Chinese Updates", items: homeData.chineseAnimes, icon: "🐉", endpoint: "/api/kaido/latest-donghua" },
    { title: "Top Airing", items: homeData.topAiringAnimes, icon: "📺", endpoint: "/api/kaido/top-airing" },
    { title: "Most Popular", items: homeData.mostPopularAnimes, icon: "⭐", endpoint: "/api/kaido/most-popular" }
  ];
  window.currentSections = sections;

  sections.forEach((section, i) => {
    if (!section.items?.length) return;
    let html = `
      <div class="mb-16">
        <div class="flex items-center justify-between mb-6">
          <div class="section-title" style="margin-bottom:0;">
            <span>${section.icon}</span> ${section.title}
          </div>
          <button onclick="showCategory(${i})" class="text-sm font-bold text-blue-500 hover:text-blue-400 transition flex items-center gap-1">
            See More <i class="fa-solid fa-chevron-right text-[10px]"></i>
          </button>
        </div>
        <div class="scroll-container" id="scroll-${i}"></div>
      </div>`;
    sectionsContainer.innerHTML += html;

    const scrollDiv = document.getElementById(`scroll-${i}`);
    section.items.forEach(anime => {
      const card = createAnimeCard(anime, showDetails);
      scrollDiv.appendChild(card);
    });
  });
}
