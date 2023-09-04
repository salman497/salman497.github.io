import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MermaidViewerComponent } from './mermaid-viewer.component';

describe('MermaidViewerComponent', () => {
  let component: MermaidViewerComponent;
  let fixture: ComponentFixture<MermaidViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MermaidViewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MermaidViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
