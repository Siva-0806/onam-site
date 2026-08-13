/**
 * TECHAVAM 2026 — Data Integration Service (Google Apps Script)
 * Reads the 4 real Google Forms Response Spreadsheets, normalizes records,
 * and compiles the Master Registration Dataset and Analytics Summary.
 */

var DataService = {
  /**
   * Fetches and normalizes all registrations from the 4 event response sheets
   */
  getAllRegistrations: function() {
    var masterList = [];
    var eventCounts = {
      'Startup Maveli': 0,
      'Code Questers': 0,
      'Tech + Kerala Amazing Race': 0,
      'Digital Pookolam': 0
    };
    var yearCounts = {
      '2ND': 0,
      '3RD': 0,
      'OTHER': 0
    };
    var sectionCounts = {
      '2ND': { 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0, 'G': 0, 'OTHER': 0 },
      '3RD': { 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'E': 0, 'F': 0, 'G': 0, 'OTHER': 0 }
    };

    var rollTracker = {}; // Key: "Event_RollNumber" -> count
    var totalDuplicates = 0;

    for (var i = 0; i < CONFIG.EVENTS.length; i++) {
      var eventConfig = CONFIG.EVENTS[i];
      var eventName = eventConfig.name;

      try {
        var ss = SpreadsheetApp.openById(eventConfig.spreadsheetId);
        var targetSheet = this.findSheetByGid(ss, eventConfig.gid);
        
        if (!targetSheet) {
          targetSheet = ss.getSheets()[0]; // Fallback to first sheet
        }

        var data = targetSheet.getDataRange().getValues();
        if (data && data.length > 1) {
          var headers = data[0];
          var headerMap = this.mapHeaders(headers);

          for (var r = 1; r < data.length; r++) {
            var row = data[r];
            // Skip completely blank rows
            if (this.isRowEmpty(row)) continue;

            var rawTimestamp = headerMap.timestamp >= 0 ? row[headerMap.timestamp] : '';
            var rawName = headerMap.name >= 0 ? row[headerMap.name] : '';
            var rawRoll = headerMap.rollNumber >= 0 ? row[headerMap.rollNumber] : '';
            var rawEmail = headerMap.email >= 0 ? row[headerMap.email] : '';
            var rawPhone = headerMap.phone >= 0 ? row[headerMap.phone] : '';
            var rawClass = headerMap.className >= 0 ? row[headerMap.className] : 'IT';
            var rawSection = headerMap.section >= 0 ? row[headerMap.section] : '';
            var rawYear = headerMap.year >= 0 ? row[headerMap.year] : '';

            // Clean & Normalize fields
            var cleanYear = this.normalizeYear(rawYear);
            var cleanSection = this.normalizeSection(rawSection);
            var cleanRoll = String(rawRoll).trim().toUpperCase();
            var formattedTime = this.formatDate(rawTimestamp);

            var key = eventName + '_' + cleanRoll;
            var isDuplicate = false;
            if (cleanRoll && cleanRoll.length > 0) {
              if (rollTracker[key]) {
                rollTracker[key]++;
                isDuplicate = true;
                totalDuplicates++;
              } else {
                rollTracker[key] = 1;
              }
            }

            var record = {
              id: eventConfig.id + '-' + r,
              event: eventName,
              timestamp: formattedTime,
              rawTimestamp: rawTimestamp instanceof Date ? rawTimestamp.toISOString() : String(rawTimestamp),
              name: String(rawName).trim(),
              rollNumber: cleanRoll,
              collegeEmail: String(rawEmail).trim().toLowerCase(),
              phone: String(rawPhone).replace(/[^\d+]/g, ''),
              className: String(rawClass).trim() || 'IT',
              section: cleanSection,
              year: cleanYear,
              isDuplicate: isDuplicate
            };

            masterList.push(record);

            // Update stats
            eventCounts[eventName] = (eventCounts[eventName] || 0) + 1;

            if (cleanYear === '2ND' || cleanYear === '3RD') {
              yearCounts[cleanYear]++;
              if (sectionCounts[cleanYear] && sectionCounts[cleanYear][cleanSection] !== undefined) {
                sectionCounts[cleanYear][cleanSection]++;
              } else if (sectionCounts[cleanYear]) {
                sectionCounts[cleanYear]['OTHER'] = (sectionCounts[cleanYear]['OTHER'] || 0) + 1;
              }
            } else {
              yearCounts['OTHER']++;
            }
          }
        }
      } catch (err) {
        Logger.log('Error reading sheet for ' + eventName + ': ' + err.toString());
      }
    }

    // Sort by timestamp descending (newest first)
    masterList.sort(function(a, b) {
      return (b.rawTimestamp || '').localeCompare(a.rawTimestamp || '');
    });

    return {
      success: true,
      lastUpdated: new Date().toISOString(),
      stats: {
        total: masterList.length,
        duplicates: totalDuplicates,
        eventCounts: eventCounts,
        yearCounts: yearCounts,
        sectionCounts: sectionCounts
      },
      registrations: masterList
    };
  },

  /**
   * Helper: Find sheet by GID
   */
  findSheetByGid: function(ss, gid) {
    if (!gid) return null;
    var sheets = ss.getSheets();
    for (var i = 0; i < sheets.length; i++) {
      if (String(sheets[i].getSheetId()) === String(gid)) {
        return sheets[i];
      }
    }
    return null;
  },

  /**
   * Helper: Dynamic header mapper
   */
  mapHeaders: function(headers) {
    var map = {
      timestamp: -1,
      name: -1,
      rollNumber: -1,
      email: -1,
      phone: -1,
      className: -1,
      section: -1,
      year: -1
    };

    for (var i = 0; i < headers.length; i++) {
      var h = String(headers[i]).toLowerCase().trim();

      if (h.indexOf('timestamp') !== -1 || h.indexOf('time') !== -1 || h.indexOf('date') !== -1) {
        if (map.timestamp === -1) map.timestamp = i;
      } else if (h.indexOf('roll') !== -1 || h.indexOf('reg') !== -1 || h.indexOf('register') !== -1) {
        if (map.rollNumber === -1) map.rollNumber = i;
      } else if (h.indexOf('email') !== -1 || h.indexOf('mail') !== -1) {
        if (map.email === -1) map.email = i;
      } else if (h.indexOf('phone') !== -1 || h.indexOf('mobile') !== -1 || h.indexOf('contact') !== -1 || h.indexOf('whatsapp') !== -1) {
        if (map.phone === -1) map.phone = i;
      } else if (h.indexOf('name') !== -1 || h.indexOf('student') !== -1 || h.indexOf('participant') !== -1) {
        if (map.name === -1) map.name = i;
      } else if (h.indexOf('section') !== -1 || h.indexOf('sec') !== -1) {
        if (map.section === -1) map.section = i;
      } else if (h.indexOf('year') !== -1) {
        if (map.year === -1) map.year = i;
      } else if (h.indexOf('class') !== -1 || h.indexOf('dept') !== -1 || h.indexOf('department') !== -1 || h.indexOf('branch') !== -1) {
        if (map.className === -1) map.className = i;
      }
    }

    return map;
  },

  /**
   * Normalize Year values into '2ND', '3RD', or fallback
   */
  normalizeYear: function(val) {
    if (!val) return '2ND';
    var s = String(val).toUpperCase().trim();
    if (s.indexOf('2') !== -1 || s.indexOf('II') !== -1 || s.indexOf('SECOND') !== -1) {
      return '2ND';
    }
    if (s.indexOf('3') !== -1 || s.indexOf('III') !== -1 || s.indexOf('THIRD') !== -1) {
      return '3RD';
    }
    return s || '2ND';
  },

  /**
   * Normalize Section values into 'A' - 'G'
   */
  normalizeSection: function(val) {
    if (!val) return 'A';
    var s = String(val).toUpperCase().trim();
    // Extract first single letter A-G
    var match = s.match(/[A-G]/);
    if (match) {
      return match[0];
    }
    return s.charAt(0) || 'A';
  },

  /**
   * Helper: Check if row is empty
   */
  isRowEmpty: function(row) {
    for (var i = 0; i < row.length; i++) {
      if (row[i] !== null && String(row[i]).trim() !== '') {
        return false;
      }
    }
    return true;
  },

  /**
   * Helper: Format Date string
   */
  formatDate: function(dateVal) {
    if (!dateVal) return '';
    if (dateVal instanceof Date) {
      try {
        return Utilities.formatDate(dateVal, Session.getScriptTimeZone() || 'GMT+5:30', 'dd/MM/yyyy HH:mm:ss');
      } catch (e) {
        return dateVal.toLocaleString();
      }
    }
    return String(dateVal);
  }
};
