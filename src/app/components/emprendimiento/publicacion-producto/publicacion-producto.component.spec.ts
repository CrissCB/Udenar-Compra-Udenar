import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionProductoComponent } from './publicacion-producto.component';

describe('PublicacionProductoComponent', () => {
  let component: PublicacionProductoComponent;
  let fixture: ComponentFixture<PublicacionProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicacionProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicacionProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
