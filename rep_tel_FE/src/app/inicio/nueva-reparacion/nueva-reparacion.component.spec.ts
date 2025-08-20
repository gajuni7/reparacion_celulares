import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaReparacionComponent } from './nueva-reparacion.component';

describe('NuevaReparacionComponent', () => {
  let component: NuevaReparacionComponent;
  let fixture: ComponentFixture<NuevaReparacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaReparacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevaReparacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
