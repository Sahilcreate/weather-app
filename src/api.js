//fetch the data asynchronously
async function fetchData(placeName) {
  try {
    const metricUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${placeName}?unitGroup=metric&key=AG6NRQ6DEMRT8VKZBVAG3Q6FB`;
    const usUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${placeName}?unitGroup=us&key=AG6NRQ6DEMRT8VKZBVAG3Q6FB`;

    const metricResponse = await fetch(metricUrl, {mode: 'cors'});
    const usResponse = await fetch(usUrl, {mode: "cors"});

    if(!metricResponse.ok || !usResponse.ok) {
      throw new Error(`Failed to fetch weather data: ${metricResponse.status}(metricData), ${usResponse}(usData)`);
    }

    const metricWeatherData = await metricResponse.json();
    const usWeatherData = await usResponse.json()
    
    return { metricWeatherData, usWeatherData };
  } catch (error) {
    console.error('Error: ', error);
    throw error;
  }
}

export {
  fetchData
};