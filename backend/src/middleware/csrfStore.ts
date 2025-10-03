// Simple in-memory CSRF token store
// In production, use Redis or a database for persistence across restarts

interface TokenData {
  token: string;
  sessionToken: string;
  createdAt: Date;
  ip: string;
}

class CSRFTokenStore {
  private tokens: Map<string, TokenData> = new Map();
  private readonly TOKEN_EXPIRY_MS = 4 * 60 * 60 * 1000; // 4 hours
  private readonly CLEANUP_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes

  constructor() {
    // Periodically clean up expired tokens
    setInterval(() => this.cleanupExpiredTokens(), this.CLEANUP_INTERVAL_MS);
  }

  store(sessionToken: string, token: string, ip: string): void {
    this.tokens.set(sessionToken, {
      token,
      sessionToken,
      createdAt: new Date(),
      ip
    });
  }

  validate(sessionToken: string, token: string, ip: string): boolean {
    const tokenData = this.tokens.get(sessionToken);
    
    if (!tokenData) {
      return false;
    }

    // Check if token matches
    if (tokenData.token !== token) {
      return false;
    }

    // Check if token is expired
    const age = Date.now() - tokenData.createdAt.getTime();
    if (age > this.TOKEN_EXPIRY_MS) {
      this.tokens.delete(sessionToken);
      return false;
    }

    // Optionally check IP (can be disabled if users are behind dynamic IPs)
    // if (tokenData.ip !== ip) {
    //   return false;
    // }

    // Token is valid, remove it (one-time use)
    this.tokens.delete(sessionToken);
    return true;
  }

  private cleanupExpiredTokens(): void {
    const now = Date.now();
    for (const [sessionToken, tokenData] of this.tokens.entries()) {
      const age = now - tokenData.createdAt.getTime();
      if (age > this.TOKEN_EXPIRY_MS) {
        this.tokens.delete(sessionToken);
      }
    }
  }

  // For testing/debugging
  getTokenCount(): number {
    return this.tokens.size;
  }
}

export const csrfStore = new CSRFTokenStore();