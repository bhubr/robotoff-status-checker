const timedFetchQuestions = require('./api');
const {
  intervalSec,
} = require('./config');
const insertRequest = require('./insert-request');

const insightTypes = ['brand', 'label', 'category', 'product_weight'];

const start = () => {
  let i = 0;
  setInterval(async () => {
    const type = insightTypes[i];
    i += 1;
    if (i === insightTypes.length) i = 0;
    const result = await timedFetchQuestions(type);
    const { data, ...rest } = result;
    await insertRequest(rest);
  }, intervalSec * 1000);
};

// (async function() {
//   await fetchQuestions('label')
//     .then(() => process.exit())
//     .catch((err) => console.error(err) || process.exit(1));
// })()

start();
