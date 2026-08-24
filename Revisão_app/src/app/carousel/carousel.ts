import { Component, signal } from '@angular/core';

type Destination = {
  image: string;
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
      image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85',
      location: 'Patagonia, Argentina',
      title: 'Onde o horizonte respira',
      description: 'Trilhas silenciosas, lagos azuis e montanhas que parecem não ter fim.',
    },
    {
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85',
      location: 'Fernando de Noronha, Brasil',
      title: 'Dias em mar aberto',
      description: 'Águas transparentes e uma ilha para desacelerar de verdade.',
    },
    {
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=85',
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
