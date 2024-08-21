import { format } from 'date-fns';

//make an object with only the data needed for our app
class ConditionData {
  constructor (object) {
    this.cloudCover = object.cloudcover;
    this.conditions = object.conditions;
    this.date = format(new Date(), 'yyyy-MM-dd');
    this.time = format(new Date(), 'HH:mm:ss');
    this.feelslike = object.feelslike;
    this.humidity = object.humidity;
    this.icon = object.icon;
    this.precipprob = object.precipprob;
    this.sunrise = object.sunrise;
    this.sunset = object.sunset;
    this.temp = object.temp;
    this.visibility = object.visibility;
    this.winddir = object.winddir;
    this.windspeed = object.windspeed;
  }
}

class ForecastData extends ConditionData {
  constructor (object) {
    super(object);
    this.date = format(object.datetime, 'yyyy-MM-dd');
  }
}

class AddressData {
  constructor (jsonFile) {
    this.description = jsonFile.description;
    this.latitude = jsonFile.latitude;
    this.longitude = jsonFile.longitude;
    this.address = jsonFile.resolvedAddress;
    this.timezone = jsonFile.timezone;
  }
}

export { 
  ConditionData,
  ForecastData,
  AddressData
};