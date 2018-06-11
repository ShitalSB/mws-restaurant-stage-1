(function () {
  self.addEventListener('install', function (event) {
    event.waitUntil(
      caches.open('cache1').then(function (cache) {
        return cache.addAll(
          [
            './img/1.jpg',
            './img/2.jpg',
            './img/3.jpg',
            './img/4.jpg',
            './img/5.jpg',
            './img/6.jpg',
            './img/7.jpg',
            './img/8.jpg',
            './img/9.jpg',
            './img/10.jpg',
            './img/favicon.png',
            './css/styles.css',
            './data/restaurants.json',
            './js/dbhelper.js',
            './js/main.js',
            './js/restaurant_info.js',
            './index.html',
            './restaurant.html'
          ]
        );
      })
    );
  });
  self.addEventListener('activate', function (event) {
    console.log('Service worker activating...');
    self.skipWaiting();
  });

  self.addEventListener('fetch', function (event) {
    event.respondWith(
      caches.match(event.request).then(function (response) {

        return response || fetch(event.request)
        .then(function (response) {
            cache.put(event.request, response.clone());
            return response;
          })
          .catch(err => console.log(err, event.request));
      })
      .catch(function (error) {
        console.log(error, event.request)
      }));
  });
}())

// .then(function (response) {
//     if (response.status === 404) {
//       return new Response("<img src='/imgs/10.jpg'/>", {headers:{'Content-Type': 'text/html'}});
//       }
//     });