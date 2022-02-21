import { Observable } from 'rxjs';
import { WeatherService } from './weather.service';
import { weatherActionsType, GetWeatherAction, GetWeatherSuccessAction, WeatherActions } from './reducers/weather/weather.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators'

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private weatherService: WeatherService) {}
  searchQuery: string;
  searchType:string;
  updatedAt$: Observable<WeatherActions> = createEffect(() => {
    return this.actions$.pipe(
      ofType(weatherActionsType.getWeather),
      map((action: GetWeatherAction) => {
        this.searchQuery = action.payload;
        this.searchType =action.hd;
        return this.searchQuery;
      }),
      mergeMap(searchQuery =>this.weatherService.getWeatherData(searchQuery,this.searchType)),
      map(data => {
        return new GetWeatherSuccessAction({
          loading: false,
          query: this.searchQuery,
          data: data
        });
      })
    );
  })
}
