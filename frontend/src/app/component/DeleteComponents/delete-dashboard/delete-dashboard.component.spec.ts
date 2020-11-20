import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDashboardComponent } from './delete-dashboard.component';

describe('DeleteDashboardComponent', () => {
  let component: DeleteDashboardComponent;
  let fixture: ComponentFixture<DeleteDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
