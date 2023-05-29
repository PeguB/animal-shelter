import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdoptionsComponent } from './user-adoptions.component';

describe('UserAdoptionsComponent', () => {
  let component: UserAdoptionsComponent;
  let fixture: ComponentFixture<UserAdoptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAdoptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAdoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
