import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
   <h1 style="text-align:center">Weather App</h1>
   <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'weatherngrx';
  constructor() {
    console.log("Appcomponent");
    
  }
}