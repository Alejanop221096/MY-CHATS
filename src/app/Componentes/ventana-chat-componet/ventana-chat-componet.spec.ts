import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaChatComponet } from './ventana-chat-componet';

describe('VentanaChatComponet', () => {
  let component: VentanaChatComponet;
  let fixture: ComponentFixture<VentanaChatComponet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentanaChatComponet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentanaChatComponet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
