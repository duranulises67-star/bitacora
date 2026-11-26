// Guarda la app en el dispositivo para que abra sin internet.
// La página se pide primero a internet (así cada actualización se ve al abrir); si no hay conexión en 4 s, se usa la copia guardada.
const CACHE='bitacora-tabnom-3';
const ARCHIVOS=['./','index.html','config.js','manifest.webmanifest','icono-192.png','icono-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ARCHIVOS.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(caches.open(CACHE).then(async c=>{
    const guardada=await c.match(e.request,{ignoreSearch:true});
    const red=fetch(e.request.url,{cache:'no-cache',credentials:'same-origin'}).then(r=>{if(r.ok)c.put(e.request,r.clone());return r}).catch(()=>guardada||Response.error());
    const pagina=e.request.mode==='navigate'||/(\/|index\.html)$/.test(u.pathname);
    if(guardada&&pagina){const t=new Promise(r=>setTimeout(()=>r(guardada),4000));const ok=red.then(r=>r&&r.ok?r:guardada,()=>guardada);e.waitUntil(ok.then(()=>{},()=>{}));return Promise.race([ok,t])}
    if(guardada){e.waitUntil(red.then(()=>{},()=>{}));return guardada}
    return red;
  }));
});