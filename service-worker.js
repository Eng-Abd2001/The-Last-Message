const CACHE_NAME = 'out-of-frame-v2'; // تم رفع النسخة إلى v2
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.webmanifest'
];

self.addEventListener('install', (e) => {
    self.skipWaiting(); // إجبار المتصفح على تفعيل التحديث فوراً
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache); // مسح النسخة القديمة المعطلة
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (e) => {
    // جلب الملفات من الإنترنت أولاً، وإذا لم يوجد إنترنت نستخدم الكاش
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
