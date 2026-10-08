// Guarda la app en el dispositivo para que abra sin internet. Muestra la copia guardada y la actualiza en segundo plano.
const CACHE='bitacora-c78c7c468f';
const ARCHIVOS=['./','index.html','config.js','manifest.webmanifest','icono-192.png','icono-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ARCHIVOS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(caches.open(CACHE).then(async c=>{
    const guardada=await c.match(e.request,{ignoreSearch:true});
    const red=fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r}).catch(()=>guardada||Response.error());
    if(guardada){e.waitUntil(red.then(()=>{},()=>{}));return guardada}
    return red;
  }));
});