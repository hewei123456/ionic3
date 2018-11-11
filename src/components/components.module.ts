import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {IonicPageModule} from "ionic-angular";

import {MessageBoxComponent} from './message-box/message-box';

@NgModule({
  declarations: [MessageBoxComponent],
  imports: [
    BrowserModule,
    IonicPageModule.forChild(MessageBoxComponent)],
  exports: [MessageBoxComponent]
})
export class ComponentsModule {
}
