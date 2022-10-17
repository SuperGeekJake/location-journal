export function MurmurHash3(seed: string) {
  let hash = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    let bitwiseXorFromCharacter = hash ^ seed.charCodeAt(i);
    hash = Math.imul(bitwiseXorFromCharacter, 3432918353);
    hash = (hash << 13) | (hash >>> 19);
  }

  return () => {
    // Return the hash that you can use as a seed
    hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
    hash = Math.imul(hash ^ (hash >>> 13), 3266489909);
    return (hash ^= hash >>> 16) >>> 0;
  };
}

export function Xoshiro128(
  seed1: number,
  seed2: number,
  seed3: number,
  seed4: number
) {
  return () => {
    let t = seed2 << 9,
      y = seed1 * 5;
    y = ((y << 7) | (y >>> 25)) * 9;
    seed3 ^= seed1;
    seed4 ^= seed2;
    seed2 ^= seed3;
    seed1 ^= seed4;
    seed3 ^= t;
    seed4 = (seed4 << 11) | (seed4 >>> 21);
    return (y >>> 0) / 4294967296;
  };
}
