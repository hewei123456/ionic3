import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AreasCountiesPage } from './areas-counties';

@NgModule({
  declarations: [
    AreasCountiesPage,
  ],
  imports: [
    IonicPageModule.forChild(AreasCountiesPage),
  ],
})
export class AreasCountiesPageModule {}
