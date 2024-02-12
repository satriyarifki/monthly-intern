import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  constructor() { }

  private message = '';

  invokeSpinner = new EventEmitter();
  subsVar: Subscription | undefined;

  
  onCallSpinner(show: Boolean) {
    this.invokeSpinner.emit(show);
  }
}
