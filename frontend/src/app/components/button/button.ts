import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {NgClass} from '@angular/common';

type ButtonVariants = "default" | "ghost" | "danger";

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
  @Input() variant: ButtonVariants = 'default';
  @Input() disabled = false;
  @Input({required: true}) text: string = '';
  @Input() icon: string = '';
  @Input({required: true}) title: string = '';
  @Input() fullButton: boolean = false;
  @Input() customClass: string = '';
  @Output('onClick') onClickEmitter = new EventEmitter<void>();

  protected buttonVariants: Record<ButtonVariants, string> = {
    default: "bg-blue-600 text-blue-100 hover:bg-blue-700",
    ghost: "bg-slate-300 text-slate-950 hover:bg-slate-400",
    danger: "bg-red-600 text-red-100 hover:bg-red-700",
  };
}
