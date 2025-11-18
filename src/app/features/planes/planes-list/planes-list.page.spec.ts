import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanesListPage } from './planes-list.page';

describe('PlanesListPage', () => {
  let component: PlanesListPage;
  let fixture: ComponentFixture<PlanesListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
