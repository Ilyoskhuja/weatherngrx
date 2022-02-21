import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { select, Store } from '@ngrx/store';
import { WeatherState } from '../reducers/weather/weather.reducer';
import { GetWeatherAction } from '../reducers/weather/weather.actions';
import { selectWeatherState } from '../reducers/weather/weather.selector';
import { tap,map } from 'rxjs/operators';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

  private city: string;
  private subscription: Subscription;
  loading = true;
  cities: string[];
  query: string;

  selectedHD:string="daily";
  constructor(private activatedRoute: ActivatedRoute, private weatherService: WeatherService,private store$: Store<WeatherState>) {
    this.subscription = activatedRoute.params.subscribe(params => this.city = params['city']);
    
    
  }

  public weather$: Observable<WeatherState> = this.store$.pipe(
    select(selectWeatherState),
    tap(v => {
      console.log("weather$:", v)
      
    })
  );

  ngOnInit(): void {
  }

  getIconUrl(code: string) {
    return `http://openweathermap.org/img/wn/${code}@2x.png`
  }
  search() {
    this.store$.dispatch(new GetWeatherAction(this.query,this.selectedHD));

  }
  onChange(hd) {
    if(hd=='hourly')
    this.selectedHD="daily";
    else
    this.selectedHD="hourly";
    this.search();
    
  }
}
