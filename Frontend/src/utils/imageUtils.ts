// Utility functions for handling image URLs

export const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) return ''
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  
  // For local development with Docker, use direct backend port
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Remove leading slash if present
    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath
    return `http://localhost:5001/${cleanPath}`
  }
  
  // For production, use the same domain
  return imagePath
}

export const isImageAccessible = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' })
    return response.ok
  } catch {
    return false
  }
}
