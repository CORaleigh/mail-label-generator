import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  labels:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor() { }
}
