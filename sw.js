// Anova Tarot — offline-first service worker
// Caches every bundled asset so the app opens with no network at all
// (iOS home-screen web apps only work offline when a service worker exists).
const VERSION = 'anova-v1';
const ASSETS = [
 "./apple-touch-icon-120.png",
 "./apple-touch-icon-152.png",
 "./apple-touch-icon-167.png",
 "./apple-touch-icon-180.png",
 "./cards/Cups01.jpg",
 "./cards/Cups02.jpg",
 "./cards/Cups03.jpg",
 "./cards/Cups04.jpg",
 "./cards/Cups05.jpg",
 "./cards/Cups06.jpg",
 "./cards/Cups07.jpg",
 "./cards/Cups08.jpg",
 "./cards/Cups09.jpg",
 "./cards/Cups10.jpg",
 "./cards/Cups11.jpg",
 "./cards/Cups12.jpg",
 "./cards/Cups13.jpg",
 "./cards/Cups14.jpg",
 "./cards/Pents01.jpg",
 "./cards/Pents02.jpg",
 "./cards/Pents03.jpg",
 "./cards/Pents04.jpg",
 "./cards/Pents05.jpg",
 "./cards/Pents06.jpg",
 "./cards/Pents07.jpg",
 "./cards/Pents08.jpg",
 "./cards/Pents09.jpg",
 "./cards/Pents10.jpg",
 "./cards/Pents11.jpg",
 "./cards/Pents12.jpg",
 "./cards/Pents13.jpg",
 "./cards/Pents14.jpg",
 "./cards/RWS_Tarot_00_Fool.jpg",
 "./cards/RWS_Tarot_01_Magician.jpg",
 "./cards/RWS_Tarot_02_High_Priestess.jpg",
 "./cards/RWS_Tarot_03_Empress.jpg",
 "./cards/RWS_Tarot_04_Emperor.jpg",
 "./cards/RWS_Tarot_05_Hierophant.jpg",
 "./cards/RWS_Tarot_06_Lovers.jpg",
 "./cards/RWS_Tarot_07_Chariot.jpg",
 "./cards/RWS_Tarot_08_Strength.jpg",
 "./cards/RWS_Tarot_09_Hermit.jpg",
 "./cards/RWS_Tarot_10_Wheel_of_Fortune.jpg",
 "./cards/RWS_Tarot_11_Justice.jpg",
 "./cards/RWS_Tarot_12_Hanged_Man.jpg",
 "./cards/RWS_Tarot_13_Death.jpg",
 "./cards/RWS_Tarot_14_Temperance.jpg",
 "./cards/RWS_Tarot_15_Devil.jpg",
 "./cards/RWS_Tarot_16_Tower.jpg",
 "./cards/RWS_Tarot_17_Star.jpg",
 "./cards/RWS_Tarot_18_Moon.jpg",
 "./cards/RWS_Tarot_19_Sun.jpg",
 "./cards/RWS_Tarot_20_Judgement.jpg",
 "./cards/RWS_Tarot_21_World.jpg",
 "./cards/Swords01.jpg",
 "./cards/Swords02.jpg",
 "./cards/Swords03.jpg",
 "./cards/Swords04.jpg",
 "./cards/Swords05.jpg",
 "./cards/Swords06.jpg",
 "./cards/Swords07.jpg",
 "./cards/Swords08.jpg",
 "./cards/Swords09.jpg",
 "./cards/Swords10.jpg",
 "./cards/Swords11.jpg",
 "./cards/Swords12.jpg",
 "./cards/Swords13.jpg",
 "./cards/Swords14.jpg",
 "./cards/Wands01.jpg",
 "./cards/Wands02.jpg",
 "./cards/Wands03.jpg",
 "./cards/Wands04.jpg",
 "./cards/Wands05.jpg",
 "./cards/Wands06.jpg",
 "./cards/Wands07.jpg",
 "./cards/Wands08.jpg",
 "./cards/Wands09.jpg",
 "./cards/Wands10.jpg",
 "./cards/Wands11.jpg",
 "./cards/Wands12.jpg",
 "./cards/Wands13.jpg",
 "./cards/Wands14.jpg",
 "./fonts/-W_8XJnvUD7dzB2C2_8IaWMu.woff2",
 "./fonts/-W_8XJnvUD7dzB2C2_8IfWMuQ5Q.woff2",
 "./fonts/-W_8XJnvUD7dzB2C2_8IZ2MuQ5Q.woff2",
 "./fonts/-W_8XJnvUD7dzB2C2_8IZmMuQ5Q.woff2",
 "./fonts/-W_8XJnvUD7dzB2Ck_kIaWMu.woff2",
 "./fonts/-W_8XJnvUD7dzB2Ck_kIfWMuQ5Q.woff2",
 "./fonts/-W_8XJnvUD7dzB2Ck_kIZ2MuQ5Q.woff2",
 "./fonts/-W_8XJnvUD7dzB2Ck_kIZmMuQ5Q.woff2",
 "./fonts/-W_8XJnvUD7dzB2Cv_4IaWMu.woff2",
 "./fonts/-W_8XJnvUD7dzB2Cv_4IfWMuQ5Q.woff2",
 "./fonts/-W_8XJnvUD7dzB2Cv_4IZ2MuQ5Q.woff2",
 "./fonts/-W_8XJnvUD7dzB2Cv_4IZmMuQ5Q.woff2",
 "./fonts/-W_8XJnvUD7dzB2Cy_gIaWMu.woff2",
 "./fonts/-W_8XJnvUD7dzB2Cy_gIfWMuQ5Q.woff2",
 "./fonts/-W_8XJnvUD7dzB2Cy_gIZ2MuQ5Q.woff2",
 "./fonts/-W_8XJnvUD7dzB2Cy_gIZmMuQ5Q.woff2",
 "./fonts/-W_9XJnvUD7dzB2KZeofTkY.woff2",
 "./fonts/-W_9XJnvUD7dzB2KZeoLTkYTeg.woff2",
 "./fonts/-W_9XJnvUD7dzB2KZeoQTkYTeg.woff2",
 "./fonts/-W_9XJnvUD7dzB2KZeoRTkYTeg.woff2",
 "./fonts/-W__XJnvUD7dzB2Kb9odVkI.woff2",
 "./fonts/-W__XJnvUD7dzB2KbtodVkI.woff2",
 "./fonts/-W__XJnvUD7dzB2KdNodVkI.woff2",
 "./fonts/-W__XJnvUD7dzB2KYNod.woff2",
 "./fonts/8vIJ7ww63mVu7gt7-GT7LEc.woff2",
 "./fonts/8vIJ7ww63mVu7gt79mT7.woff2",
 "./fonts/DtVjJx26TKEr37c9aAFJn2QN.woff2",
 "./fonts/DtVjJx26TKEr37c9aBpJn2QN.woff2",
 "./fonts/DtVjJx26TKEr37c9aBtJn2QN.woff2",
 "./fonts/DtVjJx26TKEr37c9aBVJnw.woff2",
 "./fonts/DtVmJx26TKEr37c9YK5sik8s6zDX.woff2",
 "./fonts/DtVmJx26TKEr37c9YK5silQs6zDX.woff2",
 "./fonts/DtVmJx26TKEr37c9YK5silss6w.woff2",
 "./fonts/DtVmJx26TKEr37c9YK5silUs6zDX.woff2",
 "./fonts/DtVmJx26TKEr37c9YL5rik8s6zDX.woff2",
 "./fonts/DtVmJx26TKEr37c9YL5rilQs6zDX.woff2",
 "./fonts/DtVmJx26TKEr37c9YL5rilss6w.woff2",
 "./fonts/DtVmJx26TKEr37c9YL5rilUs6zDX.woff2",
 "./fonts/DtVmJx26TKEr37c9YMptik8s6zDX.woff2",
 "./fonts/DtVmJx26TKEr37c9YMptilQs6zDX.woff2",
 "./fonts/DtVmJx26TKEr37c9YMptilss6w.woff2",
 "./fonts/DtVmJx26TKEr37c9YMptilUs6zDX.woff2",
 "./fonts/DtVmJx26TKEr37c9YOZqik8s6zDX.woff2",
 "./fonts/DtVmJx26TKEr37c9YOZqilQs6zDX.woff2",
 "./fonts/DtVmJx26TKEr37c9YOZqilss6w.woff2",
 "./fonts/DtVmJx26TKEr37c9YOZqilUs6zDX.woff2",
 "./fonts.css",
 "./icon_192.png",
 "./icon_512.png",
 "./index.html",
 "./manifest.json",
 "./tailwind.js"
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        if (res && res.ok && new URL(req.url).origin === self.location.origin) {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
