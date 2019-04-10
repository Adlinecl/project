import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailinComponent } from './detailin.component';

describe('DetailinComponent', () => {
  let component: DetailinComponent;
  let fixture: ComponentFixture<DetailinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
