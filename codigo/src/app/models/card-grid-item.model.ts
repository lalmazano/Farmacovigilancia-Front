export interface CardGridItem {
  title: string;
  routerLink?: string | any[];
  href?: string;
  imgSrc: string;
  imgAlt?: string;
  disabled?: boolean;
  target?: '_blank' | '_self' | '_parent' | '_top';
  data?: unknown;
}