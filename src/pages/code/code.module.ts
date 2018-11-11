import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CodePage } from './code';

@NgModule({
  declarations: [
    CodePage,
  ],
  imports: [
    IonicPageModule.forChild(CodePage),
  ],
})
export class CodePageModule {}
