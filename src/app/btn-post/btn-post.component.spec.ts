import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnPostComponent } from './btn-post.component';

describe('BtnPostComponent', () => {
  let component: BtnPostComponent;
  let fixture: ComponentFixture<BtnPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
