import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { kaoqinPage } from './kaoqin';

@NgModule({
  declarations: [
    kaoqinPage,
  ],
  imports: [
    IonicPageModule.forChild(kaoqinPage),
  ],
})
export class KaoqinPageModule {}
