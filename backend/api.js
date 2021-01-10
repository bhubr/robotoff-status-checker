const fetch = require('node-fetch');
const { robotoff: { baseUrl } } = require('./config');

const insightTypes = ['brand', 'label',  'category', 'product_weight'];

const fetchQuestions = async (type) => {
  const ts1 = Date.now();
  return fetch(`${baseUrl}/api/v1/questions/random?count=2&lang=en&insight_types=${type}`)
  .then(async res => {
    const { status, ok } = res;
    console.error('OK', 200);
    let responseData;
    try {
      responseData = await res.json();
    } catch (err) {
      responseData = await res.text();
    }
    console.log(responseData);
    return {
      outcome: ok ? 'success' : 'warning',
      status,
      error: null,
      data: responseData,
    };
  })
  .catch(err => {
    console.error('ERR', err);
    return {
      outcome: 'error',
      error: err.message,
    };
  })
  .finally(data => {
    const ts2 = Date.now();
    console.log(data, ts2 - ts1);
  });
};

(async function() {
  await fetchQuestions('label')
    .then(() => process.exit())
    .catch((err) => console.error(err) || process.exit(1));
})()
