import { Component, OnDestroy, OnInit } from '@angular/core';
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit, OnDestroy {
  public showcaseMode: boolean = false;
  constructor() { }
  ngOnInit(): void {
    $(document).ready(function () {
      $('head').append('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" type="text/css" />');
    });
  }
  ngOnDestroy() {
    console.log("ffffff")
    $(document).ready(function () {
      $('link[href*="bootstrap.min.css"]').attr("disabled", "true");
    });
  }
}
