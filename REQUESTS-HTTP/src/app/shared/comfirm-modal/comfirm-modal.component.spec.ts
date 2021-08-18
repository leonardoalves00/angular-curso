import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComfirmModalComponent } from './comfirm-modal.component';

describe('ComfirmModalComponent', () => {
  let component: ComfirmModalComponent;
  let fixture: ComponentFixture<ComfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComfirmModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
