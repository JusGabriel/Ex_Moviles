import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsesorPerfilPage } from './asesor-perfil.page';

describe('AsesorPerfilPage', () => {
  let component: AsesorPerfilPage;
  let fixture: ComponentFixture<AsesorPerfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsesorPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
