/**
 * TECHAVAM 2026 — Authentication Service (Google Apps Script)
 * Secure organizer authentication & session token management.
 */

var AuthService = {
  /**
   * Generates SHA-256 hash of a string
   */
  hashPassword: function(password) {
    var rawHash = Utilities.computeDigest(
      Utilities.DigestAlgorithm.SHA_256,
      password,
      Utilities.Charset.UTF_8
    );
    var hex = '';
    for (var i = 0; i < rawHash.length; i++) {
      var byteVal = rawHash[i];
      if (byteVal < 0) byteVal += 256;
      var byteHex = byteVal.toString(16);
      if (byteHex.length === 1) byteHex = '0' + byteHex;
      hex += byteHex;
    }
    return hex;
  },

  /**
   * Authenticates an organizer
   */
  authenticate: function(username, password) {
    if (!username || !password) {
      return { success: false, message: 'Username and password are required.' };
    }

    var scriptProps = PropertiesService.getScriptProperties();
    var customUser = scriptProps.getProperty('ADMIN_USERNAME') || CONFIG.DEFAULT_ADMIN.username;
    var customPassHash = scriptProps.getProperty('ADMIN_PASSWORD_HASH') || CONFIG.DEFAULT_ADMIN.passwordHash;
    var customPlainPass = scriptProps.getProperty('ADMIN_PASSWORD');

    var inputHash = this.hashPassword(password.trim());
    var isValid = false;

    // Check against username and hash
    var userMatches = (username.trim().toLowerCase() === customUser.toLowerCase());
    
    if (userMatches) {
      if (customPlainPass && password.trim() === customPlainPass) {
        isValid = true;
      } else if (inputHash === customPassHash) {
        isValid = true;
      }
    }

    if (!isValid) {
      return { success: false, message: 'Invalid credentials. Please check your username and password.' };
    }

    // Generate secure session token
    var token = this.createSessionToken(username);
    return {
      success: true,
      token: token,
      user: {
        username: username,
        role: 'Organiser',
        fest: 'TECHAVAM 2026'
      }
    };
  },

  /**
   * Creates a timestamped session token stored in User/Script Cache
   */
  createSessionToken: function(username) {
    var token = Utilities.getUuid() + '-' + new Date().getTime();
    var userProps = PropertiesService.getUserProperties();
    var expiry = new Date().getTime() + (CONFIG.SESSION_DURATION_HOURS * 60 * 60 * 1000);
    
    var sessionData = {
      username: username,
      expiresAt: expiry
    };

    userProps.setProperty('SESSION_' + token, JSON.stringify(sessionData));
    return token;
  },

  /**
   * Validates session token
   */
  validateToken: function(token) {
    if (!token) return false;
    
    // Check if token format is valid
    var userProps = PropertiesService.getUserProperties();
    var sessionJson = userProps.getProperty('SESSION_' + token);
    
    if (!sessionJson) {
      // Fallback: If session not in UserProperties, accept active UUID pattern if generated recently
      var parts = token.split('-');
      if (parts.length >= 6) {
        var timestamp = parseInt(parts[parts.length - 1], 10);
        if (!isNaN(timestamp)) {
          var now = new Date().getTime();
          if (now - timestamp < (CONFIG.SESSION_DURATION_HOURS * 60 * 60 * 1000)) {
            return true;
          }
        }
      }
      return false;
    }

    try {
      var session = JSON.parse(sessionJson);
      var now = new Date().getTime();
      return (session.expiresAt > now);
    } catch (e) {
      return false;
    }
  }
};
