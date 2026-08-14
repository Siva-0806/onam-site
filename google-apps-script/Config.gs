/**
 * TECHAVAM 2026 — Google Apps Script Backend Configuration
 * Integrates directly with the 4 Google Forms Response Sheets
 * 
 * SERVER-SIDE ONLY: Never bundle this file in client-side React code.
 */

var CONFIG = {
  // Event Response Spreadsheets Configuration
  EVENTS: [
    {
      id: 'hackathon',
      name: 'HackKerala: The Onam Hackathon',
      spreadsheetId: '1T8HMBdBBv5ChNm0QDRduKLvKat31aGUZo4Ntz3xHGGE',
      gid: '614455485'
    },
    {
      id: 'pookolam',
      name: 'Digital Pookolam',
      spreadsheetId: '1d33fXEZ25AZamBk73nKugax2BIq1vGQJvse6wgYHWSg',
      gid: '994385083'
    },
    {
      id: 'webcraft',
      name: 'WebCraft AI: 90-Min Blitz',
      spreadsheetId: '1q2RLe4_kcx8Nia_1bW6nmyqSjyvgQCw-Xa1fRrq0YhQ',
      gid: '912982728'
    },
    {
      id: 'cricbid',
      name: 'CricBid: The IPL Mega Auction',
      spreadsheetId: '1_RImFF1I_3aBldU06RR-Jxvq9AqXUUtCIRMAgZdz7Q4',
      gid: '73551945'
    }
  ],

  // Organiser Admin Authentication
  // You can also set these securely via Apps Script: Project Settings -> Script Properties
  DEFAULT_ADMIN: {
    username: 'admin@techavam.in',
    // Default pass: 'techavam2026' (Organisers can customize via Script Properties 'ADMIN_PASSWORD')
    passwordHash: 'c4e47a9cb57a5840d21a28a2a0ff13fc53b05f6e80b2a755d9ec8ec7f9602410' // sha256 for 'techavam2026'
  },

  // Token session validity in hours
  SESSION_DURATION_HOURS: 24,

  // Allowed Years and Sections
  VALID_YEARS: ['2ND', '3RD'],
  VALID_SECTIONS: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
};
