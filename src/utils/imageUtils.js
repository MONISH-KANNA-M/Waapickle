// Image utility functions for better image handling

// Default fallback images for different categories
export const fallbackImages = {
  spicy: 'https://images.unsplash.com/photo-1590080877032-3c5dd8a6362f?auto=format&fit=crop&w=600&q=80',
  sweet: 'https://images.unsplash.com/photo-1631656839995-3b647fd4aa89?auto=format&fit=crop&w=600&q=80',
  organic: 'https://images.unsplash.com/photo-1632916372230-2e0d7c344fe3?auto=format&fit=crop&w=600&q=80',
  default: 'https://images.unsplash.com/photo-1590080877032-3c5dd8a6362f?auto=format&fit=crop&w=600&q=80'
};

// Get fallback image based on product category
export const getFallbackImage = (category) => {
  const categoryKey = category?.toLowerCase() || 'default';
  return fallbackImages[categoryKey] || fallbackImages.default;
};

// Optimize image URL with proper parameters
export const optimizeImageUrl = (url, options = {}) => {
  if (!url) return fallbackImages.default;
  
  const {
    width = 600,
    height = 400,
    quality = 80,
    format = 'auto'
  } = options;
  
  // Handle imported module images (they have a default property)
  if (typeof url === 'object' && url.default) {
    return url.default;
  }
  
  // If already optimized, return as is
  if (url.includes('auto=format') || url.includes('w=') || url.includes('q=')) {
    return url;
  }
  
  // Optimize Unsplash images
  if (url.includes('unsplash.com')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}auto=format&fit=crop&w=${width}&q=${quality}`;
  }
  
  // Optimize Pexels images
  if (url.includes('pexels.com')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}auto=compress&w=${width}&h=${height}&fit=crop`;
  }
  
  // For other images, return as is
  return url;
};

// Generate placeholder image with text
export const generatePlaceholder = (text = 'Loading...', width = 600, height = 400) => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0e6df"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" 
            fill="#a47b68" text-anchor="middle" dy=".3em">${text}</text>
    </svg>
  `)}`;
};

// Check if image URL is valid
export const isValidImageUrl = (url) => {
  if (!url) return false;
  
  // Handle imported module images (they have a default property)
  if (typeof url === 'object' && url.default) {
    return true;
  }
  
  // Handle string URLs
  if (typeof url === 'string') {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    const hasValidExtension = imageExtensions.some(ext => 
      url.toLowerCase().includes(ext)
    );
    
    const isValidUrl = url.startsWith('http') || url.startsWith('data:');
    
    return isValidUrl && (hasValidExtension || url.includes('unsplash.com') || url.includes('pexels.com'));
  }
  
  return false;
};

// Preload images for better performance
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Preload multiple images
export const preloadImages = async (urls) => {
  const promises = urls.map(url => preloadImage(url).catch(() => null));
  return Promise.all(promises);
};

// Get responsive image sizes
export const getResponsiveImageSizes = (baseUrl, sizes = [400, 600, 800, 1200]) => {
  if (!baseUrl) return [];
  
  return sizes.map(size => ({
    size,
    url: optimizeImageUrl(baseUrl, { width: size })
  }));
};

// Create srcSet for responsive images
export const createSrcSet = (baseUrl, sizes = [400, 600, 800, 1200]) => {
  const responsiveImages = getResponsiveImageSizes(baseUrl, sizes);
  return responsiveImages
    .map(({ url, size }) => `${url} ${size}w`)
    .join(', ');
};
