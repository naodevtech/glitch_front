import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsTrendListComponent } from './posts-trend-list.component';

describe('PostsTrendListComponent', () => {
  let component: PostsTrendListComponent;
  let fixture: ComponentFixture<PostsTrendListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsTrendListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsTrendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
