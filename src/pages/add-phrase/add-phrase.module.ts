import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPhrasePage } from './add-phrase';
import { TimerComponent } from '../../components/timer/timer';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar';

@NgModule({
  declarations: [
    AddPhrasePage,
    TimerComponent,
    ProgressBarComponent
  ],
  imports: [
    IonicPageModule.forChild(AddPhrasePage),
  ],
})
export class AddPhrasePageModule {}
