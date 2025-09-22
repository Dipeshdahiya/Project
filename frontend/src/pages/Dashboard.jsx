// frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import SummaryForm from '../components/SummaryForm';
import SummaryList from '../components/SummaryList';

export default function Dashboard() {
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/api/summaries');
        setSummaries(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  function addSummary(summary) {
    setSummaries(prev => [summary, ...prev]);
  }

  return (
    <div>
      <SummaryForm onNewSummary={addSummary} />
      <hr />
      <SummaryList summaries={summaries} />
    </div>
  );
}
