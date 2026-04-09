import { BASE_API_URL } from './config.js';

export async function fetchFromApi(path) {
  const res = await fetch(BASE_API_URL + path);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return await res.json();
}

export async function loadHomeData() {
  const raw = await fetchFromApi('/api/kaido/home');
  let donghuaList = raw.latestDonghua || raw.topDonghua || raw.donghua || [];
  if (!donghuaList.length) {
    const endpoints = ['/api/kaido/latest-donghua', '/api/kaido/top-donghua', '/api/kaido/donghua'];
    for (const ep of endpoints) {
      try {
        const dRes = await fetch(BASE_API_URL + ep);
        if (dRes.ok) {
          const dRaw = await dRes.json();
          const items = dRaw.animes || dRaw.results || dRaw.data?.animes || dRaw.data || [];
          if (Array.isArray(items) && items.length) { donghuaList = items; break; }
        }
      } catch (e) {}
    }
  }
  return {
    spotlightAnimes: (raw.data || raw.spotlight || []).map(a => ({ ...normalizeAnime(a), description: a.synopsis || a.description || '' })),
    trendingAnimes: (raw.trending || []).map(normalizeAnime),
    latestEpisodeAnimes: (raw.recentlyUpdated || raw.latestEpisodes || []).map(normalizeAnime),
    chineseAnimes: donghuaList.map(normalizeAnime),
    topAiringAnimes: (raw.topAiring || []).map(normalizeAnime),
    mostPopularAnimes: (raw.mostPopular || []).map(normalizeAnime)
  };
}

export async function getAnimeDetails(id) {
  const response = await fetchFromApi(`/api/kaido/anime/${id}`);
  const anime = response.data || response;

  // FIXED: Robust episode extraction for all possible API structures
  anime.providerEpisodes = 
    anime.providerEpisodes ||
    anime.episodes ||
    anime.data?.episodes ||
    anime.episodeList ||
    anime.episodesList ||
    (Array.isArray(anime) ? anime : []);

  return anime;
}

export async function getEpisodeSources(episodeId) {
  const idString = String(episodeId);
  const encodedId = encodeURIComponent(idString);
  const separator = idString.includes('?') ? '&' : '?';
  const endpoints = [
    `/api/kaido/sources/\( {idString} \){separator}version=sub&server=vidcloud`,
    `/api/kaido/episode/sources?animeEpisodeId=${encodedId}&category=sub`,
    `/api/kaido/sources/${encodedId}?version=sub&server=vidcloud`,
    `/api/kaido/watch/${encodedId}`,
    `/api/kaido/watch?episodeId=${encodedId}`
  ];
  for (const ep of endpoints) {
    try {
      const res = await fetch(BASE_API_URL + ep);
      if (res.ok) {
        const data = await res.json();
        const streamUrl = data.data?.sources?.[0]?.url || data.sources?.[0]?.url || data.url;
        const tracks = data.data?.subtitles || data.data?.tracks || data.subtitles || data.tracks || [];
        if (streamUrl) return { streamUrl, tracks };
      }
    } catch (e) {}
  }
  return { streamUrl: null, tracks: [] };
}

export async function searchAnimeAPI(query) { /* unchanged */ }
export async function fetchCategoryPage(endpoint, page) { /* unchanged */ }

function normalizeAnime(a) {
  return {
    id: a.id,
    name: a.name || a.title || "Unknown Title",
    poster: a.posterImage || a.poster || a.image || "",
    rating: a.rating || a.score || "N/A",
    type: a.type || 'TV',
    episodes: a.episodes || a.episode || null
  };
}
