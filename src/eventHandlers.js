import { searchPlace, processedMetricData, processedUsData } from "./controller";
import { renderData } from "./domManipulator";


function addEvents () {
    const searchBtn = document.querySelector('.search-submit');
    searchBtn.addEventListener('click', (event) => {
      event.preventDefault();
      const searchInput = document.querySelector('.search-input');
      const searchValue = searchInput.value;
      
      searchPlace(`${searchValue}`);
    });

    const metricToggleBtn = document.querySelector('.unit-switch-checkbox');
    metricToggleBtn.addEventListener('change', (event) => {
      if (event.target.checked) {
        renderData(processedUsData);
      } else {
        renderData(processedMetricData);
      }
    });
}

export { addEvents };