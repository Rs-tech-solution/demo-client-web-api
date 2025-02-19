import NodeCache from 'node-cache';

const cache = new NodeCache();

export const setCache = (key: string, value: any, ttl: number = 300) => {
  cache.set(key, value, ttl);
};

export const getCache = (key: string) => {
  const value = cache.get(key);

  return value || null;
};

export const deleteCache = (key: string) => {
  cache.del(key);
};
