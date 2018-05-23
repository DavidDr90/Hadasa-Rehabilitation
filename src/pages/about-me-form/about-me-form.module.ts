import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutMeFormPage } from './about-me-form';

@NgModule({
  declarations: [
    AboutMeFormPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutMeFormPage),
  ],
})
export class AboutMeFormPageModule {}
