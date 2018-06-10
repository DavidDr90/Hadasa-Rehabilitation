import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OurAppPage } from './our-app';

@NgModule({
  declarations: [
    OurAppPage,
  ],
  imports: [
    IonicPageModule.forChild(OurAppPage),
  ],
})
export class OurAppPageModule {}
