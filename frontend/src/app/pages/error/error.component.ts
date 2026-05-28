import {Component, inject} from '@angular/core';
import {Button} from '../../components/button/button';
import {Location} from '@angular/common';

@Component({
  selector: 'app-error',
  imports: [
    Button
  ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent {
  private readonly location = inject(Location);
  protected returnPage() {
    this.location.back();
  }
}
