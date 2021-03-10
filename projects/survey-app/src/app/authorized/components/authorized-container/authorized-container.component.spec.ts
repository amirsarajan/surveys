import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedContainerComponent } from './authorized-container.component';

describe('AuthorizedContainerComponent', () => {
  let component: AuthorizedContainerComponent;
  let fixture: ComponentFixture<AuthorizedContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizedContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizedContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
