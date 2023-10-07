import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationGeneratorComponent } from './presentation-generator.component';

describe('PresentationGeneratorComponent', () => {
  let component: PresentationGeneratorComponent;
  let fixture: ComponentFixture<PresentationGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PresentationGeneratorComponent]
    });
    fixture = TestBed.createComponent(PresentationGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
