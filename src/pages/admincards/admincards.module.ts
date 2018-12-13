import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdmincardsPage } from './admincards';

@NgModule({
  declarations: [
    AdmincardsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdmincardsPage),
  ],
})
export class AdmincardsPageModule {}
