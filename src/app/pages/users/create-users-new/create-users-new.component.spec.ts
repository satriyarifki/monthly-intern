import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUsersNewComponent } from './create-users-new.component';

describe('CreateUsersNewComponent', () => {
  let component: CreateUsersNewComponent;
  let fixture: ComponentFixture<CreateUsersNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUsersNewComponent]
    });
    fixture = TestBed.createComponent(CreateUsersNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
