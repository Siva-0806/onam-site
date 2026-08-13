import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

export default function EventQRCode({ url, eventName, size = 200 }) {
  const [qrSrc, setQrSrc] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) return;

    QRCode.toDataURL(url, {
      width: size * 2, // 2x for sharp retina rendering
      margin: 2,
      color: {
        dark: '#180B2C', // Deep purple-black
        light: '#FFFFFF', // Pure white quiet zone for high scannability
      },
      errorCorrectionLevel: 'M',
    })
      .then((dataUrl) => {
        setQrSrc(dataUrl);
        setError(false);
      })
      .catch((err) => {
        console.error('QR Code generation error:', err);
        setError(true);
      });
  }, [url, size]);

  return (
    <div className="event-qr-card">
      <div className="event-qr-card__frame">
        {qrSrc && !error ? (
          <img
            src={qrSrc}
            alt={`Scan to register for ${eventName}`}
            className="event-qr-card__img"
            width={size}
            height={size}
          />
        ) : (
          <div className="event-qr-card__loading">
            {error ? 'QR unavailable' : 'Generating QR code...'}
          </div>
        )}
      </div>

      <div className="event-qr-card__caption">
        <span className="event-qr-card__label">SCAN TO REGISTER</span>
        <span className="event-qr-card__sub">{eventName}</span>
      </div>
    </div>
  );
}
