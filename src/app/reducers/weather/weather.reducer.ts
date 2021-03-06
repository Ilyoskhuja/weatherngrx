import { CityWeather } from './../../weather.service';
import { WeatherActions, weatherActionsType } from './weather.actions';

export const weatherNode = 'weather';

export interface WeatherState {
    loading: boolean,
    query: string,
    data: CityWeather
}

export const initialState: WeatherState = {
    loading: false,
    query: "",
    data: {
      city: "",
      timezone: "",
      current: {
        desc: "",
        datetime: new Date(),
        temp: 0,
        pressure: 0,
        humidity: 0,
        uvi: 0,
        clouds: 0
      },
      daily: [{
        desc: "",
        datetime: new Date(),
        temp: 0,
        pressure: 0,
        humidity: 0,
        uvi: 0,
        clouds: 0
      }],
      hourly: [{
        desc: "",
        datetime: new Date(),
        temp: 0.0,
        pressure: 0,
        humidity: 0,
        uvi: 0,
        clouds: 0
      }]
    }
}

export const weatherReducer = (state: WeatherState = initialState, action: WeatherActions) => {
    switch (action.type) {
        case weatherActionsType.getWeather:
            return {
              ...state,
              loading: true,
              query:action.payload,
              searchType:action.hd
            };
        case weatherActionsType.getWeatherSuccess:
            return {
              ...action.payload,
            };
        default:
            return state;
    }
}