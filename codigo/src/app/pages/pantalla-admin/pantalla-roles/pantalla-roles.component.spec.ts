import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaRolesComponent } from './pantalla-roles.component';

describe('PantallaRolesComponent', () => {
  let component: PantallaRolesComponent;
  let fixture: ComponentFixture<PantallaRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantallaRolesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PantallaRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
