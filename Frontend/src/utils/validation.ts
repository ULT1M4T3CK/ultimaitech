// Input validation utilities to prevent XSS and ensure data integrity

export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  // Remove any HTML tags and script content
  const cleaned = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
  
  return cleaned;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateURL = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

export const validateProjectData = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!data.title || data.title.trim().length === 0) {
    errors.push('Title is required');
  } else if (data.title.length > 255) {
    errors.push('Title must be less than 255 characters');
  }
  
  if (!data.description || data.description.trim().length === 0) {
    errors.push('Description is required');
  }
  
  if (!Array.isArray(data.technologies) || data.technologies.length === 0) {
    errors.push('At least one technology is required');
  }
  
  if (data.project_url && !validateURL(data.project_url)) {
    errors.push('Project URL must be a valid HTTP/HTTPS URL');
  }
  
  if (data.github_url && !validateURL(data.github_url)) {
    errors.push('GitHub URL must be a valid HTTP/HTTPS URL');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

export const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};