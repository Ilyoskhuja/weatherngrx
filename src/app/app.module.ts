import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { ListComponent } from './list/list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { metaReducers, reducers } from './reducers';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CityComponent } from './city/city.component';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: '', component: ListComponent },
  { path: 'city/:city', component: CityComponent },
  { path: '404', component: NotFoundComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
    ListComponent,
    NotFoundComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
