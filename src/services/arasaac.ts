const CACHE_KEY = 'arasaac_cache_v1';

type CacheShape = Record<string, string | null>;

function readCache(): CacheShape {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as CacheShape;
  } catch {
    return {};
  }
}

function writeCache(c: CacheShape) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(c));
  } catch {
    // ignore
  }
}

type ArasaacPictogram = {
  id?: number | string;
};

export async function fetchPictogram(word: string): Promise<string | null> {
  if (typeof window === 'undefined') return null;
  const key = word.toLowerCase();
  const cache = readCache();
  if (key in cache) return cache[key];

  try {
    const url = `https://api.arasaac.org/api/pictograms/pt/search/${encodeURIComponent(key)}`;
    const res = await fetch(url);
    if (!res.ok) {
      cache[key] = null;
      writeCache(cache);
      return null;
    }
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      const pic = data[0] as ArasaacPictogram;
      // Prefer server static URL pattern (common ARASAAC structure)
      const imageUrl = pic.id ? `https://static.arasaac.org/pictograms/${pic.id}/${pic.id}_500.png` : null;
      cache[key] = imageUrl;
      writeCache(cache);
      return imageUrl;
    }
  } catch {
    // ignore errors
  }

  cache[key] = null;
  writeCache(cache);
  return null;
}
