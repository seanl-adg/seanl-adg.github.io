addEventListener('fetch', event => {
    console.log(`fetch event for url: ${event.request.url}`);
    let requestUrl = new URL(event.request.url);
    if (
        requestUrl.host === 'local.adguard.com' ||
        requestUrl.host === 'injections.adguard.com'
    ) {
        event.respondWith(async function () {
            return fetch(event.request, { cache: "no-cache" });
        });
    }
});
