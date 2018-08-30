import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlkDatatableComponent } from './mlk-datatable.component';

describe('MlkDatatableComponent', () => {
  let component: MlkDatatableComponent;
  let fixture: ComponentFixture<MlkDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlkDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlkDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
