addEventListener('fetch', event => {
    console.log(`fetch event for url: ${event.request.url}`);
    let requestUrl = new URL(event.request.url);
    if (
        (requestUrl.host === 'local.adguard.com' ||
        requestUrl.host === 'injections.adguard.com') &&
        requestUrl.pathname.startsWith('/adguard-ajax-api/injections/')

    ) {
        event.respondWith(fetch(event.request, { cache: "no-cache" }));
    }
});
