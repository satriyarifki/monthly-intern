import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDetailsCreateComponent } from './project-details-create.component';

describe('ProjectDetailsCreateComponent', () => {
  let component: ProjectDetailsCreateComponent;
  let fixture: ComponentFixture<ProjectDetailsCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDetailsCreateComponent]
    });
    fixture = TestBed.createComponent(ProjectDetailsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
