import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanesCreateEditPage } from './planes-create-edit.page';

describe('PlanesCreateEditPage', () => {
  let component: PlanesCreateEditPage;
  let fixture: ComponentFixture<PlanesCreateEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesCreateEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
