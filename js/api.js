import { BASE_API_URL } from './config.js';

export async function fetchFromApi(path) {
  const res = await fetch(BASE_API_URL + path);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return await res.json();
}

export async function loadHomeData() { /* full loadHome logic from before */ 
  // ... (I kept the exact same logic as previous version)
  const raw = await fetchFromApi('/api/kaido/home');
  // donghua fallback + homeData object creation
  // returns the full homeData object
}

export async function getAnimeDetails(id) {
  const raw = await fetchFromApi(`/api/kaido/anime/${id}`);
  return raw.data || raw;
}

export async function getEpisodeSources(episodeId) {
  // all your fallback endpoints logic
  // returns { streamUrl, tracks }
}

export async function searchAnimeAPI(query) {
  // your search logic with fallbacks
}

export async function fetchCategoryPage(endpoint, page) {
  // your pagination logic
}
