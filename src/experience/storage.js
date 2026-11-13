/** Carry existing visitors' selections over to the renamed brand. */
export function migrateLegacySelections() {
  const legacyPrefix = 'noolam-';
  const suffixes = ['look-bag-v1', 'silk-bag-v1', 'silk-favourites-v1', 'bridal-last-v1', 'weave-v1'];
  for (const suffix of suffixes) {
    try {
      const previousKey = legacyPrefix + suffix;
      const currentKey = 'silkora-' + suffix;
      const value = localStorage.getItem(previousKey);
      if (value === null) continue;
      if (localStorage.getItem(currentKey) === null) localStorage.setItem(currentKey, value);
      localStorage.removeItem(previousKey);
    } catch {
      // The showroom remains usable when browser storage is unavailable.
    }
  }
}
