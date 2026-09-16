// Resolve a `public/` asset path that works no matter the
// GitHub Pages base path (e.g. `/wedding-invitation/`).
export function assetPath(path) {
  return import.meta.env.BASE_URL + path
}