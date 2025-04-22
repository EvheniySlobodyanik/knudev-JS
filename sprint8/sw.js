const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");

  await Promise.all(
    resources.map(async (url) => {
      try {
        await cache.add(url);
      } catch (err) {
        console.warn(`❌ Failed to cache: ${url}`, err);
      }
    })
  );
};

const putInCache = async (request, response) => {
  const cache = await caches.open("v1");
  await cache.put(request, response);
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      "/sprint8/",
      "/sprint8/index.html",
      "/sprint8/styles.css",
      "/sprint8/script.js",
      "/sprint8/modules/store.js",
      "/sprint8/modules/dom-manipulation.js",
      "/sprint8/modules/validation.js",
      "/sprint8/modules/cart.js",
      "/sprint8/images/cart.png",
      "/sprint8/images/shop.png",
      "/sprint8/images/for-cart/delete.png",
      "/sprint8/images/for-cart/minus.png",
      "/sprint8/images/for-cart/plus.png",
      "/sprint8/images/for-status/success.png",
      "/sprint8/images/for-status/failure.png",
      "/sprint8/images/for-errors/NETWORK_ERROR.png",
      "/sprint8/images/for-errors/500.png",
    ])
  );
});

const CACHE_NAME = "store-cache-v1";
const PRECACHE_URLS = ["/"];

const PRODUCT_URL = "https://fakestoreapi.com/products";
const CATEGORY_URL = "https://fakestoreapi.com/products/categories";

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(PRECACHE_URLS);

      try {
        const productRes = await fetch(PRODUCT_URL);
        const categoryRes = await fetch(CATEGORY_URL);

        if (productRes.ok) {
          cache.put(PRODUCT_URL, productRes.clone());
        }
        if (categoryRes.ok) {
          cache.put(CATEGORY_URL, categoryRes.clone());
        }
      } catch (error) {
        console.warn("Failed to precache API data:", error);
      }
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const requestURL = event.request.url;

  //Handle API fallback
  if (requestURL.includes(PRODUCT_URL) || requestURL.includes(CATEGORY_URL)) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  //For other requests (e.g. static assets), try network first, fallback to cache
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
