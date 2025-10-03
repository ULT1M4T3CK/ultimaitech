import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { csrfStore } from './csrfStore';

interface CSRFRequest extends Request {
  csrfToken?: string;
}

// Simple CSRF protection implementation
export const generateCSRFToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

export const csrfProtection = (req: CSRFRequest, res: Response, next: NextFunction) => {
  // Skip CSRF protection for GET requests and public endpoints
  if (req.method === 'GET' || req.path.includes('/api/health') || req.path.includes('/api/analytics/visit')) {
    return next();
  }

  // Skip CSRF for OPTIONS requests (preflight)
  if (req.method === 'OPTIONS') {
    return next();
  }

  // For protected routes, check CSRF token
  if (req.path.startsWith('/api/') && ['POST', 'PUT', 'DELETE'].includes(req.method)) {
    // Skip CSRF for public project endpoints
    if (req.path === '/api/projects' && req.method === 'GET') {
      return next();
    }

    const token = req.headers['x-csrf-token'] as string || req.body.csrfToken;
    const sessionToken = req.headers['x-csrf-session-token'] as string;

    if (!token || !sessionToken) {
      return res.status(403).json({ message: 'CSRF token required' });
    }

    // Validate token format
    if (typeof token !== 'string' || token.length !== 64 || 
        typeof sessionToken !== 'string' || sessionToken.length !== 64) {
      return res.status(403).json({ message: 'Invalid CSRF token format' });
    }

    // Validate token against store
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    if (!csrfStore.validate(sessionToken, token, clientIp)) {
      return res.status(403).json({ message: 'Invalid or expired CSRF token' });
    }
  }

  next();
};

export const csrfTokenEndpoint = (req: Request, res: Response) => {
  const token = generateCSRFToken();
  const sessionToken = generateCSRFToken();
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  
  // Store token for validation
  csrfStore.store(sessionToken, token, clientIp);
  
  res.json({ 
    csrfToken: token,
    sessionToken: sessionToken
  });
};
