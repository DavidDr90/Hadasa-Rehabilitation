import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutMePage } from './about-me';
import { PhraseComponent } from '../../components/phrase/phrase';

@NgModule({
  declarations: [
    AboutMePage,
    PhraseComponent,
  ],
  imports: [
    IonicPageModule.forChild(AboutMePage),
  ],
})
export class AboutMePageModule {



  
}
