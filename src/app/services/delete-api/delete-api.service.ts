import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteApiService {
  constructor() { }

  private message = '';

  invokeDelete = new EventEmitter();
  subsVar: Subscription | undefined;


  onCallDelete(data: any) {
    this.invokeDelete.emit(data);
  }
}
