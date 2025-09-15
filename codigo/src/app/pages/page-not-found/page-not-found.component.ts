import { Component, HostBinding, OnInit, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  public dark_theme: boolean;

  @HostBinding('class')
  get themeMode() {
    return this.dark_theme ? 'dark-theme' : 'light-theme';
  }

  constructor(
    @Inject(DOCUMENT) private document: Document, private renderer: Renderer2
  ) {
    this.dark_theme = false;
  }

  ngOnInit(): void {
    let host_class = 'light-theme'
    const theme_preference = sessionStorage.getItem('theme-mode');
    if (theme_preference != null) {
      this.dark_theme = JSON.parse(theme_preference)
      host_class = this.dark_theme ? 'dark-theme' : 'light-theme';
    }
    this.renderer.setAttribute(this.document.body, 'class', host_class)
  }

}
