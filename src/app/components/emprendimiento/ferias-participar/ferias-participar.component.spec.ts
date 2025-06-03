import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeriasParticiparComponent } from './ferias-participar.component';

describe('FeriasParticiparComponent', () => {
  let component: FeriasParticiparComponent;
  let fixture: ComponentFixture<FeriasParticiparComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeriasParticiparComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeriasParticiparComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
