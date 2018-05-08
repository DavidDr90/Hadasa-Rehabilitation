import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriesPage } from './categories';
import { MyCategoryComponent } from '../../components/my-category/my-category';

@NgModule({
  declarations: [
    CategoriesPage,
    MyCategoryComponent
  ],
  imports: [
    IonicPageModule.forChild(CategoriesPage),
  ],
})
export class CategoriesPageModule {}
