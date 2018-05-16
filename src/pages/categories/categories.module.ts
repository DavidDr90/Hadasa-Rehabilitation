import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriesPage } from './categories';
import { MyCategoryComponent } from '../../components/my-category/my-category';
import { PhrasesPage } from '../phrases/phrases';

@NgModule({
  declarations: [
    CategoriesPage,
    MyCategoryComponent,
    PhrasesPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriesPage),
  ],
})
export class CategoriesPageModule {}
