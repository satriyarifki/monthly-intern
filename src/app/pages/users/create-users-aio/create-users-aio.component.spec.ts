import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUsersAioComponent } from './create-users-aio.component';

describe('CreateUsersAioComponent', () => {
  let component: CreateUsersAioComponent;
  let fixture: ComponentFixture<CreateUsersAioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUsersAioComponent]
    });
    fixture = TestBed.createComponent(CreateUsersAioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
