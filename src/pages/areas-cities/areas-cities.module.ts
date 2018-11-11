import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AreasCitiesPage } from './areas-cities';

@NgModule({
  declarations: [
    AreasCitiesPage,
  ],
  imports: [
    IonicPageModule.forChild(AreasCitiesPage),
  ],
})
export class AreasCitiesPageModule {}
