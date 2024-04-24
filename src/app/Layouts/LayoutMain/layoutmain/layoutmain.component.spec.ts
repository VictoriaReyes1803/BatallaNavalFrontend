import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutmainComponent } from './layoutmain.component';

describe('LayoutmainComponent', () => {
  let component: LayoutmainComponent;
  let fixture: ComponentFixture<LayoutmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutmainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
