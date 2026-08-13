/**
 * TECHAVAM 2026 — Google Apps Script Master API Endpoint
 * 
 * Exposes controlled HTTP API for the Organiser Registration Dashboard.
 * Ensures that private spreadsheet data is only served to authenticated organisers.
 */

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  var params = e && e.parameter ? e.parameter : {};
  var postData = {};

  if (e && e.postData && e.postData.contents) {
    try {
      postData = JSON.parse(e.postData.contents);
    } catch (err) {
      postData = {};
    }
  }

  // Merge GET parameters and POST body
  var action = params.action || postData.action || 'health';
  var token = params.token || postData.token || '';
  var username = params.username || postData.username || '';
  var password = params.password || postData.password || '';

  var response = {};

  try {
    switch (action) {
      case 'health':
      case 'ping':
        response = {
          success: true,
          status: 'online',
          fest: 'TECHAVAM 2026',
          department: 'Information Technology',
          club: 'Technocrats',
          version: '1.0.0',
          timestamp: new Date().toISOString()
        };
        break;

      case 'login':
        response = AuthService.authenticate(username, password);
        break;

      case 'verify':
        var isValid = AuthService.validateToken(token);
        response = {
          success: isValid,
          authenticated: isValid,
          timestamp: new Date().toISOString()
        };
        break;

      case 'getRegistrations':
      case 'getData':
        // Require valid organizer token
        if (!AuthService.validateToken(token)) {
          response = {
            success: false,
            message: 'Unauthorized: Invalid or expired session token. Please log in again.',
            code: 401
          };
        } else {
          response = DataService.getAllRegistrations();
        }
        break;

      default:
        response = {
          success: false,
          message: 'Unknown action parameter: ' + action
        };
        break;
    }
  } catch (error) {
    response = {
      success: false,
      message: 'Server error: ' + error.toString(),
      timestamp: new Date().toISOString()
    };
  }

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}
