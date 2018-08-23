import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StewardClientComponent } from './steward-client.component';

describe('StewardClientComponent', () => {
  let component: StewardClientComponent;
  let fixture: ComponentFixture<StewardClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StewardClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StewardClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
