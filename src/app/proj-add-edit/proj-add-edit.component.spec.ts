import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjAddEditComponent } from './proj-add-edit.component';

describe('ProjAddEditComponent', () => {
  let component: ProjAddEditComponent;
  let fixture: ComponentFixture<ProjAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
