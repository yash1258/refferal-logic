import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-going-live',
  templateUrl: './going-live.component.html',
  styleUrls: ['./going-live.component.css']
})
export class GoingLiveComponent implements OnInit {

  constructor() { }
  countdown_start_time = new Date(new Date().getFullYear(),9,3,13).valueOf()
  current_time = new Date().valueOf();
  time_left=(-this.current_time+this.countdown_start_time)/1000;
  ngOnInit(): void {
  }

}
