import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposePostComponent } from './compose-post.component';

describe('ComposePostComponent', () => {
  let component: ComposePostComponent;
  let fixture: ComponentFixture<ComposePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
