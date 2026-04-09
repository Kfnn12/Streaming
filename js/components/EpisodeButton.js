export function createEpisodeButton(ep, index, onClick) {
  const epNum = ep.number || (index + 1);
  const btn = document.createElement('button');
  btn.className = 'episode-btn relative p-3 sm:p-4 rounded-xl text-left hover:scale-105 transition flex flex-col justify-center overflow-hidden group';
  btn.innerHTML = `
    <div class="relative z-10 font-bold text-sm sm:text-base text-gray-200 group-hover:text-white">Episode ${epNum}</div>
    <div class="relative z-10 text-[10px] sm:text-xs text-gray-400 truncate w-full mt-1">${ep.title || ''}</div>
    <div class="absolute -bottom-2 -right-1 text-5xl font-black text-white/5 group-hover:text-white/10 transition pointer-events-none select-none">${epNum}</div>
  `;
  btn.onclick = () => onClick(ep.id || ep.episodeId || epNum, epNum);
  return btn;
}
