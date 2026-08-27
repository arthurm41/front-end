import { Component, signal } from '@angular/core';

type Destination = {
  color: string;
  number: string;
  location: string;
  title: string;
  description: string;
};

@Component({
  imports: [],
  selector: 'app-carousel',
  styleUrl: './carousel.css',
  templateUrl: './carousel.html',
})
export class Carousel {
  protected readonly destinations: Destination[] = [
    {
      color: '#d9a441',
      number: '01',
      location: 'Patagonia, Argentina',
      title: 'Onde o horizonte respira',
      description: 'Trilhas silenciosas, lagos azuis e montanhas que parecem não ter fim.',
    },
    {
      color: '#d4775c',
      number: '02',
      location: 'Fernando de Noronha, Brasil',
      title: 'Dias em mar aberto',
      description: 'Águas transparentes e uma ilha para desacelerar de verdade.',
    },
    {
      color: '#79a89b',
      number: '03',
      location: 'Dolomitas, Itália',
      title: 'A beleza do inesperado',
      description: 'Uma pausa entre picos dourados, vilarejos e estradas para explorar.',
    },
  ];

  protected readonly activeIndex = signal(0);

  protected next(): void {
    this.activeIndex.update((index) => (index + 1) % this.destinations.length);
  }

  protected previous(): void {
    this.activeIndex.update((index) => (index - 1 + this.destinations.length) % this.destinations.length);
  }

  protected select(index: number): void {
    this.activeIndex.set(index);
  }
}
