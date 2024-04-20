self.addEventListener("install", async (e) => {
  console.log("service worker installed");

  var cache = await caches.open("staticTresAses");
  cache.addAll([
  "./",
  "./index.html",
  "./script.js",
  "./manifest.json",
  "./assets/images/icons/logo-144x144.png",
  "./assets/images/icons/logo-16x16.png",
  "./styles/styles.css",
  "./styles/styles.js",
  "./styles/hvr-styles.css",
  "./styles/bootstrap/css/bootstrap.css",
  "./styles/bootstrap/js/bootstrap.js",
  "./about.html",
  "./cart.html",
  "./cart.js",
  "./faq.html",
  "./history.html",
  "./history.js",
  "./payment.html",
  "./shop.html",
  "./assets/images/banners/banner-1.jpg",
  "./assets/images/banners/banner-2.jpg",
  "./assets/images/banners/banner-about.jpg",
  "./assets/images/banners/banner-shop.jpg",
  "./assets/images/category-1.jpg",
  "./assets/images/category-2.jpg",
  "./assets/images/category-3.jpg",
  "./assets/images/category-4.jpg",
  "./assets/images/historia_1.png",
  "./assets/images/historia_2.jpg",
  "./assets/images/historia_3.jpg",
  "./assets/images/historia_4.jpg",
  "./assets/images/historia_4.png",
  "./assets/images/logo_tres_ases.png",
  "./assets/images/icons/argentina.png",
  "./assets/images/icons/facebook.png",
  "./assets/images/icons/instagram.png",
  "./assets/images/icons/logo.png",
  "./assets/images/icons/shield.png",
  "./assets/images/icons/twitter.png",
  "./assets/images/icons/wallet.png",
  "./assets/images/icons/whatsapp.png",
  "./assets/images/icons/world.png",
  "./assets/images/products/chomba_de_pique_mujer.jpg",
  "./assets/images/products/chomba_pique_hombre.jpg",
  "./assets/images/products/musculosa_de_ribb_con_breteles_mujer.jpg",
  "./assets/images/products/musculosa_jersey_mujer.jpg",
  "./assets/images/products/musculosa_morley_algodon_hombre.jpg",
  "./assets/images/products/musculosa_morley_deportiva_mujer.jpg",
  "./assets/images/products/musculosa_morley_mujer.jpg",
  "./assets/images/products/pijama_de_jersey_corto_mujer.jpg",
  "./assets/images/products/pijama_jersey_rayas_corto_hombre.jpg",
  "./assets/images/products/pijama_poplin_rayas_hombre.jpg",
  "./assets/images/products/pijama_ribb_corto_mujer.jpg",
  "./assets/images/products/pijama_ribb_mujer.jpg",
  "./assets/images/products/remera_3-4_jersey.jpg",
  "./assets/images/products/remera_algodon_manga_larga_mujer.jpg",
  "./assets/images/products/remera_algodon_mujer.jpg",
  "./assets/images/products/remera_de_ribb_hombre.jpg",
  "./assets/images/products/remera_termica_mujer.jpg",
  ]);
});

self.addEventListener("activate", () => {
  console.log("service worker activated");
});

self.addEventListener("fetch", function (event) {
  const req = event.request;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(req));
  } else {
    event.respondWith(networkFirst(req));
  }
});

async function cacheFirst(req) {
  return (await caches.match(req)) || fetch(req);
}

async function networkFirst(req) {
  const cache = await caches.open("pwa-dynamic");
  try {
    const res = await fetch(req);
    cache.put(req, res.clone());
    return res;
  } catch (error) {
    const cachedResponse = await cache.match(req);
    return cachedResponse || (await caches.match("./manifest.json"));
  }
}