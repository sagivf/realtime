import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import io from 'socket.io-client';
import {Observable} from "rxjs/Observable";

const socket = io('http://localhost:3000');


@Injectable()
export class ArticleProvider {

  //data$ = new BehaviorSubject([]);

  constructor(private zone: NgZone) {
    // socket.on('add-article',  article => zone.run(() => {
    //   this.data$.next([article, ...this.data$.value]);
    // }));
    //
    // socket.on('init-articles',  articles => zone.run(() => {
    //   this.data$.next(articles);
    // }));
  }

  getMessages() {
    return new Observable(observer => {
      socket.on('init-articles',  articles => this.zone.run(() => {
        articles.forEach(article => observer.next(article));
      }));

      socket.on('add-article',  article => this.zone.run(() => {
        observer.next(article);
      }));
    });
  }
}
