import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhrasesPage } from './phrases';
import { PhraseComponent } from '../../components/phrase/phrase';

@NgModule({
  declarations: [
    PhrasesPage,
    PhraseComponent,
  ],
  imports: [
    IonicPageModule.forChild(PhrasesPage),
  ],
})
export class PrasesPageModule {}
