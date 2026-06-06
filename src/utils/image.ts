/**
 * Helper to dynamically append ImageKit transformation parameters to image URLs.
 * This automatically converts format (e.g. to WebP/AVIF), compresses quality, and resizes.
 * 
 * Example URL:
 * https://ik.imagekit.io/StudioparArc/parArc/RESIDENCIAL%20/CUBE%20HOUSE/1_2%20-%20Photo.jpg?updatedAt=1772272176314
 * becomes:
 * https://ik.imagekit.io/StudioparArc/parArc/RESIDENCIAL%20/CUBE%20HOUSE/1_2%20-%20Photo.jpg?updatedAt=1772272176314&tr=w-800,q-80,f-auto
 */
export const getOptimizedImage = (url: string | undefined, width = 1200): string => {
  if (!url) return '';
  if (!url.includes('imagekit.io')) return url;
  
  // If the URL already has a transformation query, don't double append
  if (url.includes('tr=')) return url;
  
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}tr=w-${width},q-80,f-auto`;
};
