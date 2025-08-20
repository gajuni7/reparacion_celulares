import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoReparacionesComponent } from './listado-reparaciones.component';

describe('ListadoReparacionesComponent', () => {
  let component: ListadoReparacionesComponent;
  let fixture: ComponentFixture<ListadoReparacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoReparacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoReparacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
