import { Component, signal } from '@angular/core';
import { Footer } from './footer/footer';
import { Carousel } from './carousel/carousel';

@Component({
  imports: [Footer, Carousel],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('revisao-app');
}
