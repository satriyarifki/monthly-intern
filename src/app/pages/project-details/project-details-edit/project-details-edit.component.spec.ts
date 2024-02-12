import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsEditComponent } from './project-details-edit.component';

describe('ProjectDetailsEditComponent', () => {
  let component: ProjectDetailsEditComponent;
  let fixture: ComponentFixture<ProjectDetailsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDetailsEditComponent]
    });
    fixture = TestBed.createComponent(ProjectDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
