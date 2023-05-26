import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CoreService } from './core/core.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterContentChecked {
  loading$: Observable<boolean>;
  constructor(
    private _coreService: CoreService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loading$ = this._coreService.loading$;
  }

  ngAfterContentChecked() {
    this.changeDetectorRef.detectChanges();
  }
}
