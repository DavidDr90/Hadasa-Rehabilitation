import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhrasesPage } from './phrases';
import { PhraseComponent } from '../../components/phrase/phrase';
import { CategoriesPage } from '../categories/categories';
import { MyCategoryComponent } from '../../components/my-category/my-category';

@NgModule({
  declarations: [
    PhrasesPage,
    PhraseComponent,
    MyCategoryComponent,
    CategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(PhrasesPage),
  ],
})
export class PrasesPageModule {}
