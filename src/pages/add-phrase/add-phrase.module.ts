import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPhrasePage } from './add-phrase';

@NgModule({
  declarations: [
    AddPhrasePage,
  ],
  imports: [
    IonicPageModule.forChild(AddPhrasePage),
  ],
})
export class AddPhrasePageModule {}
