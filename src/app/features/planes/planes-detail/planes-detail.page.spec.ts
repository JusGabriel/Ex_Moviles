import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanesDetailPage } from './planes-detail.page';

describe('PlanesDetailPage', () => {
  let component: PlanesDetailPage;
  let fixture: ComponentFixture<PlanesDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanesDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
