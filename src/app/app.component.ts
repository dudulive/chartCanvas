import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    title = 'chartCanvas';
    colors: string[] = ['#26ffba', '#fde23e', '#f16e23', '#57d9ff', '#937e88', '#ff0000'];
    data: any =  {
      "Classical music": 1,
      "Alternative rock": 2,
      "Pop": 4,
      "Jazz": 1,
      "Hip Hop":2,
      "Country": 0, 
  };

}
