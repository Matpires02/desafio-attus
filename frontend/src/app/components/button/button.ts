import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [
    MatIcon,
    NgClass
  ],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input({required: true}) text: string = '';
  @Input() icon: string = '';
  @Input({required: true}) title: string = '';
  @Input() fullButton: boolean = false;
  @Input() customClass: string = '';
  @Output('onClick') onClickEmitter = new EventEmitter<void>();
}
