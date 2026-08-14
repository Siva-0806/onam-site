// TECHAVAM 2026 — API Service for Organiser Dashboard
// Connects to the Google Apps Script Web App integration endpoint

const STORAGE_KEY_TOKEN = 'techavam_admin_token';
const STORAGE_KEY_USER = 'techavam_admin_user';
const STORAGE_KEY_API_URL = 'techavam_apps_script_url';

export const ApiService = {
  /**
   * Retrieves the configured Apps Script endpoint URL
   */
  getApiUrl: () => {
    return (
      localStorage.getItem(STORAGE_KEY_API_URL) ||
      import.meta.env.VITE_APPS_SCRIPT_URL ||
      ''
    );
  },

  /**
   * Saves a custom Apps Script endpoint URL locally
   */
  setApiUrl: (url) => {
    if (url) {
      localStorage.setItem(STORAGE_KEY_API_URL, url.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY_API_URL);
    }
  },

  /**
   * Get stored auth token
   */
  getToken: () => {
    return localStorage.getItem(STORAGE_KEY_TOKEN) || '';
  },

  /**
   * Get stored user profile
   */
  getUser: () => {
    try {
      const u = localStorage.getItem(STORAGE_KEY_USER);
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  },

  /**
   * Saves session details
   */
  setSession: (token, user) => {
    localStorage.setItem(STORAGE_KEY_TOKEN, token);
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    }
  },

  /**
   * Clears session (Logout)
   */
  clearSession: () => {
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_USER);
  },

  /**
   * Authenticates organizer credentials against the Apps Script Web App
   */
  login: async (username, password, customUrl = null) => {
    const endpoint = customUrl || ApiService.getApiUrl();

    if (!endpoint) {
      // If endpoint is not configured yet, provide local fallback credentials for testing/setup
      if (
        (username === 'admin@techavam.in' || username === 'admin') &&
        password === 'techavam2026'
      ) {
        const dummyToken = 'local-admin-' + Date.now();
        ApiService.setSession(dummyToken, {
          username: username,
          role: 'Organiser',
          isOfflineMode: true,
        });
        return {
          success: true,
          token: dummyToken,
          message: 'Authenticated in setup mode (Configure Apps Script URL to fetch live sheets).',
          isOfflineMode: true,
        };
      }
      return {
        success: false,
        message:
          'Apps Script Endpoint not configured. Enter the Web App URL or use default credentials (admin@techavam.in / techavam2026).',
      };
    }

    try {
      const url = new URL(endpoint);
      url.searchParams.set('action', 'login');
      url.searchParams.set('username', username);
      url.searchParams.set('password', password);

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.token) {
        ApiService.setSession(data.token, data.user || { username });
      }
      return data;
    } catch (err) {
      // If network/CORS error with Web App, check fallback
      if (
        (username === 'admin@techavam.in' || username === 'admin') &&
        password === 'techavam2026'
      ) {
        const fallbackToken = 'local-admin-' + Date.now();
        ApiService.setSession(fallbackToken, {
          username,
          role: 'Organiser',
          isOfflineMode: true,
        });
        return {
          success: true,
          token: fallbackToken,
          isOfflineMode: true,
          message: 'Connected in local mode. Verify Google Apps Script Web App permissions.',
        };
      }
      return {
        success: false,
        message: `Authentication failed: ${err.message}. Ensure Apps Script is deployed as "Anyone".`,
      };
    }
  },

  /**
   * Verifies existing token
   */
  verifyToken: async () => {
    const token = ApiService.getToken();
    if (!token) return false;

    if (token.startsWith('local-admin-')) return true;

    const endpoint = ApiService.getApiUrl();
    if (!endpoint) return true;

    try {
      const url = new URL(endpoint);
      url.searchParams.set('action', 'verify');
      url.searchParams.set('token', token);

      const response = await fetch(url.toString());
      const data = await response.json();
      return !!data.success;
    } catch {
      return true; // Keep local session active
    }
  },

  /**
   * Fetches master registration dataset and metrics from Google Apps Script
   */
  fetchRegistrations: async () => {
    const token = ApiService.getToken();
    const endpoint = ApiService.getApiUrl();

    if (!endpoint) {
      return {
        success: true,
        isConfigRequired: true,
        lastUpdated: new Date().toISOString(),
        stats: {
          total: 0,
          duplicates: 0,
          eventCounts: {
            'HackKerala: The Onam Hackathon': 0,
            'Digital Pookolam': 0,
            'WebCraft AI: 90-Min Blitz': 0,
            'CricBid: The IPL Mega Auction': 0,
            'Startup Maveli': 0,
            'Code Questers': 0,
            'Tech + Kerala Amazing Race': 0,
          },
          yearCounts: { '2ND': 0, '3RD': 0 },
          sectionCounts: {
            '2ND': { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0 },
            '3RD': { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0 },
          },
        },
        registrations: [],
      };
    }

    try {
      const url = new URL(endpoint);
      url.searchParams.set('action', 'getRegistrations');
      url.searchParams.set('token', token);
      url.searchParams.set('_t', Date.now().toString()); // Prevent browser cache

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(`Unable to fetch registration data: ${err.message}`);
    }
  },
};
