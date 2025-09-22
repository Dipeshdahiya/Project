// frontend/src/components/SummaryList.jsx
import React from 'react';

export default function SummaryList({ summaries = [] }) {
  if (!summaries.length) return <div>No summaries yet</div>;
  return (
    <div>
      {summaries.map(s => (
        <div key={s._id} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 10 }}>
          <h4>{s.title} — {new Date(s.createdAt).toLocaleString()}</h4>
          <div><strong>Products:</strong> {s.products.map(p => p.name).join(', ')}</div>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{s.summaryText}</pre>
        </div>
      ))}
    </div>
  );
}
