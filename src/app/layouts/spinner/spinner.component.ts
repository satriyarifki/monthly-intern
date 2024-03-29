import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  modalName: String = '';
  dataName: String = '';
  func: string = '';
  show: Boolean = false;

  constructor(
    private spinnerService: SpinnerService,
    private spinner:NgxSpinnerService,
    // private alertService: AlertService,
    private router: Router
  ) {}

  callModal(show: any) {
    if (show) {
      this.spinner.show()
    } else {
      this.spinner.hide()
    }
  }

  ngOnInit() {
    if (this.spinnerService.subsVar == undefined) {
      this.spinnerService.subsVar = this.spinnerService.invokeSpinner.subscribe(
        (show: Boolean) => {
          this.callModal(show);
        }
      );
    }
    //
  }
  closeDelete() {
    this.show = false;
  }
}
