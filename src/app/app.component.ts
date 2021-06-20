import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tabs: string[] = [];

  title = 'user-list-demo';

  constructor() {

  }
  ngOnInit(): void {
  }
}
