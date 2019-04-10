import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepertoryComponent } from './repertory.component';

describe('RepertoryComponent', () => {
  let component: RepertoryComponent;
  let fixture: ComponentFixture<RepertoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepertoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepertoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
