import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLiderComponent } from './menu-lider.component';

describe('MenuLiderComponent', () => {
  let component: MenuLiderComponent;
  let fixture: ComponentFixture<MenuLiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuLiderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuLiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
