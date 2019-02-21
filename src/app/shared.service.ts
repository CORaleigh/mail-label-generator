import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  labels:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  selections:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  mapView:BehaviorSubject<any>=new BehaviorSubject<any>(null);
  addToResults:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }
}
