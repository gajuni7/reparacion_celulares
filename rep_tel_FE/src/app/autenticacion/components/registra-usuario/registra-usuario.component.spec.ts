import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrausuarioComponent } from './registra-usuario.component';

describe('RegistrausuarioComponent', () => {
  let component: RegistrausuarioComponent;
  let fixture: ComponentFixture<RegistrausuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrausuarioComponent]
    });
    fixture = TestBed.createComponent(RegistrausuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
