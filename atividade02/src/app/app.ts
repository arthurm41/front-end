import { Component } from '@angular/core';
import { CardProduct } from './card-product/card-product';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { HeroBanner } from './hero-banner/hero-banner';
import { Sidebar } from './sidebar/sidebar';

@Component({
  imports: [Header, Sidebar, HeroBanner, CardProduct, Footer],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
