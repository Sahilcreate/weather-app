import { fetchData, processData } from './api';

fetchData('delhi').then(
  function(response) {
    console.log(response);
    const processedData = processData(response);
    console.log(processedData);
  }
);

