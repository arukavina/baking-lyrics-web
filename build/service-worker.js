"use strict";var precacheConfig=[["/index.html","52a1c4d5ca79ce0f28ea53591f23bb22"],["/static/css/main.5f3cb662.css","4ce26f92d7c60e1a3283bf7a65cd4906"],["/static/js/main.d9bd395e.js","412b5e887ea495ba109a40919a5308d4"],["/static/media/Mattilda.b16023fb.otf","b16023fb18dcb4cfa55ab67a40e87f22"],["/static/media/Montserrat-ExtraBold.9bc77c3b.ttf","9bc77c3bca968c7490de95d1532d0e87"],["/static/media/Montserrat-Regular.9c460951.ttf","9c46095118380d38f12e67c916b427f9"],["/static/media/Roboto-Bold.ee7b96fa.ttf","ee7b96fa85d8fdb8c126409326ac2d2b"],["/static/media/Roboto-Light.fc84e998.ttf","fc84e998bc29b297ea20321e4c90b6ed"],["/static/media/acdc.7d7f8db9.jpg","7d7f8db9be2fd12af91eb609ca85beb1"],["/static/media/acdc2.161863ea.jpg","161863ea4a10551d72917ebbc1468313"],["/static/media/adrianaMaulini.e157256d.png","e157256df2127b8149851dfc95d230e1"],["/static/media/andreiRukavina.3fd2e367.png","3fd2e36793fc98d2b937ae515a9c1a73"],["/static/media/background.92bf1336.png","92bf133659670ce4c98141309a8b36e0"],["/static/media/find.3347515a.png","3347515a97682c724ffc69f051588677"],["/static/media/logoRed.83a0e132.png","83a0e1323f91605e54846adf5b41efcf"],["/static/media/notImg.30336981.png","30336981fc1e207f138c25e62b0612ed"],["/static/media/sergioBanchero.35d8052f.png","35d8052fa22d65c733931bf9e9352713"],["/static/media/solanaSierra.d043c2b8.png","d043c2b87b561475f16090003762f295"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var r="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});