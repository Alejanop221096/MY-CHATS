import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatInicio } from './chat-inicio';

describe('ChatInicio', () => {
  let component: ChatInicio;
  let fixture: ComponentFixture<ChatInicio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatInicio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatInicio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
