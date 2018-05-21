import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPhrasePage } from './add-phrase';
import { TimerComponent } from '../../components/timer/timer';

@NgModule({
  declarations: [
    AddPhrasePage,
    TimerComponent
  ],
  imports: [
    IonicPageModule.forChild(AddPhrasePage),
  ],
})
export class AddPhrasePageModule {}
