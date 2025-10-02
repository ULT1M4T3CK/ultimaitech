import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

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

  // For admin routes, check CSRF token
  if (req.path.startsWith('/api/') && ['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const token = req.headers['x-csrf-token'] || req.body.csrfToken;
    const sessionToken = req.headers['x-csrf-session-token'];

    if (!token || !sessionToken) {
      return res.status(403).json({ message: 'CSRF token required' });
    }

    // In a production app, you'd validate the token against a session store
    // For now, we'll do basic validation that tokens are present and properly formatted
    if (typeof token !== 'string' || token.length !== 64 || 
        typeof sessionToken !== 'string' || sessionToken.length !== 64) {
      return res.status(403).json({ message: 'Invalid CSRF token' });
    }
  }

  next();
};

export const csrfTokenEndpoint = (req: Request, res: Response) => {
  const token = generateCSRFToken();
  const sessionToken = generateCSRFToken();
  
  res.json({ 
    csrfToken: token,
    sessionToken: sessionToken
  });
};
