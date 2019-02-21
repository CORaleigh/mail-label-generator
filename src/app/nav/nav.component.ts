import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedService } from '../shared.service';
import { loadModules } from 'esri-loader';
import esri = __esri;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
    // Set our map properties
    mapCenter = [-78.6382, 35.7796];
    basemapType = 'dark-gray-vector';
    mapZoomLevel = 12;
    distance:number = 200;
    labels:any[] = [];
    selections:any[] = [];

    distances:any[] = [
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
    this.shared.selections.subscribe((selections) => {
      this.selections = selections;
    });    
  }
  addToResultsChange (e) {
    this.shared.addToResults.next(e.checked);
  }

  zoomToSelection(selection) {
    this.shared.mapView.getValue().goTo({target: selection.geometry}, {duration: 2000});

  }

  getCount(selection) {
    let count = 0;
    this.labels.forEach(label => {
      if (label.id.indexOf(selection.id) > -1) {
        count += 1;
      }
    });
    return count;
  }

  deleteSelection(selection) {
    let i = this.labels.length;
    while (i--) {
        if (this.labels[i].id.indexOf(selection.id > -1)) { 

              let j = this.labels[i].id.length;
              while (j--) {
                if (this.labels[i].id[j] === selection.id) { 
                  this.labels[i].id.splice(j,1);
                }
              }
            if (this.labels[i].id.length === 0) {
              this.labels.splice(i, 1);
            }

          } 
    }
    selection.graphics.forEach((graphic:esri.Graphic) => {
      (this.shared.mapView.getValue() as esri.MapView).graphics.remove(graphic);
    });
    i = this.selections.length;
    while (i--) {
        if (this.selections[i].id === selection.id) { 
            this.selections.splice(i, 1);
        } 
    }
  }

}
