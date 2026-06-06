// sw.js

const CACHE_NAME = "mundo-maldito-v1";

const arquivos = [
    "/",
    "/index.html",
    "/src/css/style.css",
    "/src/js/index.js"
];

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(arquivos))

    );

});

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(response => {

                return response || fetch(event.request);

            })

    );

});