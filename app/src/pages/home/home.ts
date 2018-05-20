import {Component, trigger, transition, style, animate} from '@angular/core';
import {ArticleProvider} from "../../providers/article/article";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: '0'}),
        animate('2s ease-out', style({opacity: '1'})),
      ])
    ])
  ]
})
export class HomePage {

  data$: any;

  constructor(private articleProvider: ArticleProvider) {
    this.data$ = articleProvider.data$;
  }
}
