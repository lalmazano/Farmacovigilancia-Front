import { Component, Input } from '@angular/core';
import { CardGridItem } from '../../../models/card-grid-item.model';

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.scss']
})

export class CardGridComponent {
  @Input() items: CardGridItem[] = [];
  @Input() minCardWidth = 180;
  @Input() gap = 16;
  @Input() imgMaxHeight?: number;

  get gridStyle() {
    return {
      '--cg-gap': `${this.gap}px`,
      '--cg-min': `${this.minCardWidth}px`,
      ...(this.imgMaxHeight ? {'--cg-img-max': `${this.imgMaxHeight}px`} : {})
    } as Record<string, string>;
  }

  onCardClick(item: CardGridItem, ev: MouseEvent) {
    if (item.disabled) {
      ev.preventDefault();
      ev.stopPropagation();
    }
  }
}
