import { dayData } from './classes';

async function fetchData(place) {
  const weatherData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=AG6NRQ6DEMRT8VKZBVAG3Q6FB`);
  return weatherData.json();
}



function processData(jsonFile) {
  const currentConditions = new dayData(jsonFile.currentConditions);
  const upcomingDays = [];
  for (let i = 0; i < 7; i++) {
    upcomingDays.push(new dayData(jsonFile.days[i]));
  }

  return {
    currentConditions, 
    upcomingDays
  };
}

export {
  fetchData,
  processData
};