import { format } from 'date-fns';

//make an object with only the data needed for our app
class dayData {
  constructor (object) {
    this.cloudCover = object.cloudcover;
    this.conditions = object.conditions;
    this.date = format(new Date(), 'yyyy-MM-dd');
    this.time = format(new Date(), 'HH:mm:ss');
    this.feelslike = object.feelslike;
    this.humidity = object.humidity;
    this.icon = 'do something about different icons';
    this.precipprob = object.precipprob;
    this.sunrise = object.sunrise;
    this.sunset = object.sunset;
    this.temp = object.temp;
    this.visibility = object.visibility;
    this.winddir = object.winddir;
    this.windspeed = object.windspeed;
  }
}

export { dayData };