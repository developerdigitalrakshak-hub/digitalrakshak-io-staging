'use client';

import { useState } from 'react';
import styles from '../styles/demoApi.module.scss';

export default function SandboxModal({ data, isOpen, onClose }) {
  const [apiKey, setApiKey] = useState(
    data.headerParameters.find((p) => p.name === 'apikey')?.sample || ''
  );
  const [authHeader, setAuthHeader] = useState(
    data.headerParameters.find((p) => p.name === 'Authorization')?.sample || ''
  );
  const [requestBody, setRequestBody] = useState(
    JSON.stringify(
      {
        task: 'geoFencing',
        essentials: {
          ip: '14.141.22.10',
          country: 'IN',
          state: 'MH',
        },
      },
      null,
      2
    )
  );

  const [isLoading, setIsLoading] = useState(false);
  const [responseResult, setResponseResult] = useState(null);
  const [executionTime, setExecutionTime] = useState(null);

  if (!isOpen) return null;

  const handleExecute = () => {
    setIsLoading(true);
    setResponseResult(null);

    const startTime = performance.now();

    setTimeout(() => {
      let parsedBody;
      try {
        parsedBody = JSON.parse(requestBody);
      } catch (err) {
        parsedBody = null;
      }

      const endTime = performance.now();
      setExecutionTime(Math.round(endTime - startTime + Math.random() * 120 + 80));

      if (!apiKey || apiKey.trim() === '') {
        setResponseResult({
          status: 401,
          statusText: 'Unauthorized',
          data: {
            statusCode: 401,
            error: 'Unauthorized',
            message: 'Invalid or missing API key',
          },
        });
      } else if (!parsedBody || !parsedBody.essentials) {
        setResponseResult({
          status: 400,
          statusText: 'Bad Request',
          data: {
            statusCode: 400,
            error: 'Bad Request',
            message: "Missing required parameter 'essentials'",
          },
        });
      } else {
        setResponseResult({
          status: 200,
          statusText: 'OK',
          data: {
            task: parsedBody.task || 'geoFencing',
            essentials: parsedBody.essentials,
            id: 'req_' + Math.random().toString(36).substring(2, 10),
            patronId: 'patron_' + Math.floor(10000 + Math.random() * 90000),
            result: {
              country: 'INDIA',
              countryCode: parsedBody.essentials.country || 'IN',
              state: 'MAHARASHTRA',
              stateCode: parsedBody.essentials.state || 'MH',
              city: 'PANVEL',
              zipCode: '410206',
              timezone: 'IST, Asia/Kolkata',
              latitude: 18.9894,
              longitude: 73.1175,
              asn: '4755',
              riskip: false,
              validUser: true,
            },
          },
        });
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleGroup}>
            <span className={styles.sandboxDotActive}></span>
            <h3>API Interactive Sandbox</h3>
          </div>
          <button className={styles.closeModalBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          {/* Endpoint Bar */}
          <div className={styles.sandboxEndpointBar}>
            <span className={styles.postBadge}>{data.endpoint.method}</span>
            <span className={styles.sandboxUrlText}>{data.endpoint.url}</span>
          </div>

          {/* Input Headers */}
          <div className={styles.inputSection}>
            <h4 className={styles.inputLabel}>Headers</h4>
            <div className={styles.inputGroup}>
              <label>apikey</label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter API Key"
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Authorization</label>
              <input
                type="text"
                value={authHeader}
                onChange={(e) => setAuthHeader(e.target.value)}
                placeholder="Bearer Token"
              />
            </div>
          </div>

          {/* Request Body */}
          <div className={styles.inputSection}>
            <h4 className={styles.inputLabel}>Request Payload (JSON)</h4>
            <textarea
              className={styles.jsonTextarea}
              rows={7}
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
            />
          </div>

          {/* Submit Action */}
          <button
            className={styles.executeButton}
            onClick={handleExecute}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.spinnerWrapper}>
                <span className={styles.spinner}></span> Executing...
              </span>
            ) : (
              '▶ Send Request'
            )}
          </button>

          {/* Output Results */}
          {responseResult && (
            <div className={styles.sandboxResultBox}>
              <div className={styles.resultHeader}>
                <span
                  className={styles.statusBadge}
                  style={{
                    backgroundColor: responseResult.status === 200 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    color: responseResult.status === 200 ? '#22c55e' : '#ef4444',
                    border: responseResult.status === 200 ? '1px solid #15803d' : '1px solid #b91c1c',
                  }}
                >
                  {responseResult.status} {responseResult.statusText}
                </span>
                <span className={styles.latencyText}>{executionTime} ms</span>
              </div>
              <pre className={styles.resultPre}>
                {JSON.stringify(responseResult.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
