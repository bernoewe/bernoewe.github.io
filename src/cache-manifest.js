// Cache manifest for client-side cache optimization
window.CACHE_MANIFEST = {
  version: Date.now(),
  assets: {
    // CSS files - long cache
    css: {
      maxAge: 31536000, // 1 year
      strategy: 'cache-first'
    },
    // JS files - long cache
    js: {
      maxAge: 31536000, // 1 year  
      strategy: 'cache-first'
    },
    // Images - moderate cache
    images: {
      maxAge: 2592000, // 30 days
      strategy: 'cache-first'
    },
    // HTML - no cache
    html: {
      maxAge: 0,
      strategy: 'network-first'
    }
  }
};

// Simple client-side cache helper
if ('localStorage' in window) {
  const cacheVersion = 'v' + CACHE_MANIFEST.version;
  
  // Clear old cache versions
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('cache_') && !key.includes(cacheVersion)) {
      localStorage.removeItem(key);
    }
  });
}