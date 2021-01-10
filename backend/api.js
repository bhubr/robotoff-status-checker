const fetch = require('node-fetch');
const { robotoff: { baseUrl }, intervalSec } = require('./config');

const insightTypes = ['brand', 'label',  'category', 'product_weight'];

/**
 * Return response data (parsed JSON or raw text)
 * @param {object} res
 */
const extractResponseData = async (res) => {
  let responseData;
  try {
    responseData = await res.json();
  } catch (err) {
    responseData = await res.text();
  }
  return responseData;
}

/**
 * Format success response
 * @param {boolean} ok
 * @param {number} status
 * @param {string|object} responseData
 */
const makeSuccessResponse = (ok, status, responseData) => ({
  outcome: ok ? 'success' : 'warning',
  status,
  error: null,
  data: responseData,
});

/**
 * Format failure response
 * @param {object} err
 */
const makeFailureResponse = (err) => ({
  outcome: 'error',
  status: null,
  error: err.message,
  data: null,
});

const fetchQuestions = async (type) => fetch(`${baseUrl}/api/v1/questions/random?count=2&lang=en&insight_types=${type}`)
  .then(async res => {
    const { status, ok } = res;
    const responseData = await extractResponseData(res);
    return makeSuccessResponse(ok, status, responseData);
  })
  .catch(makeFailureResponse);

const timedFetchQuestions = async (type) => {
  const ts1 = Date.now();
  return fetchQuestions(type)
  .then(data => {
    const ts2 = Date.now();
    const time = ts2 - ts1;
    return { type, ...data, time };
  });
};

const start = () => {
  let i = 0;
  setInterval(async () => {
    const type = insightTypes[i];
    i += 1;
    const result = await timedFetchQuestions(type);
    const { data, ...rest } = result;
    console.log(rest);
  }, intervalSec * 1000);
}

// (async function() {
//   await fetchQuestions('label')
//     .then(() => process.exit())
//     .catch((err) => console.error(err) || process.exit(1));
// })()

start();