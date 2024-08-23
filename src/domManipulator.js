import { parse, format } from "date-fns";

function renderData (data) {
  const cachedElements = cacheElements();

  clearElements(cachedElements);

  /*
   *  Create Location Description Dynamically
   */
  const locationAddress = document.createElement('div');
  locationAddress.className = 'location-summary-address';
  locationAddress.textContent = data.locationData.address;
  cachedElements.locationSummary.appendChild(locationAddress);

  const locationDateTime = document.createElement('div');
  locationDateTime.className = 'location-summary-datetime';
  locationDateTime.textContent =`${formatDataDate(data.currentConditions.date)} | ${formatDataTime(data.currentConditions.time)}`; 
  cachedElements.locationSummary.appendChild(locationDateTime);

  const locationLat = document.createElement('div');
  locationLat.className = 'location-desc-lat location-desc-text';
  locationLat.textContent = `Lat: ${data.locationData.latitude}`;
  cachedElements.locationDesc.appendChild(locationLat);

  const locationLon = document.createElement('div');
  locationLon.className = 'location-desc-lon location-desc-text';
  locationLon.textContent = `Lon: ${data.locationData.longitude}`;
  cachedElements.locationDesc.appendChild(locationLon);

  const locationZone = document.createElement('div');
  locationZone.className = 'location-desc-timezone location-desc-text';
  locationZone.textContent = `TimeZone: ${data.locationData.timezone}`;
  cachedElements.locationDesc.appendChild(locationZone);

  /*
   *  Create Current Conditons dynamically
   */
  cachedElements.conditionIcon.innerHTML = selectIcon(data.currentConditions.icon);

  const conditionDescText = document.createElement('div');
  conditionDescText.className = 'condition-summary-desc-text condition-summary-desc-heading';
  conditionDescText.textContent = `${data.currentConditions.conditions}`;
  cachedElements.conditionDesc.appendChild(conditionDescText);

  const conditionDescTemp = document.createElement('div');
  conditionDescTemp.className = 'condition-summary-desc-text condition-summary-desc-temp';
  const tempUnit = checkTempUnit();
  conditionDescTemp.textContent = `Temperature: ${data.currentConditions.temp}${tempUnit}`;
  cachedElements.conditionDesc.appendChild(conditionDescTemp);

  const conditionDescFeelsLike = document.createElement('div');
  conditionDescFeelsLike.className = 'condition-summary-desc-text condition-summary-desc-feelslike';
  conditionDescFeelsLike.textContent = `Feels Like: ${data.currentConditions.feelslike}${tempUnit}`;
  cachedElements.conditionDesc.appendChild(conditionDescFeelsLike);

  /* Current conditions cards */

  /* Wind Card */
  const windCard = document.createElement('div');
  windCard.className = 'condition-card wind-card';

  const windHeading = document.createElement('div');
  windHeading.className = 'wind-heading card-heading';
  windHeading.textContent = 'Wind';
  windCard.appendChild(windHeading);

  const windCardTextWrapper = document.createElement('div');
  windCardTextWrapper.className = 'wind-text-wrapper';


  const windSvg = document.createElement('div');
  windSvg.className = 'wind-svg card-text';
  windSvg.innerHTML = showWindDirection(data.currentConditions.winddir);
  windCardTextWrapper.appendChild(windSvg);

  const windValue = document.createElement('div');
  windValue.className = 'wind-value card-text';
  const speedUnit = checkSpeedUnit();
  windValue.textContent = `${data.currentConditions.windspeed} ${speedUnit}`;
  windCardTextWrapper.appendChild(windValue);
  windCard.appendChild(windCardTextWrapper);

  cachedElements.conditionCards.appendChild(windCard);

  /* Humidity Card */
  const humidityCard = document.createElement('div');
  humidityCard.className = 'condition-card humidity-card';

  const humidityHeading = document.createElement('div');
  humidityHeading.className = 'humidity-heading card-heading';
  humidityHeading.textContent = 'Humidity';
  humidityCard.appendChild(humidityHeading);

  const humidityValue = document.createElement('div');
  humidityValue.className = 'card-text humidity-value';
  humidityValue.textContent = `${data.currentConditions.humidity}%`;

  humidityCard.appendChild(humidityValue);
  cachedElements.conditionCards.appendChild(humidityCard);

  /* CloudCover Card */
  const cloudCard = document.createElement('div');
  cloudCard.className = 'condition-card cloud-card';

  const cloudHeading = document.createElement('div');
  cloudHeading.className = 'cloud-heading card-heading';
  cloudHeading.textContent = 'Cloud';
  cloudCard.appendChild(cloudHeading);

  const cloudValue = document.createElement('div');
  cloudValue.className = 'card-text cloud-value';
  cloudValue.textContent = `${data.currentConditions.cloudCover}%`;

  cloudCard.appendChild(cloudValue);
  cachedElements.conditionCards.appendChild(cloudCard);

  /*  Visibility Card */
  const visibilityCard = document.createElement('div');
  visibilityCard.className = 'condition-card visibility-card';

  const visibilityHeading = document.createElement('div');
  visibilityHeading.className = 'visibility-heading card-heading';
  visibilityHeading.textContent = 'Visibility';
  visibilityCard.appendChild(visibilityHeading);

  const visibilityValue = document.createElement('div');
  visibilityValue.className = 'card-text visibility-value';
  const distanceUnit = checkDistUnit();
  visibilityValue.textContent = `${data.currentConditions.visibility} ${distanceUnit}`;

  visibilityCard.appendChild(visibilityValue);
  cachedElements.conditionCards.appendChild(visibilityCard);

  /* Rain Card */
  const rainCard = document.createElement('div');
  rainCard.className = 'condition-card rain-card';

  const rainHeading = document.createElement('div');
  rainHeading.className = 'rain-heading card-heading';
  rainHeading.textContent = 'Rain';
  rainCard.appendChild(rainHeading);

  const rainValue = document.createElement('div');
  rainValue.className = 'card-text rain-value';
  rainValue.textContent = `${data.currentConditions.precipprob}%`;

  rainCard.appendChild(rainValue);
  cachedElements.conditionCards.appendChild(rainCard);

  /* Sunrise Card */
  const sunriseCard = document.createElement('div');
  sunriseCard.className = 'condition-card sunrise-card';

  const sunriseHeading = document.createElement('div');
  sunriseHeading.className = 'sunrise-heading card-heading';
  sunriseHeading.textContent = 'Sunrise';
  sunriseCard.appendChild(sunriseHeading);

  const sunriseValue = document.createElement('div');
  sunriseValue.className = 'card-text sunrise-value';
  sunriseValue.textContent = `${formatDataTime(data.currentConditions.sunrise)}`;

  sunriseCard.appendChild(sunriseValue);
  cachedElements.conditionCards.appendChild(sunriseCard);

  /* Sunset Card */
  const sunsetCard = document.createElement('div');
  sunsetCard.className = 'condition-card sunset-card';

  const sunsetHeading = document.createElement('div');
  sunsetHeading.className = 'sunset-heading card-heading';
  sunsetHeading.textContent = 'Sunset';
  sunsetCard.appendChild(sunsetHeading);

  const sunsetValue = document.createElement('div');
  sunsetValue.className = 'card-text sunset-value';
  sunsetValue.textContent = `${formatDataTime(data.currentConditions.sunset)}`;

  sunsetCard.appendChild(sunsetValue);
  cachedElements.conditionCards.appendChild(sunsetCard);


  /*
   *  FORECAST SECTION
   */
  cachedElements.forecastDesc.textContent = `❛${data.locationData.description}❜`;

  const forecastDaysNum = 7;
  for (let i = 0; i < forecastDaysNum; i++) {
    const forecastCard = document.createElement('div');
    forecastCard.className = 'card forecast-card';

    const forecastCardHeading = document.createElement('div');
    forecastCardHeading.className = 'card-heading forecast-card-heading';
    forecastCardHeading.textContent = `${getDay(data.upcomingDays[i].date)}`;
    forecastCard.appendChild(forecastCardHeading);

    const forecastCardTextWrapper = document.createElement('div');
    forecastCardTextWrapper.className = 'forecast-card-text-wrapper';

    const forecastTemp = document.createElement('div');
    forecastTemp.className = 'card-text forecast-temp';
    forecastTemp.textContent = `${data.upcomingDays[i].temp}${checkTempUnit()}`;
    forecastCardTextWrapper.appendChild(forecastTemp);

    const forecastFeelslike = document.createElement('div');
    forecastFeelslike.className = 'card-text forecast-feelslike';
    forecastFeelslike.textContent = `${data.upcomingDays[i].feelslike}${checkTempUnit()}`;
    forecastCardTextWrapper.appendChild(forecastFeelslike);

    const forecastCardDesc = document.createElement('div');
    forecastCardDesc.className = 'card-text forecast-card-desc';
    forecastCardDesc.textContent = `${data.upcomingDays[i].conditions}`;
    forecastCardTextWrapper.appendChild(forecastCardDesc);

    forecastCard.appendChild(forecastCardTextWrapper);
    cachedElements.forecastCards.appendChild(forecastCard);
  }
}

function clearElements (elements) {
  elements.forecastDesc.textContent = "";

  //'elements' is an object of cached elements
  Object.values(elements).forEach((element) => {
    let lastChild = element.lastElementChild;
    while(lastChild) {
      element.removeChild(lastChild);
      lastChild = element.lastElementChild;
    }
  })
}

function cacheElements () {
  const conditionCards = document.querySelector('.current-condition-cards');
  const conditionDesc = document.querySelector('.condition-summary-desc');
  const conditionIcon = document.querySelector('.condition-summary-icon');
  const forecastCards = document.querySelector('.forecast-cards');
  const forecastDesc = document.querySelector('.forecast-desc');
  const locationDesc = document.querySelector('.location-desc');
  const locationSummary = document.querySelector('.location-summary');

  return { conditionCards,
    conditionDesc,
    conditionIcon,
    forecastCards,
    forecastDesc,
    locationDesc,
    locationSummary
  };
}

function getDay (dateString) {
 const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
 return format(parsedDate, 'EEEE');
}

function formatDataTime (timeString) {
  const parsedTime = parse(timeString, 'HH:mm:ss', new Date());
  return format(parsedTime, 'hh:mm a');
}

function formatDataDate (dateString) {
  const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
  return format(parsedDate, 'EEE, MMMM dd, yyyy');
}

function selectIcon (iconDesc) {
  let svgHtml;
  switch (iconDesc) {
    case 'clear-day':
      svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.87 48.87" width="100" height="100"><defs><style>.cls-1{fill:#f5b952;}.cls-2{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:4px;}</style></defs><title>clear-dayAsset 179colored</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M24.44,2A22.44,22.44,0,1,0,46.87,24.44,22.46,22.46,0,0,0,24.44,2Z"/><path class="cls-2" d="M24.44,2A22.44,22.44,0,1,0,46.87,24.44,22.46,22.46,0,0,0,24.44,2Z"/></g></g></svg>';
      return svgHtml;
      break;
    case 'clear-night':
      svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49.56 48.04" width="100" height="100"><defs><style>.cls-1{fill:#f5b952;}.cls-2{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:4px;}</style></defs><title>clear-nightAsset 180colored</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M43.71,11.48A23.07,23.07,0,1,0,12.9,44.67a42.24,42.24,0,0,1,1-5.54,28.07,28.07,0,0,1,9.16-15.21c5.71-4.73,12.76-6.4,18.05-6.93a42.29,42.29,0,0,1,5.5-.22A23,23,0,0,0,43.71,11.48Z"/><path class="cls-2" d="M43.71,11.48A23.07,23.07,0,1,0,12.9,44.67a42.24,42.24,0,0,1,1-5.54,28.07,28.07,0,0,1,9.16-15.21c5.71-4.73,12.76-6.4,18.05-6.93a42.29,42.29,0,0,1,5.5-.22A23,23,0,0,0,43.71,11.48Z"/></g></g></svg>';
      return svgHtml;
      break;
    case 'cloudy':
      svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.07 60.7" width="100" height="100"><defs><style>.cls-1{fill:#aac7d5;}.cls-2{fill:#cae3f6;}.cls-3{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:4px;}</style></defs><title>cloudyAsset 183colored</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M76.77,50.17a1.29,1.29,0,0,1,.77-.47,24.92,24.92,0,0,0,11.14-4.1c6.44,4.75,11.95,5.4,17.45,2.13,4.78-2.85,7.7-8.5,6.76-13.84-1.38-8-6.52-12-14.43-12.58C95.82,11.46,89.79,4.89,79.75,3.09,68,1,59.45,6.14,53.73,16.33"/><path class="cls-2" d="M63.32,30,63,30a24,24,0,0,0-47,.87q-.44,0-.87,0a14.06,14.06,0,0,0-5.53,1.6A14.44,14.44,0,0,0,7.2,34.07a14.06,14.06,0,0,0-1.17,1A10.11,10.11,0,0,0,4,37.61,13.24,13.24,0,0,0,2.84,40C.28,48,4,53.91,8.23,56.76s11.5,4,17.85-1.57a24,24,0,0,0,27,0A14.67,14.67,0,1,0,63.32,30Z"/><path class="cls-3" d="M76.77,49.53a1.32,1.32,0,0,1,.77-.46A24.92,24.92,0,0,0,88.68,45c6.44,4.75,11.95,5.4,17.45,2.13,4.78-2.85,7.7-8.5,6.76-13.85-1.38-8-6.52-12-14.43-12.57C95.82,10.83,89.79,4.26,79.75,2.46,68,.36,59.45,5.51,53.73,15.7"/><path class="cls-3" d="M63.32,29.35H63a24,24,0,0,0-47,.87l-.87,0a13.89,13.89,0,0,0-5.53,1.6A14.38,14.38,0,0,0,7.2,33.43c-.4.33-.79.67-1.17,1A10.11,10.11,0,0,0,4,37a13.24,13.24,0,0,0-1.13,2.39C.28,47.32,4,53.28,8.23,56.13s11.5,4,17.85-1.57a24,24,0,0,0,27,0A14.67,14.67,0,1,0,63.32,29.35Z"/></g></g></svg>';
      return svgHtml;
      break;
    case 'fog':
      svgHtml = '<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="29 0.6 121.6 63.4" width="100" height="100" style="enable-background:new 29 0.6 121.6 63.4;" xml:space="preserve"><style type="text/css"> .st0{fill:none;stroke:#221F1F;stroke-width:2.5;stroke-linecap:round;stroke-miterlimit:10;}</style><title>33Asset 228FOG</title><g id="XMLID_5_"><path id="XMLID_4_" class="st0" d="M34.3,23.9c0,0,25,13.7,55.7,1.7s50.3-0.4,54.6,2.1"/>	<path id="XMLID_3_" class="st0" d="M34.3,37.1c0,0,25,13.7,55.7,1.7s50.3-0.4,54.6,2.1"/>	<path id="XMLID_2_" class="st0" d="M33.3,50.3c0,0,25,13.7,55.7,1.7s50.3-0.4,54.6,2.1"/>	<path id="XMLID_1_" class="st0" d="M34.3,10.7c0,0,25,13.7,55.7,1.7s50.3-0.4,54.6,2.1"/></g></svg>';
      return svgHtml;
      break;
    case 'hail':
      svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.07 90.87" width="100" height="100"><defs><style>.cls-1{fill:#cae3f6;}.cls-2{fill:#aac7d5;}.cls-3,.cls-4{fill:none;stroke:#000;stroke-miterlimit:10;}.cls-3{stroke-width:4px;}.cls-4{stroke-width:3px;}</style></defs><title>hailAsset 197colored</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon class="cls-1" points="41.42 69.21 47.63 67.23 51.53 72.5 55.38 77.87 51.59 83.21 47.66 88.53 41.33 86.56 35.13 84.48 35.06 77.78 35.11 71.31 41.42 69.21"/><polygon class="cls-1" points="68.63 65.31 72.41 65.33 73.61 68.94 74.77 72.6 71.72 74.86 68.58 77.09 65.45 74.86 62.4 72.6 63.57 68.89 64.76 65.33 68.63 65.31"/><polygon class="cls-1" points="86.98 61.42 88.89 62.44 88.55 64.6 88.16 66.76 86.01 67.1 83.83 67.4 82.83 65.44 81.88 63.48 83.46 61.9 85.01 60.41 86.98 61.42"/><path class="cls-2" d="M76.34,50a1.25,1.25,0,0,1,.78-.46,25,25,0,0,0,11.13-4.11c6.44,4.75,12,5.41,17.45,2.13,4.78-2.85,7.71-8.49,6.77-13.84-1.39-8-6.53-12-14.43-12.58C95.4,11.28,89.36,4.7,79.32,2.91,67.58.81,59,6,53.31,16.14"/><path class="cls-1" d="M62.9,29.79l-.36,0a24,24,0,0,0-47,.87l-.87,0a14.27,14.27,0,0,0-5.53,1.6,14.8,14.8,0,0,0-2.35,1.57,14.06,14.06,0,0,0-1.17,1,9.85,9.85,0,0,0-2.06,2.5,13.13,13.13,0,0,0-1.13,2.4c-2.57,8,1.16,13.9,5.38,16.75,4.37,3,11.5,4,17.85-1.56a24,24,0,0,0,27,0A14.67,14.67,0,1,0,62.9,29.79Z"/><path class="cls-3" d="M76.77,49.53a1.32,1.32,0,0,1,.77-.46A24.92,24.92,0,0,0,88.68,45c6.44,4.75,11.95,5.4,17.45,2.13,4.78-2.85,7.7-8.5,6.76-13.85-1.38-8-6.52-12-14.43-12.57C95.82,10.83,89.79,4.26,79.75,2.46,68,.36,59.45,5.51,53.73,15.7"/><path class="cls-3" d="M63.32,29.35H63a24,24,0,0,0-47,.87l-.87,0a13.89,13.89,0,0,0-5.53,1.6A14.38,14.38,0,0,0,7.2,33.43c-.4.33-.79.67-1.17,1A10.11,10.11,0,0,0,4,37a13.24,13.24,0,0,0-1.13,2.39C.28,47.32,4,53.28,8.23,56.13s11.5,4,17.85-1.57a24,24,0,0,0,27,0A14.67,14.67,0,1,0,63.32,29.35Z"/><polygon class="cls-3" points="41.42 69.21 47.63 67.23 51.53 72.5 55.38 77.87 51.59 83.21 47.66 88.53 41.33 86.56 35.13 84.48 35.06 77.78 35.11 71.31 41.42 69.21"/><polygon class="cls-4" points="68.63 65.31 72.41 65.33 73.61 68.94 74.77 72.6 71.72 74.86 68.58 77.09 65.45 74.86 62.4 72.6 63.57 68.89 64.76 65.33 68.63 65.31"/><polygon class="cls-4" points="86.98 61.42 88.89 62.44 88.55 64.6 88.16 66.76 86.01 67.1 83.83 67.4 82.83 65.44 81.88 63.48 83.46 61.9 85.01 60.41 86.98 61.42"/></g></g></svg>';
      return svgHtml;
      break; 
    case 'partly-cloudy-day':
      svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121.88 62.82" width="100" height="100"><defs><style>.cls-1{fill:#f5b952;}.cls-2{fill:#aac7d5;}.cls-3{fill:#cae3f6;}.cls-4{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:4px;}</style></defs><title>partly-cloudy-dayAsset 181colored</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M22.18,2.35a20.1,20.1,0,1,0,20.1,20.1A20.13,20.13,0,0,0,22.18,2.35Z"/><path class="cls-2" d="M83.58,51.66a1.27,1.27,0,0,1,.78-.46,25,25,0,0,0,11.13-4.11c6.44,4.75,12,5.41,17.45,2.13,4.78-2.85,7.71-8.49,6.77-13.84-1.39-8-6.53-12-14.43-12.58C102.64,13,96.6,6.38,86.56,4.59c-11.74-2.1-20.29,3.05-26,13.23"/><path class="cls-3" d="M70.14,31.47l-.36,0a24,24,0,0,0-47,.87c-.29,0-.58,0-.87,0A14.27,14.27,0,0,0,16.37,34,14.8,14.8,0,0,0,14,35.56a14.06,14.06,0,0,0-1.17,1,10.07,10.07,0,0,0-2.06,2.5,13.13,13.13,0,0,0-1.13,2.4c-2.57,8,1.16,13.9,5.38,16.75,4.38,3,11.5,4,17.86-1.56a24,24,0,0,0,27,0A14.67,14.67,0,1,0,70.14,31.47Z"/><path class="cls-4" d="M39.79,13.71A19.75,19.75,0,1,0,11.21,38.44"/><path class="cls-4" d="M83.58,51.66a1.27,1.27,0,0,1,.78-.46,25,25,0,0,0,11.13-4.11c6.44,4.75,12,5.41,17.45,2.13,4.78-2.85,7.71-8.49,6.77-13.84-1.39-8-6.53-12-14.43-12.58C102.64,13,96.6,6.38,86.56,4.59c-11.74-2.1-20.29,3.05-26,13.23"/><path class="cls-4" d="M70.14,31.47l-.36,0a24,24,0,0,0-47,.87c-.29,0-.58,0-.87,0A14.27,14.27,0,0,0,16.37,34,14.8,14.8,0,0,0,14,35.56a14.06,14.06,0,0,0-1.17,1,10.07,10.07,0,0,0-2.06,2.5,13.13,13.13,0,0,0-1.13,2.4c-2.57,8,1.16,13.9,5.38,16.75,4.38,3,11.5,4,17.86-1.56a24,24,0,0,0,27,0A14.67,14.67,0,1,0,70.14,31.47Z"/></g></g></svg>';
      return svgHtml;
      break;
    case 'partly-cloudy-night':
      svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 117.22 62.47" width="100" height="100"><defs><style>.cls-1{fill:#f5b952;}.cls-2{fill:#aac7d5;}.cls-3{fill:#cae3f6;}.cls-4{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:4px;}</style></defs><title>partly-cloudy-night Asset 182colored</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M18.58,30a19.63,19.63,0,0,1-1.65-11.06A24.21,24.21,0,0,1,23.29,6.56a32.14,32.14,0,0,1,2.84-2.74,16.28,16.28,0,0,0-4.08-1.45A16.57,16.57,0,0,0,6.2,29.6a16.23,16.23,0,0,0,5.51,4"/><path class="cls-2" d="M78.93,51.52a1.23,1.23,0,0,1,.77-.46A25,25,0,0,0,90.83,47c6.44,4.75,12,5.41,17.45,2.13,4.78-2.85,7.71-8.49,6.77-13.84-1.39-8-6.53-12-14.43-12.58C98,12.82,91.94,6.24,81.9,4.45c-11.74-2.1-20.29,3.05-26,13.23"/><path class="cls-3" d="M65.48,31.33l-.36,0a24,24,0,0,0-47,.87c-.29,0-.58,0-.87,0a14,14,0,0,0-5.52,1.59,14.44,14.44,0,0,0-2.36,1.57,14.21,14.21,0,0,0-1.17,1A10,10,0,0,0,6.13,39,13.49,13.49,0,0,0,5,41.36c-2.57,8,1.16,13.91,5.38,16.76,4.38,3,11.5,4,17.86-1.57a24,24,0,0,0,27,0A14.67,14.67,0,1,0,65.48,31.33Z"/><path class="cls-4" d="M18.58,30a19.63,19.63,0,0,1-1.65-11.06A24.21,24.21,0,0,1,23.29,6.56a32.14,32.14,0,0,1,2.84-2.74,16.28,16.28,0,0,0-4.08-1.45A16.57,16.57,0,0,0,6.2,29.6a16.23,16.23,0,0,0,5.51,4"/><path class="cls-4" d="M78.93,51.31a1.29,1.29,0,0,1,.77-.47,24.84,24.84,0,0,0,11.13-4.1c6.44,4.75,12,5.41,17.45,2.13C113.06,46,116,40.38,115.05,35c-1.39-8-6.53-12-14.43-12.58C98,12.61,91.94,6,81.9,4.24c-11.74-2.1-20.29,3.05-26,13.23"/><path class="cls-4" d="M65.48,31.12l-.36,0a24,24,0,0,0-47,.87l-.87,0a14.06,14.06,0,0,0-5.52,1.6,14.44,14.44,0,0,0-2.36,1.57,14.06,14.06,0,0,0-1.17,1,9.89,9.89,0,0,0-2.06,2.5A13.24,13.24,0,0,0,5,41.14c-2.57,8,1.16,13.91,5.38,16.76,4.38,3,11.5,4,17.86-1.56a24,24,0,0,0,27-.05A14.67,14.67,0,1,0,65.48,31.12Z"/></g></g></svg>';
      return svgHtml;
      break;
    case 'rain-snow-showers-day':
      svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121.88 91.12" width="100" height="100"><defs><style>.cls-1{fill:#cae3f6;}.cls-2{fill:#f5b952;}.cls-3{fill:#aac7d5;}.cls-4,.cls-5,.cls-6,.cls-7,.cls-8{fill:none;stroke-miterlimit:10;}.cls-4,.cls-5,.cls-6{stroke:#000;}.cls-4,.cls-5{stroke-width:4px;}.cls-5,.cls-8{stroke-linecap:round;}.cls-6,.cls-7,.cls-8{stroke-width:2px;}.cls-7,.cls-8{stroke:#231f20;}</style></defs><title>rain-snow-showers-dayAsset 189colored</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M106.21,74.75c-.21-.51-.44-1-.68-1.54V71.6c.21-.49.41-1,.62-1.42a.82.82,0,0,0-.53-1.27l-1.45-.57-1.11-1.1c-.23-.56-.43-1.09-.64-1.61a.79.79,0,0,0-1.09-.44l-.83.37-.73.32H98.2c-.42-.18-.82-.33-1.2-.52-.87-.44-1.31-.23-1.6.65-.13.41-.3.8-.47,1.23l-1.12,1.12L92.27,69a.79.79,0,0,0-.48,1.13c.19.44.39.87.58,1.31a1.77,1.77,0,0,1,.08.22V73.2c-.23.54-.46,1-.67,1.57a.77.77,0,0,0,.45,1.08c.28.12.56.22.84.33l.79.31,1.06,1.08c.2.51.39,1,.58,1.45.26.67.64.82,1.3.53l1.41-.61h1.55l.81.35.74.31a.79.79,0,0,0,1.15-.48l.51-1.33.1-.22,1.09-1.09,1.3-.52.31-.12A.78.78,0,0,0,106.21,74.75Z"/><path class="cls-2" d="M22.48,2.35a20.1,20.1,0,1,0,20.1,20.1A20.13,20.13,0,0,0,22.48,2.35Z"/><path class="cls-3" d="M83.5,52.25a1.32,1.32,0,0,1,.77-.46,24.92,24.92,0,0,0,11.14-4.1c6.44,4.75,12,5.4,17.45,2.13,4.78-2.85,7.7-8.5,6.76-13.85-1.38-8-6.52-12-14.43-12.57C102.55,13.55,96.52,7,86.48,5.18c-11.75-2.1-20.3,3.05-26,13.24"/><path class="cls-1" d="M70.05,32.07H69.7a24,24,0,0,0-47,.87l-.87,0a13.89,13.89,0,0,0-5.53,1.6,14.38,14.38,0,0,0-2.36,1.56c-.4.33-.79.67-1.17,1.05a10.11,10.11,0,0,0-2.06,2.5,13.24,13.24,0,0,0-1.13,2.39C7,50,10.73,56,15,58.85s11.5,4,17.85-1.57a24,24,0,0,0,27,0A14.67,14.67,0,1,0,70.05,32.07Z"/><path class="cls-4" d="M39.79,13.71A19.75,19.75,0,1,0,11.21,38.44"/><path class="cls-4" d="M83.58,51.66a1.27,1.27,0,0,1,.78-.46,25,25,0,0,0,11.13-4.11c6.44,4.75,12,5.41,17.45,2.13,4.78-2.85,7.71-8.49,6.77-13.84-1.39-8-6.53-12-14.43-12.58C102.64,13,96.6,6.38,86.56,4.59c-11.74-2.1-20.29,3.05-26,13.23"/><path class="cls-4" d="M70.14,31.47l-.36,0a24,24,0,0,0-47,.87c-.29,0-.58,0-.87,0A14.27,14.27,0,0,0,16.37,34,14.8,14.8,0,0,0,14,35.56a14.06,14.06,0,0,0-1.17,1,10.07,10.07,0,0,0-2.06,2.5,13.13,13.13,0,0,0-1.13,2.4c-2.57,8,1.16,13.9,5.38,16.75,4.38,3,11.5,4,17.86-1.56a24,24,0,0,0,27,0A14.67,14.67,0,1,0,70.14,31.47Z"/><line class="cls-5" x1="72.38" y1="68.44" x2="72.38" y2="74.71"/><line class="cls-5" x1="46.55" y1="68.44" x2="46.55" y2="74.71"/><line class="cls-5" x1="20.72" y1="68.44" x2="20.72" y2="74.71"/><line class="cls-5" x1="58.43" y1="80.31" x2="58.43" y2="86.58"/><line class="cls-5" x1="32.6" y1="80.31" x2="32.6" y2="86.58"/><path class="cls-6" d="M106.21,74.7c-.21-.5-.44-1-.68-1.54v-1.6c.21-.5.41-1,.62-1.43a.82.82,0,0,0-.53-1.27l-1.45-.57-1.11-1.09-.64-1.61a.79.79,0,0,0-1.09-.45l-.83.37-.73.32H98.2c-.42-.18-.82-.34-1.2-.53-.87-.44-1.31-.23-1.6.66-.13.4-.3.8-.47,1.23l-1.12,1.12-1.54.61a.79.79,0,0,0-.48,1.13c.19.44.39.87.58,1.31a1.77,1.77,0,0,1,.08.22v1.57c-.23.55-.46,1.06-.67,1.57a.77.77,0,0,0,.45,1.08l.84.34.79.3,1.06,1.09L95.51,79c.26.67.64.82,1.3.53l1.41-.61h1.55l.81.34.74.32a.8.8,0,0,0,1.15-.49l.51-1.33.1-.22,1.09-1.09,1.3-.52c.1,0,.21-.07.31-.12A.78.78,0,0,0,106.21,74.7Z"/><line class="cls-7" x1="98.96" y1="55.12" x2="98.96" y2="90.12"/><line class="cls-8" x1="98.96" y1="54.46" x2="98.96" y2="90.12"/><polyline class="cls-8" points="95.63 56.39 98.93 58.31 102.31 56.23"/><polyline class="cls-8" points="102.31 88.45 99.01 86.53 95.63 88.61"/><line class="cls-8" x1="86.35" y1="59.69" x2="111.57" y2="84.91"/><polyline class="cls-8" points="85.36 63.41 89.06 62.44 89.97 58.58"/><polyline class="cls-8" points="112.75 81.36 109.06 82.33 108.15 86.19"/><line class="cls-8" x1="111.75" y1="59.68" x2="86.53" y2="84.89"/><polyline class="cls-8" points="108.04 58.69 109.01 62.38 112.87 63.29"/><polyline class="cls-8" points="90.08 86.08 89.11 82.39 85.25 81.47"/><line class="cls-8" x1="117.02" y1="72.37" x2="81.36" y2="72.37"/><polyline class="cls-8" points="115.09 69.05 113.17 72.34 115.25 75.72"/><polyline class="cls-8" points="83.03 75.72 84.95 72.42 82.87 69.05"/></g></g></svg>';
      return svgHtml;
      break;
    case 'rain-snow-showers-night':
      svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 117.22 91.65" width="100" height="100"><defs><style>.cls-1{fill:#cae3f6;}.cls-2{fill:#f5b952;}.cls-3{fill:#aac7d5;}.cls-4,.cls-5,.cls-6,.cls-7,.cls-8{fill:none;stroke-miterlimit:10;}.cls-4,.cls-5,.cls-6{stroke:#000;}.cls-4,.cls-5{stroke-width:4px;}.cls-5,.cls-8{stroke-linecap:round;}.cls-6,.cls-7,.cls-8{stroke-width:2px;}.cls-7,.cls-8{stroke:#231f20;}</style></defs><title>rain-snow-showers-nightAsset 190colored</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M101.55,75.11c-.21-.51-.44-1-.67-1.55V72l.62-1.43a.81.81,0,0,0-.53-1.26c-.47-.19-.94-.38-1.45-.57L98.4,67.6,97.76,66a.79.79,0,0,0-1.09-.44c-.28.11-.55.24-.83.36l-.72.32H93.54c-.42-.18-.82-.33-1.2-.52-.87-.44-1.31-.23-1.6.65-.13.41-.3.8-.47,1.23l-1.12,1.12-1.54.61a.79.79,0,0,0-.47,1.14c.18.43.38.87.57,1.3,0,.07.05.14.08.22l0,1.58c-.24.54-.47,1-.68,1.57a.77.77,0,0,0,.45,1.08l.85.33.78.31,1.06,1.08.58,1.45c.26.66.64.82,1.31.53l1.4-.61h1.56l.8.34.74.32a.79.79,0,0,0,1.15-.48l.51-1.33.1-.23,1.09-1.09,1.3-.51.31-.13A.77.77,0,0,0,101.55,75.11Z"/><path class="cls-2" d="M18.58,30.42a19.63,19.63,0,0,1-1.65-11.06A24.25,24.25,0,0,1,23.29,7a33.66,33.66,0,0,1,2.84-2.74,16.28,16.28,0,0,0-4.08-1.45A16.57,16.57,0,0,0,6.2,30.05a16.23,16.23,0,0,0,5.51,4.05"/><path class="cls-3" d="M78.5,51.76a1.23,1.23,0,0,1,.77-.46,25.05,25.05,0,0,0,11.14-4.11c6.44,4.75,12,5.41,17.45,2.13,4.78-2.85,7.7-8.49,6.76-13.84-1.38-8-6.52-12-14.43-12.58C97.55,13.06,91.52,6.48,81.48,4.69c-11.75-2.1-20.3,3.05-26,13.23"/><path class="cls-1" d="M65.05,31.57l-.35,0a24,24,0,0,0-47,.87c-.29,0-.58,0-.87,0a14,14,0,0,0-5.53,1.59,14.44,14.44,0,0,0-2.36,1.57,14.21,14.21,0,0,0-1.17,1.05A10.26,10.26,0,0,0,5.7,39.2a13.49,13.49,0,0,0-1.13,2.4C2,49.55,5.73,55.51,10,58.36s11.5,4,17.85-1.57a24,24,0,0,0,27,0A14.67,14.67,0,1,0,65.05,31.57Z"/><path class="cls-4" d="M18.58,30a19.63,19.63,0,0,1-1.65-11.06A24.21,24.21,0,0,1,23.29,6.56a32.14,32.14,0,0,1,2.84-2.74,16.28,16.28,0,0,0-4.08-1.45A16.57,16.57,0,0,0,6.2,29.6a16.23,16.23,0,0,0,5.51,4"/><path class="cls-4" d="M78.93,51.31a1.29,1.29,0,0,1,.77-.47,24.84,24.84,0,0,0,11.13-4.1c6.44,4.75,12,5.41,17.45,2.13C113.06,46,116,40.38,115.05,35c-1.39-8-6.53-12-14.43-12.58C98,12.61,91.94,6,81.9,4.24c-11.74-2.1-20.29,3.05-26,13.23"/><path class="cls-4" d="M65.48,31.12l-.36,0a24,24,0,0,0-47,.87l-.87,0a14.06,14.06,0,0,0-5.52,1.6,14.44,14.44,0,0,0-2.36,1.57,14.06,14.06,0,0,0-1.17,1,9.89,9.89,0,0,0-2.06,2.5A13.24,13.24,0,0,0,5,41.14c-2.57,8,1.16,13.91,5.38,16.76,4.38,3,11.5,4,17.86-1.56a24,24,0,0,0,27-.05A14.67,14.67,0,1,0,65.48,31.12Z"/><line class="cls-5" x1="67.72" y1="68.96" x2="67.72" y2="75.23"/><line class="cls-5" x1="41.89" y1="68.96" x2="41.89" y2="75.23"/><line class="cls-5" x1="16.07" y1="68.96" x2="16.07" y2="75.23"/><line class="cls-5" x1="53.77" y1="80.84" x2="53.77" y2="87.11"/><line class="cls-5" x1="27.94" y1="80.84" x2="27.94" y2="87.11"/><path class="cls-6" d="M101.55,75.23c-.21-.51-.44-1-.67-1.54V72.08l.62-1.42a.82.82,0,0,0-.53-1.27l-1.45-.57-1.11-1.1c-.23-.56-.43-1.09-.64-1.6a.79.79,0,0,0-1.09-.45l-.83.37-.72.32H93.54c-.42-.19-.82-.34-1.2-.53-.87-.44-1.31-.23-1.6.66-.13.4-.3.79-.47,1.22l-1.12,1.12-1.54.62a.78.78,0,0,0-.47,1.13c.18.44.38.87.57,1.31a1.77,1.77,0,0,1,.08.22l0,1.57c-.24.54-.47,1-.68,1.57a.77.77,0,0,0,.45,1.08c.28.12.56.22.85.33l.78.31,1.06,1.09.58,1.44c.26.67.64.82,1.31.53l1.4-.61h1.56l.8.35.74.31a.78.78,0,0,0,1.15-.48l.51-1.33c0-.05.05-.11.1-.22L99.51,77l1.3-.52.31-.12A.78.78,0,0,0,101.55,75.23Z"/><line class="cls-7" x1="94.3" y1="55.65" x2="94.3" y2="90.65"/><line class="cls-8" x1="94.3" y1="54.99" x2="94.3" y2="90.65"/><polyline class="cls-8" points="90.97 56.92 94.27 58.84 97.65 56.76"/><polyline class="cls-8" points="97.65 88.98 94.35 87.06 90.97 89.14"/><line class="cls-8" x1="81.69" y1="60.22" x2="106.91" y2="85.44"/><polyline class="cls-8" points="80.7 63.93 84.4 62.96 85.31 59.1"/><polyline class="cls-8" points="108.1 81.89 104.4 82.86 103.49 86.72"/><line class="cls-8" x1="107.09" y1="60.2" x2="81.87" y2="85.42"/><polyline class="cls-8" points="103.38 59.22 104.35 62.91 108.21 63.82"/><polyline class="cls-8" points="85.42 86.61 84.45 82.91 80.59 82"/><line class="cls-8" x1="112.36" y1="72.9" x2="76.7" y2="72.9"/><polyline class="cls-8" points="110.43 69.57 108.51 72.87 110.59 76.25"/><polyline class="cls-8" points="78.37 76.25 80.29 72.95 78.21 69.57"/></g></g></svg>';
      return svgHtml;
      break;
    case 'rain-snow':
      svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.07 89.43" width="100" height="100"><defs><style>.cls-1{fill:#cae3f6;}.cls-2{fill:#aac7d5;}.cls-3,.cls-4,.cls-5,.cls-6,.cls-7{fill:none;stroke-miterlimit:10;}.cls-3,.cls-4,.cls-5{stroke:#000;}.cls-3,.cls-4{stroke-width:4px;}.cls-4,.cls-7{stroke-linecap:round;}.cls-5,.cls-6,.cls-7{stroke-width:2px;}.cls-6,.cls-7{stroke:#231f20;}</style></defs><title>rain-snowAsset 188colored</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M99.4,73c-.22-.51-.45-1-.68-1.55v-1.6c.22-.49.42-1,.62-1.43a.82.82,0,0,0-.52-1.27l-1.45-.57L96.24,65.5c-.22-.57-.42-1.09-.63-1.61a.78.78,0,0,0-1.09-.44c-.28.11-.56.24-.84.36l-.72.32H91.39c-.42-.18-.83-.33-1.21-.53-.87-.43-1.31-.22-1.59.66-.13.41-.31.8-.48,1.23L87,66.61l-1.54.61A.79.79,0,0,0,85,68.36l.57,1.3c0,.07,0,.14.08.22l0,1.58c-.24.54-.46,1.05-.68,1.57a.78.78,0,0,0,.46,1.08l.84.33.78.31,1.07,1.08c.2.51.39,1,.57,1.45a.84.84,0,0,0,1.31.53l1.4-.61H93l.8.34.74.32a.79.79,0,0,0,1.15-.48c.18-.45.35-.89.52-1.33,0-.06,0-.11.1-.23l1.08-1.09,1.3-.51.32-.13A.78.78,0,0,0,99.4,73Z"/><path class="cls-2" d="M76.68,50a1.27,1.27,0,0,1,.78-.46,25,25,0,0,0,11.13-4.11c6.44,4.75,12,5.41,17.45,2.13,4.78-2.85,7.71-8.49,6.77-13.84-1.39-8-6.53-12-14.43-12.58C95.74,11.3,89.7,4.72,79.66,2.93,67.92.83,59.37,6,53.65,16.16"/><path class="cls-1" d="M63.24,29.81l-.36,0a24,24,0,0,0-47,.87c-.29,0-.58,0-.87,0a14.09,14.09,0,0,0-5.53,1.59A14.8,14.8,0,0,0,7.12,33.9,14.21,14.21,0,0,0,6,35a10,10,0,0,0-2.06,2.49,13.49,13.49,0,0,0-1.13,2.4C.19,47.79,3.92,53.75,8.14,56.6c4.38,2.95,11.5,4,17.86-1.57a24,24,0,0,0,27,0A14.67,14.67,0,1,0,63.24,29.81Z"/><path class="cls-3" d="M76.77,49.53a1.32,1.32,0,0,1,.77-.46A24.92,24.92,0,0,0,88.68,45c6.44,4.75,11.95,5.4,17.45,2.13,4.78-2.85,7.7-8.5,6.76-13.85-1.38-8-6.52-12-14.43-12.57C95.82,10.83,89.79,4.26,79.75,2.46,68,.36,59.45,5.51,53.73,15.7"/><path class="cls-3" d="M63.32,29.35H63a24,24,0,0,0-47,.87l-.87,0a13.89,13.89,0,0,0-5.53,1.6A14.38,14.38,0,0,0,7.2,33.43c-.4.33-.79.67-1.17,1A10.11,10.11,0,0,0,4,37a13.24,13.24,0,0,0-1.13,2.39C.28,47.32,4,53.28,8.23,56.13s11.5,4,17.85-1.57a24,24,0,0,0,27,0A14.67,14.67,0,1,0,63.32,29.35Z"/><line class="cls-4" x1="65.57" y1="66.74" x2="65.57" y2="73.01"/><line class="cls-4" x1="39.74" y1="66.74" x2="39.74" y2="73.01"/><line class="cls-4" x1="13.91" y1="66.74" x2="13.91" y2="73.01"/><line class="cls-4" x1="51.61" y1="78.62" x2="51.61" y2="84.88"/><line class="cls-4" x1="25.78" y1="78.62" x2="25.78" y2="84.88"/><path class="cls-5" d="M99.4,73c-.22-.51-.45-1-.68-1.55v-1.6c.22-.49.42-1,.62-1.43a.82.82,0,0,0-.52-1.27l-1.45-.57L96.24,65.5c-.22-.57-.42-1.09-.63-1.61a.78.78,0,0,0-1.09-.44c-.28.11-.56.24-.84.36l-.72.32H91.39c-.42-.18-.83-.33-1.21-.53-.87-.43-1.31-.22-1.59.66-.13.41-.31.8-.48,1.23L87,66.61l-1.54.61A.79.79,0,0,0,85,68.36l.57,1.3c0,.07,0,.14.08.22l0,1.58c-.24.54-.46,1.05-.68,1.57a.78.78,0,0,0,.46,1.08l.84.33.78.31,1.07,1.08c.2.51.39,1,.57,1.45a.84.84,0,0,0,1.31.53l1.4-.61H93l.8.34.74.32a.79.79,0,0,0,1.15-.48c.18-.45.35-.89.52-1.33,0-.06,0-.11.1-.23l1.08-1.09,1.3-.51.32-.13A.78.78,0,0,0,99.4,73Z"/><line class="cls-6" x1="92.14" y1="53.43" x2="92.14" y2="88.43"/><line class="cls-7" x1="92.14" y1="52.77" x2="92.14" y2="88.43"/><polyline class="cls-7" points="88.82 54.69 92.11 56.62 95.49 54.53"/><polyline class="cls-7" points="95.49 86.76 92.19 84.83 88.82 86.92"/><line class="cls-7" x1="79.54" y1="58" x2="104.75" y2="83.21"/><polyline class="cls-7" points="78.55 61.71 82.24 60.74 83.16 56.88"/><polyline class="cls-7" points="105.94 79.66 102.25 80.63 101.33 84.49"/><line class="cls-7" x1="104.93" y1="57.98" x2="79.72" y2="83.2"/><polyline class="cls-7" points="101.22 56.99 102.19 60.68 106.05 61.6"/><polyline class="cls-7" points="83.27 84.38 82.3 80.69 78.44 79.78"/><line class="cls-7" x1="110.2" y1="70.68" x2="74.54" y2="70.68"/><polyline class="cls-7" points="108.28 67.35 106.35 70.65 108.44 74.02"/><polyline class="cls-7" points="76.21 74.02 78.14 70.73 76.05 67.35"/></g></g></svg>';
      return svgHtml;
      break;
    case 'rain':
      svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.07 73.01" width="100" height="100"><defs><style>.cls-1{fill:#aac7d5;}.cls-2{fill:#cae3f6;}.cls-3,.cls-4{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:4px;}.cls-4{stroke-linecap:round;}</style></defs><title>rainAsset 184colored</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M76.77,49.06a1.32,1.32,0,0,1,.77-.46,24.92,24.92,0,0,0,11.14-4.1c6.44,4.75,11.95,5.4,17.45,2.13,4.78-2.85,7.7-8.5,6.76-13.85-1.38-8-6.52-12-14.43-12.57C95.82,10.36,89.79,3.79,79.75,2,68-.11,59.45,5,53.73,15.23"/><path class="cls-2" d="M63.32,28.88H63a24,24,0,0,0-47,.87l-.87,0a13.89,13.89,0,0,0-5.53,1.6A14.38,14.38,0,0,0,7.2,33c-.4.33-.79.67-1.17,1A10.11,10.11,0,0,0,4,36.51,13.24,13.24,0,0,0,2.84,38.9C.28,46.85,4,52.81,8.23,55.66s11.5,4,17.85-1.57a24,24,0,0,0,27,0A14.67,14.67,0,1,0,63.32,28.88Z"/><path class="cls-3" d="M76.77,49.53a1.32,1.32,0,0,1,.77-.46A24.92,24.92,0,0,0,88.68,45c6.44,4.75,11.95,5.4,17.45,2.13,4.78-2.85,7.7-8.5,6.76-13.85-1.38-8-6.52-12-14.43-12.57C95.82,10.83,89.79,4.26,79.75,2.46,68,.36,59.45,5.51,53.73,15.7"/><path class="cls-3" d="M63.32,29.35H63a24,24,0,0,0-47,.87l-.87,0a13.89,13.89,0,0,0-5.53,1.6A14.38,14.38,0,0,0,7.2,33.43c-.4.33-.79.67-1.17,1A10.11,10.11,0,0,0,4,37a13.24,13.24,0,0,0-1.13,2.39C.28,47.32,4,53.28,8.23,56.13s11.5,4,17.85-1.57a24,24,0,0,0,27,0A14.67,14.67,0,1,0,63.32,29.35Z"/><line class="cls-4" x1="85.91" y1="64.74" x2="85.91" y2="71.01"/><line class="cls-4" x1="60.08" y1="64.74" x2="60.08" y2="71.01"/><line class="cls-4" x1="34.25" y1="64.74" x2="34.25" y2="71.01"/></g></g></svg>';
      return svgHtml;
      break;
    case 'showers-day':
      svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121.88 88" width="100" height="100"><defs><style>.cls-1{fill:#f5b952;}.cls-2{fill:#aac7d5;}.cls-3{fill:#cae3f6;}.cls-4,.cls-5{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:4px;}.cls-5{stroke-linecap:round;}</style></defs><title>showers-dayAsset 185colored</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M21.39,1.91A20.1,20.1,0,1,0,41.49,22,20.13,20.13,0,0,0,21.39,1.91Z"/><path class="cls-2" d="M83.64,52.15a1.35,1.35,0,0,1,.77-.46,24.92,24.92,0,0,0,11.14-4.1c6.44,4.75,12,5.4,17.45,2.13,4.78-2.85,7.71-8.5,6.77-13.85-1.39-8-6.53-12-14.44-12.58-2.64-9.84-8.67-16.41-18.71-18.21C74.88,3,66.33,8.13,60.61,18.32"/><path class="cls-3" d="M70.2,32h-.36a24,24,0,0,0-47,.87l-.87,0a13.94,13.94,0,0,0-5.53,1.6,14.74,14.74,0,0,0-2.35,1.56c-.4.33-.79.67-1.17,1.05a9.69,9.69,0,0,0-2.06,2.5A13.77,13.77,0,0,0,9.71,42C7.15,49.94,10.87,55.9,15.1,58.75s11.5,4,17.85-1.57a24,24,0,0,0,27,0A14.67,14.67,0,1,0,70.2,32Z"/><path class="cls-4" d="M39.79,13.71A19.75,19.75,0,1,0,11.21,38.44"/><path class="cls-4" d="M83.58,51.66a1.27,1.27,0,0,1,.78-.46,25,25,0,0,0,11.13-4.11c6.44,4.75,12,5.41,17.45,2.13,4.78-2.85,7.71-8.49,6.77-13.84-1.39-8-6.53-12-14.43-12.58C102.64,13,96.6,6.38,86.56,4.59c-11.74-2.1-20.29,3.05-26,13.23"/><path class="cls-4" d="M70.14,31.47l-.36,0a24,24,0,0,0-47,.87c-.29,0-.58,0-.87,0A14.27,14.27,0,0,0,16.37,34,14.8,14.8,0,0,0,14,35.56a14.06,14.06,0,0,0-1.17,1,10.07,10.07,0,0,0-2.06,2.5,13.13,13.13,0,0,0-1.13,2.4c-2.57,8,1.16,13.9,5.38,16.75,4.38,3,11.5,4,17.86-1.56a24,24,0,0,0,27,0A14.67,14.67,0,1,0,70.14,31.47Z"/><line class="cls-5" x1="93.59" y1="67.86" x2="93.59" y2="74.13"/><line class="cls-5" x1="67.76" y1="67.86" x2="67.76" y2="74.13"/><line class="cls-5" x1="41.94" y1="67.86" x2="41.94" y2="74.13"/><line class="cls-5" x1="79.64" y1="79.73" x2="79.64" y2="86"/><line class="cls-5" x1="53.81" y1="79.73" x2="53.81" y2="86"/></g></g></svg>';
      return svgHtml;
      break;
    case 'showers-night':
      svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 117.22 88.1" width="100" height="100"><defs><style>.cls-1{fill:#f5b952;}.cls-2{fill:#aac7d5;}.cls-3{fill:#cae3f6;}.cls-4,.cls-5{fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:4px;}.cls-5{stroke-linecap:round;}</style></defs><title>showers-nightAsset 186colored</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M18.58,30.38a19.63,19.63,0,0,1-1.65-11.06A24.25,24.25,0,0,1,23.29,7a33.66,33.66,0,0,1,2.84-2.74,16.28,16.28,0,0,0-4.08-1.45A16.57,16.57,0,0,0,6.2,30a16.23,16.23,0,0,0,5.51,4.05"/><path class="cls-2" d="M78.84,51.19a1.25,1.25,0,0,1,.77-.46,25.05,25.05,0,0,0,11.14-4.11c6.44,4.75,12,5.41,17.45,2.13,4.78-2.85,7.7-8.49,6.76-13.84-1.38-8-6.52-12-14.43-12.58C97.89,12.49,91.86,5.91,81.82,4.12,70.07,2,61.52,7.17,55.8,17.35"/><path class="cls-3" d="M65.39,31,65,31a24,24,0,0,0-47,.87c-.29,0-.58,0-.87,0a14.22,14.22,0,0,0-5.53,1.6,14.44,14.44,0,0,0-2.36,1.57,14,14,0,0,0-1.16,1A10.12,10.12,0,0,0,6,38.63,13.13,13.13,0,0,0,4.91,41C2.35,49,6.07,54.93,10.3,57.78s11.5,4,17.85-1.56a24,24,0,0,0,27,0A14.67,14.67,0,1,0,65.39,31Z"/><path class="cls-4" d="M18.58,30a19.63,19.63,0,0,1-1.65-11.06A24.21,24.21,0,0,1,23.29,6.56a32.14,32.14,0,0,1,2.84-2.74,16.28,16.28,0,0,0-4.08-1.45A16.57,16.57,0,0,0,6.2,29.6a16.23,16.23,0,0,0,5.51,4"/><path class="cls-4" d="M78.93,51.31a1.29,1.29,0,0,1,.77-.47,24.84,24.84,0,0,0,11.13-4.1c6.44,4.75,12,5.41,17.45,2.13C113.06,46,116,40.38,115.05,35c-1.39-8-6.53-12-14.43-12.58C98,12.61,91.94,6,81.9,4.24c-11.74-2.1-20.29,3.05-26,13.23"/><path class="cls-4" d="M65.48,31.12l-.36,0a24,24,0,0,0-47,.87l-.87,0a14.06,14.06,0,0,0-5.52,1.6,14.44,14.44,0,0,0-2.36,1.57,14.06,14.06,0,0,0-1.17,1,9.89,9.89,0,0,0-2.06,2.5A13.24,13.24,0,0,0,5,41.14c-2.57,8,1.16,13.91,5.38,16.76,4.38,3,11.5,4,17.86-1.56a24,24,0,0,0,27-.05A14.67,14.67,0,1,0,65.48,31.12Z"/><line class="cls-5" x1="92.11" y1="67.95" x2="92.11" y2="74.22"/><line class="cls-5" x1="66.28" y1="67.95" x2="66.28" y2="74.22"/><line class="cls-5" x1="40.45" y1="67.95" x2="40.45" y2="74.22"/><line class="cls-5" x1="78.16" y1="79.83" x2="78.16" y2="86.1"/><line class="cls-5" x1="52.33" y1="79.83" x2="52.33" y2="86.1"/></g></g></svg>';
      return svgHtml;
      break;
    case 'sleet':
      svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104.48 75.58" width="100" height="100"><defs><style>.cls-1{fill:#cae3f6;}.cls-2{fill:#649f4e;}.cls-3,.cls-4,.cls-5{fill:none;stroke-miterlimit:10;stroke-width:3px;}.cls-3,.cls-5{stroke:#231f20;}.cls-3{stroke-linecap:round;}.cls-4{stroke:#000;}</style></defs><title>sleet Asset 187colored</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M52.09,42.69c-.44-1-.9-2-1.38-3.14l0-3.26L52,33.39a1.67,1.67,0,0,0-1.06-2.59c-1-.37-1.93-.75-3-1.16l-2.27-2.23c-.45-1.15-.86-2.21-1.29-3.27a1.61,1.61,0,0,0-2.22-.9L40.46,24,39,24.63h-3.2c-.85-.37-1.67-.68-2.45-1.07-1.77-.89-2.66-.47-3.24,1.34-.27.82-.63,1.62-1,2.5l-2.28,2.28L23.7,30.92a1.61,1.61,0,0,0-1,2.31l1.17,2.66a4.52,4.52,0,0,1,.16.45l0,3.2c-.48,1.1-.94,2.14-1.38,3.19a1.57,1.57,0,0,0,.92,2.2c.57.24,1.15.46,1.72.68l1.59.62,2.17,2.21,1.17,3c.54,1.35,1.31,1.67,2.66,1.07l2.85-1.24H39l1.64.69,1.5.65a1.6,1.6,0,0,0,2.34-1c.36-.9.7-1.81,1.06-2.71,0-.11.09-.22.2-.45l2.2-2.22,2.65-1.06c.21-.08.43-.15.64-.25A1.6,1.6,0,0,0,52.09,42.69Z"/><path class="cls-2" d="M95.9,27.83V17.89a5.69,5.69,0,1,0-11.37.16c0,6.48,0,13,0,19.44a2.42,2.42,0,0,1-1.28,2.3,12.75,12.75,0,0,0,10.21,23,12.16,12.16,0,0,0,9.29-10.22c.91-5.41-1.15-9.74-5.68-12.83a2.39,2.39,0,0,1-1.21-2.25C95.93,34.29,95.9,31.06,95.9,27.83Z"/><path class="cls-3" d="M95.9,27.83V17.89a5.69,5.69,0,1,0-11.37.16c0,6.48,0,13,0,19.44a2.42,2.42,0,0,1-1.28,2.3,12.75,12.75,0,0,0,10.21,23,12.16,12.16,0,0,0,9.29-10.22c.91-5.41-1.15-9.74-5.68-12.83a2.39,2.39,0,0,1-1.21-2.25C95.93,34.29,95.9,31.06,95.9,27.83Z"/><path class="cls-4" d="M52.09,42.69c-.44-1-.9-2-1.38-3.14l0-3.26L52,33.39a1.67,1.67,0,0,0-1.06-2.59c-1-.37-1.93-.75-3-1.16l-2.27-2.23c-.45-1.15-.86-2.21-1.29-3.27a1.61,1.61,0,0,0-2.22-.9L40.46,24,39,24.63h-3.2c-.85-.37-1.67-.68-2.45-1.07-1.77-.89-2.66-.47-3.24,1.34-.27.82-.63,1.62-1,2.5l-2.28,2.28L23.7,30.92a1.61,1.61,0,0,0-1,2.31l1.17,2.66a4.52,4.52,0,0,1,.16.45l0,3.2c-.48,1.1-.94,2.14-1.38,3.19a1.57,1.57,0,0,0,.92,2.2c.57.24,1.15.46,1.72.68l1.59.62,2.17,2.21,1.17,3c.54,1.35,1.31,1.67,2.66,1.07l2.85-1.24H39l1.64.69,1.5.65a1.6,1.6,0,0,0,2.34-1c.36-.9.7-1.81,1.06-2.71,0-.11.09-.22.2-.45l2.2-2.22,2.65-1.06c.21-.08.43-.15.64-.25A1.6,1.6,0,0,0,52.09,42.69Z"/><line class="cls-5" x1="37.32" y1="2.84" x2="37.32" y2="74.08"/><line class="cls-3" x1="37.32" y1="1.5" x2="37.32" y2="74.08"/><polyline class="cls-3" points="30.55 5.42 37.27 9.34 44.14 5.1"/><polyline class="cls-3" points="44.14 70.68 37.43 66.76 30.55 71"/><line class="cls-3" x1="11.67" y1="12.14" x2="62.99" y2="63.46"/><polyline class="cls-3" points="9.65 19.7 17.17 17.73 19.03 9.87"/><polyline class="cls-3" points="65.4 56.24 57.89 58.22 56.03 66.07"/><line class="cls-3" x1="63.36" y1="12.11" x2="12.04" y2="63.43"/><polyline class="cls-3" points="55.8 10.1 57.77 17.61 65.63 19.47"/><polyline class="cls-3" points="19.26 65.85 17.29 58.33 9.43 56.47"/><line class="cls-3" x1="74.08" y1="37.95" x2="1.5" y2="37.95"/><polyline class="cls-3" points="70.16 31.18 66.24 37.89 70.48 44.76"/><polyline class="cls-3" points="4.9 44.76 8.82 38.05 4.58 31.18"/><line class="cls-3" x1="89.94" y1="19.44" x2="89.94" y2="49.69"/></g></g></svg>';
      return svgHtml;
      break;
    case 'snow-showers-day':
      svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121.88 91.8"><defs><style>.cls-1{fill:#cae3f6;}.cls-2{fill:#f5b952;}.cls-3{fill:#aac7d5;}.cls-4,.cls-5,.cls-6,.cls-7{fill:none;stroke-miterlimit:10;}.cls-4,.cls-7{stroke:#000;}.cls-5,.cls-6{stroke:#231f20;}.cls-6{stroke-linecap:round;}.cls-7{stroke-width:4px;}</style></defs><title>snow-showers-day Asset 199colored</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M52.39,80.84c-.15-.35-.3-.68-.46-1V78.72l.41-1a.54.54,0,0,0-.35-.85l-1-.39-.75-.73c-.15-.38-.29-.74-.43-1.08a.53.53,0,0,0-.73-.3l-.56.24-.49.22H47c-.28-.12-.55-.23-.81-.36-.58-.29-.88-.15-1.07.45-.09.27-.21.53-.32.82l-.75.75L43,77a.53.53,0,0,0-.32.76l.39.88s0,.09.05.14v1.06c-.15.37-.31.71-.45,1.06a.53.53,0,0,0,.3.73l.57.22.53.2.71.73c.14.34.26.66.39,1s.43.55.88.35l.94-.41h1.05l.54.23.5.21a.53.53,0,0,0,.77-.32l.35-.9.06-.15L51,82l.88-.35.21-.08A.52.52,0,0,0,52.39,80.84Z"/><path class="cls-1" d="M75.51,74.23c-.1-.25-.22-.5-.33-.76v-.8l.31-.7c.14-.32.06-.51-.26-.63l-.72-.28L74,70.52l-.31-.8a.4.4,0,0,0-.54-.22l-.41.18-.36.16h-.78c-.2-.09-.4-.16-.59-.26-.43-.21-.65-.11-.79.33-.06.2-.15.39-.23.6l-.56.56-.76.3a.39.39,0,0,0-.23.56c.09.22.19.43.28.65a.69.69,0,0,0,0,.1v.78l-.34.78a.38.38,0,0,0,.23.53l.41.17.39.15.53.53.28.72c.13.33.32.4.65.26l.69-.3h.77l.4.17.36.15a.39.39,0,0,0,.57-.24c.09-.21.17-.43.26-.65a.48.48,0,0,1,0-.11l.53-.54.64-.26.16-.06A.38.38,0,0,0,75.51,74.23Z"/><path class="cls-1" d="M94.94,67.52,94.69,67v-.58l.22-.52c.1-.22,0-.36-.19-.45l-.52-.21-.4-.39-.23-.58a.28.28,0,0,0-.39-.16l-.3.13-.27.11h-.56l-.44-.19c-.31-.15-.47-.08-.57.24-.05.15-.11.29-.17.44l-.41.41-.55.22a.28.28,0,0,0-.17.41l.2.47,0,.08V67l-.25.57a.28.28,0,0,0,.17.39l.3.12.28.11.39.39.21.52c.09.24.23.3.47.19l.5-.22h.56l.29.13.27.11a.28.28,0,0,0,.41-.17c.07-.16.13-.32.19-.48l0-.08.39-.4.47-.18.11,0A.29.29,0,0,0,94.94,67.52Z"/><path class="cls-2" d="M22.48,2.48a20.1,20.1,0,1,0,20.1,20.1A20.13,20.13,0,0,0,22.48,2.48Z"/><path class="cls-3" d="M83.16,52.76a1.32,1.32,0,0,1,.77-.46,24.92,24.92,0,0,0,11.14-4.1c6.44,4.75,12,5.4,17.45,2.13,4.78-2.85,7.7-8.5,6.76-13.85-1.38-8-6.52-12-14.43-12.57-2.64-9.85-8.67-16.42-18.71-18.22-11.75-2.1-20.3,3.05-26,13.24"/><path class="cls-1" d="M69.71,32.58h-.35a24,24,0,0,0-47,.87l-.86,0A13.89,13.89,0,0,0,16,35.1a14.38,14.38,0,0,0-2.36,1.56c-.4.33-.79.67-1.17,1.05a10.11,10.11,0,0,0-2.06,2.5A13.24,13.24,0,0,0,9.23,42.6c-2.56,7.95,1.16,13.91,5.39,16.76s11.5,4,17.85-1.57a24,24,0,0,0,27,0A14.67,14.67,0,1,0,69.71,32.58Z"/><path class="cls-4" d="M52.39,80.93l-.46-1V78.81c.14-.33.28-.64.41-1A.55.55,0,0,0,52,77l-1-.38-.75-.74-.43-1.08a.53.53,0,0,0-.73-.3l-.56.25-.49.21H47c-.28-.12-.55-.22-.81-.35-.58-.3-.88-.16-1.07.44-.09.27-.21.54-.32.82l-.75.76L43,77a.53.53,0,0,0-.32.76l.39.88a1.31,1.31,0,0,1,.05.15v1.06c-.15.36-.31.71-.45,1a.53.53,0,0,0,.3.73l.57.22.53.21.71.73.39,1c.18.45.43.55.88.36l.94-.41h1.05l.54.23.5.22a.53.53,0,0,0,.77-.33l.35-.89a1.14,1.14,0,0,1,.06-.15l.73-.74.88-.34.21-.09A.52.52,0,0,0,52.39,80.93Z"/><line class="cls-5" x1="47.51" y1="67.76" x2="47.51" y2="91.3"/><line class="cls-6" x1="47.51" y1="67.32" x2="47.51" y2="91.3"/><polyline class="cls-6" points="45.27 68.61 47.49 69.91 49.76 68.51"/><polyline class="cls-6" points="49.76 90.17 47.54 88.88 45.27 90.28"/><line class="cls-6" x1="39.03" y1="70.84" x2="55.99" y2="87.79"/><polyline class="cls-6" points="38.37 73.33 40.85 72.68 41.47 70.08"/><polyline class="cls-6" points="56.79 85.41 54.3 86.06 53.69 88.65"/><line class="cls-6" x1="56.11" y1="70.83" x2="39.16" y2="87.78"/><polyline class="cls-6" points="53.61 70.16 54.27 72.64 56.86 73.26"/><polyline class="cls-6" points="41.54 88.58 40.89 86.1 38.29 85.48"/><line class="cls-6" x1="59.65" y1="79.36" x2="35.67" y2="79.36"/><polyline class="cls-6" points="58.36 77.13 57.06 79.34 58.47 81.61"/><polyline class="cls-6" points="36.8 81.61 38.09 79.4 36.69 77.13"/><path class="cls-4" d="M75.51,74.32c-.1-.25-.22-.5-.33-.76v-.79l.31-.71a.4.4,0,0,0-.26-.62l-.72-.29L74,70.61l-.31-.79a.38.38,0,0,0-.54-.22l-.41.18-.36.16h-.78L71,69.68c-.43-.22-.65-.12-.79.32-.06.2-.15.39-.23.61l-.56.55-.76.3a.39.39,0,0,0-.23.56c.09.22.19.43.28.65a.76.76,0,0,0,0,.11v.78c-.12.26-.23.52-.34.77a.4.4,0,0,0,.23.54L69,75l.39.15.53.54.28.71a.42.42,0,0,0,.65.27l.69-.31h.77l.4.17.36.16a.39.39,0,0,0,.57-.24l.26-.66,0-.11.53-.54.64-.26a.76.76,0,0,0,.16-.06A.38.38,0,0,0,75.51,74.32Z"/><line class="cls-5" x1="71.93" y1="64.65" x2="71.93" y2="81.94"/><line class="cls-6" x1="71.93" y1="64.32" x2="71.93" y2="81.94"/><polyline class="cls-6" points="70.28 65.27 71.91 66.22 73.58 65.19"/><polyline class="cls-6" points="73.58 81.12 71.95 80.17 70.28 81.2"/><line class="cls-6" x1="65.7" y1="66.9" x2="78.16" y2="79.37"/><polyline class="cls-6" points="65.21 68.74 67.03 68.26 67.48 66.35"/><polyline class="cls-6" points="78.75 77.61 76.92 78.09 76.47 80"/><line class="cls-6" x1="78.25" y1="66.9" x2="65.79" y2="79.36"/><polyline class="cls-6" points="76.41 66.41 76.89 68.23 78.8 68.68"/><polyline class="cls-6" points="67.54 79.94 67.06 78.12 65.15 77.67"/><line class="cls-6" x1="80.85" y1="73.17" x2="63.23" y2="73.17"/><polyline class="cls-6" points="79.9 71.53 78.95 73.16 79.98 74.83"/><polyline class="cls-6" points="64.05 74.83 65 73.2 63.98 71.53"/><path class="cls-4" d="M94.94,67.62c-.08-.19-.16-.37-.25-.56v-.58l.22-.51a.3.3,0,0,0-.19-.46l-.52-.2-.4-.4c-.08-.2-.16-.39-.23-.58a.28.28,0,0,0-.39-.16l-.3.13-.27.12h-.56l-.44-.19c-.31-.16-.47-.09-.57.23-.05.15-.11.29-.17.45l-.41.4-.55.22a.28.28,0,0,0-.17.41c.06.16.13.31.2.47l0,.08v.57c-.09.19-.17.38-.25.56a.28.28,0,0,0,.17.39c.1,0,.2.08.3.12l.28.11.39.4.21.52c.09.24.23.29.47.19l.5-.22h.56l.29.12.27.11a.28.28,0,0,0,.41-.17c.07-.16.13-.32.19-.48l0-.08.39-.39.47-.19.11,0A.3.3,0,0,0,94.94,67.62Z"/><line class="cls-5" x1="92.32" y1="60.56" x2="92.32" y2="73.18"/><line class="cls-6" x1="92.32" y1="60.32" x2="92.32" y2="73.18"/><polyline class="cls-6" points="91.12 61.01 92.31 61.71 93.53 60.96"/><polyline class="cls-6" points="93.53 72.58 92.34 71.88 91.12 72.63"/><line class="cls-6" x1="87.77" y1="62.21" x2="96.87" y2="71.3"/><polyline class="cls-6" points="87.42 63.54 88.75 63.19 89.08 61.8"/><polyline class="cls-6" points="97.29 70.02 95.96 70.37 95.63 71.76"/><line class="cls-6" x1="96.93" y1="62.2" x2="87.84" y2="71.29"/><polyline class="cls-6" points="95.59 61.84 95.94 63.17 97.33 63.5"/><polyline class="cls-6" points="89.12 71.72 88.77 70.39 87.38 70.06"/><line class="cls-6" x1="98.83" y1="66.78" x2="85.97" y2="66.78"/><polyline class="cls-6" points="98.14 65.58 97.44 66.77 98.19 67.98"/><polyline class="cls-6" points="86.58 67.98 87.27 66.8 86.52 65.58"/><path class="cls-7" d="M39.79,13.71A19.75,19.75,0,1,0,11.21,38.44"/><path class="cls-7" d="M83.58,51.66a1.27,1.27,0,0,1,.78-.46,25,25,0,0,0,11.13-4.11c6.44,4.75,12,5.41,17.45,2.13,4.78-2.85,7.71-8.49,6.77-13.84-1.39-8-6.53-12-14.43-12.58C102.64,13,96.6,6.38,86.56,4.59c-11.74-2.1-20.29,3.05-26,13.23"/><path class="cls-7" d="M70.14,31.47l-.36,0a24,24,0,0,0-47,.87c-.29,0-.58,0-.87,0A14.27,14.27,0,0,0,16.37,34,14.8,14.8,0,0,0,14,35.56a14.06,14.06,0,0,0-1.17,1,10.07,10.07,0,0,0-2.06,2.5,13.13,13.13,0,0,0-1.13,2.4c-2.57,8,1.16,13.9,5.38,16.75,4.38,3,11.5,4,17.86-1.56a24,24,0,0,0,27,0A14.67,14.67,0,1,0,70.14,31.47Z"/></g></g></svg>';
      return svgHtml;
      break;
    case 'snow-showers-night':
      svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 117.22 91.81" width="100" height="100"><defs><style>.cls-1{fill:#cae3f6;}.cls-2{fill:#f5b952;}.cls-3{fill:#aac7d5;}.cls-4,.cls-5,.cls-6,.cls-7{fill:none;stroke-miterlimit:10;}.cls-4,.cls-7{stroke:#000;}.cls-5,.cls-6{stroke:#231f20;}.cls-6{stroke-linecap:round;}.cls-7{stroke-width:4px;}</style></defs><title>snow-showers-nightAsset 200colored</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M47.73,80.85l-.46-1V78.74q.21-.49.42-1a.55.55,0,0,0-.36-.85l-1-.39-.75-.73-.43-1.09a.53.53,0,0,0-.73-.29c-.19.07-.38.16-.56.24l-.49.22H42.34c-.28-.13-.55-.23-.81-.36-.58-.29-.88-.15-1.07.44-.09.28-.21.54-.32.83l-.75.75-1,.41a.54.54,0,0,0-.32.77l.39.88a1.09,1.09,0,0,1,0,.14v1.06c-.15.37-.31.71-.45,1.06a.51.51,0,0,0,.3.72l.57.23.53.2.71.73c.14.34.27.66.39,1s.43.55.88.35l.94-.41h1l.54.23.5.21a.53.53,0,0,0,.77-.32l.35-.9.06-.15.73-.73.88-.35.21-.08A.53.53,0,0,0,47.73,80.85Z"/><path class="cls-1" d="M70.85,74.25c-.1-.25-.22-.5-.33-.77v-.79l.3-.7c.14-.32.06-.51-.26-.63l-.71-.28-.56-.54-.31-.8a.39.39,0,0,0-.54-.22L68,69.7l-.36.16h-.78c-.2-.09-.4-.16-.59-.26-.43-.22-.65-.11-.79.33-.06.2-.15.39-.23.6l-.56.56-.76.3a.39.39,0,0,0-.23.56l.28.64a.49.49,0,0,1,0,.11v.78l-.34.78a.38.38,0,0,0,.23.53l.42.17.38.15.53.53.28.72c.13.33.32.4.65.26l.69-.3h.77l.4.17.36.16A.39.39,0,0,0,69,76.4c.09-.22.17-.44.26-.65a.78.78,0,0,1,0-.12l.53-.53.65-.26.15-.06A.38.38,0,0,0,70.85,74.25Z"/><path class="cls-1" d="M90.28,67.54,90,67v-.58l.22-.52c.1-.23,0-.36-.19-.45l-.52-.21-.4-.4c-.08-.2-.15-.39-.23-.57a.28.28,0,0,0-.39-.16l-.3.13-.26.11h-.57L87,64.15c-.31-.16-.47-.08-.57.24,0,.15-.11.29-.17.44l-.41.41-.55.22a.28.28,0,0,0-.17.41c.07.15.14.31.2.47s0,0,0,.08V67l-.25.57a.29.29,0,0,0,.17.39l.3.12.28.11.39.39.21.52c.09.24.23.3.47.19l.5-.22H88l.29.12.26.12a.29.29,0,0,0,.42-.18l.18-.47,0-.09.39-.39L90,68l.11,0A.29.29,0,0,0,90.28,67.54Z"/><path class="cls-2" d="M18.58,30.75a19.61,19.61,0,0,1-1.65-11A24.17,24.17,0,0,1,23.29,7.35,34,34,0,0,1,26.13,4.6a15.87,15.87,0,0,0-4.08-1.44A16.56,16.56,0,0,0,6.2,30.38a16.23,16.23,0,0,0,5.51,4.05"/><path class="cls-3" d="M78.5,52.09a1.23,1.23,0,0,1,.77-.46,24.82,24.82,0,0,0,11.14-4.11c6.44,4.76,12,5.41,17.45,2.13,4.78-2.85,7.7-8.49,6.76-13.84-1.38-8-6.52-12-14.43-12.58C97.55,13.39,91.52,6.82,81.48,5c-11.75-2.1-20.3,3.05-26,13.23"/><path class="cls-1" d="M65.05,31.9l-.35,0a24,24,0,0,0-47,.87c-.29,0-.58,0-.87,0a14,14,0,0,0-5.53,1.59A14.44,14.44,0,0,0,8.93,36a14.21,14.21,0,0,0-1.17,1,10.11,10.11,0,0,0-2.06,2.5,13.24,13.24,0,0,0-1.13,2.39C2,49.88,5.73,55.84,10,58.69s11.5,4,17.85-1.57a24,24,0,0,0,27,0A14.67,14.67,0,1,0,65.05,31.9Z"/><path class="cls-4" d="M47.73,80.94l-.46-1V78.82c.14-.33.28-.64.42-1a.55.55,0,0,0-.36-.85l-1-.38-.75-.74-.43-1.08a.53.53,0,0,0-.73-.3l-.56.24L43.4,75H42.34c-.28-.12-.55-.22-.81-.35-.58-.3-.88-.16-1.07.44-.09.27-.21.53-.32.82l-.75.76-1,.41a.53.53,0,0,0-.32.76l.39.88a1.31,1.31,0,0,1,0,.15V79.9c-.15.36-.31.7-.45,1a.53.53,0,0,0,.3.73l.57.22.53.21.71.73c.14.34.27.65.39,1s.43.55.88.36l.94-.42h1l.54.23.5.21a.52.52,0,0,0,.77-.32c.12-.3.23-.6.35-.89a1.14,1.14,0,0,1,.06-.15l.73-.74.88-.35.21-.08A.52.52,0,0,0,47.73,80.94Z"/><line class="cls-5" x1="42.85" y1="67.77" x2="42.85" y2="91.31"/><line class="cls-6" x1="42.85" y1="67.33" x2="42.85" y2="91.31"/><polyline class="cls-6" points="40.62 68.62 42.83 69.92 45.1 68.52"/><polyline class="cls-6" points="45.1 90.18 42.88 88.89 40.62 90.29"/><line class="cls-6" x1="34.38" y1="70.84" x2="51.33" y2="87.8"/><polyline class="cls-6" points="33.71 73.34 36.19 72.69 36.81 70.09"/><polyline class="cls-6" points="52.13 85.41 49.65 86.07 49.03 88.66"/><line class="cls-6" x1="51.45" y1="70.83" x2="34.5" y2="87.79"/><polyline class="cls-6" points="48.95 70.17 49.61 72.65 52.2 73.27"/><polyline class="cls-6" points="36.88 88.59 36.23 86.1 33.63 85.49"/><line class="cls-6" x1="54.99" y1="79.37" x2="31.02" y2="79.37"/><polyline class="cls-6" points="53.7 77.13 52.41 79.35 53.81 81.62"/><polyline class="cls-6" points="32.14 81.62 33.43 79.4 32.03 77.13"/><path class="cls-4" d="M70.85,74.33c-.1-.25-.22-.5-.33-.76v-.79c.1-.25.2-.48.3-.71s.06-.5-.26-.63l-.71-.28-.56-.54L69,69.83a.38.38,0,0,0-.54-.22c-.14,0-.27.12-.41.18l-.36.15h-.78c-.2-.09-.4-.16-.59-.26-.43-.21-.65-.11-.79.33-.06.2-.15.39-.23.61l-.56.55-.76.3a.39.39,0,0,0-.23.56c.09.22.19.43.28.65a.28.28,0,0,1,0,.11v.77l-.34.78a.38.38,0,0,0,.23.53l.42.17.38.15.53.54.28.71c.13.33.32.41.65.26l.69-.3h.77l.4.17.36.15a.39.39,0,0,0,.57-.23l.26-.66,0-.11.53-.54.65-.26.15-.06A.38.38,0,0,0,70.85,74.33Z"/><line class="cls-5" x1="67.27" y1="64.65" x2="67.27" y2="81.95"/><line class="cls-6" x1="67.27" y1="64.33" x2="67.27" y2="81.95"/><polyline class="cls-6" points="65.63 65.28 67.25 66.23 68.92 65.2"/><polyline class="cls-6" points="68.92 81.13 67.29 80.17 65.63 81.2"/><line class="cls-6" x1="61.04" y1="66.91" x2="73.5" y2="79.37"/><polyline class="cls-6" points="60.55 68.75 62.38 68.27 62.83 66.36"/><polyline class="cls-6" points="74.09 77.62 72.26 78.1 71.81 80.01"/><line class="cls-6" x1="73.59" y1="66.9" x2="61.13" y2="79.37"/><polyline class="cls-6" points="71.75 66.42 72.23 68.24 74.14 68.69"/><polyline class="cls-6" points="62.88 79.95 62.4 78.13 60.49 77.68"/><line class="cls-6" x1="76.19" y1="73.18" x2="58.57" y2="73.18"/><polyline class="cls-6" points="75.24 71.53 74.29 73.16 75.32 74.83"/><polyline class="cls-6" points="59.4 74.83 60.35 73.2 59.32 71.53"/><path class="cls-4" d="M90.28,67.63c-.08-.19-.16-.37-.25-.56v-.58l.22-.51a.3.3,0,0,0-.19-.46l-.52-.21-.4-.39c-.08-.21-.15-.39-.23-.58a.28.28,0,0,0-.39-.16l-.3.13-.26.12h-.57L87,64.24c-.31-.16-.47-.09-.57.23,0,.15-.11.29-.17.45l-.41.4-.55.22a.28.28,0,0,0-.17.41c.07.16.14.31.2.47s0,0,0,.08v.57c-.09.19-.17.38-.25.56a.29.29,0,0,0,.17.39l.3.12.28.11.39.39c.07.19.14.36.21.53s.23.29.47.19l.5-.22H88l.29.13.26.11a.29.29,0,0,0,.42-.17l.18-.48,0-.08.39-.4.47-.18.11,0A.28.28,0,0,0,90.28,67.63Z"/><line class="cls-5" x1="87.66" y1="60.57" x2="87.66" y2="73.19"/><line class="cls-6" x1="87.66" y1="60.33" x2="87.66" y2="73.19"/><polyline class="cls-6" points="86.46 61.02 87.65 61.72 88.87 60.97"/><polyline class="cls-6" points="88.87 72.58 87.68 71.89 86.46 72.64"/><line class="cls-6" x1="83.12" y1="62.21" x2="92.21" y2="71.31"/><polyline class="cls-6" points="82.76 63.55 84.09 63.2 84.42 61.81"/><polyline class="cls-6" points="92.64 70.03 91.3 70.38 90.97 71.77"/><line class="cls-6" x1="92.27" y1="62.21" x2="83.18" y2="71.3"/><polyline class="cls-6" points="90.93 61.85 91.28 63.18 92.68 63.51"/><polyline class="cls-6" points="84.46 71.73 84.11 70.4 82.72 70.07"/><line class="cls-6" x1="94.17" y1="66.78" x2="81.31" y2="66.78"/><polyline class="cls-6" points="93.48 65.59 92.78 66.78 93.53 67.99"/><polyline class="cls-6" points="81.92 67.99 82.61 66.8 81.86 65.59"/><path class="cls-7" d="M18.58,30a19.63,19.63,0,0,1-1.65-11.06A24.21,24.21,0,0,1,23.29,6.56a32.14,32.14,0,0,1,2.84-2.74,16.28,16.28,0,0,0-4.08-1.45A16.57,16.57,0,0,0,6.2,29.6a16.23,16.23,0,0,0,5.51,4"/><path class="cls-7" d="M78.93,51.31a1.29,1.29,0,0,1,.77-.47,24.84,24.84,0,0,0,11.13-4.1c6.44,4.75,12,5.41,17.45,2.13C113.06,46,116,40.38,115.05,35c-1.39-8-6.53-12-14.43-12.58C98,12.61,91.94,6,81.9,4.24c-11.74-2.1-20.29,3.05-26,13.23"/><path class="cls-7" d="M65.48,31.12l-.36,0a24,24,0,0,0-47,.87l-.87,0a14.06,14.06,0,0,0-5.52,1.6,14.44,14.44,0,0,0-2.36,1.57,14.06,14.06,0,0,0-1.17,1,9.89,9.89,0,0,0-2.06,2.5A13.24,13.24,0,0,0,5,41.14c-2.57,8,1.16,13.91,5.38,16.76,4.38,3,11.5,4,17.86-1.56a24,24,0,0,0,27-.05A14.67,14.67,0,1,0,65.48,31.12Z"/></g></g></svg>';
      return svgHtml;
      break;
    case 'snow':
      svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.07 89.62" width="100" height="100"><defs><style>.cls-1{fill:#cae3f6;}.cls-2{fill:#aac7d5;}.cls-3,.cls-4,.cls-5,.cls-6{fill:none;stroke-miterlimit:10;}.cls-3,.cls-6{stroke:#000;}.cls-4,.cls-5{stroke:#231f20;}.cls-5{stroke-linecap:round;}.cls-6{stroke-width:4px;}</style></defs><title>snowAsset 198colored</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M45.57,78.75c-.14-.34-.3-.68-.45-1V76.64c.15-.33.28-.65.42-1s.08-.69-.35-.85l-1-.39-.75-.73c-.15-.39-.28-.74-.43-1.09a.53.53,0,0,0-.73-.29c-.19.07-.37.16-.56.24l-.49.22H40.19c-.29-.13-.56-.23-.81-.36-.59-.29-.88-.15-1.08.44a7.82,7.82,0,0,1-.32.83l-.75.75-1,.41a.53.53,0,0,0-.32.77c.12.29.26.58.38.87l.06.15v1.06l-.46,1.06a.51.51,0,0,0,.31.72l.57.23.52.2.72.73c.13.34.26.66.38,1a.56.56,0,0,0,.88.35l1-.41h1l.54.23.5.21a.53.53,0,0,0,.77-.32c.12-.3.24-.6.35-.9,0,0,0-.07.07-.15l.73-.73.87-.35.21-.08A.53.53,0,0,0,45.57,78.75Z"/><path class="cls-1" d="M68.7,72.15l-.34-.77v-.79l.31-.7c.13-.32,0-.51-.26-.63L67.69,69l-.55-.54c-.11-.28-.21-.54-.32-.8a.38.38,0,0,0-.53-.22l-.42.18-.35.16h-.78c-.21-.09-.41-.16-.6-.26-.43-.22-.64-.11-.78.33-.07.2-.16.39-.24.6l-.55.56-.76.3a.39.39,0,0,0-.24.56c.1.21.19.43.29.64l0,.11v.78c-.11.27-.23.52-.33.78a.38.38,0,0,0,.22.53l.42.17.39.15.52.53c.1.25.2.48.29.72s.32.4.64.26l.7-.3h.77l.39.17.37.16a.39.39,0,0,0,.57-.24c.08-.22.17-.44.25-.65,0,0,0-.06.05-.12l.54-.53.64-.26.15-.06A.39.39,0,0,0,68.7,72.15Z"/><path class="cls-1" d="M88.12,65.44l-.24-.55v-.58c.08-.18.15-.35.23-.52s0-.36-.19-.45l-.53-.21-.4-.4c-.08-.2-.15-.39-.23-.57a.28.28,0,0,0-.39-.16l-.3.13-.26.11h-.57l-.43-.19c-.32-.16-.47-.08-.58.24a4,4,0,0,1-.17.44l-.4.41-.56.22a.28.28,0,0,0-.17.4l.21.48a.34.34,0,0,1,0,.08v.56c-.08.2-.16.38-.24.57a.28.28,0,0,0,.16.39l.31.12.28.11.38.39c.08.18.14.35.21.52s.23.3.47.19l.51-.22h.56l.29.12.27.12a.28.28,0,0,0,.41-.18c.06-.16.12-.32.19-.48a.44.44,0,0,1,0-.08l.39-.39.47-.19.12,0A.28.28,0,0,0,88.12,65.44Z"/><path class="cls-2" d="M76.34,49.28a1.25,1.25,0,0,1,.78-.46,25,25,0,0,0,11.13-4.11c6.44,4.75,12,5.41,17.45,2.13,4.78-2.85,7.71-8.49,6.77-13.84-1.39-8-6.53-12-14.43-12.58C95.4,10.58,89.36,4,79.32,2.21,67.58.11,59,5.26,53.31,15.44"/><path class="cls-1" d="M62.9,29.09l-.36,0a24,24,0,0,0-47,.87c-.29,0-.58,0-.87,0a14.09,14.09,0,0,0-5.53,1.59,14.8,14.8,0,0,0-2.35,1.57,14.06,14.06,0,0,0-1.17,1,10,10,0,0,0-2.06,2.5,13.13,13.13,0,0,0-1.13,2.4C-.15,47.07,3.58,53,7.8,55.88c4.37,2.94,11.5,4,17.85-1.57a24,24,0,0,0,27,0A14.67,14.67,0,1,0,62.9,29.09Z"/><path class="cls-3" d="M45.57,78.75c-.14-.34-.3-.68-.45-1V76.64c.15-.33.28-.65.42-1s.08-.69-.35-.85l-1-.39-.75-.73c-.15-.39-.28-.74-.43-1.09a.53.53,0,0,0-.73-.29c-.19.07-.37.16-.56.24l-.49.22H40.19c-.29-.13-.56-.23-.81-.36-.59-.29-.88-.15-1.08.44a7.82,7.82,0,0,1-.32.83l-.75.75-1,.41a.53.53,0,0,0-.32.77c.12.29.26.58.38.87l.06.15v1.06l-.46,1.06a.51.51,0,0,0,.31.72l.57.23.52.2.72.73c.13.34.26.66.38,1a.56.56,0,0,0,.88.35l1-.41h1l.54.23.5.21a.53.53,0,0,0,.77-.32c.12-.3.24-.6.35-.9,0,0,0-.07.07-.15l.73-.73.87-.35.21-.08A.53.53,0,0,0,45.57,78.75Z"/><line class="cls-4" x1="40.69" y1="65.59" x2="40.69" y2="89.12"/><line class="cls-5" x1="40.69" y1="65.14" x2="40.69" y2="89.12"/><polyline class="cls-5" points="38.46 66.44 40.68 67.73 42.95 66.33"/><polyline class="cls-5" points="42.95 88 40.73 86.7 38.46 88.11"/><line class="cls-5" x1="32.22" y1="68.66" x2="49.17" y2="85.62"/><polyline class="cls-5" points="31.55 71.16 34.04 70.5 34.65 67.91"/><polyline class="cls-5" points="49.97 83.23 47.49 83.88 46.88 86.48"/><line class="cls-5" x1="49.3" y1="68.65" x2="32.34" y2="85.61"/><polyline class="cls-5" points="46.8 67.98 47.45 70.47 50.05 71.08"/><polyline class="cls-5" points="34.73 86.4 34.07 83.92 31.48 83.31"/><line class="cls-5" x1="52.84" y1="77.19" x2="28.86" y2="77.19"/><polyline class="cls-5" points="51.54 74.95 50.25 77.17 51.65 79.44"/><polyline class="cls-5" points="29.98 79.44 31.28 77.22 29.88 74.95"/><path class="cls-3" d="M68.7,72.15l-.34-.77v-.79l.31-.7c.13-.32,0-.51-.26-.63L67.69,69l-.55-.54c-.11-.28-.21-.54-.32-.8a.38.38,0,0,0-.53-.22l-.42.18-.35.16h-.78c-.21-.09-.41-.16-.6-.26-.43-.22-.64-.11-.78.33-.07.2-.16.39-.24.6l-.55.56-.76.3a.39.39,0,0,0-.24.56c.1.21.19.43.29.64l0,.11v.78c-.11.27-.23.52-.33.78a.38.38,0,0,0,.22.53l.42.17.39.15.52.53c.1.25.2.48.29.72s.32.4.64.26l.7-.3h.77l.39.17.37.16a.39.39,0,0,0,.57-.24c.08-.22.17-.44.25-.65,0,0,0-.06.05-.12l.54-.53.64-.26.15-.06A.39.39,0,0,0,68.7,72.15Z"/><line class="cls-4" x1="65.11" y1="62.47" x2="65.11" y2="79.77"/><line class="cls-5" x1="65.11" y1="62.14" x2="65.11" y2="79.77"/><polyline class="cls-5" points="63.47 63.09 65.1 64.05 66.77 63.02"/><polyline class="cls-5" points="66.77 78.94 65.14 77.99 63.47 79.02"/><line class="cls-5" x1="58.88" y1="64.73" x2="71.35" y2="77.19"/><polyline class="cls-5" points="58.39 66.56 60.22 66.08 60.67 64.18"/><polyline class="cls-5" points="71.93 75.44 70.11 75.92 69.66 77.83"/><line class="cls-5" x1="71.43" y1="64.72" x2="58.97" y2="77.18"/><polyline class="cls-5" points="69.6 64.23 70.08 66.06 71.99 66.51"/><polyline class="cls-5" points="60.73 77.77 60.25 75.94 58.34 75.49"/><line class="cls-5" x1="74.04" y1="70.99" x2="56.41" y2="70.99"/><polyline class="cls-5" points="73.09 69.35 72.13 70.98 73.16 72.65"/><polyline class="cls-5" points="57.24 72.65 58.19 71.02 57.16 69.35"/><path class="cls-3" d="M88.12,65.44l-.24-.55v-.58c.08-.18.15-.35.23-.52s0-.36-.19-.45l-.53-.21-.4-.4c-.08-.2-.15-.39-.23-.57a.28.28,0,0,0-.39-.16l-.3.13-.26.11h-.57l-.43-.19c-.32-.16-.47-.08-.58.24a4,4,0,0,1-.17.44l-.4.41-.56.22a.28.28,0,0,0-.17.4l.21.48a.34.34,0,0,1,0,.08v.56c-.08.2-.16.38-.24.57a.28.28,0,0,0,.16.39l.31.12.28.11.38.39c.08.18.14.35.21.52s.23.3.47.19l.51-.22h.56l.29.12.27.12a.28.28,0,0,0,.41-.18c.06-.16.12-.32.19-.48a.44.44,0,0,1,0-.08l.39-.39.47-.19.12,0A.28.28,0,0,0,88.12,65.44Z"/><line class="cls-4" x1="85.5" y1="58.38" x2="85.5" y2="71"/><line class="cls-5" x1="85.5" y1="58.14" x2="85.5" y2="71"/><polyline class="cls-5" points="84.31 58.84 85.49 59.53 86.71 58.78"/><polyline class="cls-5" points="86.71 70.4 85.52 69.7 84.31 70.46"/><line class="cls-5" x1="80.96" y1="60.03" x2="90.05" y2="69.12"/><polyline class="cls-5" points="80.6 61.37 81.93 61.02 82.26 59.63"/><polyline class="cls-5" points="90.48 67.84 89.15 68.19 88.82 69.58"/><line class="cls-5" x1="90.12" y1="60.02" x2="81.02" y2="69.12"/><polyline class="cls-5" points="88.78 59.67 89.13 61 90.52 61.33"/><polyline class="cls-5" points="82.3 69.54 81.95 68.21 80.56 67.88"/><line class="cls-5" x1="92.02" y1="64.6" x2="79.16" y2="64.6"/><polyline class="cls-5" points="91.32 63.4 90.63 64.59 91.38 65.81"/><polyline class="cls-5" points="79.76 65.81 80.45 64.62 79.7 63.4"/><path class="cls-6" d="M76.77,49.53a1.32,1.32,0,0,1,.77-.46A24.92,24.92,0,0,0,88.68,45c6.44,4.75,11.95,5.4,17.45,2.13,4.78-2.85,7.7-8.5,6.76-13.85-1.38-8-6.52-12-14.43-12.57C95.82,10.83,89.79,4.26,79.75,2.46,68,.36,59.45,5.51,53.73,15.7"/><path class="cls-6" d="M63.32,29.35H63a24,24,0,0,0-47,.87l-.87,0a13.89,13.89,0,0,0-5.53,1.6A14.38,14.38,0,0,0,7.2,33.43c-.4.33-.79.67-1.17,1A10.11,10.11,0,0,0,4,37a13.24,13.24,0,0,0-1.13,2.39C.28,47.32,4,53.28,8.23,56.13s11.5,4,17.85-1.57a24,24,0,0,0,27,0A14.67,14.67,0,1,0,63.32,29.35Z"/></g></g></svg>';
      return svgHtml;
      break;
    case 'thunder-rain':
      svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.07 86.92" width="100" height="100"><defs><style>.cls-1{fill:#cae3f6;}.cls-2{fill:#aac7d5;}.cls-3,.cls-4,.cls-5{fill:none;stroke:#000;stroke-miterlimit:10;}.cls-3,.cls-4{stroke-width:4px;}.cls-4{stroke-linecap:round;}.cls-5{stroke-width:3px;}</style></defs><title>thunder-rainAsset 194colored</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M46.69,73l-3.64-1L42.79,72q.52-1.89,1.05-3.75c.33-1.16.66-2.31,1-3.47a1,1,0,0,0-.23-1,.86.86,0,0,0-1-.23,1.55,1.55,0,0,0-.58.43q-3.12,3.94-6.22,7.91s0,0-.05,0l-1.42,1.81h0c-.26.33-.55.69-.83,1.06a1,1,0,0,0,.57,1.76l3.5,1c.21.05.28.14.26.37-.1,1-.18,2-.26,3s-.15,1.78-.2,2.67a1,1,0,0,0,.93,1,1.12,1.12,0,0,0,.93-.54c1.69-2.27,3.39-4.53,5.08-6.79l.09-.12L47.09,75c.07-.1.13-.2.2-.29A1,1,0,0,0,46.69,73Z"/><path class="cls-2" d="M76.34,50a1.34,1.34,0,0,1,.78-.46,24.88,24.88,0,0,0,11.13-4.1c6.44,4.75,12,5.4,17.45,2.13,4.78-2.85,7.71-8.5,6.77-13.85-1.39-8-6.53-12-14.43-12.58C95.4,11.32,89.36,4.75,79.32,3,67.58.85,59,6,53.31,16.19"/><path class="cls-1" d="M62.9,29.84h-.36a24,24,0,0,0-47,.87l-.87,0a13.94,13.94,0,0,0-5.53,1.6,14.74,14.74,0,0,0-2.35,1.56c-.4.33-.79.67-1.17,1a9.69,9.69,0,0,0-2.06,2.5,13.24,13.24,0,0,0-1.13,2.39c-2.57,8,1.16,13.91,5.38,16.76,4.37,3,11.5,4,17.85-1.57a24,24,0,0,0,27,0A14.67,14.67,0,1,0,62.9,29.84Z"/><path class="cls-3" d="M76.77,49.53a1.32,1.32,0,0,1,.77-.46A24.92,24.92,0,0,0,88.68,45c6.44,4.75,11.95,5.4,17.45,2.13,4.78-2.85,7.7-8.5,6.76-13.85-1.38-8-6.52-12-14.43-12.57C95.82,10.83,89.79,4.26,79.75,2.46,68,.36,59.45,5.51,53.73,15.7"/><path class="cls-3" d="M63.32,29.35H63a24,24,0,0,0-47,.87l-.87,0a13.89,13.89,0,0,0-5.53,1.6A14.38,14.38,0,0,0,7.2,33.43c-.4.33-.79.67-1.17,1A10.11,10.11,0,0,0,4,37a13.24,13.24,0,0,0-1.13,2.39C.28,47.32,4,53.28,8.23,56.13s11.5,4,17.85-1.57a24,24,0,0,0,27,0A14.67,14.67,0,1,0,63.32,29.35Z"/><line class="cls-4" x1="85.91" y1="64.74" x2="85.91" y2="71.71"/><line class="cls-4" x1="60.08" y1="64.74" x2="60.08" y2="71.71"/><line class="cls-4" x1="71.95" y1="77.95" x2="71.95" y2="84.92"/><path class="cls-5" d="M46.69,73l-3.64-1L42.79,72q.52-1.89,1.05-3.75c.33-1.16.66-2.31,1-3.47a1,1,0,0,0-.23-1,.86.86,0,0,0-1-.23,1.55,1.55,0,0,0-.58.43q-3.12,3.94-6.22,7.91s0,0-.05,0l-1.42,1.81h0c-.26.33-.55.69-.83,1.06a1,1,0,0,0,.57,1.76l3.5,1c.21.05.28.14.26.37-.1,1-.18,2-.26,3s-.15,1.78-.2,2.67a1,1,0,0,0,.93,1,1.12,1.12,0,0,0,.93-.54c1.69-2.27,3.39-4.53,5.08-6.79l.09-.12L47.09,75c.07-.1.13-.2.2-.29A1,1,0,0,0,46.69,73Z"/></g></g></svg>';
      return svgHtml;
      break;
    case 'thunder-showers-day':
      svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 121.88 89.06" width="100" height="100"><defs><style>.cls-1{fill:#cae3f6;}.cls-2{fill:#f5b952;}.cls-3{fill:#aac7d5;}.cls-4,.cls-5,.cls-6{fill:none;stroke:#000;stroke-miterlimit:10;}.cls-4,.cls-5{stroke-width:4px;}.cls-5{stroke-linecap:round;}.cls-6{stroke-width:3px;}</style></defs><title>thunder-showers-dayAsset 195colored</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M53.5,75.13l-3.64-1-.26-.08q.52-1.89,1-3.75c.33-1.16.66-2.31,1-3.47a1,1,0,0,0-.23-1,.86.86,0,0,0-.95-.23,1.51,1.51,0,0,0-.57.43Q46.75,70,43.65,73.94l0,.06-1.42,1.8h0c-.26.33-.54.7-.83,1.06a1,1,0,0,0,.57,1.76l3.5,1c.22.06.29.14.26.37-.1,1-.17,2-.25,3s-.16,1.78-.21,2.67a1,1,0,0,0,.93,1,1.11,1.11,0,0,0,.94-.54q2.53-3.41,5.08-6.79l.09-.11,1.64-2.19.21-.29A1,1,0,0,0,53.5,75.13Z"/><path class="cls-2" d="M22.48,2.74a20.1,20.1,0,1,0,20.1,20.1A20.12,20.12,0,0,0,22.48,2.74Z"/><path class="cls-3" d="M83.16,52.08a1.32,1.32,0,0,1,.77-.46,24.92,24.92,0,0,0,11.14-4.1c6.44,4.75,12,5.4,17.45,2.13,4.78-2.86,7.7-8.5,6.76-13.85-1.38-8-6.52-12-14.43-12.58C102.21,13.38,96.18,6.81,86.14,5c-11.75-2.1-20.3,3.05-26,13.24"/><path class="cls-1" d="M69.71,31.89l-.35,0a24,24,0,0,0-47,.87l-.86,0A13.89,13.89,0,0,0,16,34.42,14.38,14.38,0,0,0,13.59,36c-.4.33-.79.67-1.17,1.05a10.11,10.11,0,0,0-2.06,2.5,13.24,13.24,0,0,0-1.13,2.39c-2.56,7.95,1.16,13.91,5.39,16.76s11.5,4,17.85-1.57a24,24,0,0,0,27,0A14.67,14.67,0,1,0,69.71,31.89Z"/><path class="cls-4" d="M39.79,13.71A19.75,19.75,0,1,0,11.21,38.44"/><path class="cls-4" d="M83.58,51.66a1.27,1.27,0,0,1,.78-.46,25,25,0,0,0,11.13-4.11c6.44,4.75,12,5.41,17.45,2.13,4.78-2.85,7.71-8.49,6.77-13.84-1.39-8-6.53-12-14.43-12.58C102.64,13,96.6,6.38,86.56,4.59c-11.74-2.1-20.29,3.05-26,13.23"/><path class="cls-4" d="M70.14,31.47l-.36,0a24,24,0,0,0-47,.87c-.29,0-.58,0-.87,0A14.27,14.27,0,0,0,16.37,34,14.8,14.8,0,0,0,14,35.56a14.06,14.06,0,0,0-1.17,1,10.07,10.07,0,0,0-2.06,2.5,13.13,13.13,0,0,0-1.13,2.4c-2.57,8,1.16,13.9,5.38,16.75,4.38,3,11.5,4,17.86-1.56a24,24,0,0,0,27,0A14.67,14.67,0,1,0,70.14,31.47Z"/><line class="cls-5" x1="92.72" y1="66.88" x2="92.72" y2="73.85"/><line class="cls-5" x1="66.89" y1="66.88" x2="66.89" y2="73.85"/><line class="cls-5" x1="78.77" y1="80.09" x2="78.77" y2="87.06"/><path class="cls-6" d="M53.5,75.13l-3.64-1-.26-.08q.52-1.89,1-3.75c.33-1.16.66-2.31,1-3.47a1,1,0,0,0-.23-1,.86.86,0,0,0-.95-.23,1.51,1.51,0,0,0-.57.43Q46.75,70,43.65,73.94l0,.06-1.42,1.8h0c-.26.33-.54.7-.83,1.06a1,1,0,0,0,.57,1.76l3.5,1c.22.06.29.14.26.37-.1,1-.17,2-.25,3s-.16,1.78-.21,2.67a1,1,0,0,0,.93,1,1.11,1.11,0,0,0,.94-.54q2.53-3.41,5.08-6.79l.09-.11,1.64-2.19.21-.29A1,1,0,0,0,53.5,75.13Z"/></g></g></svg>';
      return svgHtml;
      break;
    case 'thunder-showers-night':
      svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 117.22 88.49" width="100" height="100"><defs><style>.cls-1{fill:#cae3f6;}.cls-2{fill:#f5b952;}.cls-3{fill:#aac7d5;}.cls-4,.cls-5,.cls-6{fill:none;stroke:#000;stroke-miterlimit:10;}.cls-4,.cls-5{stroke-width:4px;}.cls-5{stroke-linecap:round;}.cls-6{stroke-width:3px;}</style></defs><title>thunder-showers-nightAsset 196colored</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M48.84,74.56l-3.64-1-.26-.08c.36-1.26.71-2.51,1.06-3.75s.65-2.31,1-3.47a1,1,0,0,0-.24-1,.86.86,0,0,0-1-.23,1.51,1.51,0,0,0-.57.43Q42.1,69.41,39,73.37l0,.06-1.43,1.8h0c-.26.33-.54.7-.83,1.06a1,1,0,0,0,.58,1.76l3.49,1c.22.06.29.14.27.37-.1,1-.18,2-.26,3s-.16,1.78-.21,2.67a1,1,0,0,0,.93,1,1.11,1.11,0,0,0,.94-.54c1.69-2.27,3.39-4.53,5.08-6.79l.09-.11,1.64-2.19.21-.29A1,1,0,0,0,48.84,74.56Z"/><path class="cls-2" d="M18.58,29.48a19.64,19.64,0,0,1-1.65-11.06A24.21,24.21,0,0,1,23.29,6.07a34,34,0,0,1,2.84-2.75,16.26,16.26,0,0,0-4.08-1.44A16.57,16.57,0,0,0,6.2,29.11a16.33,16.33,0,0,0,5.51,4"/><path class="cls-3" d="M78.5,51.75a1.23,1.23,0,0,1,.77-.46,24.94,24.94,0,0,0,11.14-4.11c6.44,4.75,12,5.41,17.45,2.13,4.78-2.85,7.7-8.49,6.76-13.84-1.38-8-6.52-12-14.43-12.58C97.55,13.05,91.52,6.48,81.48,4.68c-11.75-2.1-20.3,3.05-26,13.23"/><path class="cls-1" d="M65.05,31.56l-.35,0a24,24,0,0,0-47,.87c-.29,0-.58,0-.87,0a14,14,0,0,0-5.53,1.59,14.44,14.44,0,0,0-2.36,1.57A14.21,14.21,0,0,0,7.76,36.7,10.26,10.26,0,0,0,5.7,39.19a13.49,13.49,0,0,0-1.13,2.4C2,49.54,5.73,55.5,10,58.35s11.5,4,17.85-1.57a24,24,0,0,0,27,0A14.67,14.67,0,1,0,65.05,31.56Z"/><path class="cls-4" d="M18.58,30a19.63,19.63,0,0,1-1.65-11.06A24.21,24.21,0,0,1,23.29,6.56a32.14,32.14,0,0,1,2.84-2.74,16.28,16.28,0,0,0-4.08-1.45A16.57,16.57,0,0,0,6.2,29.6a16.23,16.23,0,0,0,5.51,4"/><path class="cls-4" d="M78.93,51.31a1.29,1.29,0,0,1,.77-.47,24.84,24.84,0,0,0,11.13-4.1c6.44,4.75,12,5.41,17.45,2.13C113.06,46,116,40.38,115.05,35c-1.39-8-6.53-12-14.43-12.58C98,12.61,91.94,6,81.9,4.24c-11.74-2.1-20.29,3.05-26,13.23"/><path class="cls-4" d="M65.48,31.12l-.36,0a24,24,0,0,0-47,.87l-.87,0a14.06,14.06,0,0,0-5.52,1.6,14.44,14.44,0,0,0-2.36,1.57,14.06,14.06,0,0,0-1.17,1,9.89,9.89,0,0,0-2.06,2.5A13.24,13.24,0,0,0,5,41.14c-2.57,8,1.16,13.91,5.38,16.76,4.38,3,11.5,4,17.86-1.56a24,24,0,0,0,27-.05A14.67,14.67,0,1,0,65.48,31.12Z"/><line class="cls-5" x1="88.06" y1="66.31" x2="88.06" y2="73.28"/><line class="cls-5" x1="62.23" y1="66.31" x2="62.23" y2="73.28"/><line class="cls-5" x1="74.11" y1="79.52" x2="74.11" y2="86.49"/><path class="cls-6" d="M48.84,74.56l-3.64-1-.26-.08c.36-1.26.71-2.51,1.06-3.75s.65-2.31,1-3.47a1,1,0,0,0-.24-1,.86.86,0,0,0-1-.23,1.51,1.51,0,0,0-.57.43Q42.1,69.41,39,73.37l0,.06-1.43,1.8h0c-.26.33-.54.7-.83,1.06a1,1,0,0,0,.58,1.76l3.49,1c.22.06.29.14.27.37-.1,1-.18,2-.26,3s-.16,1.78-.21,2.67a1,1,0,0,0,.93,1,1.11,1.11,0,0,0,.94-.54c1.69-2.27,3.39-4.53,5.08-6.79l.09-.11,1.64-2.19.21-.29A1,1,0,0,0,48.84,74.56Z"/></g></g></svg>';
      return svgHtml;
      break;
    case 'thunder':
      svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.07 91.48" width="100" height="100"><defs><style>.cls-1{fill:#cae3f6;}.cls-2{fill:#aac7d5;}.cls-3,.cls-4{fill:none;stroke:#000;stroke-miterlimit:10;}.cls-3{stroke-width:4px;}.cls-4{stroke-width:3px;}</style></defs><title>thunderAsset 193colored</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M49,75.43l-4.57-1.21c-.1,0-.2-.06-.33-.1q.66-2.37,1.32-4.71l1.23-4.35a1.22,1.22,0,0,0-.29-1.31,1.06,1.06,0,0,0-1.19-.29,1.93,1.93,0,0,0-.73.54c-2.61,3.3-5.21,6.62-7.81,9.93l-.06.07-1.79,2.27h0c-.32.42-.68.87-1,1.33a1.26,1.26,0,0,0,.72,2.2L38.84,81c.27.07.36.17.33.47-.13,1.27-.22,2.55-.32,3.83-.09,1.11-.2,2.23-.26,3.35A1.2,1.2,0,0,0,39.76,90a1.38,1.38,0,0,0,1.17-.68c2.12-2.85,4.25-5.68,6.38-8.53l.11-.14,2.07-2.75.26-.36A1.24,1.24,0,0,0,49,75.43Z"/><path class="cls-2" d="M76.34,49.72a1.34,1.34,0,0,1,.78-.46,24.88,24.88,0,0,0,11.13-4.1c6.44,4.75,12,5.4,17.45,2.12,4.78-2.85,7.71-8.49,6.77-13.84-1.39-8-6.53-12-14.43-12.58C95.4,11,89.36,4.45,79.32,2.65,67.58.55,59,5.7,53.31,15.89"/><path class="cls-1" d="M62.9,29.53l-.36,0a24,24,0,0,0-47,.87c-.29,0-.58,0-.87,0a13.94,13.94,0,0,0-5.53,1.6,14.74,14.74,0,0,0-2.35,1.56c-.4.33-.79.67-1.17,1.05a9.69,9.69,0,0,0-2.06,2.5,13.24,13.24,0,0,0-1.13,2.39C-.15,47.51,3.58,53.47,7.8,56.32c4.37,3,11.5,4,17.85-1.57a24,24,0,0,0,27,0A14.67,14.67,0,1,0,62.9,29.53Z"/><path class="cls-3" d="M76.77,49.53a1.32,1.32,0,0,1,.77-.46A24.92,24.92,0,0,0,88.68,45c6.44,4.75,11.95,5.4,17.45,2.13,4.78-2.85,7.7-8.5,6.76-13.85-1.38-8-6.52-12-14.43-12.57C95.82,10.83,89.79,4.26,79.75,2.46,68,.36,59.45,5.51,53.73,15.7"/><path class="cls-3" d="M63.32,29.35H63a24,24,0,0,0-47,.87l-.87,0a13.89,13.89,0,0,0-5.53,1.6A14.38,14.38,0,0,0,7.2,33.43c-.4.33-.79.67-1.17,1A10.11,10.11,0,0,0,4,37a13.24,13.24,0,0,0-1.13,2.39C.28,47.32,4,53.28,8.23,56.13s11.5,4,17.85-1.57a24,24,0,0,0,27,0A14.67,14.67,0,1,0,63.32,29.35Z"/><path class="cls-4" d="M49,75.43l-4.57-1.21c-.1,0-.2-.06-.33-.1q.66-2.37,1.32-4.71l1.23-4.35a1.22,1.22,0,0,0-.29-1.31,1.06,1.06,0,0,0-1.19-.29,1.93,1.93,0,0,0-.73.54c-2.61,3.3-5.21,6.62-7.81,9.93l-.06.07-1.79,2.27h0c-.32.42-.68.87-1,1.33a1.26,1.26,0,0,0,.72,2.2L38.84,81c.27.07.36.17.33.47-.13,1.27-.22,2.55-.32,3.83-.09,1.11-.2,2.23-.26,3.35A1.2,1.2,0,0,0,39.76,90a1.38,1.38,0,0,0,1.17-.68c2.12-2.85,4.25-5.68,6.38-8.53l.11-.14,2.07-2.75.26-.36A1.24,1.24,0,0,0,49,75.43Z"/></g></g></svg>';
      return svgHtml;
      break;
    case 'wind':
      svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.87 60.7" width="100" height="100"><defs><style>.cls-1{fill:#aac7d5;}.cls-2{fill:#cae3f6;}.cls-3,.cls-4{fill:none;stroke:#000;stroke-miterlimit:10;}.cls-3{stroke-width:4px;}.cls-4{stroke-linecap:round;stroke-width:3px;}</style></defs><title>windAsset 191colored</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path class="cls-1" d="M76.34,49.3a1.25,1.25,0,0,1,.78-.46,25,25,0,0,0,11.13-4.11c6.44,4.75,12,5.41,17.45,2.13,4.78-2.85,7.71-8.49,6.77-13.84-1.39-8-6.53-12-14.43-12.58C95.4,10.6,89.36,4,79.32,2.23,67.58.13,59,5.28,53.31,15.46"/><path class="cls-2" d="M62.9,29.11l-.36,0a24,24,0,0,0-47,.87l-.87,0a14.27,14.27,0,0,0-5.53,1.6A14.8,14.8,0,0,0,6.78,33.2a14.06,14.06,0,0,0-1.17,1,9.85,9.85,0,0,0-2.06,2.5,13.13,13.13,0,0,0-1.13,2.4C-.15,47.09,3.58,53,7.8,55.89c4.37,3,11.5,4,17.85-1.56a24,24,0,0,0,27,0A14.67,14.67,0,1,0,62.9,29.11Z"/><path class="cls-3" d="M76.77,49.53a1.32,1.32,0,0,1,.77-.46A24.92,24.92,0,0,0,88.68,45c6.44,4.75,11.95,5.4,17.45,2.13,4.78-2.85,7.7-8.5,6.76-13.85-1.38-8-6.52-12-14.43-12.57C95.82,10.83,89.79,4.26,79.75,2.46,68,.36,59.45,5.51,53.73,15.7"/><path class="cls-3" d="M63.32,29.35H63a24,24,0,0,0-47,.87l-.87,0a13.89,13.89,0,0,0-5.53,1.6A14.38,14.38,0,0,0,7.2,33.43c-.4.33-.79.67-1.17,1A10.11,10.11,0,0,0,4,37a13.24,13.24,0,0,0-1.13,2.39C.28,47.32,4,53.28,8.23,56.13s11.5,4,17.85-1.57a24,24,0,0,0,27,0A14.67,14.67,0,1,0,63.32,29.35Z"/><line class="cls-4" x1="103.38" y1="4.86" x2="78.4" y2="22.17"/><polyline class="cls-4" points="79.41 13.48 77.95 22.4 86.53 23.3"/><line class="cls-4" x1="114.37" y1="16.28" x2="89.39" y2="33.59"/><polyline class="cls-4" points="90.4 24.9 88.93 33.82 97.51 34.72"/></g></g></svg>';
      return svgHtml;
      break;
    default:
     break;
   }
}

function checkTempUnit () {
  const unitToggleSwitch = document.querySelector('.unit-switch-checkbox');

  if (unitToggleSwitch.checked) {
    return '°F';
  } else {
    return '°C';
  }
}

function checkSpeedUnit () {
  const unitToggleSwitch = document.querySelector('.unit-switch-checkbox');

  if (unitToggleSwitch.checked) {
    return 'mph';
  } else {
    return 'Kmh';
  }
}

function checkDistUnit () {
  const unitToggleSwitch = document.querySelector('.unit-switch-checkbox');

  if (unitToggleSwitch.checked) {
    return 'miles';
  } else {
    return 'Km';
  }
}

function showWindDirection (direction) {
  return `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(${direction})" width="30" height="30"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`
}

function showLoadingScreen () {
  clearElements(cacheElements());
  const loadingScreen = document.querySelector('.loading-screen');
  loadingScreen.style.display = "block";
}

function hideLoadingScreen () {
  const loadingScreen = document.querySelector('.loading-screen');
  loadingScreen.style.display = "none";
}

export { renderData,
  showLoadingScreen,
  hideLoadingScreen
 };