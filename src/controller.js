import { ConditionData, ForecastData,AddressData } from './classes';
import { fetchData } from './api';
import { renderData, showLoadingScreen, hideLoadingScreen } from './domManipulator';

let processedMetricData;
let processedUsData;

function processData(jsonFile) {
  const locationData = new AddressData(jsonFile);
  const currentConditions = new ConditionData(jsonFile.currentConditions);
  const upcomingDays = [];
  for (let i = 0; i < 7; i++) {
    upcomingDays.push(new ForecastData(jsonFile.days[i]));
  }
    
  return {
    locationData,
    currentConditions, 
    upcomingDays
  };
}

async function searchPlace(location) {
  try {
    showLoadingScreen();
    const response = await fetchData(location);
    processedMetricData = processData(response.metricWeatherData);
    processedUsData = processData(response.usWeatherData);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    hideLoadingScreen();
    const metricUsed = document.querySelector('.unit-switch-checkbox');
    if(metricUsed.checked) {
      renderData(processedUsData);
    } else {
      renderData(processedMetricData);
    }
  }
}

export { searchPlace, 
  processedMetricData, 
  processedUsData };
