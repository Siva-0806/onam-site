import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ApiService } from '../services/api.js';

export default function AdminDashboard({ onLogout, onBackHome }) {
  const [data, setData] = useState({
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
    lastUpdated: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [apiUrlInput, setApiUrlInput] = useState(ApiService.getApiUrl());
  const [copied, setCopied] = useState(false);

  // Filter States
  const [selectedEvent, setSelectedEvent] = useState('ALL');
  const [selectedYear, setSelectedYear] = useState('ALL');
  const [selectedSection, setSelectedSection] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch registration data from server
  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const res = await ApiService.fetchRegistrations();
      if (res && res.success) {
        setData({
          stats: res.stats || {
            total: (res.registrations || []).length,
            duplicates: (res.registrations || []).filter((r) => r.isDuplicate).length,
            eventCounts: res.stats?.eventCounts || {},
            yearCounts: res.stats?.yearCounts || {},
            sectionCounts: res.stats?.sectionCounts || {},
          },
          registrations: res.registrations || [],
          lastUpdated: res.lastUpdated || new Date().toISOString(),
        });
      } else {
        setError(res?.message || 'Failed to load registration data.');
      }
    } catch (err) {
      setError(err.message || 'Unable to connect to Google Sheets backend.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle saving backend URL
  const handleSaveApiUrl = (e) => {
    e.preventDefault();
    ApiService.setApiUrl(apiUrlInput);
    setShowSettings(false);
    loadData();
  };

  // Filtered registrations (Event + Year + Section + Search combined)
  const filteredRegistrations = useMemo(() => {
    return (data.registrations || []).filter((item) => {
      // Event filter
      if (selectedEvent !== 'ALL' && item.event !== selectedEvent) {
        return false;
      }
      // Year filter
      if (selectedYear !== 'ALL' && item.year !== selectedYear) {
        return false;
      }
      // Section filter
      if (selectedSection !== 'ALL' && item.section !== selectedSection) {
        return false;
      }
      // Search query (Name, Roll Number, Email, Phone)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = (item.name || '').toLowerCase().includes(q);
        const rollMatch = (item.rollNumber || '').toLowerCase().includes(q);
        const emailMatch = (item.collegeEmail || '').toLowerCase().includes(q);
        const phoneMatch = (item.phone || '').includes(q);
        if (!nameMatch && !rollMatch && !emailMatch && !phoneMatch) {
          return false;
        }
      }
      return true;
    });
  }, [data.registrations, selectedEvent, selectedYear, selectedSection, searchQuery]);

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredRegistrations.length === 0) {
      alert('No records available to export.');
      return;
    }

    const headers = [
      '#',
      'Name',
      'Roll Number',
      'College Email',
      'Phone Number',
      'Class',
      'Section',
      'Year',
      'Event',
      'Registration Time',
      'Duplicate Status',
    ];

    const rows = filteredRegistrations.map((item, index) => [
      index + 1,
      `"${(item.name || '').replace(/"/g, '""')}"`,
      `"${(item.rollNumber || '').replace(/"/g, '""')}"`,
      `"${(item.collegeEmail || '').replace(/"/g, '""')}"`,
      `"${(item.phone || '').replace(/"/g, '""')}"`,
      `"${item.className || 'IT'}"`,
      `"${item.section || ''}"`,
      `"${item.year || ''}"`,
      `"${(item.event || '').replace(/"/g, '""')}"`,
      `"${item.timestamp || ''}"`,
      `"${item.isDuplicate ? 'Duplicate' : 'Unique'}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);

    const filterName =
      selectedEvent !== 'ALL'
        ? selectedEvent.replace(/\s+/g, '_')
        : 'All_Events';
    const yearName = selectedYear !== 'ALL' ? `_${selectedYear}` : '';
    const sectionName = selectedSection !== 'ALL' ? `_Sec${selectedSection}` : '';
    const dateStr = new Date().toISOString().split('T')[0];

    link.setAttribute(
      'download',
      `TECHAVAM_2026_${filterName}${yearName}${sectionName}_${dateStr}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to JSON
  const handleExportJSON = () => {
    if (filteredRegistrations.length === 0) {
      alert('No records available to export.');
      return;
    }
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(filteredRegistrations, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `TECHAVAM_2026_Registrations_${new Date().toISOString().split('T')[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const clearFilters = () => {
    setSelectedEvent('ALL');
    setSelectedYear('ALL');
    setSelectedSection('ALL');
    setSearchQuery('');
  };

  const isFiltered =
    selectedEvent !== 'ALL' ||
    selectedYear !== 'ALL' ||
    selectedSection !== 'ALL' ||
    searchQuery.trim() !== '';

  const formatLastUpdated = (isoStr) => {
    if (!isoStr) return 'Just now';
    try {
      const d = new Date(isoStr);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' (' + d.toLocaleDateString() + ')';
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="admin-portal">
      {/* ── TOP NAVIGATION BAR ── */}
      <header className="admin-nav">
        <div className="admin-nav__in">
          <div className="admin-nav__left">
            <button className="admin-nav__back" onClick={onBackHome} title="Return to Public Website">
              ← Website
            </button>
            <div className="admin-nav__brand">
              <span className="admin-nav__title">TECHAVAM 2026</span>
              <span className="admin-nav__sub">Registration Dashboard · TechoCrats</span>
            </div>
          </div>

          <div className="admin-nav__right">
            <button
              className="admin-btn admin-btn--outline"
              onClick={loadData}
              disabled={loading}
              title="Refresh registration data from Google Sheets"
            >
              <span className={`admin-btn__icon ${loading ? 'admin-spin' : ''}`}>🔄</span>
              {loading ? 'Refreshing...' : 'Refresh Data'}
            </button>

            <button
              className="admin-btn admin-btn--outline"
              onClick={() => setShowSettings(!showSettings)}
              title="Configure Backend Connection"
            >
              ⚙️ Backend Settings
            </button>

            <button className="admin-btn admin-btn--danger" onClick={onLogout} title="Log out">
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* ── SETTINGS MODAL / DRAWER ── */}
      {showSettings && (
        <div className="admin-modal-backdrop" onClick={() => setShowSettings(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal__head">
              <h3>Google Apps Script Backend Configuration</h3>
              <button className="admin-modal__close" onClick={() => setShowSettings(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleSaveApiUrl} className="admin-modal__body">
              <p className="admin-modal__desc">
                Paste your deployed <strong>Google Apps Script Web App URL</strong> below to stream live responses directly from the 4 private Google Sheets:
              </p>
              <div className="admin-form-group">
                <label className="admin-form-label">Apps Script Web App URL</label>
                <input
                  type="url"
                  className="admin-form-input admin-form-input--mono"
                  value={apiUrlInput}
                  onChange={(e) => setApiUrlInput(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  required
                />
              </div>

              <div className="admin-modal__guide">
                <strong>How to get this URL:</strong>
                <ol>
                  <li>Open the files in the <code>google-apps-script/</code> folder of this project.</li>
                  <li>Create a new project at <a href="https://script.google.com" target="_blank" rel="noreferrer">script.google.com</a> and paste the code.</li>
                  <li>Click <strong>Deploy → New deployment → Web app</strong> (Access: <em>Anyone</em>).</li>
                  <li>Copy and paste the generated URL here.</li>
                </ol>
              </div>

              <div className="admin-modal__actions">
                <button type="button" className="admin-btn admin-btn--outline" onClick={() => setShowSettings(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn--gold">
                  Save &amp; Connect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MAIN DASHBOARD CONTAINER ── */}
      <main className="admin-content wrap">
        {/* Banner Alert for Errors or Setup */}
        {error && (
          <div className="admin-banner admin-banner--error">
            <span className="admin-banner__icon">⚠️</span>
            <div className="admin-banner__text">
              <strong>Connection Notice:</strong> {error}
              {!ApiService.getApiUrl() && (
                <button className="admin-banner__btn" onClick={() => setShowSettings(true)}>
                  Configure Apps Script URL
                </button>
              )}
            </div>
          </div>
        )}

        {!ApiService.getApiUrl() && (
          <div className="admin-banner admin-banner--info">
            <span className="admin-banner__icon">💡</span>
            <div className="admin-banner__text">
              <strong>Backend Integration:</strong> Connect your Google Apps Script Web App to pull live submissions directly from the 4 response spreadsheets.
              <button className="admin-banner__btn" onClick={() => setShowSettings(true)}>
                Connect Backend URL
              </button>
            </div>
          </div>
        )}

        {/* ── SECTION 1: SUMMARY METRICS ── */}
        <section className="admin-section">
          <div className="admin-section__head">
            <div>
              <h2 className="admin-section__title">Overview &amp; Registration Metrics</h2>
              <p className="admin-section__sub">
                Live statistics compiled across all 4 department events
              </p>
            </div>
            <div className="admin-last-sync">
              <span className="admin-sync-dot" />
              <span>Last updated: {formatLastUpdated(data.lastUpdated)}</span>
            </div>
          </div>

          <div className="admin-stats-grid">
            {/* Total Hero Card */}
            <div className="admin-stat-card admin-stat-card--hero">
              <div className="admin-stat-card__top">
                <span className="admin-stat-card__label">TOTAL REGISTRATIONS</span>
                <span className="admin-stat-card__tag">All Events</span>
              </div>
              <div className="admin-stat-card__num">{data.stats.total || 0}</div>
              <div className="admin-stat-card__footer">
                <span>IT Dept · 2nd &amp; 3rd Year</span>
                {data.stats.duplicates > 0 && (
                  <span className="admin-badge admin-badge--warn">
                    {data.stats.duplicates} potential duplicate{data.stats.duplicates > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>

            {/* 4 Event Cards */}
            <div
              className={`admin-stat-card admin-stat-card--event ${selectedEvent === 'HackKerala: The Onam Hackathon' ? 'is-active' : ''}`}
              onClick={() => setSelectedEvent(selectedEvent === 'HackKerala: The Onam Hackathon' ? 'ALL' : 'HackKerala: The Onam Hackathon')}
              role="button"
              tabIndex={0}
            >
              <div className="admin-stat-card__top">
                <span className="admin-stat-card__label">HACKKERALA</span>
                <span className="admin-stat-card__slot">Slot 1 · Tech</span>
              </div>
              <div className="admin-stat-card__num">
                {data.stats.eventCounts['HackKerala: The Onam Hackathon'] || data.stats.eventCounts['Startup Maveli'] || 0}
              </div>
              <div className="admin-stat-card__footer">
                <span>Onam &amp; Kerala Hackathon</span>
                <span className="admin-stat-card__hint">Click to filter</span>
              </div>
            </div>

            <div
              className={`admin-stat-card admin-stat-card--event ${selectedEvent === 'Digital Pookolam' ? 'is-active' : ''}`}
              onClick={() => setSelectedEvent(selectedEvent === 'Digital Pookolam' ? 'ALL' : 'Digital Pookolam')}
              role="button"
              tabIndex={0}
            >
              <div className="admin-stat-card__top">
                <span className="admin-stat-card__label">DIGITAL POOKOLAM</span>
                <span className="admin-stat-card__slot">Slot 1 · Non-Tech</span>
              </div>
              <div className="admin-stat-card__num">
                {data.stats.eventCounts['Digital Pookolam'] || 0}
              </div>
              <div className="admin-stat-card__footer">
                <span>Digital Art &amp; Design</span>
                <span className="admin-stat-card__hint">Click to filter</span>
              </div>
            </div>

            <div
              className={`admin-stat-card admin-stat-card--event ${selectedEvent === 'WebCraft AI: 90-Min Blitz' ? 'is-active' : ''}`}
              onClick={() => setSelectedEvent(selectedEvent === 'WebCraft AI: 90-Min Blitz' ? 'ALL' : 'WebCraft AI: 90-Min Blitz')}
              role="button"
              tabIndex={0}
            >
              <div className="admin-stat-card__top">
                <span className="admin-stat-card__label">WEBCRAFT AI</span>
                <span className="admin-stat-card__slot">Slot 2 · Tech</span>
              </div>
              <div className="admin-stat-card__num">
                {data.stats.eventCounts['WebCraft AI: 90-Min Blitz'] || data.stats.eventCounts['Code Questers'] || 0}
              </div>
              <div className="admin-stat-card__footer">
                <span>90-Min AI Website Blitz</span>
                <span className="admin-stat-card__hint">Click to filter</span>
              </div>
            </div>

            <div
              className={`admin-stat-card admin-stat-card--event ${selectedEvent === 'CricBid: The IPL Mega Auction' ? 'is-active' : ''}`}
              onClick={() => setSelectedEvent(selectedEvent === 'CricBid: The IPL Mega Auction' ? 'ALL' : 'CricBid: The IPL Mega Auction')}
              role="button"
              tabIndex={0}
            >
              <div className="admin-stat-card__top">
                <span className="admin-stat-card__label">CRICBID IPL</span>
                <span className="admin-stat-card__slot">Slot 2 · Non-Tech</span>
              </div>
              <div className="admin-stat-card__num">
                {data.stats.eventCounts['CricBid: The IPL Mega Auction'] || data.stats.eventCounts['Tech + Kerala Amazing Race'] || 0}
              </div>
              <div className="admin-stat-card__footer">
                <span>IPL Player Mega Auction</span>
                <span className="admin-stat-card__hint">Click to filter</span>
              </div>
            </div>

            {/* Year Breakdown Cards */}
            <div className="admin-stat-card admin-stat-card--year">
              <div className="admin-stat-card__top">
                <span className="admin-stat-card__label">2ND YEAR TOTAL</span>
                <span className="admin-stat-card__tag">Batch 2024–28</span>
              </div>
              <div className="admin-stat-card__num">{data.stats.yearCounts['2ND'] || 0}</div>
              <div className="admin-stat-card__footer">
                <span>Sec A · B · C · D · E · F · G</span>
              </div>
            </div>

            <div className="admin-stat-card admin-stat-card--year">
              <div className="admin-stat-card__top">
                <span className="admin-stat-card__label">3RD YEAR TOTAL</span>
                <span className="admin-stat-card__tag">Batch 2023–27</span>
              </div>
              <div className="admin-stat-card__num">{data.stats.yearCounts['3RD'] || 0}</div>
              <div className="admin-stat-card__footer">
                <span>Sec A · B · C · D · E · F · G</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: FILTERS & SEARCH CONTROLS ── */}
        <section className="admin-section admin-controls-section">
          <div className="admin-controls-card">
            <div className="admin-controls-card__grid">
              {/* Event Filter */}
              <div className="admin-filter-group">
                <label className="admin-filter-label" htmlFor="filter-event">
                  Filter by Event
                </label>
                <select
                  id="filter-event"
                  className="admin-select"
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                >
                  <option value="ALL">All Events (4)</option>
                  <option value="HackKerala: The Onam Hackathon">HackKerala: The Onam Hackathon</option>
                  <option value="Digital Pookolam">Digital Pookolam</option>
                  <option value="WebCraft AI: 90-Min Blitz">WebCraft AI: 90-Min Blitz</option>
                  <option value="CricBid: The IPL Mega Auction">CricBid: The IPL Mega Auction</option>
                </select>
              </div>

              {/* Year Filter */}
              <div className="admin-filter-group">
                <label className="admin-filter-label" htmlFor="filter-year">
                  Filter by Year
                </label>
                <select
                  id="filter-year"
                  className="admin-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="ALL">All Years (2nd &amp; 3rd)</option>
                  <option value="2ND">2nd Year (2ND)</option>
                  <option value="3RD">3rd Year (3RD)</option>
                </select>
              </div>

              {/* Section Filter */}
              <div className="admin-filter-group">
                <label className="admin-filter-label" htmlFor="filter-section">
                  Filter by Section
                </label>
                <select
                  id="filter-section"
                  className="admin-select"
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                >
                  <option value="ALL">All Sections (A – G)</option>
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((sec) => (
                    <option key={sec} value={sec}>
                      Section {sec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Box */}
              <div className="admin-filter-group admin-filter-group--search">
                <label className="admin-filter-label" htmlFor="search-input">
                  Search Participant
                </label>
                <div className="admin-search-wrap">
                  <span className="admin-search-icon">🔍</span>
                  <input
                    id="search-input"
                    type="text"
                    className="admin-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by Name, Roll No, Email, Phone..."
                  />
                  {searchQuery && (
                    <button
                      className="admin-search-clear"
                      onClick={() => setSearchQuery('')}
                      title="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Active Filters Bar & Export Actions */}
            <div className="admin-controls-card__bar">
              <div className="admin-results-summary">
                <span className="admin-results-count">
                  Showing <strong>{filteredRegistrations.length}</strong> of{' '}
                  <strong>{data.registrations.length}</strong> participant registrations
                </span>

                {isFiltered && (
                  <button className="admin-btn-clear" onClick={clearFilters}>
                    Clear All Filters ✕
                  </button>
                )}
              </div>

              <div className="admin-export-group">
                <button
                  className="admin-btn admin-btn--gold"
                  onClick={handleExportCSV}
                  disabled={filteredRegistrations.length === 0}
                  title="Export filtered records to CSV"
                >
                  📥 Export CSV ({filteredRegistrations.length})
                </button>

                <button
                  className="admin-btn admin-btn--outline"
                  onClick={handleExportJSON}
                  disabled={filteredRegistrations.length === 0}
                  title="Export filtered records to JSON"
                >
                  Export JSON
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: MASTER REGISTRATIONS TABLE ── */}
        <section className="admin-section">
          <div className="admin-table-container">
            {loading ? (
              <div className="admin-state-box">
                <div className="admin-spinner" />
                <p>Loading registration data from Google Sheets...</p>
              </div>
            ) : filteredRegistrations.length === 0 ? (
              <div className="admin-state-box">
                <span className="admin-state-icon">📋</span>
                <h3>No registrations found</h3>
                <p>
                  {isFiltered
                    ? 'No submissions match your active filter and search criteria.'
                    : 'No registration responses have been recorded in the Google Sheets yet.'}
                </p>
                {isFiltered && (
                  <button className="btn btn--ghost" onClick={clearFilters} style={{ marginTop: '16px' }}>
                    Reset Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '45px' }}>#</th>
                      <th>Participant Name</th>
                      <th>Roll Number</th>
                      <th>College Email</th>
                      <th>Phone</th>
                      <th>Class</th>
                      <th>Sec</th>
                      <th>Year</th>
                      <th>Registered Event</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRegistrations.map((row, idx) => (
                      <tr key={row.id || idx} className={row.isDuplicate ? 'is-duplicate-row' : ''}>
                        <td className="admin-cell-index">{idx + 1}</td>
                        <td className="admin-cell-name">
                          <strong>{row.name || '—'}</strong>
                          {row.isDuplicate && (
                            <span className="admin-badge admin-badge--warn" title="Same Roll Number registered multiple times for this event">
                              ⚠️ Duplicate
                            </span>
                          )}
                        </td>
                        <td className="admin-cell-mono">{row.rollNumber || '—'}</td>
                        <td className="admin-cell-email">{row.collegeEmail || '—'}</td>
                        <td className="admin-cell-mono">{row.phone || '—'}</td>
                        <td>{row.className || 'IT'}</td>
                        <td>
                          <span className="admin-section-tag">{row.section || '—'}</span>
                        </td>
                        <td>
                          <span className={`admin-year-tag admin-year-tag--${row.year}`}>
                            {row.year || '—'}
                          </span>
                        </td>
                        <td>
                          <span className="admin-event-badge">{row.event || '—'}</span>
                        </td>
                        <td className="admin-cell-time">{row.timestamp || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
