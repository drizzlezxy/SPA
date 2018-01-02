class CacheManager {
  constructor () {
    this.cache = {};
  }

  get (key) {
    return this.cache[key];
  }

  set (key, value) {
    this.cache[key] = value;
  }
}

const getSingle = (fn) => {
  let result;
  return (...arg) =>
    (result || (result = fn(...arg)));
};

const createSingleCache = getSingle(
  () => new CacheManager()
);

export default createSingleCache;
