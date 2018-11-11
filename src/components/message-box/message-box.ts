import {Component, Input, Output, EventEmitter} from '@angular/core';

/**
 * Generated class for the MessageBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'message-box',
  templateUrl: 'message-box.html'
})
export class MessageBoxComponent {
  @Input('message') message;
  @Output() eventBus = new EventEmitter();

  text: string;

  constructor() {
    this.text = 'Hello World';
  }

  /* component 没有生命周期函数 ngAfterContentInit构造方法 */
  ngAfterContentInit() {

  }

  triggerEvent() {
    console.log(this.message);
    this.eventBus.emit(1);
  }
}
