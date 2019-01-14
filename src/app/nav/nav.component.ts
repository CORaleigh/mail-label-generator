import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
    // Set our map properties
    mapCenter = [-78.7, 35.76];
    basemapType = 'dark-gray-vector';
    mapZoomLevel = 12;
    distance:number = 200;
    labels:any[] = [];
    private distances:any[] = [
     {label: '100 feet', value: 100},
     {label: '200 feet', value: 200},
     {label: '300 feet', value: 300},
     {label: '400 feet', value: 400},
     {label: '500 feet', value: 500},              
    ];


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private shared:SharedService) {}
  ngOnInit() {
    this.shared.labels.subscribe((labels) => {
      this.labels = labels;
    });
  }

}