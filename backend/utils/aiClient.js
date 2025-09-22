// backend/utils/aiClient.js
const axios = require('axios');

async function summarizeProducts(products, criteria = {}) {
  const prompt = `Summarize and compare these products. Products: ${JSON.stringify(products)}. Criteria: ${JSON.stringify(criteria)}.
Output: bullet summary for each product, pros/cons, and recommendation based on criteria.`;

  if (!process.env.OPENAI_API_KEY) {
    // Mock summarizer
    return `MOCK SUMMARY: Found ${products.length} product(s). Names: ${products.map(p=>p.name).join(', ')}. (Set OPENAI_API_KEY to get real summaries.)`;
  }

  // Real OpenAI call (example uses chat completions)
  const resp = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful product summarizer.' },
      { role: 'user', content: prompt }
    ],
    max_tokens: 600
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  return resp.data.choices[0].message.content;
}

module.exports = { summarizeProducts };
