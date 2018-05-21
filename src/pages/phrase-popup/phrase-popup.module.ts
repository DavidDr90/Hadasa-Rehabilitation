import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhrasePopupPage } from './phrase-popup';

@NgModule({
  declarations: [
    PhrasePopupPage,
  ],
  imports: [
    IonicPageModule.forChild(PhrasePopupPage),
  ],
})
export class PhrasePopupPageModule {}
